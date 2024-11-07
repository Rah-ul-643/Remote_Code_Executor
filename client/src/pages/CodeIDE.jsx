import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import io from 'socket.io-client';
import toast from "react-hot-toast";

import { mobile } from "../responsive"

// import ChatBox from "../components/ChatBot/ChatBox";
import CodeEditor from "../components/CodeEditor";
import EditorUtilityBar from "../components/EditorUtilityBar";
import CollabCoding from "../components/CollabCoding";
import ChatBox from '../components/ChatBox';

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL;


const Main = styled.div`
  color: white;
  display: flex;
  height: 100vh;
  margin-right:1vw;
  width:100vw;
  background-color: #21222D;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  gap: 20px;
`;

const MainLeftSec = styled.div`
  align-items: center;
  text-align: center;
  gap: 10px;
  flex: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 60%;
  border-radius: 20px;
  background-color: #171821;
`;

const ModalButton = styled.button`
  font-family: 'Montaga', serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 25%;
  border-radius: 10px;
  background-color: ${(props) => (props.isselected ? '#f1f1f1' : '#21222D')};
  ${mobile({ width: "100%" })};
  border: solid green 2px;
  cursor: pointer;
  margin-right: 30px;
  color: green;
  font-size: 1.2rem;
`

const TextIOContainer = styled.div`
  display: flex;
  background-color: transparent;
  flex: 3;
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;


const FilesListControl = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;
  text-align: center;
  background-color: #181414;
  min-height: 30px;
  border-radius: 5px 5px 0 0;
  gap: 10px;
  overflow-x: auto;
`
const NewFileButton = styled.button`
  background-color: #282424;
  height: 100%;
  margin: 0 30px 0 0;
  width: 45px;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  border: green solid 2px;
  border-bottom: none;
`

const FileListItem = styled.div`
  display: flex;
  box-sizing: border-box;
  min-width: 70px;
  height: 100%;
  padding: 2px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) => (props.isselected ? '#282424' : 'transparent')};
  
  
  &:hover{
    background-color: white;
    color: green;
  }
`
const FileListItemText = styled.div`
  width: 100%;
  padding: 2px;
  margin: 4px;
`
const CloseBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  padding:0;
  color: #f70a0a;
`

const MainRightSec = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  text-align: center;
  flex: 1;
  width: 40%;
  height: 90%;
  gap: 10px;
`

const RightSecTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
  width: 90%;
`;

const RightSecTopItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  flex: 1;
  position: relative;
`;

const RightSecTopText = styled.h2`
  font-weight: lighter;
  ${mobile({ fontSize: "14px" })};
  font-family: "Orbitron";
  font-size: 20px;
`;

const RightSecTopImage = styled.img`
  height: 15vh;
  width: 10vw;
  position: absolute;
  margin-bottom: 0px;
  ${mobile({ height: "240px", width: "260px" })};
`;


const RightSecBottom = styled.div`
  flex: 2;
  border-radius: 20px;
  width: 90%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 50px;
`;


const RightSecInputContainer = styled.div`
  align-items: center;
  text-align: center;
  gap: 10px;
  display: flex;
  flex-direction: column;
  background-color: #171821;
  height: 100%;
  width: 100%;
  border: solid white 2px;
  border-radius: 20px;
  min-height: 200px;
`;

const SectionTitleContainer = styled.div`
  display: flex;
  flex: 0.1;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-top: 10px;
`;


const MainTab = styled.div`
  height: 100%;
  width: 25%;
  border-radius: 10px;
  background-color: #21222D;
  ${mobile({ width: "100%" })};
`;

const SectionTitleText = styled.p`
  margin: 0;
  padding: 5px;
  font-size: 1rem;
  font-weight: bold;
  color: green;

  ${mobile({ fontSize: "10px" })};
`;

const RightIOTextArea = styled.textarea`
  flex: 1;
  width: 100%;
  height: 90%;
  background-color: transparent;
  border: none;
  color: ${(props) => (props.success ? 'white' : 'red')};
  font-size: 1rem;
  line-spacing: 2px;
  padding: 10px;
  outline: none;
  resize: none;
  font-family: 'Poppins', sans-serif;
  spellCheck: false;
  ${mobile({ fontSize: "9px" })};
`;



const CodeIDE = () => {
  const [socket, setSocket] = useState(null);
  const [currentModal, setCurrentModal] = useState(0);
  const [formData, setFormData] = useState({
    input: '',
    output: '',
    files: [
      {
        id: 1,
        filename: 'Default File',
        language: 'python',
        code: "print('Hello, World!')",
      },
    ],
  });
  const [currFile, setCurrFile] = useState(1);
  const [roomId, setRoomId] = useState(null);

  const currentFileIndex = useMemo(() => formData.files.findIndex((file) => file.id === currFile), [formData.files, currFile]);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, {
      query: { token: JSON.parse(localStorage.getItem('token')) },
    });
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('set-code', (code) => {
  
      const updatedFiles = formData.files.map((file) =>
        file.id === 1 ? { ...file, code } : file
      );
      changeHandler('files', updatedFiles);
    });
  },[socket]);

  const changeHandler = (field, newValue) => {
    setFormData((prevState) => ({ ...prevState, [field]: newValue }));
  };

  const updateCode = (_unused,code) => {

    const updatedFiles = formData.files.map((file) =>
      file.id === currFile ? { ...file, code } : file
    );
    changeHandler('files', updatedFiles);

    if (roomId && currFile === 1) {
      socket.emit('send-code', code, roomId);
    }
  };

  const createNewFile = (name) => {
    if (formData.files.length >= 10) {
      toast.error('Maximum 10 files allowed! Please remove a file to create a new one.');
      return;
    }

    const newId = formData.files[formData.files.length - 1].id + 1;
    const newFile = {
      id: newId,
      filename: name || `file ${newId}`,
      language: 'python',
      code: '// Python Selected.\n// Change to the language of your choice.\n// Happy Coding :)',
    };

    const updatedFiles = [...formData.files, newFile];
    setCurrFile(newId);
    changeHandler('files', updatedFiles);
  };

  const handleCloseFile = (id) => {
    if (id === 1) return;

    const updatedFiles = formData.files.filter((file) => file.id !== id);
    setCurrFile(1);
    changeHandler('files', updatedFiles);
  };

  const checkOutput = () => {
    try {
      return !formData.output.startsWith('Error:');
    } catch {
      return false;
    }
  };

  return (
    <Main>
      <MainLeftSec>
        <SectionTitleContainer>
          <ModalButton isselected={currentModal === 0} onClick={() => setCurrentModal(0)}>
            <SectionTitleText>Code </SectionTitleText>
            <i className="fa-solid fa-code"></i>
          </ModalButton>
          <ModalButton isselected={currentModal === 1} onClick={() => setCurrentModal(1)}>
            <SectionTitleText>Connect </SectionTitleText>
            <i className="fa-solid fa-users"></i>
          </ModalButton>
        </SectionTitleContainer>

        {currentModal === 0 && (
          <TextIOContainer>
            <FilesListControl>
              <NewFileButton onClick={() => createNewFile('')}>
                <i className="fa-solid fa-file-circle-plus"></i>
              </NewFileButton>
              {formData.files.map((file) => (
                <FileListItem key={file.id} isselected={currFile === file.id}>
                  <FileListItemText onClick={() => setCurrFile(file.id)}>{file.filename}</FileListItemText>
                  <CloseBtnContainer>
                    <CloseButton onClick={() => handleCloseFile(file.id)}>
                      <i className="fa-solid fa-circle-xmark"></i>
                    </CloseButton>
                  </CloseBtnContainer>
                </FileListItem>
              ))}
            </FilesListControl>

            <EditorUtilityBar formData={formData} currFile={currFile} changeHandler={changeHandler} />

            <CodeEditor
              options={{
                mode: formData.files[currentFileIndex].language,
                name: formData.files[currentFileIndex].filename,
                value: formData.files[currentFileIndex].code,
              }}
              changeHandler={updateCode}
              field="code"
            />
          </TextIOContainer>
        )}

        {currentModal === 1 && (
          <TextIOContainer>
            <CollabCoding
              setRoomId={setRoomId}
              roomId={roomId}
              socket={socket}
              updateCode={updateCode}
              code={formData.files[0].code}
            />
          </TextIOContainer>
        )}
      </MainLeftSec>

      <MainRightSec>
        <RightSecTop>
          <RightSecTopItem>
            <RightSecTopImage src="./astro3.png" />
          </RightSecTopItem>

          <RightSecTopItem>
            <RightSecTopText>
              Break free! Enter the Cypher Matrix...{' '}
              <span style={{ fontWeight: 800 }}>&lt;CypherFlow /&gt;</span>
            </RightSecTopText>
          </RightSecTopItem>
        </RightSecTop>

        <RightSecBottom>
          <RightSecInputContainer>
            <SectionTitleContainer>
              <MainTab>
                <SectionTitleText>Input</SectionTitleText>
              </MainTab>
            </SectionTitleContainer>
            <TextIOContainer>
              <CodeEditor
                options={{
                  mode: 'text',
                  name: 'input',
                  value: formData.input,
                }}
                field="input"
                changeHandler={changeHandler}
              />
            </TextIOContainer>
          </RightSecInputContainer>
            
          <RightSecInputContainer>
            <SectionTitleContainer>
              <MainTab>
                <SectionTitleText>Output</SectionTitleText>
              </MainTab>
            </SectionTitleContainer>
            <TextIOContainer>
              <RightIOTextArea value={formData.output} name="output" readOnly success={checkOutput()} />
            </TextIOContainer>
          </RightSecInputContainer>
        </RightSecBottom>
      </MainRightSec>

      <ChatBox /> 
    </Main>
  );
};

export default CodeIDE;