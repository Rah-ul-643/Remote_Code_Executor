const express= require('express');

const http = require('http');
const socketIo = require('socket.io');

const app= express();
const server = http.createServer(app);
const io = socketIo(server,{
  cors: {
    origin: "*",
  },
  pingTimeout: 1000,
  pingInterval: 3000,
});

// routes
const userRoutes= require('./routes/user');
const codeRoutes= require('./routes/code');

// database 
const dbConnect = require('./config/database');
const cors  = require('cors');

const dotenv = require('dotenv');
dotenv.config();

// database connection
dbConnect();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    origin: function(origin, callback){
      return callback(null, true);
    },
    credentials: true
}));
app.use(express.static('public'));

// chatroom

const {joinRoom,createRoom,joinRoomRequest,leaveRoom}= require('./chatroom/chat');

io.on('connection', (socket) => { 
  console.log('User connected with id: ' + socket.id);

  socket.on('create-room',(roomID) =>{
    createRoom(roomID);
  })

  socket.on('request-join-access',(socketID,roomID,username)=>{
    joinRoomRequest(io,socket,socketID,roomID,username);
  })

  socket.on('access-status',(socketID,accessGranted)=>{
    socket.to(socketID).emit('access-status',accessGranted);
  });

  socket.on('display-initial-code',(socketID,code)=>{
    socket.to(socketID).emit('receive-code',code);
  })

  socket.on('join-room', (roomID,userName)=>{
    joinRoom(io,socket,roomID,userName);
  })

  socket.on('send-code',(code,roomID)=>{
    console.log(code);
    socket.to(roomID).emit('receive-code',code);
  })

  socket.on('leave-room',(roomID,socketID)=>{
    leaveRoom(socket,roomID,socketID);
  })

  socket.on('disconnection',(roomID)=>{
    socket.to(roomID).emit('offline-socket',socket.id);
  })
  
});


 // routes
app.use('/api/v1/code',codeRoutes);
app.use('/api/v1/auth',userRoutes);

app.get('/',(req,res)=>{
    res.sendFile('index.html');
});


server.listen(4000,()=>{
    console.log(`server listening on port: 4000`);
})