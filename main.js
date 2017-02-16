// creating api server
var api_express = require('express');
var api_app = api_express();

// creating web server
var web_express = require('express');
var web_app = web_express();
var web_server = require('http').Server(web_app);
var web_io = require('socket.io')(web_server);

var jsonfile = require('jsonfile');

var database = 'data/database.json';

// === api code ===

api_app.get('/new-data', function(req, res) {
  if (req.query.temperature !== undefined) {
    var newTemperature = req.query.temperature;
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.temperature = newTemperature;
        web_io.emit('new temperature', obj.temperature);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
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
  if (req.query.light !== undefined) {
    var newLight = req.query.light;
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.light = newLight;
        web_io.emit('new light', obj.light);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
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
  res.send('ok');
});

api_app.listen(3003, '0.0.0.0', function() {
  console.log('listening api *:3003');
});


// === web code ===

web_app.use(web_express.static('public'));

web_server.listen(3000, '0.0.0.0', function() {
  console.log('listening web *:3000');
});

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

  socket.on('get light', function() {
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        socket.emit('new light', obj.light);
      } else {
        console.error('[web] ' + err);
      }
    });
  });
});
