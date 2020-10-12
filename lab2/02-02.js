var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
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
}).listen(5000);

console.log('Server running at http://localhost:5000/png');