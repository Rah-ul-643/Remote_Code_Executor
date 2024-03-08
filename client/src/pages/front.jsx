import React from "react";
import styled from "styled-components";
import video from '../video/space.mp4';
import {Link} from  'react-router-dom';

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
  font-family: 'Urbanist', serif;
  color: white;
  font-weight: 800;
  margin-bottom:10px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-family: 'Montaga', serif;
  font-size: 25px;
  letter-spacing: 3px;
  font-weight: lighter;
  color: white;
  word-spacing: 6px;
  margin-top: 0;
`;

const VideoContainer = styled.div`
  display: flex;
`;

const ButtonContainer=styled.button`
border-radius:30px;
width:150px;
padding:10px;
border:1px solid white;
background-color:transparent;
color:white;
text-decoration:none;
cursor:pointer;
z-index:2;`;

const Nav=styled.div`
display:flex;
justify-content:space-between;
gap:50px;
right:50px;
top:10px;
height:100px;
position:absolute;
z-index:1;
`;
const token = window.localStorage.getItem("token");

const logoutHandler = () => {
  window.localStorage.removeItem("token");
  window.location.reload();
}

const Front = () => {
  return (
    <Container>
    <Nav>
      { !token &&
        <div>
        <Link to='/login'>    <ButtonContainer>Login</ButtonContainer></Link>
        <Link to='/register'>    <ButtonContainer>Register</ButtonContainer></Link>
      </div>
      }
      {
        token &&
          <ButtonContainer onClick={logoutHandler}>Logout</ButtonContainer>
      }
      
    </Nav>
      <VideoContainer>
        <video width="100%" height="100%" autoPlay loop muted playsInline >
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