// the console logs of this file wil be printed in the terminal console since this is our backend.


// require express
const express = require('express');
// create an instance of express
const  app = express();

// better is to use app.use middleware rather than app.get
// app.get('/', function(req, res){
//     res.sendFile(__dirname+'/index.html');
//   });

const http = require('http').Server(app);

//Creating a new instance of socket.io by passing the http (the HTTP server) object.
const io = require('socket.io')(http);

console.log(__dirname);
app.use(express.static(__dirname));

// All the realtime socket communication functions are written inside io.on 'connection' event callback.
io.on('connection', function(socket){
  console.log('A User Connected');

  //default username
	socket.username = "Ghost"

  socket.on('chat message', function(msg){
    obj = {
      username: socket.username,
      msg: msg
     };
     io.emit('return message', obj);
  });

  // username is a custom event
  socket.on('username',function(username){
    socket.username = username
    io.emit('is_online','🔵' + username + ' joined the chat...' )
  });

  // disconnect is predefined event 
  socket.on('disconnect', function() {
    io.emit('is_online', '🔴' + socket.username + ' left the chat...');
})

// User is typing functionality implementation
  socket.on('typing',function(){
    console.log(" server.js is typing..... </li>");
    io.emit('typing',{username:socket.username})
  });

  socket.on('stop typing',function(){
    console.log("stop typing server.js </li>");
    io.emit('stop typing');
  });

});

//app.listen method is identical to node's http.Server.listen()" - but in reality it creates a new http server leaving the one with socket.io non-operational.
const server = http.listen( process.env.PORT || 3000, ()=> {
  console.log("server is running on port", server.address().port)
});



