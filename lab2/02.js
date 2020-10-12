var fs = require('fs');
var expt = require('express');
var app = expt();

function index(request, response) {
    let html = fs.readFileSync('./index.html');
    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    response.end(html);
}

function picture(request, response) {
    const fname = './pic.png';
    let jpg = null;

    fs.stat(fname, (err, stat) => {
        if (err) {
            console.log('error:', err);
        } else {
            jpg = fs.readFileSync(fname);
            response.writeHead(200, {'Content-Type': 'image/png', 'Content-Length': stat.size});
            response.end(jpg, 'binary');
        }
    })
}

function name(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    response.end('Juliya Nevar');
}


function xmlhttprequest(request, response) {
    let html = fs.readFileSync('./xmlhttprequest.html');
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end(html);
}


function fetch(request, response) {
    let html = fs.readFileSync('./fetch.html');
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end(html);
}


function jquery(request, response) {
    let html = fs.readFileSync('./jQuery.html');
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end(html);
}

app.get("/", (request, response) => index(request, response));

app.get("/html", (request, response) => index(request, response));

app.get("/png", (request, response) => picture(request, response));

app.get("/api/name", (request, response) => name(request, response));

app.get("/xmlhttprequest", (request, response) => xmlhttprequest(request, response));

app.get("/fetch", (request, response) => fetch(request, response));

app.get("/jquery", (request, response) => jquery(request, response));

app.listen(5000);

console.log('Server running at http://localhost:5000/');