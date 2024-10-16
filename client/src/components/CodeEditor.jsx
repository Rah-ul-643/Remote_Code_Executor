import React from "react";
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-twilight';
import ace from 'ace-builds';

ace.config.set('workerPath', process.env.PUBLIC_URL + '/ace-builds/src-noconflict');



const CodeEditor = ({ field, changeHandler, options }) => {

    
    const selectMode = () => {

        let mode = options.mode;

        if (mode==='c' || mode==='cpp' ){
            options.mode = 'csharp';
        }
        
        return options.mode;  
    }
    
    return (

        <AceEditor
            style={{zIndex:0}}
            mode={selectMode()}
            theme="twilight"
            name={options.name}
            onChange={(newValue) => changeHandler(field,newValue)}
            editorProps={{ $blockScrolling: true, style: { fontFamily: 'Courier New', fontSize: 14} }}
            width="100%"
            height="95%"
            value={options.value}
            fontSize={16}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
            }}            
        />
    )
}

export default CodeEditor;


