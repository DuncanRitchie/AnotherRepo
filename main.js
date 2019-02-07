const drumkitPlay = (sound) => {
    new Audio(`./JSdrumkit-files/sounds/${sound}.wav`).play();
    drumkitElement = document.getElementById(`drumkit${sound}`);
    drumkitElement.style.animation = "drumkitAnimation 1s 1";
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
}

diceImg = document.getElementById("diceImg");
let diceTotal = 0;

const diceGameStart = () => {
    randNum = Math.ceil(Math.random()*6);
    console.log(randNum);
    diceImg.src=`./JSdiceGame/img/dice${randNum}.png`;
    diceTotal += randNum;
    if(randNum==1){
        diceTotal=0;
        document.getElementById("diceGameStart").textContent = "Play again"
        document.getElementById("diceMessage").textContent = "You rolled a one! Your total has reset!"
    }
    else {
        document.getElementById("diceGameStart").textContent = "Roll again"
        document.getElementById("diceMessage").textContent = "Press 'Roll again' to keep playing!"
        if(diceTotal>20){
            document.getElementById("diceMessage").textContent = "Your score passed 20! You win!"
        }
    }
    document.getElementById("diceTotalP").textContent = diceTotal;
}