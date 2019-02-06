const keycode = () => {
    let key = event.key;
    let code = event.code;
    let which = event.which
    document.getElementById("keyP").textContent = key;
    document.getElementById("codeP").textContent = code;
    document.getElementById("whichP").textContent = which;
}

const drumkitPlay = (sound) => {
new Audio(`./JSdrumkit-files/sounds/${sound}.wav`).play();
}

const drumkitBody = document.getElementById("drumkitBody")
const drumkit = (event) => {
    
}