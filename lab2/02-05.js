var fs = require('fs');
var expt = require('express');
var app = expt();

function name(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    response.end('Juliya Nevar');
}

function fetch(request, response) {
    let html = fs.readFileSync('./fetch.html');
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end(html);
}

app.get("/fetch", (request, response) => fetch(request, response));
app.get("/api/name", (request, response) => name(request, response));
app.post
app.listen(5000);

console.log('Server running at http://localhost:5000/fetch');