import fs from 'fs';
import http from 'http';
import path from 'path';

// Definitions
const host = 'localhost';
const port = 3000;
const root = 'public';

const requestListener = function (req, res) {
  const filePath = path.join(root, req.url);
  //  console.log('Accessing ' + filePath + '...');
  //  console.log(req.url);
  console.log(filePath);

  fs.promises
    .readFile(filePath)
    .then((contents) => {
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(contents);
    })
    .catch((err) => {
      res.writeHead(500);
      res.end(err);
      return;
    });
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
