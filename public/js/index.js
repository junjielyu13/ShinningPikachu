// const socket = io('http://192.168.43.240:3000');
const socket = io('http://localhost:3000');
socket.on('connect', function () {
  console.log('Connected');

  //   socket.emit('events', { test: 'test' });
  socket.emit('identity', 1, (response) => console.log('Identity:', response));
});

// socket.on('events', function (data) {
//   console.log('event', data);
// });

socket.on('exception', function (data) {
  console.log('event', data);
});

socket.on('disconnect', function () {
  console.log('Disconnected');
});

function sendAction() {
  console.log('test!!!');
  socket.emit('action', 2, (response) => console.log('reback:', response));
  console.log('emiit!!!!');
}
