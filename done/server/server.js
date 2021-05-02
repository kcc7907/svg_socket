// const express = require("express");
// const socketIO = require('socket.io');
// const cors = require('cors')


// const PORT = process.env.PORT || 9999;
// // const INDEX = '..';
// const server = express()
//   .use(cors())
//   // .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//   .get("/", (req, res) => {
//     res.send({ response: "Server is up and running." }).status(200);
//   })
//   .listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));

// const io = socketIO(server);
// io.on('connection', (socket) => {
//   console.log('Client connected');
//   setInterval(() => socket.emit('time', new Date().toTimeString()), 1000);

//   socket.on('sendObj', obj => {
//     socket.broadcast.emit('get', obj);
//   })
//   socket.on('disconnect', () => console.log('Client disconnected'));
// });



// --- - - - - - - - 

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
  // 'cors': { 
  //   'methods': ['GET', 'PATCH', 'POST', 'PUT'],
  //  'origin': true }
  allowEIO3: true,
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true
  }
});
const cors = require('cors')
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

app.use(cors())
app.use(router);


io.on('connection', (socket) => {
  console.log('User online');
  socket.on('canvas-data', (data) => {
    socket.broadcast.emit('canvas-data', { line: data.line, color: data.color, size: data.size })
  })
  socket.on('send', (data) => {
    socket.broadcast.emit('send', { data })
  })
  setInterval(() => socket.emit('time', new Date().toTimeString()), 1000)

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', {
      start: {
        x: data.start.x,
        y: data.start.y
      },
      end: {
        x: data.end.x,
        y: data.end.y,
      }
    })
  })

})

var server_port = process.env.PORT || 9999;
http.listen(server_port, () => {
  console.log(`Started onhttp://localhost:${server_port}`);
});
