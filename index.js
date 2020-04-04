// the console logs of this file wil be printed in the console of browser since this script is injected in the index.html

var socket = io();
$( function() {

$('form').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
});

socket.on('return message', function(obj){
    console.log('Inside return message');
    console.log(obj.username);
    console.log(obj.msg);
    $('#messages').append('<li>' + '<strong>'+ obj.username + '</strong>:  '+ obj.msg + '</li>');

});

socket.on('is_online', function(msg){
    $('#messages').append($('<li>').text(msg));
});

socket.on('disconnect',function(msg){
    $('#messages').append($('<li>').text(msg));
})

const username = prompt("Please enter your name");
socket.emit('username',username);

// User is typing functionality implementation

var typingTimer;                
const doneTypingInterval = 100;

$('#m').keydown(function(){
    clearTimeout(typingTimer);
    socket.emit('typing');
});

$('#m').keyup(function(){
    clearTimeout(typingTimer);
    typingTimer = setTimeout( doneTyping , doneTypingInterval);
});

function doneTyping(){
    console.log('Typing Finished');
    socket.emit('stop typing');
}

socket.on('typing',(obj)=>{
    console.log(obj.username + " is typing.....");
    //$('#messages').append( '<li>'+ obj.username + " is typing..... </li>");
    $('#typing-indicator').empty();     // empty the list first so that there's only one entry of user is typing
    $('#typing-indicator').append( '<li>'+ obj.username + " is typing..... </li>");
});

socket.on('stop typing',()=>{
    console.log("Stopping typing index.js");
    $('#typing-indicator').empty();
$});

});

