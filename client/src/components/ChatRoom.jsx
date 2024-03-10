import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import toast from 'react-hot-toast';
import { mobile } from "./../responsive";
import io from 'socket.io-client';


const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  width: 50rem;
  background: #242424;
  padding: 20px;
  border-radius: 10px;
`;

const Button = styled.button`
padding:1rem;
background-color:#11ACAC;
border-radius:10px;
border:none;
${mobile({ width: "50%" })};

`;



const ChatRoom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  const openModal = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = "/login";
      toast.error("Please login to continue");
    }
    setIsOpen(true);
  };

  const closeModal = (e) => {
    if (e.target.id === 'modal-background') {
      setIsOpen(false);
    }
  };

  // room

  const [username, setUsername] = useState(window.localStorage.getItem('username') || '');
  const [usernameSaved, setUsernameSaved] = useState(window.localStorage.getItem('usernameSaved') || false);


  const setUsernameHandler = () => {
    if (username === '') {
      toast.error('Username cannot be empty');
      return;
    }
    console.log(username);
    window.localStorage.setItem('username', username);
    window.localStorage.setItem('usernameSaved', true);
    setUsernameSaved(true);
    toast.success('Username updated');
  }
  const editUsernameHandler = () => {
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('usernameSaved');
    setUsernameSaved(false);
  }

  const getLocalSockets = () => {
    const localsockets = window.localStorage.getItem('sockets');
    if (localsockets) {
      return JSON.parse(localsockets);
    }
    return [];
  }

  const [roomID, setRoomID] = useState(window.localStorage.getItem('roomID') || null);
  // const [inputText, setInputText] = useState("");
  const [roomIdDisplay, setRoomIdDisplay] = useState("");
  const [roomInfoSec, setRoomInfoSec] = useState(getLocalSockets());
  const [newUserSocketID, setNewUserSocketID] = useState(null);

  // ref for room id
  const roomRef = useRef(null);

  useEffect(() => {
    if (socket) {

      socket.on('status-message', (message, code) => {
        setRoomIdDisplay(message);
      });

      socket.on('display-sockets', (sockets) => {
        setRoomInfoSec(sockets);
        window.localStorage.setItem('sockets', JSON.stringify(sockets));
      });

      socket.on('offline-socket', (id) => {
        document.getElementById(id).innerHTML = `<i class="fa-solid fa-circle" style="color: #ea0b0b;" ></i>`;
      });

    }
  }, [socket]); 

  const createRoom = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz1234567890.#$%!~_-";
    let id = '';
    for (let i = 0; i < 6; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRoomID(id);

    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);

    newSocket.emit("create-room", id);
    newSocket.emit('join-room', id, username);
    
    window.localStorage.setItem('roomID', id);
  }


  const joinRoom = (e) => {
    console.log("join room");
    e.preventDefault();

    const id = roomRef.current.value;
    setRoomID(id);

    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);

    newSocket.emit('join-room', id, username);
    // newSocket.emit('request-join-access', newSocket.id, id, username);
    
    // toast.loading("Requested for access...");
    window.localStorage.setItem('roomID', id);
  }

   const sendInput = (inputText) => {
    const code = inputText;
    socket.emit('send-code', code, roomID);
  }
 

  socket.on('receive-code',(code)=>{
    console.log(code);
    setInputText(code);
})

  const leaveRoom = () => {
    setRoomInfoSec("");
    setRoomIdDisplay("");
    socket.emit('leave-room', roomID, socket.id);
    setRoomID("");
  }
  

  return (
    <div>
      <Button onClick={openModal}>Rooms</Button>
      {isOpen && (
        <ModalBackground id="modal-background" onClick={closeModal}>
          <ModalContent>
            <div>  </div>
            {!roomID ? (
              !usernameSaved ? (
                <>
                  <h2>Select a username to join rooms</h2>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                      padding: '10px',
                      fontSize: '16px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      width: '90%',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                  <Button onClick={setUsernameHandler}>Submit</Button>
                </>
              ) :
                <>
                  <h1>Rooms</h1>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                    <p>Current Username: {username} </p>
                    <Button onClick={editUsernameHandler}>Edit</Button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.1rem' }}>
                    <input
                      type="text"
                      placeholder="Enter Room ID"
                      value={roomID}
                      ref={roomRef}

                      style={{
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        width: '100%',
                        boxSizing: 'border-box',
                        outline: 'none'
                      }}
                    />
                    <Button onClick={joinRoom}>Join Room</Button>
                    <p>OR</p>
                    <Button onClick={createRoom}>Create Room</Button>
                  </div>
                </>
            ) : (
              <div>

                {/* <div>
                  <h3>Pending Request from {newUserSocketID}</h3>
                  <Button onClick={setAccess(true)}>Access</Button>
                  <Button onClick={setAccess(false)}>Deny</Button>
                </div> */}
                <h1>Participants</h1>
                <h2>Room ID: {roomID}</h2>
                <h2>Username: {username}</h2>
                <div>
                  {roomInfoSec.map((user, index) => (
                    <div key={index}>
                      <h2>{user.username}</h2>
                      <p>Status: {user.status}</p>
                      {/* You can uncomment and modify the color logic here if needed */}
                      {/* let color = user.status === 'online' ? '#0ee00b' : '#ea0b0b'; */}
                      {/* <i className="fa-solid fa-circle" style={{ color: color }}></i> */}
                    </div>
                  ))}
                </div>


              </div>
            )}
          </ModalContent>
        </ModalBackground>
      )}
    </div>
  )
  
}
module.exports={sendInput};
export default ChatRoom;

