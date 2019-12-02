const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const router = require('./router');
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());
app.use(router);
io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
   /*  var readStream = fs.createReadStream(path.resolve(__dirname,'./dance.jpg'),
    {encoding:'binary'}),chunks = [];
    readStream.on('readable',function(){
      console.log('Image loading ...')
    });
    readStream.on('data',function(chunk){
      chunks.push(chunk);
      socket.emit('img-chunk',chunk);
    });
    readStream.on('end',function(){
      console.log('Image loaded');
    }); */
    const { error, user } = addUser({ id: socket.id, name, room });
    if(error) return callback(error);
    socket.join(user.room);
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback();
  });
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    // Read message
    // Check if message is "/dance"
    //
    if(message === "/danse"){
      io.to(user.room).emit('message', { user: user.name, text:image});
    }
    else{
      io.to(user.room).emit('message', { user: user.name, text: message });
    }
    callback();
  });
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});
server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));