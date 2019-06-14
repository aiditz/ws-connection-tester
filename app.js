const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  pingInterval: 5000
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/socket.io.js', function(req, res) {
  res.sendFile(__dirname + '/public/socket.io.js');
});

http.listen(8081, function() {
  console.log('listening on *:8081');
});

io.on('connection', function(socket) {
  console.log('a user connected', socket.id);
  io.emit('chat message', `<b>Server: <code>${socket.id}</code> connected!</b>`);

  socket.on('chat message', function(msg) {
    io.emit('chat message', `<code>${socket.id}</code> writes: <b>${msg}</b>`);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected', socket.id);
  });
});
