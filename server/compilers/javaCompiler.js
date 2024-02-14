
const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);

const {v4: uuidv4}= require('uuid');


const compileJavaCode= async (code,input)=> {

    const fileName= extractFileName(code);                                                             // filename must be same as classname

    fs.writeFileSync(`${fileName}.java`,code);                                                         // code written onto a file
    fs.writeFileSync('input.txt',input);
    const containerName= uuidv4();

    return new Promise( async (resolve,reject) => {

        try {
            // fire up a new java container
            await exec(`docker run -dit --name ${containerName} java:v1 sh`);    
            
            // copy the java file into the container  
            await exec(`docker cp ${fileName}.java ${containerName}:/usr/java && docker cp input.txt ${containerName}:/usr/java `);   

            // compile the code through shell within the container
            await exec(`docker exec -i ${containerName} sh -c "javac ${fileName}.java" `);

            // run the .class file generated
            const {stdout} = await exec(`docker exec -i ${containerName} sh -c "java ${fileName} < input.txt" `);   
    
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
                fs.unlinkSync(`${fileName}.java`);                                           // remove all temporary files 
                fs.unlinkSync('input.txt');
                await exec(`docker rm -f ${containerName}`)                                  // force remove the container 
                                                                
            } catch (error) {
                console.log(`An error occured while cleaning up: ${error}`);
                reject(error);
            }
        }
            
    })
}

const extractFileName = (code) =>{
    let index= code.indexOf("class")+6;
    let name='';
    while (code.charAt(index)!='{'){
        name+=code.charAt(index++);
    }
    name=name.trim()
    return name;
}

    

module.exports= compileJavaCode;