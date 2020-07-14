---
title: "Weather Dashboard"
---

<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://algorithmia.com/v1/clients/js/algorithmia-0.2.1.js" type="text/javascript"></script>

<link rel="stylesheet" type="text/css" href="/css/weather-dashboard.css">
<script src="/js/weather-dashboard.js"></script>

<div id="app">
  <h3>Current Temperature: {{ current_temperature }}</h3>
  <h3>Current Humidity: {{ current_humidity }}</h3>
  <h3>Current Wind Speed: {{ current_wind_speed }}</h3>
</div>
