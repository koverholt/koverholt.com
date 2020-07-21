/*
 URL parameters
*/

var param = new Vue({
  created()
  {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    window.value = params.get("name");
  },
});

/*
 Query
*/

var input_name = window.value || "Kristopher"

var input = {"name": input_name};
Algorithmia.client("simlkeLskhCPWY3nI+xq75thdMy1")
  .algo("koverholt/popular_names/0.2.2?timeout=300")
  .pipe(input)
  .then(function(output) {
    var obj = output.result;
    var input_name = obj["input_name"];
    var formatted_name_sum = obj["formatted_name_sum"];
    var top_year = obj["top_year"];
    var female_count = obj["female_count"];
    var female_year = obj["female_year"];
    var male_count = obj["male_count"];
    var male_year = obj["male_year"];

  var app = new Vue({
    el: "#app",
    data: {
      input_name: input_name,
      formatted_name_sum: formatted_name_sum,
      top_year: top_year,
    }
  })

  var trace1 = {
    x: male_year,
    y: male_count,
    name: "Male",
    type: "bar"
  };

  var trace2 = {
    x: female_year,
    y: female_count,
    name: "Female",
    type: "bar"
  };

  var data = [trace1, trace2];

  var layout = {barmode: "stack"};

  Plotly.newPlot("chart", data, layout);

});
