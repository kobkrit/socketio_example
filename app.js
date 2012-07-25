var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs')

app.listen(8000);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
}

var stdin = process.openStdin();

function trim(string) {
    return string.replace(/^\s*|\s*$/g, '')
}

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('My other event', function (data) {
        console.log(data);
    });
    stdin.on('data', function(chunk) {
            console.log(typeof(chunk.toString()))
            socket.emit('news', trim(chunk.toString()));
            console.log("Got chunk: " + chunk); }
    );
});


