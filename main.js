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
const tools = require('./modules/tools.js');

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
    dbTools.saveData('temperature', req.query.temperature)
      .then(data => {
        web_io.emit('new temperature', data);
      })
      .catch(err => {
        console.error(err);
        ok = false;
      });
  }
  // if you get humidity
  if (req.query.humidity !== undefined) {
    dbTools.saveData('humidity', req.query.humidity)
      .then(data => {
        web_io.emit('new humidity', data);
      })
      .catch(err => {
        console.error(err);
        ok = false;
      })
  }
  // if you get light
  if (req.query.light !== undefined) {
    dbTools.saveData('light', req.query.light)
      .then(data => {
        web_io.emit('new light', data);
      })
      .catch(err => {
        console.error(err);
        ok = false;
      });
  }
  // if you get button
  if (req.query.button !== undefined) {
    dbTools.saveData('button', req.query.button)
      .then(data => {
        web_io.emit('new button', data);
      })
      .catch(err => {
        console.error(err);
        ok = false;
      });
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
    res.status(500).send('not ok');
});

api_router.get('/get-data', (req, res) => {
  dbTools.getData('all')
    .then(obj => {
      res.send(obj);
    })
    .catch(err => {
      res.status(500).send('Could not get data!');
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
  console.log('Listening on port', config.server.port);
});

// socket.io code

web_io.on('connection', (socket) => {
  socket.on('get temperature', () => {
    dbTools.getData('temperature')
      .then(data => {
        socket.emit('new temperature', data);
      })
      .catch(err => {
        socket.emit('new temperature', err);
      });
  });

  socket.on('get humidity', () => {
    dbTools.getData('humidity')
      .then(data => {
        socket.emit('new humidity', data);
      })
      .catch(err => {
        socket.emit('new humidity', err);
      });
  });

  socket.on('get light', () => {
    dbTools.getData('light')
      .then(data => {
        socket.emit('new light', data);
      })
      .catch(err => {
        socket.emit('new light', err);
      });
  });
  socket.on('get button', () => {
    dbTools.getData('button')
      .then(data => {
        socket.emit('new button', data);
      })
      .catch(err => {
        socket.emit('new button', err);
      });
  });
  socket.on('set lamp', (state) => {
    dbTools.saveData('lamp', state)
      .then(data => {
        web_io.emit('new lamp', data);
        //sendTools.sendToLamp(state, lampIP);
      })
      .catch(err => {
        socket.emit('lamp error', err);
      });
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
