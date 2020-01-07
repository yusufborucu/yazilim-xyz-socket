const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log('Socket is running on port 3000.');
});

let users = [];

io.on('connection', (socket) => {
  socket.on('con_user_id', (data) => {
    if (!users.includes(data)) {
      users.push(data);
    }
  });

  socket.on('que_user', (data) => {
    if (users.includes('' + data.user_id + '')) {
      let notify_user = {
        user_id: data.user_id,
        title: data.title
      };
      io.emit('notify_user', notify_user);
    }
  });

  socket.on('dis_user_id', (data) => {
    let index = users.indexOf(data);
    if (index !== -1) users.splice(index, 1);
  });

  socket.on('disconnect', () => {

  });
});