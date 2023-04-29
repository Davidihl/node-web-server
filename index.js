import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

// Definitions
const host = 'localhost';
const port = 3000;
const root = 'public';

const requestListener = function (req, res) {
  let filePath = '';
  if (req.url.slice(-1) === '/') {
    filePath = path.join(root, req.url, 'index.html');
  } else {
    filePath = path.join(root, req.url);
  }
  //  console.log('Accessing ' + filePath + '...');
  //  console.log(req.url);
  console.log(req.url);
  console.log(filePath);
  console.log(path.extname(req.url));

  fs.promises
    .readFile(filePath)
    .then((contents) => {
      res.statusCode = 200;

      // Log what filetype is called
      console.log(path.extname(filePath));

      // Return the correct setHeader
      if (path.extname(filePath) === '.html') {
        res.setHeader('Content-Type', 'text/html');
      } else if (path.extname(filePath) === '.htm') {
        res.setHeader('content-type', 'text/html');
      } else if (path.extname(filePath) === '.jpg') {
        res.setHeader('content-type', 'image/jpg');
      } else if (path.extname(filePath) === '.css') {
        res.setHeader('content-type', 'text/css');
      } else {
        res.setHeader('content-type', 'text/plain');
      }

      res.writeHead(200);
      res.end(contents);
    })
    .catch((err) => {
      if (path.basename(filePath) === 'index.html') {
        fs.promises.readFile(filePath.slice(0, -1)).then((contents) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(contents);
        });
      } else {
        fs.promises.readFile('404.html').then((contents) => {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end(contents);
          console.log(err.message);
          return;
        });
      }
    });
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
