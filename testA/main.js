const textInput = document.querySelector('.textInput'); //first input
const inputContent = document.querySelector('.inputContent'); //inputted text display
const button = document.querySelector('.button'); //save text button
const savedContent = document.querySelector('.savedContent');

//takes from stored input
savedContent.textContent = localStorage.getItem('storedName');

//updates inputContent
textInput.addEventListener('input', textInput => {
    inputContent.textContent = textInput.target.value
    inputContent.style.color = "black";
})


//updating stored content
const saveToLocalStorage = () => {
    localStorage.setItem('storedName', inputContent.textContent) //we use the replicated thing for some reason...
    inputContent.style.color = "blue";
    savedContent.textContent = localStorage.getItem('storedName');
}

button.addEventListener('click', saveToLocalStorage)