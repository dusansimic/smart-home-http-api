const http = require('http');
const querystring = require('querystring');

module.exports = {
  sendToLamp: (state, lampaddress) => {
    const postData = querystring.stringify({
      'lampstate': state
    });

    const options = {
      hostname: lampaddress,
      port: 80,
      path: '/',
      method: 'POST',
      headers: {
        'Constent-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }

    const req = http.request(options, (res) => {
      if (res.statusCode != 200) console.error(res.statusCode);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(chunk);
      });
      res.on('end', () => { return; })
    });

    req.on('error', (e) => {
      console.error('[api]', e.message);
    });

    req.write(postData);
    req.end();
  }
};