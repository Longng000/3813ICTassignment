const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const peerServer = ExpressPeerServer(server, { path: '/peerjs' });

app.use('/peerjs', peerServer);
app.use(bodyParser.json());
app.use(express.static('public'));

// Placeholder for MongoDB connection setup
// mongoose.connect('your-mongo-db-uri', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (data) => {
    console.log('Message received:', data);
    io.emit('message', data); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
