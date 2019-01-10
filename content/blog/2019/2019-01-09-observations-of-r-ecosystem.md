---
title: "Observations of the R Toolchain and Ecosystem"
date: "2019-01-09"
---

For the past 10 years, I've primarily used Python as my language of choice for
data science, as well as supporting enterprise data science customers with
Python while I was working at Anaconda. I also used R in a tiny fraction of my
time, mostly for simple demos and compatibility tests, but admittedly, I knew
nothing about the applied usage of R or the ecosystem behind it.

Now that I've been working full-time in the R ecosystem at RStudio for almost
two months, I wanted to take a moment to write down some observations I've had
about the R ecosystem.

Specifically, I'd like to describe my experience with a few of the foundational
tools in the R ecosystem that I'd heard about, but never really used for any
serious day-to-day work.

You can also consider this post to be "a Python user's first impresssions of R".

## R Packages and APIs

There are currently about 13,600 R packages in
[CRAN](https://cran.r-project.org/) compared to 164,000 Python packages on
[PyPI](https://pypi.org/). My initial reaction to these numbers was that I would
be missing certain functionality that I was using in Python. However, I have not
found that I am missing any particular Python library for anything that I've
needed to do related to typical data science tasks. One area that I've been
hearing that is lacking in R is image processing, but that is not something I do
much of.

Although there are obvious differences between the R and Python APIs and syntax,
I've gotten used to it fairly quickly and appreciate the fact that objects such
as dataframes are first-class in the language without requiring a low-level
tooling stack based on numerical arrays. Most of the libraries I've used make it
easy and natural to write vectorized code as the primary workflow. And all of
the data science concepts that I'm familiar with in Python have easily
translated to R.

For the handful of scripts, apps, notebooks, and documents I've written in the
past couple of months, I've used the following libraries / APIs / functions the
most:

* [shiny](https://shiny.rstudio.com/) for interactive applications
* [rmarkdown](https://rmarkdown.rstudio.com/) and
  [knitr](https://yihui.name/knitr/) for publications and documents
* [ggplot2](https://ggplot2.tidyverse.org/) for static visualizations
* [readr](https://readr.tidyverse.org/) for loading data from various sources
* [data.frame](https://www.rdocumentation.org/packages/base/versions/3.5.2/topics/data.frame)
  and [dplyr](https://dplyr.tidyverse.org/) for working with data sets
* [data.table](http://r-datatable.com/) for working with larger data sets
* [magrittr](https://magrittr.tidyverse.org/) for building pipelines with the
  other tools
* [lubridate](https://lubridate.tidyverse.org/) for working with dates and times in data
* plumber for APIs

## R Development in the RStudio IDE

In the past, I primarily used text editors such as Atom and Sublime Text for all
of my Python work, and I sometimes used Jupyter Notebooks for interactive /
exploratory work or to save my work in Github as a record or notebook. Prior to
text editors, just over 10 years ago, most of my day-to-day work was either done
in the Matlab or Spyder IDEs.

I've been using the RStudio IDE daily for the last two months, and I have really
enjoyed working with it for a number of reasons.

First, it eases the learning curve for R by providing built-in templates for new
projects (notebooks, Shiny apps, APIs and more), code completion, views into
variables and objects, and other typical IDE functionality. Most [packages that
are supported by RStudio](https://www.rstudio.com/products/rpackages/),
including the [tidyverse](https://www.tidyverse.org/) also ease this learning
curve, which makes sense as RStudio is a major player in the tooling for data
scientists and sustainability of development efforts in the R ecosystem.

Beyond that, I feel like the RStudio IDE provides a best-practices approach and
convenient workflows to R for rapid development by providing contextual tools
and options around R Markdown rendering,  previews for plots and Shiny apps,
scheduled jobs, package management, version control, and more. In the Python
world, these are all workflows that I either depended on in the form of text
editor extensions or external tools.

To take it to the next level, integration for one-button publishing to
[shinyapps.io](http://www.shinyapps.io/) or [RStudio
Connect](https://www.rstudio.com/products/connect/), real-time rendering of
notebooks or sites in the Viewer pane, list of data sources in the Connections
pane, and the fact that the same experience can be had in a browser with RStudio
Server make the IDE a compelling development environment for my daily work.
After many years of doing these tasks the manual way, it feels natural for me to
adapt to these workflows in the IDE.

There are a few productive operations that I still prefer to perform in a text
editor that involve multiple cursors, multi-select, and bulk operations (which
the RStudio IDE does have some support for), but the benefits far outweigh those
slight inconveniences, and it is safe to say that I spend the majority of my day
in the RStudio IDE.

## Interactive Applications with Shiny

I've known about Shiny apps for many years and even used them in some demos in
products I've worked with, but I've never developed a Shiny app of my own beyond
a toy example.

After developing a handful of simple apps in the past few months (many that I
had previously developed in Python), I can easily understand all of the love for
Shiny applications and how easy it is to develop a wide range of interactive
apps even when starting with messy, prototype code. Some of the applications
I've developed as I learn are:

* https://istexasonfire.com - Map of wildland fire incidents in Texas
* https://names.koverholt.com - Search popular names
* https://rainfall.koverholt.com - Rainfall totals for central Texas

In a previous blog post about [developing and deploying applications with
Python, Docker, and Kubernetes](/blog/2018/2018-09-17-python-docker-kubernetes),
I described the data science application development and deployment approach
that I have been using for the past few years. Now, just shortly after writing
that blog post, I have quickly fallen in love with a new and very low-friction
approach for developing and deploying data science applications, and Shiny is at
the center of that pipeline.

Off the top of my head, the history of how I've developed and shared engineering
and data science "applications" from the early 2000s to the present day looks
something like:

* Sharing spreadsheets in Excel and Google Docs
* Writing and sharing Matlab scripts
* Writing Fortran code as part of a larger software project
* Running CGI scripts with Python on a web host
* Running Python scripts as cron jobs or in CI/CD pipelines
* Sharing Jupyter Notebooks and Python scripts on Github
* Building applications as Docker images
* Deploying applications to Kubernetes
* Building assets with R (Shiny apps, R Markdown documents, Plumber APIs) and
  deploying to RStudio tools

Some tools and websites that I've really enjoyed reading about regarding Shiny are:

  * https://bookdown.org/yihui/rmarkdown/
  * https://yihui.name/en/
  * https://bookdown.org/yihui/blogdown/

## Documents and Publications with R Markdown

As I've been learning about the tooling and ecosystem around R Markdown
documents, I realized that this is the most impressive part of the R toolchain
that I didn't know much about before. When I heard "R Markdown" before two
months ago, I wasn't really sure if it was much more than a different syntax for
Markdown. Now, I can see that it is quite a rich ecosystem for publishing
beautiful documents mixed with R code snippets, notebooks, visualizations, and
more in a wide range of formats.

I've always been a fan of Markdown, but my use of it was limited to
documentation and Github comments. Before Markdown, I was a heavy user of LaTeX
and wrote a number of large documents using it, including my dissertation. I
always appreciated the beautiful typesetting and output formats provided by
LaTeX, but the toolchain to write and render documents is quite dated and
cumbersome.

I also used Jupyter Notebooks (and its predecessor IPython) for interactive work
in Python, but I never really liked Jupyter Notebooks beyond a very specific use
case of intial, interactive prototyping. I can relate to many of the
frustrations in [this
talk](https://conferences.oreilly.com/jupyter/jup-ny/public/schedule/detail/68282).
I always felt like Jupyter Notebooks were not too useful for me beyond the
initial prototyping phase, and I have talked to many users who didn't really
know what the next step was in terms of making their code useful for others
beyond writing it in a notebook.

So, when I discovered what R Markdown was really about, I was immediately drawn
to it as a perfect medium for code, communication, presentation, and reports,
and I suspect it will inspire me to generate much more content than I was before
in different contexts, including websites, documentation, and anything else I've
published in the past. It seems to combine the best of all of the worlds of
Markdown, R, LaTeX, and the ability to publish documents in a wide range of
formats.

Within a short period of time, I moved my websites (including this one) that
from a self-hosted Wordpress (that I've had for about 10 years) to a static
website host with the source content stored in Github. This site is built with
[Blogdown](https://bookdown.org/yihui/blogdown/), Hugo, R Markdown and hosted on
Netlify.

It feels great to focus on the content in plain text again as opposed to
fighting with formats and plugins via a heavy frontend as well as dealing with
the ongoing maintenance and updates. And although I'm a few years late to the
static site movement, I can say that R Markdown was the tool that finally
inspired the move for me.

Some tools and websites that I've really enjoyed reading about regarding R
Markdown are:

* https://bookdown.org/yihui/rmarkdown/
* https://yihui.name/en/
* https://bookdown.org/yihui/blogdown/
* https://community.rstudio.com/t/announcing-winners-of-the-1st-bookdown-contest/16394

## Documentation and Resources

Other than the package-specific links that I provided in the previous sections,
I've also spent a good amount of time at the following resources:

https://docs.rstudio.com/ - For all things related to installing, configuring,
and using RStudio products.

http://shiny.rstudio.com/ - I end up here at least once a day to learn about apps in the sample gallery, testing Shiny apps, scaling and load testing, debugging, or other best practices beyond app development.

https://tensorflow.rstudio.com/ - I enjoy reading this site as another resource
for using Tensorflow, and I am impressed by the coverage of the APIs for
Tensorflow core and Keras. Coming from Python, this was one of the first
resources I visited to compare how things are done in the R ecosystem, and I was
impressed and not let down.

https://r4ds.had.co.nz/ - I'm working through this book and [its inline
exercises](https://github.com/koverholt/r-for-data-science) to ensure that I get
exposed to the fundamentals of R for data science as well as the best practices.

https://community.rstudio.com/ - This is a great center of activity for all
questions and discussions related to R. I was also happy to see categories such
as R Admins and Events that go beyond the mechanics of the language and deal
with issues related to infrastructure, best practices, and community events.

## The Future

In the future, I'd like to cover other topics in R such as connectivity to
Python via the [reticulate](https://rstudio.github.io/reticulate/) library,
connectivity to data sources, and community resources. And of course, make use
of more R code and snippets with this blog stack!

There are so many areas in R that I'm exploring, corners of the ecosystem for me
to learn about, and users for me to meet and talk to. And I love learning about
them through the lens of infrastructure and data science and seeing what
enterprise customers and users are doing to make data science work in production
in their organization.

After spending a couple of months working daily with the excellent RStudio
toolchain, community, and folks at RStudio, I am very comfortable and excited
being introduced to the ecosystem (if not a bit overwhelmed with all of the
awesomeness). I'm confident that the R ecosystem and community will continue to
evolve both in terms of functionality and number of data science users.

## Summary

I now have a much better appreciation why R and RStudio users cling to their
wonderful toolchain and won't accept a generic replacement or wrapper for their
day-to-day work. And I'm quickly becoming one of those people as I've been using
RStudio IDE, Shiny, and R Markdown more intentionally.

One thing I've noticed first-hand, which is fairly obvious given the history of
the R language, is that the statistical libraries in R are quite extensive and
deep. But what was more surprising to me was the depth, maturity, and adoption
of the other areas of the ecosystem such as interactive apps and document
publishing.

One way to think about the use of Python and R in data science is summarized in
a comparison I keep hearing: computer science majors are trained to use Python,
whereas statistical majors are trained to use R.

That leaves engineers like myself somewhere in the middle, but in all honesty
they are both awesome languages and ecosystems, and I know that they are both
valuable tools for a data scientist to use in their day-to-day work. So here's
to more data scientists becoming bilingual and speaking both R and Python, there
are plenty

And I look forward to diving head first into the R community and ecosystem next
week at [rstudio::conf](https://www.rstudio.com/conference/) in Austin, TX.
