var http = require('http');
var fs = require("fs");
var format = require("date-fns/format");

const logDir = __dirname + '/logs'
var infoLog = fs.createWriteStream(logDir + '/traffic.log', { flags: 'a+' }); // append at the end of the log file

const port = 3000;
const hostname = '127.0.0.1';

/* 
* With simple logs comes simple logging
* Writes to file and stdout
* */
const logger = function(log) {
    console.log(log);
    infoLog.write(log + '\n');
}

http.createServer((req, res) => { // here be a server
    const routes = {
        'GET': {
            '/': "This is index page",
            '/about': "This is in about page",
            '/contact': "This is in contact page",
        }
    }

    logger(`${format(new Date(), 'MM/dd/yyyy HH:mm')} ${req.method} request at ${req.url}`)
    if (!!routes[req.method][req.url]) { // if route exists bang bang
        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8",
        });
        res.write(routes[req.method][req.url]);
        res.end();
    }
    else {
        res.writeHead(404);
        res.write('page not found');
        res.end();
    }
}).listen(port, hostname, () => {
    logger(`${format(new Date(), 'MM/dd/yyyy HH:mm')} server running at http://${hostname}:${port}/`);
});
