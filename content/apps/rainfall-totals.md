---
title: "Central Texas Rainfall Totals"
---

<link rel="stylesheet" type="text/css" href="/css/rainfall-totals.css">
<script src="/js/rainfall-totals.js"></script>

<div id="app">
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center">
        <h1 class="mt-5">Central Texas Rainfall Totals</h1>
        <p class="lead">Shows the most recent rainfall totals from the "Marble Falls 4 WSW" rainfall gauge site.</p>
        <ul class="list-unstyled">
          <li>Data from <a href="https://hydromet.lcra.org/">LCRA Hydromet</a>.</li>
        </ul>
        <div class="alert alert-warning text-center" role="alert" class="mx-auto" v-if="five_day_total === 0" v-cloak>
          No rainfall in the past five days 😭
        </div>
        <div id="chart" style="width: 60vw; height: 60vh;"></div>
      </div>
    </div>
  </div>
</div>
