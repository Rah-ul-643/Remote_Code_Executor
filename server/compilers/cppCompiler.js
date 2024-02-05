const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);

const {v4: uuidv4}= require('uuid');

const compileCppCode= async (code,input)=> {

    fs.writeFileSync('cppCode.cpp',code);                                                         // code written onto a file
    fs.writeFileSync('input.txt',input);
    const containerName= uuidv4();

    return new Promise( async (resolve,reject) => {

        try {
            // fire up a new cpp container
            await exec(`docker run -dit --name ${containerName} cpp:v1 sh`);    
            
            // copy the cpp file into the container  
            await exec(`docker cp cppCode.cpp ${containerName}:/usr/cpp && docker cp input.txt ${containerName}:/usr/cpp`);   

            // compile the code through shell within the container
            await exec(`docker exec -i ${containerName} sh -c "g++ cppCode.cpp -o cppCode" `);

            // run the exe file generated
            const {stdout} = await exec(`docker exec -i ${containerName} ./cppCode  < input.txt`);   
    
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
                await exec(`docker rm -f ${containerName}`)                               // force remove the container 
                fs.unlinkSync('cppCode.cpp');                                             // remove all temporary files 
                fs.unlinkSync('input.txt');

            } catch (error) {
                console.log(`An error occured while cleaning up: ${error}`);
                reject(error);
            }
        }
            
    })
}
    

module.exports= compileCppCode;