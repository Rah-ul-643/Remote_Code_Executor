import React, { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { mobile } from "../responsive";
import { compileCode } from "../services/codeAPIs";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-twilight';
import ace from 'ace-builds';
import ChatBox from "./ChatBot/ChatBox";

ace.config.set('workerPath', process.env.PUBLIC_URL + '/ace-builds/src-noconflict');

const Container = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 118vh;
  width: 100vw;
  overflow:hidden;
`;

const Wrappper = styled.div`
margin-top:-20vh;
  display: flex;
  height: 85%;
  width: 100%;
`;


const Main = styled.div`
  display: flex;
  height: 100%;
  margin-right:1vw;
 width:100%;
  flex-direction: column;
  background-color: #21222D;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  gap: 20px;
`;

const MainTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
  width: 90%;
  gap: 10px;
`;

const MainTopSec = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
  height: 90%;
  position: relative;
`;

const MainTopText = styled.h2`
  font-weight: lighter;
  padding: 20px;
  ${mobile({ fontSize: "14px" })};
  font-family: "Orbitron";
  font-size: 25px;
`;

const MainTopImage = styled.img`
  height: 28vh;
  width: 20vw;
  position: absolute;
  margin-bottom: 0px;
  ${mobile({ height: "240px", width: "260px" })};
`;

const MainControl = styled.div`
  flex: 0.1;
  display: flex;
  justify-content: space-between;
  gap: 100px;
  align-items: center;
  text-align: center;
  width: 90%;
  ${mobile({ gap: "15%" })};
`;

const MainControlSec = styled.div`
  flex: 0.5;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;

const MainControlButton = styled.button`
  height: 50%;
  width: 50%;
  color: white;
  background-color: transparent;
  font-family: Orbitron;
  border: none;
  border-radius: 5px;
  text-align: left;
  cursor: pointer;
  ${mobile({ fontSize: "10px" })};
  &:hover {
    background-color: #884BB5;
  }
`;

const MainControlInput = styled.input``;

const MainControlModel = styled.p`
  color: #11ACAC;
`;

const MainMid = styled.div`
  flex: 2;
  background-color: #171821;
  border-radius: 20px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
`;

const MainMid1 = styled.div`
  flex: 2;
  border-radius: 20px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  gap: 100px;
  ${mobile({ gap: "50px" })};

`;

const MainMidSec = styled.div`
  align-items: center;
  text-align: center;
  gap: 10px;
  flex: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 20px;
  background-color: #171821;
`;

const MainMidSecIO = styled.div`
  flex: 1;
  align-items: center;
  text-align: center;
  gap: 10%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainMidSecInp = styled.div`
  align-items: center;
  text-align: center;
  gap: 10px;
  display: flex;
  flex-direction: column;
  background-color: #171821;
  height: 45%;
  width: 100%;
  border-radius: 20px;
`;

const MainMidSecTop = styled.div`
  display: flex;
  flex: 0.1;
  width: 95%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  margin-top: 10px;
`;

const MidSecTopText = styled.p`
  margin: 0;
  padding: 5px;
  font-size: 13px;
  color: #948d8d;
  ${mobile({ fontSize: "10px" })};
`;

const MainTab = styled.div`
  height: 100%;
  width: 25%;
  border-radius: 10px;
  background-color: #21222D;
  ${mobile({ width: "100%" })};
`;

const MainMidSecBottom = styled.div`
  display: flex;
  flex: 3;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const MainMidTextArea = styled.textarea`
  flex: 1;
  width: 100%;
  height: 90%;
  background-color: transparent;
  border: none;
  color: ${(props) => (props.clicked ? 'white' : '#808080')};
  padding: 10px;
  outline: none;
  resize: none;
  font-family: 'Poppins', sans-serif;
  spellCheck: false;
  ${mobile({ fontSize: "9px" })};
`;

const MainButton = styled.div`
  flex: 0.1;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;

const ButtonContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;

`;

const Button = styled.button`
  padding: 10px;
  width: 30%;
  background-color: #11ACAC;
  border-radius: 10px;
  border: none;
  ${mobile({ width: "50%" })};
  cursor:pointer;
`;

const CustomSelect = styled.select`
  background-color: black;
  border: none;
  text-decoration: none;
  color: white;
  font-family: Orbitron;
  ${mobile({ fontSize: "10px" })};
`;

const CodeS = () => {
  const [formData, setFormData] = useState({
    code: "print('Hello, World!')",
    input: "",
    language: "python",
    output: "",
  });

  const changeHandler = (newValue, inputName) => {
    setFormData((prevState) => ({ ...prevState, [inputName]: newValue }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("Compiling code...");
      const compiledOutput = await compileCode(formData.code, formData.input, selectedLanguage);
      setFormData({
        ...formData,
        output: compiledOutput
      });
    } catch (error) {
      console.log("Error in compiling code", error);
    }
  };

  const [selectedLanguage, setSelectedLanguage] = useState("python");
  var currentLanguage = selectedLanguage;

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setFormData({
      ...formData,
      language: e.target.value
    })
    setSelectedLanguage(e.target.value);
    currentLanguage = e.target.value;
    console.log(currentLanguage);
    resetToTemplate();
  };

  const resetToTemplate = () => {
    if (currentLanguage === 'python') {
      setFormData({
        ...formData,
        code: "print('Hello, World!')"
      });
    } else if (currentLanguage === 'cpp') {
      setFormData({
        ...formData,
        code: "#include <iostream>\nusing namespace std;\n \nint main() {\n \t// your code goes here\nreturn 0;\n}"
      });
    } else if (currentLanguage === 'java') {
      setFormData({
        ...formData,
        code: "public class Main {\n \tpublic static void main(String[] args) {\n\t// your code goes here\n\t}\n}"
      });
    } else if (currentLanguage === 'c') {
      setFormData({
        ...formData,
        code: "#include <stdio.h>\nint main() {\n// your code goes here\nreturn 0;\n}"
      });
    } else {
      setFormData({
        ...formData,
        code: "// your code goes here"
      });
    }
  };

  const resetHandler = (e) => {
    e.preventDefault();
    setFormData({
      input: "",
      output: "",
      code: "",
    });
    resetToTemplate();
  };

  const [fileContent, setFileContent] = useState('');

  const fileExtensions = {
    python: 'py',
    cpp: 'cpp',
    java: 'java',
    c: 'c'
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if(!file){
      return;
    }
    const reader = new FileReader();
    const fileType = file.name.split('.').pop();
  

    if (fileType !== fileExtensions[selectedLanguage]) {
      toast.error("File type not supported");
      return;
    }

    reader.onload = (e) => {
      setFileContent(e.target.result);
      changeHandler(e.target.result, 'code');
    };

    reader.readAsText(file);
  };

  return (
    <Container>
      <Wrappper>
        <Main>

          <MainTop>
            <MainTopSec>
              <MainTopImage src="./astro3.png"></MainTopImage>
            </MainTopSec>

            <MainTopSec>
              <MainTopText>Your Code, Our Engine, Limitless Possibilities. <span style={{ fontWeight: 800 }}>CodeNova.</span></MainTopText>
            </MainTopSec>
          </MainTop>

          <MainControl>
            <MainControlSec>
              <MainControlButton onClick={resetHandler}>Reset</MainControlButton>
            </MainControlSec>
            <MainControlSec>
              <MainControlInput type="file" onChange={handleFileUpload} />
            </MainControlSec>
            <MainControlSec>
              <MainControlModel>
                <CustomSelect defaultValue="" value={selectedLanguage} onChange={handleLanguageChange}>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="c">C</option>
                </CustomSelect>
              </MainControlModel>
            </MainControlSec>
          </MainControl>




          <MainMid1>

            <MainMidSec>
              <MainMidSecTop>
                <MainTab>
                  <MidSecTopText>Code </MidSecTopText>
                </MainTab>
              </MainMidSecTop>
              <MainMidSecBottom>

              <AceEditor
  mode="python"
  theme="twilight"
  name="code"
  onChange={(newValue) => changeHandler(newValue, 'code')}
  editorProps={{ $blockScrolling: true, style: { fontFamily: 'Courier New', fontSize: 14, backgroundColor: 'red' } }}
  width="100%"
  height="95%"
  value={formData.code}
  fontSize={16}
  setOptions={{
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showLineNumbers: true,
    tabSize: 2,
  }}
/>

              </MainMidSecBottom>
            </MainMidSec>

            <MainMidSecIO>
              <MainMidSecInp>
                <MainMidSecTop>
                  <MainTab>
                    <MidSecTopText  >Input</MidSecTopText>
                  </MainTab>
                </MainMidSecTop>
                <MainMidSecBottom>
                  <MainMidTextArea
                    value={formData.input}
                    name="input"
                    onChange={(e) => changeHandler(e.target.value, 'input')}
                  />
                </MainMidSecBottom>
              </MainMidSecInp>
              <MainMidSecInp>
                <MainMidSecTop>
                  <MainTab>
                    <MidSecTopText>Output</MidSecTopText>
                  </MainTab>
                </MainMidSecTop>
                <MainMidSecBottom>
                  <MainMidTextArea
                    value={formData.output}
                    name="output"
                    readOnly
                  />
                </MainMidSecBottom>
              </MainMidSecInp>
            </MainMidSecIO>
          </MainMid1>

          <MainButton>
            <ButtonContainer>
              <Button onClick={submitHandler}>Run</Button>
            </ButtonContainer>
          </MainButton>


          <ChatBox />
        </Main>
      </Wrappper>
    </Container>
  );
}

export default CodeS;