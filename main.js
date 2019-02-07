const drumkitPlay = (sound) => {
    new Audio(`./JSdrumkit-files/sounds/${sound}.wav`).play();
    }
    
const drumkitBody = document.getElementById("drumkitBody")
    
const keycode = () => {
    let key = event.key;
    let code = event.code;
    let which = event.which;
    document.getElementById("keyP").textContent = key;
    document.getElementById("codeP").textContent = code;
    document.getElementById("whichP").textContent = which;
    console.log(code);
    switch (code) {
        case "KeyA":
        sound = "Boom";
        break;
        case "KeyS":
        sound = "Clap";
        break;
        case "KeyD":
        sound = "Hihat";
        break;
        case "KeyF":
        sound = "Kick";
        break;
        case "KeyG":
        sound = "Openhat";
        break;
        case "KeyH":
        sound = "Ride";
        break;
        case "KeyJ":
        sound = "Snare";
        break;
        case "KeyK":
        sound ="Tink";
        break;
        case "KeyL":
        sound = "Tom";
        break;
    }
    drumkitPlay(sound);
    drumkitElement = document.getElementById(`drumkit${sound}`);
    console.log(drumkitElement)
    // drumkitElement.textContent = "This is the element!"
    // drumkitElement.style.background-color = white;
}