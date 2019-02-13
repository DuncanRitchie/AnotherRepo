let chessBoard = document.getElementById("chessBoard");
let chessInput = document.getElementById("chessInput");
let chessMessage = document.getElementById("chessMessageDiv");
let chessCurrentPlayer = "White";
let newSquare = "A4";
let newSquareId = document.getElementById("chessA4");
let pieceToMove = "P1";
let pieceToMoveId = document.getElementById("chessWhiteP1");

const chessMovePiece = () => {
    if(chessInput.value.substr(0,1)=="K"||chessInput.value.substr(0,1)=="Q") {
        pieceToMove = chessInput.value.substr(0,1);
    }
    else {
        pieceToMove = chessInput.value.substr(0,2);
    }
    newSquare = chessInput.value.substr(-2,2);
    pieceToMoveId = document.getElementById("chess"+chessCurrentPlayer+pieceToMove);
    console.log(pieceToMoveId);
    newSquareId = document.getElementById("chess"+newSquare.toUpperCase());
    console.log(newSquareId);
    if (newSquareId.childElementCount>0){
        capturedPieceId = newSquareId.childNodes[0];

        console.log(`${capturedPieceId.id} captured!`);
        if(capturedPieceId.id.substr(-1,1)=="K"){
            console.log("Checkmate!")
        }
        newSquareId.removeChild(newSquareId.childNodes[0]);
    }
    newSquareId.appendChild(pieceToMoveId);
    if(chessCurrentPlayer=="White"){
        chessCurrentPlayer="Black"
    }
    else {
        chessCurrentPlayer="White"
    }
    chessMessage.textContent = `${chessCurrentPlayer} to play!`
}

chessInputButton.addEventListener("click",chessMovePiece)