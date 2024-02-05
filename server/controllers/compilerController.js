
const compileCppCode = require("../compilers/cppCompiler");
const compileJavaCode = require("../compilers/javaCompiler");
const executePythonCode = require("../compilers/pythonCompiler");

compileCode= (req,res)=>{

    const language=req.body.language;                       // to be received from req as input. 
    const code= req.body.code;
    let input= req.body.input || "";


    if (language==='python'){
        
        executePythonCode(code,input)
            .then((output) => res.status(200).json(output))
            .catch((err) => res.status(400).json(`Error: \n ${err}`))

    }

    else if (language==="cpp"){

        compileCppCode(code,input)
            .then( (output) => res.status(200).json(output) )
            .catch( (error) => res.status(400).json(`Error: \n ${error};`) )
    }

    else if (language==="java"){
     
        compileJavaCode(code,input)
            .then((output) => res.status(200).json(output))
            .catch((err) => res.status(400).json(`Error: \n ${err}`))
    }
    
}

module.exports= compileCode;