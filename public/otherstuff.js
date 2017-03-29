jQuery.fn.center = function(parent) {
  if (parent) {
      parent = this.parent();
  } else {
      parent = window;
  }
  this.css({
      "position": "absolute",
      "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
      "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
  });
  return this;
}

var options = {
    scales: {
        xAxes: [{
            type: 'linear',
            position: 'bottom'
        }]
    }
};
var options_noanimations = {
    animation: false,
    scales: {
        xAxes: [{
            type: 'linear',
            position: 'bottom'
        }]
    }
};

var updateTemperatureGraph = function(new_data) {
    $('#temperature-graph').remove();
    $('#temperature-graph-container').append('<canvas id="temperature-graph" width="100px" height="20px"></canvas>');
    var new_index = temperature_data.datasets[0].data.length;
    temperature_data.datasets[0].data.push({x: new_index, y: new_data});
    temperature_chart_chartjs = new Chart($("#temperature-graph"), {
        type: 'line',
        data: temperature_data,
        options: options_noanimations
    });
};

var updateHumidityGraph = function(new_data) {
    $('#humidity-graph').remove();
    $('#humidity-graph-container').append('<canvas id="humidity-graph" width="100px" height="20px"></canvas>');
    var new_index = humidity_data.datasets[0].data.length;
    humidity_data.datasets[0].data.push({x: new_index, y: new_data});
    humidity_chart_chartjs = new Chart($("#humidity-graph"), {
        type: 'line',
        data: humidity_data,
        options: options_noanimations
    });
}

// making graphs

var temperature_data = {
    datasets: [{
        label: "Temperature",
        data: []
    }]
};

var humidity_data = {
    datasets: [{
        label: "Humidity",
        data: []
    }]
};

