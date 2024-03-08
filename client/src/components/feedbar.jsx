
import React from "react";
import styled from "styled-components";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useState } from "react";
import FileUpload from "../components/FileUpload";

const LanguageOption = styled.option`
  position: absolute;
  top: 100%;
  left: 0;
  color:white;
  background-color:black;
  border: 1px solid #ccc;
  z-index: 2;
`;
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
const IconContainer = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const FileInput = styled.input``;

const Bar = ({ setFormData, formData, setCode}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setFormData({
      ...formData,
      language: e.target.value
    })
    console.log(formData.language);
  };
  const resetHandler = (e) => {
    e.preventDefault();
    setCode("# START YOUR CODE HERE");
    setFormData({
      input: "",
      output: "",
      language: "python"
    });
  }
  return (
    <Container>
      <CodeFeatures>
        <BarItem>
          <IconContainer>

            <button onClick={resetHandler}>
              <RestartAltIcon />
              Reset
            </button>

          </IconContainer></BarItem>

        <BarItem>
          <IconContainer>
            <ArrowCircleUpIcon />
            <FileUpload setCode={setCode} selectedLanguage={selectedLanguage}></FileUpload>
          </IconContainer>
        </BarItem>
        <BarItem>
          <Language value={selectedLanguage} onChange={handleLanguageChange}>
            <LanguageOption value="java">Java</LanguageOption>
            <LanguageOption value="python">Python</LanguageOption>
            <LanguageOption value="cpp">C++</LanguageOption>
            <LanguageOption value="c">C</LanguageOption>
          </Language>

        </BarItem>
      </CodeFeatures>
    </Container>
  );
};

export default Bar;
