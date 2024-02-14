import React, { useState } from 'react';
import toast from 'react-hot-toast';

const FileUpload = ({setCode,selectedLanguage}) => {
  const [fileContent, setFileContent] = useState('');

  const fileExtensions= {
    python: 'py',
    cpp: 'cpp',
    java: 'java',
    c: 'c'
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const fileType = file.name.split('.').pop();
  
    if (fileType !== fileExtensions[selectedLanguage]) {
      toast.error("File type not supported");
      return;
    }


    reader.onload = (e) => {
      // Once the file is loaded, set the content to state
      setFileContent(e.target.result);
      setCode(e.target.result);
    };

     reader.readAsText(file); // Read file as text
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;