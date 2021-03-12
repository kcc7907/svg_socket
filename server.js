// // const express = require('express');
// // // const socketIO = require('socket.io');
// // var io = require('socket.io');

// // const PORT = process.env.PORT || 5555;
// // const INDEX = '/index.html';

// // const server = express()
// //   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
// //   .listen(PORT, () => console.log(`Listening on ${PORT}`));

// // io.listen(server)
// // io.on('connection', (socket) => {
// //   console.log('Client connected');
// //   socket.on('disconnect', () => console.log('Client disconnected'));
// // });

// // setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

// // const app = require('express')();
// // const http = require('http').Server(app);
// // const io = require('socket.io')(http);

// // app.get('/', function (req, res) {
// //   res.sendfile('index.html');
// //   // console.log('testing');
// // });

// // //Whenever someone connects this gets executed
// // io.on('connection', function (socket) {
// //   console.log('A user connected');
// //   setInterval(() => socket.emit('time', new Date().toTimeString()), 1000);

// //   //Whenever someone disconnects this piece of code executed
// //   socket.on('disconnect', function () {
// //     console.log('A user disconnected');
// //   });
// // });

// // http.listen(5555, function () {
// //   console.log('listening on *:5555');
// // });


// const app = require('express')();
// const express = require("express");
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const router = express.Router();

// router.get("/", (req, res) => {
//   res.sendfile('index.html');
//   // res.send({ response: "Server is up and running." }).status(200);
// });

// app.use(router);


// // io.on('connection', (socket) => {
// //   // console.log('User online');
// //   // socket.on('canvas-data', (data) => {
// //   //   socket.broadcast.emit('canvas-data', { line: data.line, color: data.color, size: data.size })
// //   // })
// //   console.log('Client connected');
// //   // setInterval(() => socket.emit('time', new Date().toTimeString()), 1000);
// //   socket.on('disconnect', () => console.log('Client disconnected'));
// // })

// // var server_port = process.env.PORT || 5001;
// // http.listen(server_port, () => {
// //   console.log("Started on :" + server_port);
// // })

// //Whenever someone connects this gets executed
// io.on('connection', function (socket) {
//   console.log('A user connected');
//   setInterval(() => socket.emit('time', new Date().toTimeString()), 1000);

//   //Whenever someone disconnects this piece of code executed
//   socket.on('disconnect', function () {
//     console.log('A user disconnected');
//   });
// });

// http.listen(5555, function () {
//   console.log('listening on *:5555');
// });


// ------------       -------------


// const express = require("express");
// const socketIO = require('socket.io');
// const cors = require('cors')


// const PORT = process.env.PORT || 9999;
// const INDEX = '/vue.html';
// const server = express()
//   .use(cors())
//   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`))
//   ;
// const io = socketIO(server);
// io.on('connection', (socket) => {
//   console.log('Client connected');
//   setInterval(() => socket.emit('time', new Date().toTimeString()), 1000);
//   socket.on('sendObj',obj=>{
//     socket.emit('get', obj);
//   })
//   socket.on('disconnect', () => console.log('Client disconnected'));
// });



// -----

const express = require('express')
const app = express()
const port = 8888

app.use(express.static('./'));

app.get('/', (req, res) => {
  // res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})