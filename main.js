const drumkitPlay = (Sound) => {
    sound = Sound.toLowerCase();
    new Audio(`./JSdrumkit-files/sounds/${sound}.wav`).play();
    drumkitElement = document.getElementById(`drumkit${Sound}`);
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
let diceBody=document.getElementById("diceBody");
let diceInput=document.getElementById("diceInput");
let diceInputDiv=document.getElementById("diceInputDiv");
let diceInputP=document.getElementById("diceInputP");
let diceStartButton=document.getElementById("diceStartButton");
let dicePA=document.getElementById("dicePlayArea");
let dicePlayH=document.getElementById("dicePlayH");
let diceIsAndTs=document.getElementById("diceImgsAndTotals");
let diceMessage=document.getElementById("diceMessage");

const diceStart = () => {
    if(diceInput.value>0 && diceInput.value%1==0){
        let diceImgsAndTotalsContent = "";
        numPlayers = diceInput.value;
        console.log(`Number of players is ${numPlayers}`)
        for(i=0;i<numPlayers;i++){
            diceTotals.push(0)
            diceImgsAndTotalsContent += diceIsAndTs.innerHTML;
        }
        console.log(`Initial dice totals are ${diceTotals}`);
        diceIsAndTs.innerHTML = diceImgsAndTotalsContent;
        for (i=0;i<numPlayers;i++){
            document.getElementsByClassName("diceTotalH")[i].textContent=`Player ${i+1} Total`;
        }
        diceInputDiv.style.display="none";
        diceStartButton.style.display="none";
        dicePA.style.display="block";
        diceMessage.textContent = "Roll the die! What's the first score you will get?"
}
    else {
        diceInputP.textContent = "That's not a valid number we can let!"
    }
}

if (diceStartButton!==null){diceStartButton.addEventListener("click",diceStart)}

const dicePlay = () => {
    let diceImg = document.getElementsByClassName("diceImg")[currentPlayer-1];
    let diceTotalP = document.getElementsByClassName("diceTotalP")[currentPlayer-1];
    randNum = Math.ceil(Math.random()*6);
    console.log(`You rolled a ${randNum}`);
    diceImg.src=`./JSdiceGame/img/dice${randNum}.png`;
    diceTotals[currentPlayer-1] += randNum;
    if(randNum==1){
        diceTotals[currentPlayer-1]=0;
        dicePlayH.textContent = `Player ${currentPlayer}: Click to roll!`
        diceMessage.textContent = "You rolled a one! Your total has reset!"
    }
    diceTotalP.textContent = diceTotals[currentPlayer-1];
    if(diceTotals[currentPlayer-1]>=20){
        dicePlayH.textContent = `Player ${currentPlayer} wins with ${diceTotals[currentPlayer-1]} points!`;
        diceMessage.innerHTML = "Your score reached 20! You have won your bet!";
        diceIsAndTs.style.display="none";
        dicePlayH.onclick="";
        document.querySelector("#dicePlayH:hover").style.color="black";
        document.querySelector("#dicePlayH:hover").style.backgroundColor="palevioletred";
    }
    else {
        if(currentPlayer==numPlayers){
            currentPlayer=1
            }
            else {
            currentPlayer+=1
            }
        if (randNum>1) {
            dicePlayH.textContent = `Player ${currentPlayer}: Click to roll!`
            diceMessage.textContent = "What new score will the next contender get?"
            }
        console.log(`The current player is ${currentPlayer}`)
        }
}

let dateAppeared = Date.now();
let molesWhacked = 0;
let moleScore = 0;
let randRow = 6;
let randCol = 6;

let mole = document.getElementById("whackamoleMole");
let whackamoleMessage = document.getElementById("whackamoleMessage");
let whackamoleTimeToKill = document.getElementById("whackamoleTimeToKill");
let whackamoleBestTime = document.getElementById("whackamoleBestTime");
let whackamoleMolesWhacked = document.getElementById("whackamoleMolesWhacked");
let whackamoleScoreMessage = document.getElementById("whackamoleScoreMessage");
let whackamoleScore = document.getElementById("whackamoleScore");
let bestTime = 10000000;

const whackMole = () => {
    mole.style.display = "none";
    randInterval = Math.ceil(Math.random()*5000);
    setTimeout(moleAppear,randInterval)
    timeToKill = Date.now()-dateAppeared;
    whackamoleMessage.style.display = "block";
    whackamoleScoreMessage.style.display = "block";
    whackamoleTimeToKill.textContent = timeToKill;
    if (whackamoleBestTime.textContent == "" || timeToKill<bestTime){
        bestTime = timeToKill;
        whackamoleBestTime.textContent = bestTime;
    }
    molesWhacked++;
    whackamoleMolesWhacked.textContent = molesWhacked;
    if (timeToKill>=5000) {
        moleScore++
    }
    else {
        moleScore+= (5000-timeToKill)
    }
    whackamoleScore.textContent = (moleScore);
}
const moleAppear = () => {
    randRow = Math.ceil(Math.random()*11);
    randCol = Math.ceil(Math.random()*11);
    mole.style.gridRow = `${randRow} / span 2`;
    mole.style.gridColumn = `${randCol} / span 2`;
    mole.style.display = "block";
    dateAppeared = Date.now()
}

if(mole!==null){mole.addEventListener("click",whackMole)}

let clockDigital = document.getElementById("clockDigital");
let clockFace = document.getElementById("clockFace");
let clockHour = document.getElementById("clockHourHandWrap");
let clockMinute = document.getElementById("clockMinuteHandWrap");
let clockSecond = document.getElementById("clockSecondHandWrap");

const updateTime = () => {
    let d = new Date()
    if(clockDigital!==null){
        dateFormatted = ""
        if(d.getHours()<10){
            dateFormatted="0";
        }
        dateFormatted+=`${d.getHours()}`;
        dateFormatted+=":";
        if(d.getMinutes()<10){
            dateFormatted+="0";
        }
        dateFormatted+=`${d.getMinutes()}`;
        dateFormatted+=":";
        if(d.getSeconds()<10){
            dateFormatted+="0";
        }
        dateFormatted+=`${d.getSeconds()}`;
        clockDigital.textContent=dateFormatted;
        // clockDigital.textContent=`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} `
    }
    if(clockFace!==null){
        clockHour.style.transform=`rotate(${d.getHours()*6-24}deg)`;
        clockMinute.style.transform=`rotate(${d.getMinutes()*6}deg)`;
        clockSecond.style.transform=`rotate(${d.getSeconds()*6}deg)`;
    }
}

let updateTimeInterval = setInterval(updateTime,1);

let chessBoard = document.getElementById("chessBoard");