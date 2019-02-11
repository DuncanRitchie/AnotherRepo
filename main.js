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

let currentPlayer = 1;
// let numPlayers = document.getElementsByClassName("diceImg").length;
let numPlayers = 1;
let diceTotals=[];
let diceInput=document.getElementById("diceInput");
let diceInputDiv=document.getElementById("diceInputDiv");
let diceButton=document.getElementById("diceStartButton");
let dicePA=document.getElementById("dicePlayArea");

const diceStart = () => {
    let diceImgsAndTotalsContent = "";
    numPlayers = document.getElementById("diceInput").value;
    console.log(`Number of players is ${numPlayers}`)
    for(i=0;i<numPlayers;i++){
        diceTotals.push(0)
        diceImgsAndTotalsContent += document.getElementById("diceImgsAndTotals").innerHTML;
    }
    console.log(`Initial dice totals are ${diceTotals}`);
    document.getElementById("diceImgsAndTotals").innerHTML = diceImgsAndTotalsContent;
    // document.getElementById("diceImgsAndTotals").style.display = flex;
    for (i=0;i<numPlayers;i++){
        document.getElementsByClassName("diceTotalH")[i].textContent=`Player ${i+1} Total`;
    }
    diceInputDiv.style.display="none";
    diceButton.style.display="none";
    dicePA.style.display="block";
    document.getElementById("diceMessage").textContent = "Roll the die! What's the first score you will get?"
}

diceButton.addEventListener("click",diceStart)

const dicePlay = () => {
    let diceImg = document.getElementsByClassName("diceImg")[currentPlayer-1];
    let diceTotalP = document.getElementsByClassName("diceTotalP")[currentPlayer-1];
    randNum = Math.ceil(Math.random()*6);
    console.log(`You rolled a ${randNum}`);
    diceImg.src=`./JSdiceGame/img/dice${randNum}.png`;
    diceTotals[currentPlayer-1] += randNum;
    if(randNum==1){
        diceTotals[currentPlayer-1]=0;
        document.getElementById("dicePlay").textContent = `Player ${currentPlayer}: Click to roll!`
        document.getElementById("diceMessage").textContent = "You rolled a one! Your total has reset!"
    }
    diceTotalP.textContent = diceTotals[currentPlayer-1];
    if(currentPlayer==numPlayers){
        currentPlayer=1
    }
    else{
        currentPlayer+=1
    }
    if (randNum>1) {
        document.getElementById("dicePlay").textContent = `Player ${currentPlayer}: Click to roll!`
        document.getElementById("diceMessage").textContent = "What new score will the next contender get?"
        if(diceTotals[currentPlayer-1]>20){
            document.getElementById("dicePlay").textContent = `Player ${currentPlayer} wins!`;
            document.getElementById("diceMessage").innerHTML = "Your score passed 20! You have won your bet!";
            document.getElementById("diceImgsAndTotals").style.display="none";
            document.getElementById("dicePlay").onclick="";
            document.querySelector("#dicePlay:hover").style.color="black";
        }
    }
    console.log(`The current player is ${currentPlayer}`)
}