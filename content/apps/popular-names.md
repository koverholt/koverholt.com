---
title: "Popular Names"
---

<link rel="stylesheet" type="text/css" href="/css/popular-names.css">
<script src="/js/popular-names.js"></script>

<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
  <header class="masthead mb-auto">
    <div class="inner">
      <h3 class="masthead-brand">Historical Name Popularity</h3>
      <nav class="nav nav-masthead justify-content-center">
        <form action="/apps/popular-names/" method="GET">
          <input class="form-control" type="search" name="name" placeholder="Enter a name">
        </form>
      </nav>
    </div>
  </header>

  <main role="main" class="inner cover">

  <div id="app">
    <h4>There have been {{ formatted_name_sum }} people named {{ input_name }}</h4>
    <br>
    <h4>{{ input_name }}'s most popular year was {{ top_year }}</h4>
  </div>
  <br>
  <div id="chart"></div>
  </main>

  <footer class="mastfoot mt-auto">
    <div class="inner">
    </div>
  </footer>
</div>
