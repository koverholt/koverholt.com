var input = {"site": 2959};
Algorithmia.client("simNv7chjBG6IS1nPZ9ocby/kEw1")
  .algo("koverholt/rainfall_totals/0.4.0?timeout=300")
  .pipe(input)
  .then(function(output) {
    var obj = JSON.parse(output.result)
    var previous_1_hour = obj["Previous 1 hour"]
    var previous_3_hours = obj["Previous 3 hours"]
    var previous_6_hours = obj["Previous 6 hours"]
    var previous_24_hours = obj["Previous 24 hours"]
    var since_midnight = obj["Since midnight"]
    var one_day_ago = obj["1 day ago"]
    var two_days_ago = obj["2 days ago"]
    var three_days_ago = obj["3 days ago"]
    var four_days_ago = obj["4 days ago"]
    var five_day_total = obj["5 day total"]

  var app = new Vue({
    el: '#app',
    data: {
      five_day_total: five_day_total,
    }
  })

  var xValue = ["Previous 1 hour", "Previous 3 hours", "Previous 6 hours", "Previous 24 hours", "Since midnight", "1 day ago", "2 days ago", "3 days ago", "4 days ago", "5 day total"]
  var yValue = [previous_1_hour, previous_3_hours, previous_6_hours, previous_24_hours, since_midnight, one_day_ago, two_days_ago, three_days_ago, four_days_ago, five_day_total]
  var maxYValue = Math.max(...yValue)

	var data = [
    {
      x: xValue,
      y: yValue,
      type: 'bar',
      text: yValue.map(String),
      textposition: 'outside',
    }
  ];

  var layout = {
    yaxis: {range: [0, maxYValue + 0.5]},
  };

  var config = {
    'displayModeBar': false
  };

  Plotly.newPlot('chart', data, layout, config);

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
          data: [previous_1_hour]
      }, {
          name: 'Previous 3 hours',
          data: [previous_3_hours]
      }, {
          name: 'Previous 6 hours',
          data: [previous_6_hours]
      }, {
          name: 'Previous 24 hours',
          data: [previous_24_hours]
      }, {
          name: 'Since midnight',
          data: [since_midnight]
      }, {
          name: '1 day ago',
          data: [one_day_ago]
      }, {
          name: '2 days ago',
          data: [two_days_ago]
      }, {
          name: '3 days ago',
          data: [three_days_ago]
      }, {
          name: '4 days ago',
          data: [four_days_ago]
      }, {
          name: '5 day total',
          data: [five_day_total]
      }]
  });

  })
