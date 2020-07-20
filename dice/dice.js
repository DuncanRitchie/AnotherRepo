let diceCurrentPlayer = 1;
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
        diceMessage.textContent = "Roll the die! What’s the first score you will get?"
}
    else {
        diceInputP.textContent = "That’s not a valid number we can let!"
    }
}

if (diceStartButton!==null){diceStartButton.addEventListener("click",diceStart)}

const dicePlay = () => {
    let diceImg = document.getElementsByClassName("diceImg")[diceCurrentPlayer-1];
    let diceTotalP = document.getElementsByClassName("diceTotalP")[diceCurrentPlayer-1];
    randNum = Math.ceil(Math.random()*6);
    console.log(`You rolled a ${randNum}`);
    diceImg.src=`./img/dice${randNum}.png`;
    diceTotals[diceCurrentPlayer-1] += randNum;
    if(randNum==1){
        diceTotals[diceCurrentPlayer-1]=0;
        dicePlayH.textContent = `Player ${diceCurrentPlayer}: Click to roll!`
        diceMessage.textContent = "You rolled a one! Your total has reset!"
    }
    diceTotalP.textContent = diceTotals[diceCurrentPlayer-1];
    if(diceTotals[diceCurrentPlayer-1]>=20){
        dicePlayH.style.cursor = "unset"
        dicePlayH.textContent = `Player ${diceCurrentPlayer} wins with ${diceTotals[diceCurrentPlayer-1]} points!`;
        diceMessage.innerHTML = "Your score reached 20! You have won your bet!";
        diceIsAndTs.style.display="none";
        dicePlayH.onclick="";
        document.querySelector("#dicePlayH:hover").style.color="black";
        document.querySelector("#dicePlayH:hover").style.backgroundColor="palevioletred";
    }
    else {
        if(diceCurrentPlayer==numPlayers){
            diceCurrentPlayer=1
            }
            else {
            diceCurrentPlayer+=1
            }
        if (randNum>1) {
            diceMessage.textContent = "What new score will the next contender get?"
            }
        dicePlayH.textContent = `Player ${diceCurrentPlayer}: Click to roll!`
        console.log(`The current player is ${diceCurrentPlayer}`)
        }
}