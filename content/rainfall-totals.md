---
title: "Rainfall Totals"
---

<script src="https://algorithmia.com/v1/clients/js/algorithmia-0.2.1.js" type="text/javascript"></script>

<script>
var input = {"site": 2959};
Algorithmia.client("simNv7chjBG6IS1nPZ9ocby/kEw1")
  .algo("koverholt/rainfall_totals/0.4.0?timeout=300")
  .pipe(input)
  .then(function(output) {
    document.getElementById("site").innerHTML = input.site;
    var obj = JSON.parse(output.result)
    document.getElementById("previous_1_hour").innerHTML = obj["Previous 1 hour"];
    document.getElementById("previous_3_hours").innerHTML = obj["Previous 3 hours"];
    document.getElementById("previous_6_hours").innerHTML = obj["Previous 6 hours"];
    document.getElementById("previous_24_hours").innerHTML = obj["Previous 24 hours"];
    document.getElementById("since_midnight").innerHTML = obj["Since midnight"];
    document.getElementById("1_day_ago").innerHTML = obj["1 day ago"];
    document.getElementById("2_days_ago").innerHTML = obj["2 days ago"];
    document.getElementById("3_days_ago").innerHTML = obj["3 days ago"];
    document.getElementById("4_days_ago").innerHTML = obj["4 days ago"];
    document.getElementById("5_day_total").innerHTML = obj["5 day total"];
  });
</script>

<h3>Site ID: <span id="site"></span></h3>

<h3>Previous 1 hour: <span id="previous_1_hour"></span></h3>
<h3>Previous 3 hours: <span id="previous_3_hours"></span></h3>
<h3>Previous 6 hours: <span id="previous_6_hours"></span></h3>
<h3>Previous 24 hours: <span id="previous_24_hours"></span></h3>
<h3>Since midnight: <span id="since_midnight"></span></h3>
<h3>1 day ago: <span id="1_day_ago"></span></h3>
<h3>2 days ago: <span id="2_days_ago"></span></h3>
<h3>3 days ago: <span id="3_days_ago"></span></h3>
<h3>4 days ago: <span id="4_days_ago"></span></h3>
<h3>5 day total: <span id="5_day_total"></span></h3>
