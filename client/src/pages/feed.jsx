import React from "react";
import styled from "styled-components";
import PlayCircleIcon from '@mui/icons-material/PlayCircle'; 
const Container = styled.div`
  background-image: url(${(props) => props.backgroundImage});
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 100%;
  gap: 30px;
  margin: 30px;
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
  height: 80%;
  justify-content:space-between;
  gap:10px;
`;

const CodeContainer = styled.div`
  display: flex;
  flex: 1.5;
  background-color: transparent;
  padding: 20px;
  height: 75%;
  border:0.1px solid white;
  border-radius:10px;
  color:white;
  backdrop-filter: blur(5px);
  flex-direction:column;

`;

const Text=styled.p`
font-size:10px;
font-family:"Montaga ";
letter-spacing:2px;
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
`;


const Feed = () => {
  return (
    <Container backgroundImage="https://i.ibb.co/swqPkpj/Untitled-design-4.png">
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
  );
};

export default Feed;
