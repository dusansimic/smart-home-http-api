const jsonfile = require('jsonfile');
const database = 'data/database.json';

const noerr = null;

const extend = require('util')._extend;

module.exports = {
  saveTemperature: (rawTemperature, web_io, callback) => {
    const newTemperature = parseInt(rawTemperature);
    let ok = true;
    let _err;
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.temperature = newTemperature;
        web_io.emit('new temperature', obj.temperature);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api] ' + err);
            ok = false;
            _err = err;
          }
        });
      } else {
        console.error('[api] ' + err);
        ok = false;
        _err = err;
      }
    });
    if (callback) return callback(_err, ok);
    return {_err, ok};
  },
  saveHumidity: (rawHumidity, web_io, callback) => {
    const newHumidity = parseInt(rawHumidity);
    let ok = true;
    let _err;
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.humidity = newHumidity;
        web_io.emit('new humidity', obj.humidity);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api] ' + err);
            ok = false;
            _err = err;
          }
        });
      } else {
        console.error('[api] ' + err);
        ok = false;
        _err = err;
      }
    });
    if (callback) return callback(_err, ok);
    return {_err, ok};
  },
  saveLight: (rawLight, web_io, callback) => {
    const newLight = parseInt(rawLight);
    let ok = true;
    let _err;
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.light = newLight;
        web_io.emit('new light', obj.light);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api] ' + err);
            ok = false;
            _err = err;
          }
        });
      } else {
        console.error('[api] ' + err);
        ok = false;
        _err = err;
      }
    });
    if (callback) return callback(_err, ok);
    return {_err, ok};
  },
  saveButton: (rawButton, web_io, callback) => {
    const newButton = parseInt(rawButton);
    let ok = true;
    let _err;
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.button = newButton;
        web_io.emit('new button', obj.button);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api] ' + err);
            ok = false;
            _err = err;
          }
        });
      } else {
        console.error('[api] ' + err);
        ok = false;
        _err = err;
      }
    });
    if (callback) return callback(_err, ok);
    return {_err, ok};
  },
  saveLamp: (rawLamp, web_io, callback) => {
    const newLamp = parseInt(rawLamp);
    let ok = true;
    let _err;
    jsonfile.readFile(database, function(err, obj) {
      if (err === null) {
        obj.lamp = newLamp;
        web_io.emit('new lamp', obj.lamp);
        jsonfile.writeFile(database, obj, function(err) {
          if (err !== null) {
            console.error('[api] ' + err);
            ok = false;
            _err = err;
          }
        });
      } else {
        console.error('[api] ' + err);
        ok = false;
        _err = err;
      }
    });
    if (callback) return callback(_err, ok);
    return {_err, ok};
  },
  getTemperature: (callback) => {
    let ret, _err;
    jsonfile.readFile(database, (err, obj) => {
      if (!err) ret = obj.temperature;
      else console.error(err);
      _err = err;
    });
    if (callback) return callback(_err, ret);
    return {_err, ret};
  },
  getHumidity: (callback) => {
    let ret, _err;
    jsonfile.readFile(database, (err, obj) => {
      if (!err) ret = obj.humidity;
      else console.error(err);
      _err = err;
    });
    if (callback) return callback(_err, ret);
    return {_err, ret};
  },
  getLight: (callback) => {
    let ret, _err;
    jsonfile.readFile(database, (err, obj) => {
      if (!err) ret = obj.light;
      else console.error(err);
      _err = err;
    });
    if (callback) return callback(_err, ret);
    return {_err, ret};
  },
  getButton: (callback) => {
    let ret, _err;
    jsonfile.readFile(database, (err, obj) => {
      if (!err) ret = obj.button;
      else console.error(err);
      _err = err;
    });
    if (callback) return callback(_err, ret);
    return {_err, ret};
  },
  getLamp: (callback) => {
    let ret, _err;
    jsonfile.readFile(database, (err, obj) => {
      if (!err) ret = obj.lamp;
      else console.error(err);
      _err = err;
    });
    if (callback) return callback(_err, ret);
    return {_err, ret};
  },
  getAll: (callback) => {
    jsonfile.readFile(database, (err, obj) => {
      if (!err) {
        if (callback) return callback(err, obj);
        return {err, obj};
      }
      else console.error(err);
      if (callback) return callback(err, obj);
      return {err, obj};
    });
  }
}