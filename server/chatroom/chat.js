
const roomDetails={}    // format--> {'room1':[{'username':'xyz','socketID':'1234',status:'online'}],'room2':[{},{},]};
const rooms=[];

const createRoom= (roomID)=>{
  if (! rooms.includes(roomID)){
    roomDetails.roomID=[];
    rooms.push(roomID);
  }
}
const existingUser= (roomID,userName)=>{

  let existing=false;
  
  roomDetails.roomID.forEach(user=>{
    if (user.username===userName){
      existing=true;
      user.status='online';                     // user exists, hence change the status to online.
    }
  })

  return existing;

}

const sendRoomDetails= (io,socket,roomID,userName)=>{
  const sockets= roomDetails.roomID;

  io.to(roomID).emit('display-sockets',sockets);
  const message= "User Name: "+userName +" Joined room: "+ roomID;
  socket.emit('status-message',message,200);

}


const joinRoom= (io, socket, roomID, userName)=>{

  socket.join(roomID);
  console.log("User: "+socket.id +" joined room "+ roomID);
  roomDetails.roomID.push({'username':userName,'socketID':socket.id,'status':'online'});

  sendRoomDetails(io,socket,roomID,userName);

}

const joinRoomRequest = (io,socket,socketID,roomID,username)=>{

  if (rooms.includes(roomID)){

    if (! existingUser(roomID,username))
      socket.to(roomID).emit('new-socket-join-request',username,socketID);
    
    else{
      socket.join(roomID);
      console.log("User: "+socket.id +" joined room "+ roomID);
      sendRoomDetails(io,socket,roomID,username);
    }
      
  }
  else{
    const message= "No such room exists";
    socket.emit('status-message',message,400);
    console.log("No such room exists");
  }
}

const isEmpty= (roomID)=>{
  let isempty=true;
  const room=roomDetails.roomID;
  room.forEach(user => {
    if (user.status==='online'){
      isempty=false;
    }
  });

  return isempty;
}
const leaveRoom = (socket,roomID,socketID)=>{
  socket.leave(roomID);

  const index= roomDetails.roomID.findIndex(obj=>socketID===obj.socketID);
  roomDetails.roomID[index].status='offline';
  
  if (isEmpty(roomID)){
    delete roomDetails.roomID;
    const i= rooms.findIndex(id=> id===roomID);
    rooms.splice(i);
  }

  socket.to(roomID).emit('offline-socket',socketID);
}


module.exports= {joinRoom,createRoom,joinRoomRequest,leaveRoom};