import React from "react";
import styled from "styled-components";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Loading from "./loading";
import {useState} from "react";
import Bar from "./../components/feedbar";

const Container = styled.div`
  background-image: url(${(props) => props.backgroundImage});
  width: 100vw;
  height: 100vh;
    display: ${(props) => props.display};
    flex-direction:column;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 90%;
  gap: 30px;
   margin-left: 30px;
`;

const InputContainer = styled.div`
background-color: transparent;
  width: 80%;
  padding: 20px;
  height: 40%;
  border:1px solid white;
  border-radius:10px;
  color:white;
    backdrop-filter: blur(5px);

`;

const OutputContainer = styled.div`
background-color: transparent;
  width: 80%;
  padding: 20px;
  height: 40%;
  border:0.1px solid white;
  border-radius:10px;
  color:white;
    backdrop-filter: blur(5px);
`;

const IOContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: transparent;
  height: 72%;
  justify-content:space-between;
  gap:10px;
`;

const CodeContainer = styled.div`
  display: flex;
  flex: 1.5;
  background-color: transparent;
  padding: 20px;
  height: 65%;
  border: 0.1px solid white;
  border-radius: 10px;
  color: white;
  backdrop-filter: blur(5px);
  flex-direction: column;

`;

const ButtonContainer=styled.div`
background-color:transparent;
height:50px;
width:100%;
bottom:0;
display:flex;
`;
const InputCode=styled.textarea`
height:90%;
width:90%;
background-color:transparent;
border:0;
color:white;
::placeholder {
  text-align: left; /* Align the placeholder text to the left */
  margin-top: 10px; /* Adjust the top margin as needed */
  color:white;
}
outline: none;

`;

const InputArea=styled.textarea`background-color:transparent;height:90%;
width:90%;border:0;
color:white;
outline: none;
`;
const OutputArea=styled.textarea`background-color:transparent;height:90%;
width:90%;border:0;
color:white;
outline: none;
`;
const IconContainer=styled.div`
align-self: flex-end;
margin-left: auto;
cursor:pointer;
transition: ease 0.5s; /* corrected transition property */

&:hover {
  transform: scale(1.2);
}
`;
const Main=styled.div``;

const Feed = () => {

  const [videoDisplay,setVideoDisplay]=useState("flex");
  const [codeDisplay,setCodeDisplay]=useState("none");


    const handleVideoEnded = () => {
      setVideoDisplay("none");
      setCodeDisplay("flex");
    };
  return (<Main>
    <Loading    onEnded={handleVideoEnded}  display={videoDisplay}/>
    <Container backgroundImage="https://i.ibb.co/4Z98Ms2/try.png" display={codeDisplay}>
    <Bar/>
      <Wrapper>
        <CodeContainer>
                <InputCode placeholder="#CODE YOUR DISH HERE!"></InputCode>
                <ButtonContainer>
                <IconContainer> <PlayCircleIcon sx={{ fontSize: 55 }}/></IconContainer>
                 </ButtonContainer>
        </CodeContainer>


        <IOContainer>
                  <InputContainer>
                  <InputArea placeholder="INPUT"></InputArea>
                  </InputContainer>
                  <OutputContainer>
                  <OutputArea placeholder="OUTPUT"></OutputArea>
                  </OutputContainer>
        </IOContainer>
      </Wrapper>
    </Container>
    </Main>
  );
};

export default Feed;
