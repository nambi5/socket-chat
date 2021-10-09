const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const moment = require('moment');
function formatMessage(username, text) {
    return {
      username,
      text,
      time: moment().format('h:mm a')
    };
  }
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

constbotName = "Admin Panel";

// Run when client connects
let userPrivateRooms=[];
io.on('connection', socket => {
    socket.on('newConnect',()=>{
        if(userPrivateRooms.indexOf(socket.id)==-1){
            console.log(socket.id);
            userPrivateRooms.push(socket.id);
            socket.emit('roomList',userPrivateRooms);
        }
    });

    socket.on('private message', msg => {
        console.log(msg.id);
        io.to(msg.id).to(socket.id).emit('private message', formatMessage(msg.id,msg.msg));
      });

    socket.on('message', msg => {
        console.log(socket.id);
        io.emit('message', formatMessage(socket.id,msg)); //io.to(socket.id).emit(...)
    });

  

  socket.emit('roomList',userPrivateRooms);  
    
});
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));