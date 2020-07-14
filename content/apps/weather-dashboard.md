---
title: "Weather Dashboard"
---

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://algorithmia.com/v1/clients/js/algorithmia-0.2.1.js" type="text/javascript"></script>

<link rel="stylesheet" type="text/css" href="/css/weather-dashboard.css">
<script src="/js/weather-dashboard.js"></script>

<div class="container" id="app">

  <!-- Non-mobile screens -->
  <div class="row d-none d-sm-block">
    <div class="container">
      <div class="row">
        <div class="col text-center text-white bg-danger rounded m-1 p-3">
          <h5>
            {{ current_temperature }} °F ({{ current_apparent_temperature }} °F)
          </h5>
          <p>Current Temperature</p>
          <div class="icon"><i class="fas fa-thermometer-three-quarters"></i></div>
        </div>
        <div class="col text-center text-white bg-success rounded m-1 p-3">
          <h5>{{ current_humidity }}%</h5>
          <p>Current Humidity</p>
          <div class="icon d-none d-sm-block"><i class="fas fa-tint"></i></div>
        </div>
        <div class="col text-center text-white bg-secondary rounded m-1 p-3">
          <h5>{{ current_wind_speed }} mph</h5>
          <p>Current Wind Speed</p>
          <div class="icon d-none d-sm-block"><i class="fas fa-wind"></i></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile screens -->
  <div class="row d-block d-sm-none">
    <div class="container">
      <div class="row">
        <div class="col text-center text-white bg-danger rounded m-1 p-3">
          <h5>
            {{ current_temperature }} °F
            <br />
            ({{ current_apparent_temperature }} °F)
          </h5>
          <p>Temperature</p>
        </div>
        <div class="col text-center text-white bg-info rounded m-1 p-3">
          <h5>{{ current_humidity }}%</h5>
          <br />
          <p>Humidity</p>
          <div class="icon d-none d-sm-block"><i class="fas fa-tint"></i></div>
        </div>
        <div class="col text-center text-white bg-success rounded m-1 p-3">
          <h5>{{ current_wind_speed }} mph</h5>
          <br />
          <p>Wind</p>
          <div class="icon d-none d-sm-block"><i class="fas fa-wind"></i></div>
        </div>
      </div>
    </div>
  </div>

</div>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
