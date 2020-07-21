---
title: "Popular Names"
---

<link rel="stylesheet" type="text/css" href="/css/popular-names.css">
<script src="/js/popular-names.js"></script>

<h1>Search Name Popularity</h1>

<h4>Enter a name to view its popularity over time:</h4>

<form action="/apps/popular-names/" method="GET">
  <input type="search" name="name" placeholder="Name">
  <button type="submit">Go</button>
</form>

<div id="app">
  <h4>The total number of people named {{ input_name }} is {{ formatted_name_sum }}</h4>
  <h4>The most popular year for the name {{ input_name }} was {{ top_year }}</h4>
</div>

<div id="chart"></div>
