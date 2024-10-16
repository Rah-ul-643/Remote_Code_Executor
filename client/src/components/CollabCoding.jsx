import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";


const GroupChatContainer = styled.div`
  box-sizing: border-box;
  background-color: #181414;
  height:90%;
  width: 95%;
  border-radius: 10px; 
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: #ffffff;
  font-family: 'Urbanist', serif;
`;

const IntroText = styled.h2`
    color: green;
    font-size: 1.4rem;
    font-family: "Orbitron";
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #282424;
  padding: 20px;
  border-radius: 10px;
  width: 40%;
`;

const ContainerHeading = styled.h2`

`

const RoomButton = styled.button`
  background-image: linear-gradient(to right, #d848f5, #8800ff);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  font-family: "Orbitron";  
`;


const RoomIdText = styled.p`
  font-size: 1.2rem;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  color: #d848f5;
  font-family: 'Montaga', serif;
`;


const InputField = styled.input`
  padding: 10px;
  width: 80%;
  border-radius: 5px;
  outline: none;
  background-color: white;
  color: black;
  font-size: 1rem;
  margin-top: 20px;
`;

const GroupChat = ({roomId, setRoomId, code, socket, updateCode}) => {

    const [inputRoomId, setInputRoomId] = useState(null);

    const createRoom = () => {
        const newRoomId = Math.random().toString(36).substring(2, 10);
        setRoomId(newRoomId);
        joinRoom(newRoomId);
        toast.success(`Created and Joined Room: ${newRoomId}`);
    };

    const handleRoomJoin = () => {
        setRoomId(inputRoomId);
        joinRoom(inputRoomId);
        toast.success(`Joined Room: ${inputRoomId}`);
    };

    const joinRoom = (roomID) => {
        socket.emit('join-room',roomID,code,(initialCode)=>{
          updateCode('',initialCode);
        });
        
    }


    return (
        <GroupChatContainer>
            {/* Intro text */}
            <IntroText>&lt; Invite your friends into the Matrix <br/> Let the Cypher Flow ignite! /&gt;</IntroText>
            
            {/* Create Room Section */}
            <InnerContainer>
                <ContainerHeading>Create Room</ContainerHeading>
                {!roomId && <RoomButton onClick={createRoom}>Create Room</RoomButton>}
                {roomId && <RoomIdText>Room ID: {roomId}</RoomIdText>}
            </InnerContainer>

            {/* Join Room Section */}
            <InnerContainer>
                <ContainerHeading>Join Room</ContainerHeading>
                <InputField
                    type="text"
                    placeholder="Enter Room ID"
                    value={inputRoomId}
                    onChange={(e) => setInputRoomId(e.target.value)}
                />
                <RoomButton onClick={handleRoomJoin}>Join Room</RoomButton>
            </InnerContainer>
        </GroupChatContainer>
    );
};

export default GroupChat;
