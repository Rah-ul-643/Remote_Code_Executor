
import React from "react";
import styled from "styled-components";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {useState} from "react";

const LanguageOption = styled.option`
position: absolute;
  top: 100%;
  left: 0;
color:white;
background-color:transparent;
  border: 1px solid #ccc;
  z-index: 2;`;
const Language = styled.select`
padding: 5px;
cursor: pointer;
appearance: none;
background-color: transparent;
border: none;
color: white;
font-size: 14px;
position: relative;
z-index: 1;
`;
const Container = styled.div`
  display: flex;
  height: 50px;
  position: relative;
  margin-top:30px;
  margin-left:60px;
`;

const CodeFeatures = styled.div`
  display: flex;
  left: 0;
  justify-content: space-between;
  gap: 230px;
  margin:50px;
  margin-bottom:0;
`;

const BarItem = styled.div`
  /* Add styling for the bar items */
  color: white;
  font-size: 14px;
  /* Add more styles as needed */
text-align: center;
font-family:'Montaga serif';
`;
const IconContainer=styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const FileInput=styled.input``;

const Bar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("default");


    const handleLanguageChange = (event) => {
      setSelectedLanguage(event.target.value);
    };
  return (
    <Container>
      <CodeFeatures>
        <BarItem>
        <IconContainer>
<RestartAltIcon/>
        Reset
        </IconContainer></BarItem>

        <BarItem>
        <IconContainer>
        <ArrowCircleUpIcon/>
        <FileInput
        type="file"/
      >
        </IconContainer>
        </BarItem>
        <BarItem>
        <Language value={selectedLanguage} onChange={handleLanguageChange}>
             <LanguageOption value="default" disabled hidden>Choose Language</LanguageOption>
             <LanguageOption value="option1">Java</LanguageOption>
             <LanguageOption value="option2">Python</LanguageOption>
             <LanguageOption value="option3">C++</LanguageOption>
             <LanguageOption value="option4">C</LanguageOption>
           </Language>

        </BarItem>
      </CodeFeatures>
    </Container>
  );
};

export default Bar;
