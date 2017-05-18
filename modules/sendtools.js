const http = require('http');
const querystring = require('querystring');

module.exports = {
  sendToLamp: (state, lampaddress) => {
    const postData = querystring.stringify({
      'lampstate': state
    });

    var options = {
      hostname: lampaddress,
      port: 80,
      path: '/',
      method: 'GET',
      headers: {
        'Constent-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'Connection': 'close'
      }
    }

    if (state) options.path = '/turn-on';
    else options.path = '/turn-off';

    const req = http.request(options, (res) => {
      if (res.statusCode != 200) console.error(res.statusCode);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(chunk);
      });
      res.on('end', () => { return; })
    });

    req.on('error', (e) => {
      console.error('[http request]', e.message);
    });

    req.write(postData);
    req.end();
  }
};