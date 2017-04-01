// creating app
var express = require('express');
var app = express();

// creating routers for api and web server
var api_router = express.Router();
var web_router = express.Router();

// creating server
var server = require('http').Server(app);
var web_io = require('socket.io')(server);

var jsonfile = require('jsonfile');

var database = 'data/database.json';

var data = {};

// === api code ===

api_router.get('/check', function(req, res) {
  res.send({active: true});
});

/*
 * very important part!!!
 * this code is for getting data from clients
 * edit with caution
 */

api_router.get('/new-data', function(req, res) {
  var ok = true;
  // if you get temperature
  if (req.query.temperature !== undefined) {
    var newTemperature = req.query.temperature;
    /*jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.temperature = newTemperature;
        web_io.emit('new temperature', obj.temperature);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api] ' + err);
            ok = false;
          }
        });
      } else {
        console.error('[api] ' + err);
        console.log('haa');
        ok = false;
      }
    });*/
    data.temperature = newTemperature;
    web_io.emit('new temperature', newTemperature);
  }
  // if you get humidity
  if (req.query.humidity !== undefined) {
    var newHumidity = req.query.humidity;
    /*jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.humidity = newHumidity;
        web_io.emit('new humidity', obj.humidity);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api] ' + err);
            console.log('hoo');
            ok = false;
          }
        });
      } else {
        console.error('[api] ' + err);
        console.log('hee');
        ok = false;
      }
    });*/
    data.humidity = newHumidity;
    web_io.emit('new humidity', newHumidity);
  }
  // if you get light
  if (req.query.light !== undefined) {
    var newLight = req.query.light;
    /*jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.light = newLight;
        web_io.emit('new light', obj.light);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api] ' + err);
            ok = false;
          }
        });
      } else {
        console.error('[api] ' + err);
        ok = false;
      }
    });*/
    data.light = newLight;
    web_io.emit('new light', newLight);
  }
  // if you get button
  if (req.query.button !== undefined) {
    var newButton = req.query.button;
    /*jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.button = newButton;
        web_io.emit('new button', obj.button);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api] ' + err);
            ok = false;
          }
        });
      } else {
        console.error('[api] ' + err);
        ok = false;
      }
    });*/
    data.button = newButton;
    web_io.emit('new button', newButton);
  }
  // if you get distance
  if (req.query.distance !== undefined) {
    var newDistance = req.query.distance;
    /*jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.distance = newDistance;
        web_io.emit('new distance', obj.distance);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api] ' + err);
            ok = false;
          }
        });
      } else {
        console.error('[api] ' + err);
        ok = false;
      }
    });*/
    data.distance = newDistance;
    web_io.emit('new distance', newDistance);
  }
  if (ok)
    res.send('ok');
  else
    res.send('not ok');
});


// === web code ===

web_router.use(express.static('public'));

// === server code ===

app.use('/api', api_router);
app.use('/', web_router);

server.listen(3000, '0.0.0.0', function() {
  console.log('listening *:3000');
});

// === socket.io code ===

web_io.on('connection', function(socket) {
  socket.on('get temperature', function() {
    /*jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        socket.emit('new temperature', obj.temperature);
      } else {
        console.error('[web] ' + err);
      }
    });*/
    socket.emit('new temperature', data.temperature);
  });

  socket.on('get humidity', function() {
    /*jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        socket.emit('new humidity', obj.humidity);
      } else {
        console.error('[web] ' + err);
      }
    });*/
    socket.emit('new humidity', data.humidity);
  });

  socket.on('get light', function() {
    /*jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        socket.emit('new light', obj.light);
      } else {
        console.error('[web] ' + err);
      }
    });*/
    socket.emit('new light', data.light);
  });
  socket.on('get button', function() {
    /*jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        socket.emit('new button', obj.button);
      } else {
        console.error('[web] ' + err);
      }
    });*/
    socket.emit('new button', data.button);
  });
  socket.on('get distance', function() {
    /*jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        socket.emit('new distance', obj.distance);
      } else {
        console.error('[web] ' + err);
      }
    });*/
    socket.emit('new distance', data.distance);
  })
});
