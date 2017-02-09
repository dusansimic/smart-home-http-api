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

api_app.get('/new-temperature', function(req, res) {
  var newTemperature = req.query.temperature;
  jsonfile.readFile(database, function(err, obj) {
    if (err === null) {
      obj.temperature = newTemperature;
      jsonfile.writeFile(database, obj, function(err) {
        if (err !== null) {
          console.error('[api] ' + err);
          res.send('not ok: ' + err);
        } else {
          res.send('ok');
        }
      });
    } else {
      console.error('[api] ' + err);
      res.send('not ok: ' + err);
    }
  });
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
        socket.emit('new temperature', err);
      }
    });
  });
});
