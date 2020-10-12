let fs = require('fs');
let app = require('express')();

function index(request, response) {
    let html = fs.readFileSync('./index.html');
    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    response.end(html);
}

function factorial(k) {
    if (k < 0) return 0;
    return (k > 1) ? k * factorial(k - 1) : 1;
}

function Fact(request, response) {
    let k = request.query.k;
    let json = {k: k, fact: factorial(k)};
    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    response.end(JSON.stringify(json));
}

function factCycle(req, res) {
    let source = './factCycle.html';
    let html = fs.readFileSync(source);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(html);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function factCycleTick(req, res) {
    let result = "";
    let n = 1;
    const d = Date.now();
    for (let k = 1; k < 21; k++) {
        process.nextTick(async () => {
            result += (n++) + '.Результат: ' + (Date.now() - d) + '-' + k + '/' + Fact(k) + '<br/>';
            await sleep(1);
        });
    }


    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    setTimeout(() =>
        res.end(result), 100);
}

async function factCycleImmediate(req, res) {
    let result = "";
    let n = 1;
    const d = Date.now();
    for (let k = 1; k < 21; k++) {
        setImmediate(async () => {
            result += (n++) + '.Результат: ' + (Date.now() - d) + '-' + k + '/' + Fact(k) + '<br/>';
            await sleep(1);
        });
    }


    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    setTimeout(() =>
        res.end(result), 100);
}

async function factCycleS(req, res) {
    let result = "";
    let n = 1;
    const d = Date.now();
    for (let k = 1; k < 21; k++) {
        result += (n++) + '.Результат: ' + (Date.now() - d) + '-' + k + '/' + Fact(k) + '<br/>';
        await sleep(1);
    }


    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    setTimeout(() =>
        res.end(result), 100);
}

app.get("/", (request, response) => index(request, response));

app.get("/fact", (request, response) => Fact(request, response));
app.get("/factCycle", ((req, res) => factCycle(req, res)));
app.get("/factCycleS", ((req, res) => factCycleS(req, res)));
app.get("/factCycleTick", ((req, res) => factCycleTick(req, res)));
app.get("/factCycleImmediate", ((req, res) => factCycleImmediate(req, res)));

app.listen(5000);

console.log("Server running at http://localhost:5000/");