const jsonfile = require('jsonfile');
const database = 'data/database.json';

const noerr = null;

module.exports = {
  saveTemperature: (rawTemperature, web_io, callback) => {
    const newTemperature = parseInt(rawTemperature);
    let ok = true;
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.temperature = newTemperature;
        web_io.emit('new temperature', obj.temperature);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api] ' + err);
            ok = false;
            if (callback) return callback(err, ok);
            return ok;
          }
        });
      } else {
        console.error('[api] ' + err);
        ok = false;
        if (callback) return callback(err, ok);
        return ok;
      }
    });
    if (callback) return callback(noerr, ok);
    return ok;
  },
  saveHumidity: (rawHumidity, web_io, callback) => {
    const newHumidity = parseInt(rawHumidity);
    let ok = true;
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.humidity = newHumidity;
        web_io.emit('new humidity', obj.humidity);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api] ' + err);
            ok = false;
            if (callback) return callback(err, ok);
            return ok;
          }
        });
      } else {
        console.error('[api] ' + err);
        ok = false;
        if (callback) return callback(err, ok);
        return ok;
      }
    });
    if (callback) return callback(noerr, ok);
    return ok;
  },
  saveLight: (rawLight, web_io, callback) => {
    const newLight = parseInt(rawLight);
    let ok = true;
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.light = newLight;
        web_io.emit('new light', obj.light);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api] ' + err);
            ok = false;
            if (callback) return callback(err, ok);
            return ok;
          }
        });
      } else {
        console.error('[api] ' + err);
        ok = false;
        if (callback) return callback(err, ok);
        return ok;
      }
    });
    if (callback) return callback(noerr, ok);
    return ok;
  },
  saveButton: (rawButton, web_io, callback) => {
    const newButton = parseInt(rawButton);
    let ok = true;
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.button = newButton;
        web_io.emit('new button', obj.button);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api] ' + err);
            ok = false;
            if (callback) return callback(err, ok);
            return ok;
          }
        });
      } else {
        console.error('[api] ' + err);
        ok = false;
        if (callback) return callback(err, ok);
            return ok;
      }
    });
    if (callback) return callback(noerr, ok);
    return ok;
  },
  getTemperature: (callback) => {
    let ret;
    jsonfile.readFile(database, (err, obj) => {
      if (!err) ret = obj.temperature;
      else console.error(err);
    });
    if (callback) return callback(err, ret);
    return ret;
  },
  getHumidity: (callback) => {
    let ret;
    jsonfile.readFile(database, (err, obj) => {
      if (!err) ret = obj.humidity;
      else console.error(err);
    });
    if (callback) return callback(err, ret);
    return ret;
  },
  getLight: (callback) => {
    let ret;
    jsonfile.readFile(database, (err, obj) => {
      if (!err) ret = obj.light;
      else console.error(err);
    });
    if (callback) return callback(err, ret);
    return ret;
  },
  getButton: (callback) => {
    let ret;
    jsonfile.readFile(database, (err, obj) => {
      if (!err) ret = obj.button;
      else console.error(err);
    });
    if (callback) return callback(err, ret);
    return ret;
  }
}