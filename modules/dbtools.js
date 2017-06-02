const jsonfile = require('jsonfile');
const tools = require('./tools.js');
const database = 'data/database.json';

module.exports = {
  saveData : (dataType, rawData) => {
    return new Promise((fulfill, reject) => {
      jsonfile.readFile(database, (err, obj) => {
        if (err) return reject(err);
        let realData;
        switch(dataType) {
          case 'temperature':
            realData = parseInt(rawData);
            obj.temperature = realData;
            break;
          case 'humidity':
            realData = parseInt(rawData);
            obj.humidity = realData;
            break;
          case 'light':
            realData = parseInt(rawData);
            obj.light = realData;
            break;
          case 'button':
            realData = parseInt(rawData);
            obj.button = realData;
            break;
          case 'lamp':
            realData = parseInt(rawData);
            obj.lamp = realData;
            break;
          default:
            return reject('Data type not valid!');
        }
        jsonfile.writeFile(database, obj, (err) => {
          if (err) return reject(err);
        });
        return fulfill(realData);
      });
    });
  },
  getData : (dataType) => {
    return new Promise((fulfill, reject) => {
      let data;
      jsonfile.readFile(database, (err, obj) => {
        if (err) return reject(err);
        switch(dataType) {
          case 'temperature':
            data = obj.temperature;
            break;
          case 'humidity':
            data = obj.humidity;
            break;
          case 'light':
            data = obj.light;
            break;
          case 'button':
            data = obj.button;
            break;
          case 'lamp':
            data = obj.lamp;
            break;
          case 'all':
            data = tools.cloneObject(obj);
            break;
          default:
            return reject('Data type not valid!');
        }
      });
      return fulfill(data);
    });
  }
};