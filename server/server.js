const express= require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const cors  = require('cors');

const userRoutes= require('./routes/user');
const codeRoutes= require('./routes/code');

const dbConnect = require('./config/database');

dotenv.config();


const app= express();
const server = http.createServer(app);


const io = socketIo(server,{
  cors: {
    origin: "*",
  },
  pingTimeout: 1000,
  pingInterval: 3000,
});



// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
  
    credentials: true
}));


// chatroom

// const {joinRoom,createRoom,joinRoomRequest,leaveRoom}= require('./chatroom/chat');

// io.on('connection', (socket) => { 
//   console.log('User connected with id: ' + socket.id);

//   socket.on('create-room',(roomID) =>{
//     createRoom(roomID);
//   })

//   socket.on('request-join-access',(socketID,roomID,username)=>{
//     joinRoomRequest(io,socket,socketID,roomID,username);
//   })

//   socket.on('access-status',(socketID,accessGranted)=>{
//     socket.to(socketID).emit('access-status',accessGranted);
//   });

//   socket.on('display-initial-code',(socketID,code)=>{
//     socket.to(socketID).emit('receive-code',code);
//   })

//   socket.on('join-room', (roomID,userName)=>{
//     joinRoom(io,socket,roomID,userName);
//   })

//   socket.on('send-code',(code,roomID)=>{
//     console.log(code);
//     socket.to(roomID).emit('receive-code',code);
//   })

//   socket.on('leave-room',(roomID,socketID)=>{
//     console.log("leave room api hit");
//     leaveRoom(socket,roomID,socketID);
//   })

//   socket.on('disconnection',(roomID)=>{
//     leaveRoom(socket,roomID,socket.id);
//   })
  
// });


 // routes

app.use('/api/v1/code',codeRoutes);
app.use('/api/v1/auth',userRoutes);


server.listen(4000,()=>{
    dbConnect();
    console.log(`server listening on port: 4000`);
})