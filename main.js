/*
 *
 * This is the server code for my smart home project.
 * Please don't make major changes without my permission!
 * By Dušan Simić
 * 
 */

// loading config
const config = require('./modules/config.json');
var lampIP = config.sendTools.lampServer.address;

// creating app and server
const express = require('express');
const app = express();

const api_router = express.Router();
const web_router = express.Router();

const server = require('http').createServer(app);
const web_io = require('socket.io')(server);

// i've made this module for saving data to database file
// plase be careful when you edit that code
const dbTools = require('./modules/dbtools.js');
const sendTools = require('./modules/sendtools.js');

// api code

api_router.get('/check', (req, res) => {
  res.send({active: true});
});

/*
 * very important part!!!
 * this code is for getting data from clients
 * edit with caution
 */

api_router.get('/new-data', (req, res) => {
  var ok = true;
  // if you get temperature
  if (req.query.temperature !== undefined) {
    if (!ok) dbTools.saveTemperature(req.query.humidity, web_io);
    else ok = dbTools.saveTemperature(req.query.temperature, web_io);
  }
  // if you get humidity
  if (req.query.humidity !== undefined) {
    if (!ok) dbTools.saveHumidity(req.query.humidity, web_io);
    else ok = dbTools.saveHumidity(req.query.humidity, web_io);
  }
  // if you get light
  if (req.query.light !== undefined) {
    if (!ok) dbTools.saveLight(req.query.light, web_io);
    else ok = dbTools.saveLight(req.query.light, web_io);
  }
  // if you get button
  if (req.query.button !== undefined) {
    if (!ok) dbTools.saveButton(req.query.button, web_io);
    else ok = dbTools.saveButton(req.query.button, web_io);
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

api_router.get('/get-data', (req, res) => {
  dbTools.getAll((err, obj) => {
    if (!err) res.send(obj);
    else res.status(500).send('Could not get data!');
  });
});

api_router.get('/lamp-ip', (req, res) => {
  lampIP = req.query.ip;
  res.send('Got the lamp ip!');
});


// including website dir public

web_router.use(express.static('public'));

// server code

app.use('/api', api_router);
app.use('/', web_router);

server.listen(config.server.port, '0.0.0.0', () => {
  console.log('listening *:' + config.server.port);
});

// socket.io code

web_io.on('connection', (socket) => {
  socket.on('get temperature', () => {
    let temperature = dbTools.getTemperature();
    socket.emit('new temperature', temperature);
  });

  socket.on('get humidity', () => {
    let humidity = dbTools.getHumidity();
    socket.emit('new humidity', humidity);
  });

  socket.on('get light', () => {
    let light = dbTools.getLight();
    socket.emit('new light', light);
  });
  socket.on('get button', () => {
    let button = dbTools.getButton();
    socket.emit('new button', button);
  });
  socket.on('set lamp', (state) => {
    if(dbTools.saveLamp(state, web_io)) {
      sendTools.sendToLamp(state, lampIP);
    }
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
