import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';

// Definitions
const host = 'localhost';
const port = 3000;

const ssl = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

const requestListener = function (request, response) {
  response.writeHead(200);
  response.end('My first webserver!');
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
