
let language='';
const setLanguage= (lang)=>{
    let spanVal='';
    switch (lang) {
        case 'cpp':
            spanVal="C++";
            break;
        case 'java':
            spanVal="Java";
            break;
        case 'python':
            spanVal="Python";
            break;
        case 'js':
            spanVal="JavaScript";
            break;
    }
    language=lang;
    document.getElementById('language').innerHTML=spanVal;
}
document.addEventListener('load',setLanguage('python'));
document.getElementById('form').addEventListener('submit', function(event) {
    
    event.preventDefault(); // Prevents the default form submission

    // Get the value from the textarea

    const codeInputValue = document.getElementById('codeInputSection').value;
    const output= document.getElementById('output');

    console.log(codeInputValue);
    console.log(language);
    fetch('/api/v1/code/compile', {
        method: 'POST',
        body: JSON.stringify({ code: codeInputValue , language : language}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response =>  response.json()
    )
    .then(data => output.innerHTML=`->${data}`
    )

});

// chatroom wala part-------------------------------------------------------------------------------------


const joinRoomBtn= document.getElementById("join-room");
const roomIdElement= document.getElementById("room-id");
const createRoomBtn= document.getElementById("create-room");
const roomInfoSec= document.getElementById('room-info-sec');
const roomIdDisplay = document.getElementById("room-id-display");
const leaveRoomBtn = document.getElementById('leave-room');

const inputText= document.getElementById('codeInputSection');
const userName= document.getElementById('username');

const socket= io();

let username="";
let roomID="";

const setUsername= ()=>{
    username=userName.value;
    console.log(username);
}

const setRoomID= (id)=>{
    roomID=id;
}

const createRoom= ()=>{

    const chars= "abcdefghijklmnopqrstuvwxyz1234567890.#$%!~_-";

    let id='';

    for (let i=0;i<6;i++){
        id+= chars.charAt(Math.floor(Math.random()*chars.length));
    }
    console.log("Room ID:",id);
    setRoomID(id);
    socket.emit("create-room", roomID);
    socket.emit('join-room', roomID,username);                  // add username

}

socket.on('status-message',(message,code)=>{
    roomIdDisplay.innerHTML= message;
})

let newUserSocketID;

const setAccess = (accessGranted)=>{

    socket.emit('access-status',newUserSocketID,accessGranted);
    if (accessGranted){
        const code=inputText.value;
        socket.emit('display-initial-code',newUserSocketID,code);
    }
    else{
        document.getElementById("accessQuestion").remove();
    }
}


socket.on('new-socket-join-request',(requestingUserName,socketID)=>{
    newUserSocketID= socketID;
    roomInfoSec.innerHTML+= `
        <div id="accessQuestion" class="text-2xl font-bold">
        <h2>${requestingUserName} wants to join. Grant Permission?</h2>
        <input type="radio" name="access" value="1" onclick="setAccess(true)">
        <label for="1">Yes</label>
        <input type="radio" name="access" value="0" onclick="setAccess(false)">
        <label for="0">No</label>
        </div>
    `

})

socket.on('access-status',(accessGranted)=>{
    if (accessGranted){
        roomIdDisplay.innerHTML= "Access Granted."
        setTimeout(() => {
            socket.emit('join-room', roomID,username);              // add username
            socket.on('status-message',(message,code)=>{
            roomIdDisplay.innerHTML= message;
        })
        }, 1000);
    }

    else{
        roomIdDisplay.innerHTML= `Access Denied.`;
    }
})

const joinRoom= ()=>{
    socket.emit('request-join-access',socket.id,roomID,username);
    roomIdDisplay.innerHTML=`<h1 class="text-3xl">Requested for access...Please wait.</h1>`
}

joinRoomBtn.addEventListener('click',()=>{
    const id= roomIdElement.value;
    setRoomID(id);
    joinRoom();
})

socket.on('receive-code',(code)=>{
    console.log(code);
    inputText.value=code;
})


const sendInput= ()=>{
    const code=inputText.value;
    console.log(code);
    socket.emit('send-code',code,roomID);
}

socket.on('display-sockets', (sockets)=> {
    
    htmlContent=`<h1 class="font-bold text-xl">Participants: (${sockets.length}) </h1>`
    sockets.forEach(object => {
        let color='';
        if (object.status==='online'){
            color='#0ee00b;';
        }
        else{
            color= '#ea0b0b;'
        }
        htmlContent+= `<h2 class="font-semibold text-lg">${object.username} <span id=${object.socketID}> <i class="fa-solid fa-circle" style="color: ${color}"></i> </span> </h2>`
    });

    roomInfoSec.innerHTML= htmlContent;
})


const leaveRoom= ()=>{
    roomInfoSec.innerHTML='';
    roomIdDisplay.innerHTML='';
    socket.emit('leave-room',roomID,socket.id);
    roomID=''
}

socket.on('offline-socket', (id)=>{
    document.getElementById(id).innerHTML=`<i class="fa-solid fa-circle" style="color: #ea0b0b;" ></i>`;
})

leaveRoomBtn.addEventListener('click',leaveRoom);

window.addEventListener('beforeunload', (event)=> {
    socket.emit('disconnection', roomID);
});

