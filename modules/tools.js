module.exports = {
  cloneObject: (obj) => {
    if (null == obj || typeof obj != 'object') return obj;
    return JSON.parse(JSON.stringify(obj));
  }
};