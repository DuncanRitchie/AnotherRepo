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