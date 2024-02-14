import React from "react";
import styled from "styled-components";
import video from '../video/space.mp4';
import {Link} from  'react-router-dom';
import {mobile } from "./../responsive";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
  background-color: transparent; /* Set the background color to transparent */
  flex-direction:column;
`;

const InfoContainer = styled.div`
  flex: 1;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 40;
  background-color: transparent; /* Set the background color to transparent */
`;

const Title = styled.h1`
  font-size: 100px;
  font-family: 'Orbitron', serif;
  color: white;
  font-weight: 800;
  letter-spacing: 5px;
  margin-bottom:10px;
  ${mobile({ fontSize: "45px", })};
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-family: 'Orbitron', serif;
  font-size: 20px;
  letter-spacing: 3px;
  font-weight: lighter;
  color: white;
  word-spacing: 6px;
  margin-top: 0;
    ${mobile({ fontSize: "10px",padding:"10px" })};
`;

const VideoContainer = styled.div`
  display: flex;
  margin-left:-5vw;
  ${mobile({ width:"100vw",height:"100vh"})};
  video {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Make sure the video covers the entire container */
  }
`;

const ButtonContainer=styled.button`
border-radius:30px;
width:10vw;
padding:10px;
border:1px solid white;
background-color:transparent;
color:white;
text-decoration:none;
cursor:pointer;
z-index:2;
${mobile({ width:"120px"})};
`;

const Nav=styled.div`
display:flex;
justify-content:space-between;
gap:5vw;
right:8vw;
top:3vh;
height:100px;
position:absolute;
z-index:1;
${mobile({ right:"15vw"})};
`;

const Front = () => {
  return (
    <Container>
    <Nav>
    <Link to='/login'>    <ButtonContainer>Login</ButtonContainer></Link>
    <Link to='/register'>    <ButtonContainer>Register</ButtonContainer></Link>
    </Nav>
      <VideoContainer>
        <video width="100%" height="100%" autoPlay loop muted playsInline  >
          <source src={video} type="video/mp4" />
        </video>
      </VideoContainer>

      <InfoContainer>
        <Title>CodeNova</Title>
        <Desc>Master Algorithms, Unleash Creativity: Begin Your Coding Odyssey Here</Desc>
    <Link to='/start'>    <ButtonContainer>Start Now</ButtonContainer></Link>
      </InfoContainer>
      </Container>
  );
};

export default Front;
