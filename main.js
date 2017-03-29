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
  // if you get temperature
  if (req.query.temperature) {
    var newTemperature = req.query.temperature;
    jsonfile.readFile(database, function(err, obj) {
      if (!err) {
        obj.temperature = newTemperature;
        web_io.emit('new temperature', obj.temperature);
        jsonfile.writeFile(database, obj, function(err) {
          if (err) {
            console.error('[api] ' + err);
            res.send('not ok: ' + err);
          }
        });
      } else {
        console.error('[api] ' + err);
        res.send('not ok: ' + err);
      }
    });
  }
  // if you get humidity
  if (req.query.humidity) {
    var newHumidity = req.query.humidity;
    jsonfile.readFile(database, function(err, obj) {
      if (!err) {
        obj.humidity = newHumidity;
        web_io.emit('new humidity', obj.humidity);
        jsonfile.writeFile(database, obj, function(err) {
          if (err) {
            console.error('[api] ' + err);
            res.send('not ok: ' + err);
          }
        });
      } else {
        console.error('[api] ' + err);
        res.send('not ok: ' + err);
      }
    });
  }
  // if you get light
  if (req.query.light) {
    var newLight = req.query.light;
    jsonfile.readFile(database, function(err, obj) {
      if (!err) {
        obj.light = newLight;
        web_io.emit('new light', obj.light);
        jsonfile.writeFile(database, obj, function(err) {
          if (err) {
            console.error('[api] ' + err);
            res.send('not ok: ' + err);
          }
        });
      } else {
        console.error('[api] ' + err);
        res.send('not ok: ' + err);
      }
    });
  }
  // if you get button
  if (req.query.button !== undefined) {
    var newButton = req.query.button;
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.button = newButton;
        web_io.emit('new button', obj.button);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api]' + err);
            res.send('not ok: ' + err);
          }
        });
      } else {
        console.error('[api] ' + err);
        res.send('not ok: ', err);
      }
    });
  }
  res.send('ok');
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
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        socket.emit('new temperature', obj.temperature);
      } else {
        console.error('[web] ' + err);
      }
    });
  });

  socket.on('get humidity', function() {
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        socket.emit('new humidity', obj.humidity);
      } else {
        console.error('[web] ' + err);
      }
    });
  });

  socket.on('get light', function() {
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        socket.emit('new light', obj.light);
      } else {
        console.error('[web] ' + err);
      }
    });
  });
  socket.on('get button', function() {
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        socket.emit('new button', obj.button);
      } else {
        console.error('[web] ' + err);
      }
    });
  });
});
