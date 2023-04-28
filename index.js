import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import path from 'node:path';

// Definitions
const host = 'localhost';
const port = 3000;
const root = './public';

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end(req.url);

  if (req.url !== '/favicon.ico') {
    console.log('Trying to access ' + req.url + ' ...');
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
