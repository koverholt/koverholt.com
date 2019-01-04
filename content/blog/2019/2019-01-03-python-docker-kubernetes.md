---
title: "How to Develop and Deploy a Python Application with Docker and Kubernetes"
date: "2018-09-17T04:48:16+00:00"
---

## Running Python Applications Directly on Web Servers

In the past, I've created a number of Python applications and configured/deployed them as web applications using WSGI and the Apache webserver. I did this for engineering calculators on my website, the [Is Texas On Fire?][http://istexasonfire.com/] website/map, calculators that used compiled Fortran fire models ([CFAST][https://github.com/firemodels/cfast] and [FDS][https://github.com/firemodels/fds]), and many other tools/experiments.

Traditionally, I would version control my code on GitHub, clone the latest version on the web server machines, obtain the appropriate system/Python libraries, configure and restart Apache, and things ran fairly smoothly. For this reason, I gravitated towards flexible webhosts such as [NearlyFreeSpeech.net][https://www.nearlyfreespeech.net/] and [WebFaction][https://www.webfaction.com/] that provided a compilation toolchain and allowed you to freely run executables via WSGI without needing to open a support ticket for each action.

This method of deploying Python apps made sense to me after years of running websites and applications on tools such as WordPress, which used server-side execution, shared-hosting machines, and system libraries at runtime. And it worked, so I stuck with it for a long time.

Over time, I experimented for both work and play using various deployment tools/platforms such as Heroku, AWS, Salt, Ansible, Google App Engine, and many more. They all worked farily well, but I stuck with WSGI for most of my "production"" applications.

## Exploring a Container-Based Approach of Deployment

In the past few years, I've worked a lot with various Python/R applications, dashboards, notebooks, models, REST APIs, and other types of data science assets that you'd want to deploy. During the same time, I've used Docker, docker-compose, Kubernetes, and the many tools in the container-based ecosystem that work well to create reproducible applications and automate the test, build, deployment, maintenance and many other steps to get your code up, running, and deployed to production.

It's been fascinating to watch the evolution of schedulers, containers, dependency management/packaging, deployment mechanisms, and overall DevOps tooling over the past 10-15 years. I went from configuring custom scheduler rules in PBS/Torque/SLURM/Maui on HPC clusters to managing masters/minions in Salt across cloud-based clusters to configuring load balancers in cloud-based container orchestration in Kubernetes in a 10-year time span. All the while appreciating the effort and intentional design of each iteration of DevOps tooling along the way.

So, I decided it's finally time to catch up on my personal/side projects and move from a WSGI-based approach to a containerized approach to be able to develop more applications quickly, worry less about uptime and fault tolerance via manual intervention, and have the freedom to quickly create or update an application with low friction.

This blog post is a brief walkthrough of how I created a web application with Python, containerized it with Docker, and deployed it to Kubernetes.

## Part 1 - Developing a Web Application in Python

This part is pretty familiar: formulate and solve a problem by writing some backend Python code and a simple frontend.

In this case, I wanted a web application that would quickly tell me how much rainfall has occurred in my home area in Central Texas, especially since rainfall in the summer of 2018 has been pretty scarce (up until two weeks ago, at least).

First, I needed to find a localized data source for historical rainfall. There are a number of spatial- and time-averaged data sets from commercial weather sites. However, I came across real-time data from the [LCRA Hydromet][https://hydromet.lcra.org/] that includes streamflow, lake levels, rainfall amounts, temperature, and relative humidity based on hundreds of sensors. The Hydromet site even provides a nice interactive map that shows this data.

<img class="aligncenter size-large wp-image-2659" src="https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.40.12-PM-1024x899.png" alt="" width="605" height="531" srcset="https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.40.12-PM-1024x899.png 1024w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.40.12-PM-300x263.png 300w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.40.12-PM-768x674.png 768w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.40.12-PM-100x88.png 100w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.40.12-PM-150x132.png 150w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.40.12-PM-200x176.png 200w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.40.12-PM-450x395.png 450w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.40.12-PM-600x527.png 600w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.40.12-PM-900x790.png 900w" sizes="(max-width: 605px) 100vw, 605px" />

However, I wanted a minimal application that showed me data most relevant to my immediate area without having to filter and zoom on the map each time.

After locating the tabular and CSV versions of the relevant weather data on the [LCRA Hydromet media page][https://hydromet.lcra.org/media], I created a script to obtain the latest data and parse it using pandas:

<pre class="brush: python; title: ; notranslate" title="">#!/usr/bin/env python

import pandas as pd
from collections import OrderedDict

def fetch_data():
    rainfall_one_day = pd.read_csv('http://hydromet.lcra.org/media/Rainfall.csv')
    rainfall_one_day.columns = rainfall_one_day.columns.str.strip().str.lower().str.replace(' ', '_').str.replace('(', '').str.replace(')', '')
    rainfall_one_day.set_index('site', inplace=True)

    names = ['site', 'location', 'basin', 'today', 'last24', '1_day_ago',
             '2_days_ago', '3_days_ago', '4_days_ago', '5_day_total',
             'report_date']
    rainfall_five_day = pd.read_csv('http://hydromet.lcra.org/media/Rain5Day.csv',
                                     names=names, skiprows=1)
    rainfall_five_day.set_index('site', inplace=True)

    rainfall = rainfall_one_day.join(rainfall_five_day, rsuffix='2')
    stations = pd.Series(rainfall.location.values, index=rainfall.index).to_dict(into=OrderedDict)
    return rainfall, stations
</pre>

Then I created another script that serves a frontend using Flask templated with Bootstrap, and the script accepts POST requests with inputs for the sensor site location and duration of rainfall desired:

<pre class="brush: python; title: ; notranslate" title="">#!/usr/bin/env python


from flask import Flask, jsonify, request, render_template
from rainfall import get_stations, rainfall_total


app = Flask(__name__)




@app.route('/', defaults={'path': ''})
@app.route("/<path:path>")
def rainfall(path):
    error = None
    stations = get_stations()
    selected_station = 5619
    duration = '24_hour'
    return render_template('./index.html',
                           duration=duration,
                           stations=stations,
                           selected_station=selected_station,
                           error=error)




@app.route('/', defaults={'path': ''})
@app.route("/<path:path>", methods=['POST'])
def rainfall_post(path):
    site_id = int(request.form['site_id'])
    duration = request.form['duration']
    rainfall_amount, site_id, site_location, duration_natural, stations, error = rainfall_total(site_id=site_id, duration=duration)
    selected_station = site_id
    return render_template('index.html',
                           rainfall_amount=rainfall_amount,
                           duration_natural=duration_natural,
                           site_id=site_id,
                           site_location=site_location,
                           duration=duration,
                           stations=stations,
                           selected_station=selected_station,
                           error=error);




if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
</pre>

The result is this rainfall-totals Python application:

<https://github.com/koverholt/rainfall-totals>

Now, we can move on to containerizing our Python application in a Docker image.

## Part 2 - Containerizing the Python application in a Docker image

For this step, we can start with a base image (Debian 7, in this case), install Python dependencies (pandas and flask), copy in our Python application source code, expose the web server (port 5000), then start the Flask application.

<pre class="brush: plain; title: ; notranslate" title="">from debian:7

RUN apt-get update && apt-get install -y curl bzip2

RUN curl -L -o /tmp/anaconda.sh https://repo.anaconda.com/miniconda/Miniconda3-4.5.4-Linux-x86_64.sh
RUN bash /tmp/anaconda.sh -p /opt/anaconda -b
RUN rm /tmp/anaconda.sh
ENV PATH=/opt/anaconda/bin:${PATH}
RUN /opt/anaconda/bin/conda install -y pandas=0.23.4 flask=1.0.2 nomkl

copy . /
EXPOSE 5000
CMD /opt/anaconda/bin/python /app.py
</pre>

We can build and run the Docker container using:

<pre class="brush: bash; title: ; notranslate" title="">docker build -t rainfall-app:1.0 .
docker run -d -p 5000:5000 rainfall-app:1.0
</pre>

And access the application in our browser:

<img class="aligncenter size-large wp-image-2647" src="https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.16.50-PM-1024x711.png" alt="" width="605" height="420" srcset="https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.16.50-PM-1024x711.png 1024w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.16.50-PM-300x208.png 300w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.16.50-PM-768x533.png 768w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.16.50-PM-100x69.png 100w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.16.50-PM-150x104.png 150w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.16.50-PM-200x139.png 200w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.16.50-PM-450x312.png 450w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.16.50-PM-600x416.png 600w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.16.50-PM-900x625.png 900w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.16.50-PM.png 1516w" sizes="(max-width: 605px) 100vw, 605px" />

Nice! We have the application containerized and running locally on our machine. Time to deploy it out into the world on a Kubernetes cluster.

## Part 3 - Deploying the Application to Kubernetes

I created a Kubernetes cluster on Google Kubernetes Engine (GKE), then I created some Kubernetes resources in a different Git repository, specifically to decouple the rainfall totals application and the deployment infrastructure. In the future I can release versions of the rainfall application or create additional applications and separately update the Kubernetes resources to deploy everything with a single command (and automate this eventually!).

First, I used the Google Cloud Shell to clone the rainfall totals application repository, build the Docker image, and push it to the Google Cloud Registry for later use.

Then, I created a Kubernetes deployment to run three replicas of the rainfall totals application:

<pre class="brush: plain; title: ; notranslate" title="">apiVersion: apps/v1
kind: Deployment
metadata:
  name: rainfall-app
spec:
  selector:
    matchLabels:
      run: rainfall-app
  replicas: 3
  template:
    metadata:
      labels:
        run: rainfall-app
    spec:
      containers:
      - name: rainfall-app
        image: gcr.io/koverholt-apps/rainfall:1.4
        ports:
        - containerPort: 5000
</pre>

And a Kubernetes Service to expose the service on a NodePort:

<pre class="brush: plain; title: ; notranslate" title="">apiVersion: v1
kind: Service
metadata:
  name: rainfall-service
  labels:
    run: rainfall-service
spec:
  ports:
  - port: 5000
    targetPort: 5000
    protocol: TCP
  type: NodePort
  selector:
    run: rainfall-app
</pre>

Finally, I created a Kubernetes Ingress resource to route various paths to specific services/applications. This will be useful for deploying additional applications in the future:

<pre class="brush: plain; title: ; notranslate" title="">apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress
  annotations:
    kubernetes.io/ingress.global-static-ip-name: "koverholt-apps-ip"
spec:
  rules:
  - http:
      paths:
      - path: /*
        backend:
          serviceName: default-service
          servicePort: 8080
      - path: /rainfall/*
        backend:
          serviceName: rainfall-service
          servicePort: 5000
</pre>

All of the Kubernetes resources live in the following GitHub repository:

<https://github.com/koverholt/koverholt-apps>

With all of these resources created, I can deploy the application, service, and ingress/load balancer to the Kubernetes cluster on GKE, either from my local machine, or using Google Cloud Shell:

<pre class="brush: bash; title: ; notranslate" title="">kubectl apply -f .
</pre>

I can view all of the Kubernetes resources on my cluster to confirm that things are up and running:

<pre class="brush: bash; title: ; notranslate" title="">$ kubectl get all
NAME                  DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deploy/default-app    2         2         2            2           13d
deploy/rainfall-app   3         3         3            3           13d

NAME                         DESIRED   CURRENT   READY     AGE
rs/default-app-65fc9f58      2         2         2         13d
rs/rainfall-app-dffbff4f8    3         3         3         12d

NAME                              READY     STATUS    RESTARTS   AGE
po/default-app-65fc9f58-6rlcl     1/1       Running   0          1d
po/default-app-65fc9f58-tmmk5     1/1       Running   0          23h
po/rainfall-app-dffbff4f8-j6cdg   1/1       Running   0          23h
po/rainfall-app-dffbff4f8-tj6mf   1/1       Running   0          23h
po/rainfall-app-dffbff4f8-z5grf   1/1       Running   0          23h

NAME                   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
svc/default-service    NodePort    10.43.243.28    <none>        8080:30289/TCP   13d
svc/kubernetes         ClusterIP   10.43.240.1     <none>        443/TCP          13d
svc/rainfall-service   NodePort    10.43.255.248   <none>        5000:30210/TCP   13d
</pre>

Looks good! The deployment, replicaset, service, and three replicate pods running for the rainfall application, a default application to serve on the bare route, and the load balancer are all up and running.

And finally, I configured a static IP address for the load balancer and a DNS A record for apps.koverholt.com to point to that static IP address.

That's it!

After the nodes pull the rainfall totals application and the load balancer is up and running, I can view the application by pointing my browser to <http://apps.koverholt.com/rainfall/>:

<img class="aligncenter size-large wp-image-2649" src="https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.29.21-PM-1024x661.png" alt="" width="605" height="391" srcset="https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.29.21-PM-1024x661.png 1024w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.29.21-PM-300x194.png 300w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.29.21-PM-768x496.png 768w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.29.21-PM-100x65.png 100w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.29.21-PM-150x97.png 150w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.29.21-PM-200x129.png 200w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.29.21-PM-450x291.png 450w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.29.21-PM-600x387.png 600w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.29.21-PM-900x581.png 900w, https://www.koverholt.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-16-at-11.29.21-PM.png 1580w" sizes="(max-width: 605px) 100vw, 605px" />

## Summary

The purpose of this post was to discuss the traditional method I used to deploy Python web applications and walk through the new container-based method of deployment. There are a lot of details around the machinery used in Docker and Kubernetes along the way, but the above steps provide a minimal working example of how this can be achieved. There are also a lot of steps that can be automated such as the image build and deployment, which I'm sure that I will address as I release more versions and additional applications.

Now, I don't need to worry about specific machines going down, maintaining multiple WSGI environments, or synchronizing Git commits to the latest production version of my application. Reproducible Docker images, load balancers, and replicas ensure that my application will stay alive as I intended without manual intervention.

I've used this rainfall totals application multiple times a day, especially since we've been getting some rain in the past couple of weeks (and it's simple and mobile friendly). I can get the information I need with one click instead of fiddling with a non-mobile map or text data.

And, most exciting, it's easy for me to release and deploy a new version of my application or new applications using this development and deployment cycle.
