---
title: "Central Texas Rainfall Totals"
---

<script src="https://algorithmia.com/v1/clients/js/algorithmia-0.2.1.js" type="text/javascript"></script>

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>

<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        Shows the most recent rainfall totals from the "Marble Falls 4 WSW" rainfall gauge site.
        Data from <a href="https://hydromet.lcra.org/">LCRA Hydromet</a>.
    </p>
</figure>

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

    var previous1Hour = obj["Previous 1 hour"];
    var previous3Hours = obj["Previous 3 hours"];
    var previous5Hours = obj["Previous 6 hours"];
    var previous24Hours = obj["Previous 24 hours"];
    var sinceMidnight = obj["Since midnight"];
    var oneDayAgo = obj["1 day ago"];
    var twoDaysAgo = obj["2 days ago"];
    var threeDaysAgo = obj["3 days ago"];
    var fourDaysAgo = obj["4 days ago"];
    var fiveDayTotal = obj["5 day total"];

    Highcharts.chart('container', {
        chart: {
            type: 'column',
        },
        title: {
            text: '',
        },
        credits: {
          enabled: false,
        },
        xAxis: {
            crosshair: true,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (in)',
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.2f} in</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Previous 1 hour',
            data: [previous1Hour]
        }, {
            name: 'Previous 3 hours',
            data: [previous3Hours]
        }, {
            name: 'Previous 6 hours',
            data: [previous5Hours]
        }, {
            name: 'Previous 24 hours',
            data: [previous24Hours]
        }, {
            name: 'Since midnight',
            data: [sinceMidnight]
        }, {
            name: '1 day ago',
            data: [oneDayAgo]
        }, {
            name: '2 days ago',
            data: [twoDaysAgo]
        }, {
            name: '3 days ago',
            data: [threeDaysAgo]
        }, {
            name: '4 days ago',
            data: [fourDaysAgo]  
        }, {
            name: '5 day total',
            data: [fiveDayTotal]
        }]
    });
  });
</script>

<style>
.highcharts-figure, .highcharts-data-table table {
    min-width: 310px;
    max-width: 800px;
    margin: 1em auto;
}

#container {
    height: 400px;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}

</style>
