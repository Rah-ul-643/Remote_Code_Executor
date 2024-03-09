import React from 'react'
import { useState,useEffect,useRef } from 'react';
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
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState(window.localStorage.getItem('username') || '');
  const [usernameSaved, setUsernameSaved] = useState(window.localStorage.getItem('usernameSaved') ||false);
  const [roomIDSaved, setRoomIDSaved] = useState(window.localStorage.getItem('roomIDSaved') || false);
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
  const editUsernameHandler=()=>{
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('usernameSaved');
    setUsernameSaved(false);
  }

  const [roomID, setRoomID] = useState("");
  const [inputText, setInputText] = useState("");
  const [roomIdDisplay, setRoomIdDisplay] = useState("");
  const [roomInfoSec, setRoomInfoSec] = useState("");
  const [newUserSocketID, setNewUserSocketID] = useState(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io();
    socket.current.on('status-message', (message, code) => {
      setRoomIdDisplay(message);
    });
    socket.current.on('new-socket-join-request', (requestingUserName, socketID) => {
      setNewUserSocketID(socketID);
      setRoomInfoSec(prevState => prevState + `<div id="accessQuestion" class="text-2xl font-bold"><h2>${requestingUserName} wants to join. Grant Permission?</h2><input type="radio" name="access" value="1" onclick="setAccess(true)"><label for="1">Yes</label><input type="radio" name="access" value="0" onclick="setAccess(false)"><label for="0">No</label></div>`);
    });
    socket.current.on('access-status', (accessGranted) => {
      if (accessGranted) {
        setRoomIdDisplay("Access Granted.");
        setTimeout(() => {
          socket.current.emit('join-room', roomID, username);
        }, 1000);
      } else {
        setRoomIdDisplay("Access Denied.");
      }
    });
    socket.current.on('receive-code', (code) => {
      setInputText(code);
    });
    socket.current.on('display-sockets', (sockets) => {
      let htmlContent = `<h1 class="font-bold text-xl">Participants: (${sockets.length}) </h1>`;
      sockets.forEach(object => {
        let color = object.status === 'online' ? '#0ee00b;' : '#ea0b0b;';
        htmlContent += `<h2 class="font-semibold text-lg">${object.username} <span id=${object.socketID}> <i class="fa-solid fa-circle" style="color: ${color}"></i> </span> </h2>`;
      });
      setRoomInfoSec(htmlContent);
    });
    socket.current.on('offline-socket', (id) => {
      document.getElementById(id).innerHTML = `<i class="fa-solid fa-circle" style="color: #ea0b0b;" ></i>`;
    });
    window.addEventListener('beforeunload', (event) => {
      socket.current.emit('disconnection', roomID);
    });
  }, []);

  const createRoom = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz1234567890.#$%!~_-";
    let id = '';
    for (let i = 0; i < 6; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRoomID(id);
    console.log(roomID);
    socket.current.emit("create-room", roomID);
    socket.current.emit('join-room', roomID, username);
  }

  const setAccess = (accessGranted) => {
    socket.current.emit('access-status', newUserSocketID, accessGranted);
    if (accessGranted) {
      const code = inputText;
      socket.current.emit('display-initial-code', newUserSocketID, code);
    } else {
      document.getElementById("accessQuestion").remove();
    }
  }

  const joinRoom = (id) => {
    socket.current.emit('request-join-access', socket.current.id, roomID, username);
    setRoomIdDisplay(`<h1 class="text-3xl">Requested for access...Please wait.</h1>`);
    setRoomIDSaved(true);
    window.localStorage.setItem('roomIDSaved', true);
    window.localStorage.setItem('roomID', roomID);
  }

  const sendInput = () => {
    const code = inputText;
    socket.current.emit('send-code', code, roomID);
  }

  const leaveRoom = () => {
    setRoomInfoSec("");
    setRoomIdDisplay("");
    socket.current.emit('leave-room', roomID, socket.current.id);
    setRoomID("");
  }
  return (
    <div>
        
        <Button onClick={openModal}>Rooms</Button>
            {isOpen && (
              <ModalBackground id="modal-background" onClick={closeModal}>
                <ModalContent>
                    <div>Room id: {roomIdDisplay}</div>
                  {!roomIDSaved ? (
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
                            outline:'none'
                          }}
                        />
                        <Button onClick={setUsernameHandler}>Submit</Button>
                      </>
                    ) :
                    <>
                      <h1>Rooms</h1>
                      <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1rem'}}>
                        <p>Current Username: {username} </p>
                        <Button onClick={editUsernameHandler}>Edit</Button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.1rem' }}>
                        <input
                          type="text"
                          placeholder="Enter Room ID"
                          value={room}
                          onChange={(e) => setRoom(e.target.value)}
                          style={{
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            width: '100%',
                            boxSizing: 'border-box',
                            outline:'none'
                          }}
                        />
                        <Button>Join Room</Button>
                        <p>OR</p>
                        <Button onClick={createRoom}>Create Room</Button>
                      </div>
                    </>
                  ) : (
                    <h1>Models</h1>
                  )}
                </ModalContent>
              </ModalBackground>
            )}
    </div>
  )
}

export default ChatRoom