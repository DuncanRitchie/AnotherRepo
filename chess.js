let chessBoard = document.getElementById("chessBoard");
let chessInput = document.getElementById("chessInput");
let chessInputButton = document.getElementById("chessInputButton");
let chessMessage = document.getElementById("chessMessageDiv");
let chessCurrentPlayer = "White";
let newSquare = "A4";
let newSquareEl = document.getElementById("chessA4");
let pieceToMove = "P1";
let pieceToMoveEl = document.getElementById("chessWhiteP1");

const otherPlayer = (colour) => {
    if (colour == "White") {
        otherColour = "Black"
    }
    else {otherColour = "White"}
    return otherColour
}

const chessMovePiece = () => {
    chessMessage.textContent="";
    if(chessInput.value.substr(0,1)=="K"||chessInput.value.substr(0,1)=="Q") {
        pieceToMove = chessInput.value.substr(0,1);
    }
    else {
        pieceToMove = chessInput.value.substr(0,2);
    }
    switch (pieceToMove.substr(0,1)) {
        case "K":
        break; 
        case "Q":
        break; 
        case "R":
        break; 
        case "N":
        break; 
        case "B":
        break; 
        case "P":
        break; 
    }
    newSquare = chessInput.value.substr(-2,2);
    pieceToMoveEl = document.getElementById("chess"+chessCurrentPlayer+pieceToMove);
    console.log(pieceToMoveEl);
    newSquareEl = document.getElementById("chess"+newSquare.toUpperCase());
    console.log(newSquareEl);
    if (newSquareEl.childElementCount>0){
        capturedPieceEl = newSquareEl.lastElementChild;
        console.log(`${capturedPieceEl.id} captured!`);
        if(capturedPieceEl.id.substr(-1,1)=="K"){
            chessKingColour = capturedPieceEl.id.substr(-6,5);
            chessWinner = otherPlayer(chessKingColour);
            chessMessage.textContent = `Checkmate! ${pieceToMoveEl.id.substr(5)} has killed the ${chessKingColour} king! ${chessWinner} has won!`;
            chessInput.style.display = "none";
            chessInputButton.style.display = "none";
        }
        else {
            chessMessage.textContent=`${capturedPieceEl.id.substr(5)} captured! `;
        }
        newSquareEl.removeChild(newSquareEl.childNodes[0]);
    }
    newSquareEl.appendChild(pieceToMoveEl);
    chessInput.value="";
    if(chessMessage.textContent.substr(0,9)!=="Checkmate"){
        chessCurrentPlayer=otherPlayer(chessCurrentPlayer);
        chessMessage.textContent += `${chessCurrentPlayer} to play!`
    }
}

chessInputButton.addEventListener("click",chessMovePiece)