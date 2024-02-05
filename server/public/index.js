
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
