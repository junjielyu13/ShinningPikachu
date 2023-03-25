const socket = io('http://192.168.43.240:3000');
//const socket = io('http://localhost:3000');
socket.on('connect', function () {
  console.log('Connected');

  //   socket.emit('events', { test: 'test' });
  socket.emit('identity', 1, (response) => console.log('Identity:', response));
});

// socket.on('events', function (data) {
//   console.log('event', data);
// });

socket.on('response', function (data) {
  console.log('messagedsadasdasd :');
  console.log('message: ' + data);
});

socket.on('hello', function (data) {
  console.log('hello from enemy' + data);
});

// socket.on('response', (msg) => {
//   console.log('messagedsadasdasd :');
//   console.log('message: ' + msg);
// });

socket.on('exception', function (data) {
  console.log('exception', data);
});

socket.on('disconnect', function () {
  console.log('Disconnected');
});

function sendAction() {
  console.log('test!!!');
  socket.emit('action', 2, (response) => console.log('reback:', response));
  console.log('emiit!!!!');
}

window.addEventListener('mousemove', function (event) {
  var mouseX = (event.clientX / window.innerHeight) * 8 - 4;
  movePaddleA(mouseX);
  socket.emit('move', mouseX);
  //movePaddleB(event);
});

socket.on('move', function (data) {
  console.log('recib');
  console.log(data);
  movePaddleB(data * -1);
});
