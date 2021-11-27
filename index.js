var http = require('http');
var fs = require("fs");

const port = 3000;
const hostname = '127.0.0.1';

const server = http.createServer((req, res) => {
    const routeMap = {
        '/': "We are in index page",
        '/about': "We are in about page",
        '/contact': "We are in contact page",
    }

    console.log(`${req.method} request at ${req.url}`)
    if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

        res.write(routeMap[req.url]);
        res.end();
    }
}).listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});
