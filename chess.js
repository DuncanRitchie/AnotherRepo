let chessBoard = document.getElementById("chessBoard");
let chessInput = document.getElementById("chessInput");
let chessInputButton = document.getElementById("chessInputButton");
let chessMessage = document.getElementById("chessMessageDiv");
let currentPlayer = "White";
let currentSquare, currentSquareEl, newSquare, newSquareEl, pieceToMove, pieceToMoveEl;
let isMoveLegal = false;
let file1Num,file2Num,rank1Num,rank2Num;

const otherPlayer = (colour) => {
    if (colour == "White") {
        otherColour = "Black"
    }
    else {otherColour = "White"}
    return otherColour
}

const subtractCoords = (coord1,coord2) => {
    switch (coord1.substr(0,1).toLowerCase()) {
        case "a":
        file1Num=1;
        break;
        case "b":
        file1Num=2;
        break;
        case "c":
        file1Num=3;
        break;
        case "d":
        file1Num=4;
        break;
        case "e":
        file1Num=5;
        break;
        case "f":
        file1Num=6;
        break;
        case "g":
        file1Num=7;
        break;
        case "h":
        file1Num=8;
        break;
        default:
        file1Num=null
    }
    switch (coord2.substr(0,1).toLowerCase()) {
        case "a":
        file2Num=1;
        break;
        case "b":
        file2Num=2;
        break;
        case "c":
        file2Num=3;
        break;
        case "d":
        file2Num=4;
        break;
        case "e":
        file2Num=5;
        break;
        case "f":
        file2Num=6;
        break;
        case "g":
        file2Num=7;
        break;
        case "h":
        file2Num=8;
        break;
        default:
        file2Num=null
    }
    rank1Num=parseInt(coord1.substr(1,1));
    rank2Num=parseInt(coord2.substr(1,1));
    if (currentPlayer=="Black") {
        subtractCoordsMultiplier = -1
    }
    else {subtractCoordsMultiplier = 1}
    return [Math.abs(file2Num-file1Num),(rank2Num-rank1Num)*subtractCoordsMultiplier]
}

const chessMovePiece = () => {
    isMoveLegal=true;
    if(chessInput.value==null){
        chessMessage.textContent=`Please type a piece name and a cell. ${currentPlayer} to play!`;
    }
    else {
        chessMessage.textContent="";
    }
    if(chessInput.value.substr(0,1)=="K"||chessInput.value.substr(0,1)=="Q") {
        pieceToMove = chessInput.value.substr(0,1);
    }
    else {
        pieceToMove = chessInput.value.substr(0,2);
    }
    pieceToMoveEl = document.getElementById("chess"+currentPlayer+pieceToMove);
    console.log(pieceToMoveEl);
    currentSquareEl=pieceToMoveEl.parentElement;
    currentSquare=currentSquareEl.id.substr(-2,2);
    console.log(currentSquare);
    newSquare = chessInput.value.substr(-2,2);
    newSquareEl = document.getElementById("chess"+newSquare.toUpperCase());
    console.log(newSquare);
    console.log(subtractCoords(currentSquare,newSquare));
    pieceToMoveType = pieceToMove.substr(0,1);
    console.log(pieceToMoveType)
    switch (pieceToMoveType) {
        case "K":
            console.log("This is a king.");
            if ((subtractCoords(currentSquare,newSquare)[0]==0 && subtractCoords(currentSquare,newSquare)[1]==1) ||
            (subtractCoords(currentSquare,newSquare)[0]==0 && subtractCoords(currentSquare,newSquare)[1]==-1) ||
            // King can move one square forwards or one square backwards.
            (subtractCoords(currentSquare,newSquare)[0]==1 && subtractCoords(currentSquare,newSquare)[1]==1) ||
            (subtractCoords(currentSquare,newSquare)[0]==1 && subtractCoords(currentSquare,newSquare)[1]==0) ||
            (subtractCoords(currentSquare,newSquare)[0]==1 && subtractCoords(currentSquare,newSquare)[1]==-1))
            // King can move one square sideways and one square forward/backward/not.
                {isMoveLegal=true;}
            else {
                isMoveLegal=false
            }
            break; 
        case "Q":
            console.log("This is a queen.");
            break; 
        case "R":
            console.log("This is a rook.");
            break; 
        case "N":
            console.log("This is a knight.");
            if (subtractCoords(currentSquare,newSquare)[0]==2 && subtractCoords(currentSquare,newSquare)[1]==1)
                {isMoveLegal=true;}
            else if (subtractCoords(currentSquare,newSquare)[0]==2 && subtractCoords(currentSquare,newSquare)[1]==-1)
                {isMoveLegal=true;}
            else if (subtractCoords(currentSquare,newSquare)[0]==1 && subtractCoords(currentSquare,newSquare)[1]==2)
                {isMoveLegal=true;}
            else if (subtractCoords(currentSquare,newSquare)[0]==1 && subtractCoords(currentSquare,newSquare)[1]==-2)
                    {isMoveLegal=true;}
            // Knight can move 2 in any direction and 1 in any perpendicular direction.
            else {isMoveLegal=false};
            break;
        case "B":
            console.log("This is a bishop.");
            break; 
        case "P":
            console.log("This is a pawn.");
            if (subtractCoords(currentSquare,newSquare)[0]==0 && subtractCoords(currentSquare,newSquare)[1]==1 && newSquareEl.childElementCount==0)
                {isMoveLegal=true;}
                // Pawn can go one square forwards if new square is empty.
            else if (subtractCoords(currentSquare,newSquare)[0]==1 && subtractCoords(currentSquare,newSquare)[1]==1 && newSquareEl.childElementCount>0)
                {isMoveLegal=true;}
                // Pawn can go one square forwards and one sideways if new square is occupied.
            else if (subtractCoords(currentSquare,newSquare)[0]==0 && subtractCoords(currentSquare,newSquare)[1]==2 && newSquareEl.childElementCount==0 && ((currentPlayer=="White"&&currentSquare.substr(1,1)=="2")||(currentPlayer=="Black"&&currentSquare.substr(1,1)=="7")))
                {isMoveLegal=true;}
                // Pawn can go two squares forward if starting square is in rank 2 (White) or 7 (Black).
            else {isMoveLegal=false}
            break; 
    }
    console.log(`Legality is ${isMoveLegal}.`)
    if (isMoveLegal) {
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
            newSquareEl.removeChild(capturedPieceEl);
        }
        newSquareEl.appendChild(pieceToMoveEl);
        chessInput.value="";
        if(chessMessage.textContent.substr(0,9)!=="Checkmate"){
            currentPlayer=otherPlayer(currentPlayer);
            chessMessage.textContent += `${currentPlayer} to play!`
        }
    }
    else {chessMessage.textContent += `That's not legal! ${currentPlayer} to play!`}
}

chessInputButton.addEventListener("click",chessMovePiece)