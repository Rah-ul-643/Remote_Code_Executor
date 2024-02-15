const express= require('express');

const http = require('http');
const socketIo = require('socket.io');

const app= express();
const server = http.createServer(app);
const io = socketIo(server);

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

io.on('connection', (socket) => {
    console.log('User connected with id: ' + socket.id);
  

    socket.on('send-code',(code)=>{
      console.log(code);
      socket.broadcast.emit('receive-code',code);
    })
  
  });

 // routes
app.use('/api/v1/code',codeRoutes);
app.use('/api/v1/auth',userRoutes);

app.get('/',(req,res)=>{
    res.sendFile('index.html');
});


app.listen(4000,()=>{
    console.log(`server listening on port: 4000`);
})