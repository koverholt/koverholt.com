var input = {};
Algorithmia.client("sim/K4CBh725TCpkNX1jsyT/Evw1")
  .algo("koverholt/texas_exes_events/0.1.2?timeout=300")
  .pipe(input)
  .then(function(output) {
    var obj = output.result;
    var event_counts = obj["event_counts"];
    var fetch_date = obj["fetch_date"];

  var app = new Vue({
    el: '#app',
    data: {
      event_counts: event_counts,
      fetch_date: fetch_date,
    }
  })

});
