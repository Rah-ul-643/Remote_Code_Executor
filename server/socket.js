const http = require('http');
const socketIo = require('socket.io');
const express = require('express');

require('dotenv').config();

const CLIENT_URL = process.env.CLIENT_URL;
const app = express();
const server = http.createServer(app);


const io = socketIo(server, {
    cors: {
        origin: CLIENT_URL, 
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    },
});

const codeStorage = [];


io.on('connection', (socket) => {
    
    console.log(` user connected with id: ${socket.id} `);

    socket.on('send-code',(code, roomID)=>{
        console.log('send code socket request hit');
        const group = codeStorage.find((group) => group.id === roomID)
        
        if (group){
            group.code=code;
            
            const index=codeStorage.findIndex((grp)=> grp.id===roomID );
            codeStorage[index]=group;
            console.log(codeStorage);
                    
        }
        else{
            codeStorage.push({id:roomID, code:code});
        }

        socket.to(roomID).emit('set-code',code);
    })

    socket.on('join-room',(roomID,initialCode,setCode)=>{
        console.log(`${socket.id} joined room : ${roomID}`);
        socket.join(roomID);
        const group = codeStorage.find((group) => group.id === roomID)
        
        if (group){            
            setCode(group.code);
        }
        else{
            codeStorage.push({id:roomID, code:initialCode});
        }
    });


    socket.on('leave-group',(roomID)=>{
        socket.leave(roomID);
    })

});

module.exports = {app,server}