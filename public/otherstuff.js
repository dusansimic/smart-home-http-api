jQuery.fn.center = (parent) => {
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

// this is code for graphs
/*
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

var updateTemperatureGraph = (new_data) => {
    $('#temperature-graph').remove();
    $('#temperature-graph-container').append('<canvas id="temperature-graph" width="100px" height="20px"></canvas>');
    var d = new Date();
    var new_index = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    temperature_data.datasets[0].data.push(new_data);
    temperature_data.labels.push(new_index);
    if (temperature_data.datasets[0].data.length > 50) {
        temperature_data.datasets[0].data.splice(0, 1);
        temperature_data.labels.splice(0, 1);
    }
    temperature_chart_chartjs = new Chart($("#temperature-graph"), {
        type: 'line',
        data: temperature_data,
        options: options_noanimations
    });
};

var updateHumidityGraph = (new_data) => {
    $('#humidity-graph').remove();
    $('#humidity-graph-container').append('<canvas id="humidity-graph" width="100px" height="20px"></canvas>');
    var d = new Date();
    var new_index = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    humidity_data.datasets[0].data.push(new_data);
    humidity_data.labels.push(new_index);
    if (humidity_data.datasets[0].data.length > 50) {
        humidity_data.datasets[0].data.splice(0, 1);
        humidity_data.labels.splice(0, 1);
    }
    humidity_chart_chartjs = new Chart($("#humidity-graph"), {
        type: 'line',
        data: humidity_data,
        options: options_noanimations
    });
}*/

/*const updateLightGraph = (light) => {
    const serier = light_chart.series[0],
          shift = series.data.length > 20;
    light_chart.series[0].addPoint(light, true, shift);
}*/

const updateTemperatureGraph = (temperature) => {
    const series = temp_hum_chart.series[0],
          shift = series.data.length > 20;
    temp_hum_chart.series[0].addPoint(temperature, true, shift);
};

const updateHumidityGraph = (humidity) => {
    const series = temp_hum_chart.series[1],
          shift = series.data.length > 20;
    
    temp_hum_chart.series[1].addPoint(humidity, true, shift);
}