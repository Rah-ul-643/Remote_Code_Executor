
const compileCppCode = require("../compilers/cppCompiler");
const compileJavaCode = require("../compilers/javaCompiler");
const executePythonCode = require("../compilers/pythonCompiler");
const { validate } = require("./validateCode");

const compileCode= (req,res)=>{
    console.log("API request hit");

    const language=req.body.language;                       // to be received from req as input. 
    const code= req.body.code;
    let input= req.body.input || "";

    console.log(language);

    if (validate(code,language)){

        if (language==='python'){
            executePythonCode(code,input)
                .then((output) => res.status(200).json(output))
                .catch((err) => res.status(400).json(`Error: \n ${err}`))
    
        }
    
        else if (language==="cpp" || language=='c'){
    
            compileCppCode(code,input)
                .then( (output) => res.status(200).json(output) )
                .catch( (error) => res.status(400).json(`Error: \n ${error};`) )
        }
    
        else if (language==="java"){
         
            compileJavaCode(code,input)
                .then((output) => res.status(200).json(output))
                .catch((err) => res.status(400).json(`Error: \n ${err}`))
        }
    
        else{
            res.status(400).send("Language not supported");
        }
    }

    else{
        res.json("The file contains malicious code");
    }

    
}

module.exports= compileCode;