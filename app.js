const express = require("express");
const socketIO = require('socket.io');
const cors = require('cors')


const PORT = process.env.PORT || 9999;
const INDEX = '/vue.html';
const server = express()
  .use(cors())
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
  ;
const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('Client connected');
  setInterval(() => socket.emit('time', new Date().toTimeString()), 1000);

  socket.on('sendObj',obj=>{
    socket.broadcast.emit('get', obj);
  })
  socket.on('disconnect', () => console.log('Client disconnected'));
});

