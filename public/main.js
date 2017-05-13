var socket = io();

var app = new Vue({
  el: '#app',
  data: {
    temperature: '',
    humidity: '',
    light: '',
    button: '',
    buttonState: 0,
    distance: ''
  }
});

// init graphs

/*var light_chart = new Highcharts.Chart({
  chart: {
    renderTo: 'light-chart',
    type: 'line'
  },
  title: {
    text: 'Light graph'
  },
  series: [{
    name: 'Light',
    data: []
  }]
});*/

var temp_hum_chart = new Highcharts.Chart({
  chart: {
    renderTo: 'temp-hum-chart',
    type: 'line'
  },
  title: {
    text: 'Sensor data'
  },
  series: [{
    name: 'Temperature',
    data: []
  }, {
    name: 'Humidity',
    data: []
  }]
});


$(document).ready(() => {

  $('#light-bulb-container').click(() => {
    if (app.buttonState) app.buttonState = 0;
    else app.buttonState = 1;
    socket.emit('set lamp', app.buttonState);
  });

});

socket.on('connected', () => {
  socket.emit('get temperature');
  socket.emit('get humidity');
  socket.emit('get light');
  socket.emit('get button');
  socket.emit('get lamp');
  socket.emit('get distance');

});



socket.on('new temperature', (temperature) => {
  app.temperature = temperature;
  updateTemperatureGraph(temperature);
});

socket.on('new humidity', (humidity) => {
  app.humidity = humidity;
  updateHumidityGraph(humidity);
});

socket.on('new light', (light) => {
  if (light < 256) {
    app.light = 'it\'s too dark';
  } else if (light < 768) {
    app.light = 'it\'s ok';
  } else {
    app.light = 'it\'s too bright';
  }
});

socket.on('new distance', (distance) => {
  app.distance = distance;
});

socket.on('new button', (button) => {
  app.button = button;
  if (app.buttonState !== app.button) {
    app.buttonState = 1;
    $('#light-bulb-glass').css('background-color', 'yellow');
  } else if (app.buttonState === app.button) {
    app.buttonState = 0;
    $('#light-bulb-glass').css('background-color', 'black');
  }
  socket.emit('set lamp', app.buttonState);
});

socket.on('new lamp', (lamp) => {
  app.buttonState = lamp;
  if (app.buttonState) $('#light-bulb-glass').css('background-color', 'yellow');
  else $('#light-bulb-glass').css('background-color', 'black');
})