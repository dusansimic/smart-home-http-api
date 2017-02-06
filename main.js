var express = require('express');
var app = express();
var jsonfile = require('jsonfile');

var database = 'data/database.json';

app.get('/get-temperature', function(req, res) {
  jsonfile.readFile(database, function(err, obj) {
    if (err === null) {
      res.send(obj.temperature);
    } else {
      conosle.error(err);
      res.send('not ok');
    }
  });
});

app.get('/new-temperature', function(req, res) {
  var newTemperature = req.query.temperature;
  jsonfile.readFile(database, function(err, obj) {
    if (err === null) {
      obj.temperature = newTemperature;
      jsonfile.writeFile(database, obj, function(err) {
        if (err !== null) {
          console.error(err);
          res.send('not ok');
        } else {
          res.send('ok');
        }
      });
    } else {
      console.error(err);
      res.send('not ok');
    }
  });
});

app.listen(3000, '0.0.0.0', function() {
  console.log('listening *:3000');
});
