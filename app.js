
const express = require("express")
const cors = require("cors")
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

var port = 3000;


app.use(cors())
app.use(express.json())

io.on('connection', (socket) => {
  console.log(socket.id)

  socket.on('message', function (message) {
    console.log(message);
    socket.broadcast.emit('message',message)
  })


  socket.on('mouseMove', (position) => {
    socket.broadcast.emit('mouseMove', position);
  });


  socket.on('disconnect', () => {
    console.log('A user disconnected');
  })
  
});
server.listen(port, () => {
  console.log(`Server listening ${port}`);
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

