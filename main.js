/*
 *
 * This is the server code for my smart home project.
 * Please don't make major changes without my permission!
 * By Dušan Simić
 * 
 */


// creating app
var express = require('express');
var app = express();

// creating routers for api and web server
var api_router = express.Router();
var web_router = express.Router();

// creating server
var server = require('http').createServer(app);
var web_io = require('socket.io')(server);

// i've made this module for saving data to database file
// plase be careful when you edit that code
const dbtools = require('./modules/dbtools.js');

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
    if (!ok) dbtools.saveTemperature(req.query.humidity, web_io);
    else ok = dbtools.saveTemperature(req.query.temperature, web_io);
  }
  // if you get humidity
  if (req.query.humidity !== undefined) {
    if (!ok) dbtools.saveHumidity(req.query.humidity, web_io);
    else ok = dbtools.saveHumidity(req.query.humidity, web_io);
  }
  // if you get light
  if (req.query.light !== undefined) {
    if (!ok) dbtools.saveLight(req.query.light, web_io);
    else ok = dbtools.saveLight(req.query.light, web_io);
  }
  // if you get button
  if (req.query.button !== undefined) {
    if (!ok) dbtools.saveButton(req.query.button, web_io);
    else ok = dbtools.saveButton(req.query.button, web_io);
  }
  // if you get distance
  /*
  if (req.query.distance !== undefined) {
    var newDistance = req.query.distance;
    jsonfile.readFile(database, function(err, obj) {
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
    });
  }
  */
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
    let temperature = dbtools.getTemperature();
    socket.emit('new temperature', temperature);
  });

  socket.on('get humidity', function() {
    let humidity = dbtools.getHumidity();
    socket.emit('new humidity', humidity);
  });

  socket.on('get light', function() {
    let light = dbtools.getLight();
    socket.emit('new light', light);
  });
  socket.on('get button', function() {
    let button = dbtools.getButton();
    socket.emit('new button', button);
  });
  /*socket.on('get distance', function() {
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        socket.emit('new distance', obj.distance);
      } else {
        console.error('[web] ' + err);
      }
    });
  });*/
});
