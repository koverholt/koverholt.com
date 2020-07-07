---
title: "Central Texas Rainfall Totals"
---

<script src="https://algorithmia.com/v1/clients/js/algorithmia-0.2.1.js" type="text/javascript"></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
<link rel="stylesheet" type="text/css" href="/css/rainfall-totals.css">

<figure class="highcharts-figure">
  <div id="container"></div>
  <p class="highcharts-description">
    Shows the most recent rainfall totals from the "Marble Falls 4 WSW" rainfall gauge site.
    Data from <a href="https://hydromet.lcra.org/">LCRA Hydromet</a>.
  </p>
</figure>

<div id="app">
  <h3>Site ID: {{ site_id }} </h3>
  <h3>Previous 1 hour: {{ previous_1_hour }}</h3>
  <h3>Previous 3 hours: {{ previous_3_hours }}</h3>
  <h3>Previous 6 hours: {{ previous_6_hours }}</h3>
  <h3>Previous 24 hours: {{ previous_24_hours }}</h3>
  <h3>Since midnight: {{ since_midnight }}</h3>
  <h3>1 day ago: {{ one_day_ago }}</h3>
  <h3>2 days ago: {{ two_days_ago }}</h3>
  <h3>3 days ago: {{ three_days_ago }}</h3>
  <h3>4 days ago: {{ four_days_ago }}</h3>
  <h3>5 day total: {{ five_day_total }}</h3>
</div>

<script src="/js/rainfall-totals.js"></script>
