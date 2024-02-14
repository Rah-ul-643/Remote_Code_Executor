
const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);

const {v4: uuidv4}= require('uuid');

const executePythonCode= async (code,input)=> {

    fs.writeFileSync('pythonCode.py',code);                                                  // code stored on a file
    fs.writeFileSync('input.txt',input);
    const containerName= uuidv4();

    return new Promise( async (resolve,reject) => {

        try {
            // fire up a new python container
            await exec(`docker run -dit --name ${containerName} py:v1 sh`);    
            
            // copy the python file into the container  
            await exec(`docker cp pythonCode.py ${containerName}:/usr/python && docker cp input.txt ${containerName}:/usr/python`);   

            // run the code within the container
            const {stdout} = await exec(`docker exec -i ${containerName} sh -c "python pythonCode.py < input.txt" `);
    
            console.log("output: "+ stdout);
            resolve(stdout);
        } 

        catch (error) {

            console.log("Error in compilation or execution");

            if (error.stderr)
                reject(error.stderr);
            else reject(error);
        }


        finally{
            
            try {

                fs.unlinkSync('pythonCode.py');                                                     // remove all temporary files 
                fs.unlinkSync('input.txt');
                await exec(`docker rm -f ${containerName}`)                                         // force remove the container 
                                                                
            } catch (error) {
                console.log(`An error occured while cleaning up: ${error}`);
                reject(error);
            }
        }
            
    })
}
    

module.exports= executePythonCode;