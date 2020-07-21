---
title: "Weather Dashboard"
---

<link rel="stylesheet" type="text/css" href="/css/weather-dashboard.css">
<script src="/js/weather-dashboard.js"></script>

<nav class="navbar navbar-dark bg-dark">
  <!-- Non-mobile screens -->
  <a class="navbar-brand text-truncate d-none d-sm-block" href="/apps/weather-dashboard/">
    <i class="fas fa-cloud-sun"></i>
    Weather Dashboard
  </a>
  <!-- Mobile screens -->
  <a class="navbar-brand d-block d-sm-none" href="/apps/weather-dashboard/">
    <i class="fas fa-cloud-sun"></i>
    Weather Dashboard
    <br />
  </a>
  <div class="form-inline">
    <form class="my-2 my-lg-0" action="/apps/weather-dashboard/" method="GET">
      <input class="form-control mr-sm-2" type="search" id="location" name="location" placeholder="Location" aria-label="Search">
      <button class="btn btn-outline-light my-2 my-sm-0 mr-2" type="submit">Go</button>
        <button class="btn btn-outline-light my-2 my-sm-0" onclick="getLocation();" type="button">
          <i class="fas fa-location-arrow"></i>
        </button>
    </form>
  </div>
</nav>

<div class="container" id="app">

  <div class="row">
    &nbsp;
  </div>

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

  <!-- <div class="row">
    <div id="container" style="width:100%; height:70vh"></div>
  </div> -->

</div>