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
        sound = "boom";
        break;
        case "KeyS":
        sound = "clap";
        break;
        case "KeyD":
        sound = "hihat";
        break;
        case "KeyF":
        sound = "kick";
        break;
        case "KeyG":
        sound = "openhat";
        break;
        case "KeyH":
        sound = "ride";
        break;
        case "KeyJ":
        sound = "snare";
        break;
        case "KeyK":
        sound ="tink";
        break;
        case "KeyL":
        sound = "tom";
        break;
    }
    drumkitPlay(sound);
    document.getElementById(`drumkit${sound}`).style.background-color = white;
}

const drumkitPlay = (sound) => {
new Audio(`./JSdrumkit-files/sounds/${sound}.wav`).play();
}

const drumkitBody = document.getElementById("drumkitBody")