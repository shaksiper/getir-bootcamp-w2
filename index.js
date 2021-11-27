var http = require('http');
var fs = require("fs");
var format = require("date-fns/format");

const logDir = __dirname+'/logs'
var infoLog = fs.createWriteStream(logDir + '/traffic.log', {flags : 'a+'});

/* With simple logs comes simple logging
* Writes to file and stdout
* */
const logger = function(log)
{
    console.log(log);
    infoLog.write(log+'\n');
}

const port = 3000;
const hostname = '127.0.0.1';

http.createServer((req, res) => {
    const routeMap = {
        'GET' : {
            '/': "This is index page",
            '/about': "This is in about page",
            '/contact': "This is in contact page",
        }
    }

    // console.log(requestLog)
    // infoLog.write(requestLog+'\n');
    logger(`${ format(new Date(), 'MM/dd/yyyy HH:mm') } ${req.method} request at ${req.url}`)
    if (!!routeMap[req.method][req.url])
    {
        res.writeHead(200, { 
            "Content-Type": "text/plain; charset=utf-8",
        });
        res.write(routeMap[req.method][req.url]);
        res.end();
    }
    else
    {
        res.writeHead(404);
        res.write('page not found');
        res.end();
    }
}).listen(port, hostname, () => {
    // console.log(serverLog);
    logger(`${ format(new Date(), 'MM/dd/yyyy HH:mm') } server running at http://${hostname}:${port}/` );
});
