let chessBoard = document.getElementById("chessBoard");
let chessInput = document.getElementById("chessInput");
let chessInputButton = document.getElementById("chessInputButton");
let chessMessage = document.getElementById("chessMessageDiv");
let currentPlayer = "White";
let currentSquare, currentSquareEl, newSquare, newSquareEl, pieceToMove, pieceToMoveEl;
let isMoveLegal = false;
let numOfWhiteQueens = 1;
let numOfBlackQueens = 1;
let file1Num,file2Num,rank1Num,rank2Num;

const otherPlayer = (colour) => {
    if (colour == "White") {
        otherColour = "Black"
    }
    else {otherColour = "White"}
    return otherColour
}

const numToLetter = (number) =>{
    switch (number){
        case 1:
        numToLettr="A";
        break;
        case 2:
        numToLettr="B";
        break;
        case 3:
        numToLettr="C";
        break;
        case 4:
        numToLettr="D";
        break;
        case 5:
        numToLettr="E";
        break;
        case 6:
        numToLettr="F";
        break;
        case 7:
        numToLettr="G";
        break;
        case 8:
        numToLettr="H";
        break;
        default:
        numToLettr=null
    }
    return numToLettr
}

const letterToNum = (letter) =>{
    switch (letter.toLowerCase()){
        case "a":
        lettrToNum=1;
        break;
        case "b":
        lettrToNum=2;
        break;
        case "c":
        lettrToNum=3;
        break;
        case "d":
        lettrToNum=4;
        break;
        case "e":
        lettrToNum=5;
        break;
        case "f":
        lettrToNum=6;
        break;
        case "g":
        lettrToNum=7;
        break;
        case "h":
        lettrToNum=8;
        break;
        default:
        lettrToNum=null
    }
    return lettrToNum
}

const cellRankNum = (coord) => {
    return parseInt(coord.substr(1,1))
}

const cellFileNum = (coord) => {
    return letterToNum(coord.substr(0,1).toLowerCase())
}

const getElementByFR = (fileNum,rankNum) => {
    return document.getElementById("chess"+numToLetter(fileNum)+rankNum)
}

const subtractCoords = (coord1,coord2) => {
    file1Num = cellFileNum(coord1);
    file2Num = cellFileNum(coord2);
    rank1Num=parseInt(coord1.substr(1,1));
    rank2Num=parseInt(coord2.substr(1,1));
    if (currentPlayer=="Black") {
        subtractCoordsMultiplier = -1
    }
    else {subtractCoordsMultiplier = 1}
    return [file2Num-file1Num,(rank2Num-rank1Num)*subtractCoordsMultiplier]
}

const areCellsBetweenEmpty = (coord1,coord2) => {
    colDiff=subtractCoords(coord1,coord2)[0];
    rowDiff=subtractCoords(coord1,coord2)[1];
    file1Num = cellFileNum(coord1);
    file2Num = cellFileNum(coord2);
    rank1Num=parseInt(coord1.substr(1,1));
    rank2Num=parseInt(coord2.substr(1,1));
    rCBE = true;
    // if the cells are the same, there are no pieces in the way (but no move is happening).
    if (colDiff==0 && rowDiff==0) {
        console.log("The two cells are the same.");
        rCBE = true;
    }
    // check if the cells are in the same file (column).
    else if (colDiff==0) {
        // if one cell is directly above the other, there are no pieces in the way.
        if (rowDiff==1||rowDiff==-1) {
            console.log("One cell is directly above the other.");
            rCBE = true
        }
        else {
            // Loops through the intermediary cells to check for children.
            console.log("The two cells are the same file. Are there pieces in between? Here's the list of cells to check:");
            rCBE = true;
            for (i=Math.min(rank1Num,rank2Num)+1;i<Math.max(rank1Num,rank2Num);i++){
                console.log(getElementByFR(file1Num,i))
                if(getElementByFR(file1Num,i).childElementCount>0) {
                    rCBE = false;
                    console.log("This cell contains a child.")
                }
            }
        }
    }
    else if (rowDiff==0){
        // if one cell is directly beside the other, there are no pieces in the way.
        if (colDiff==1||colDiff==-1) {
            console.log("The two cells are directly beside each other.");
            rCBE = true
        }
        else {
            // Loops through the intermediary cells to check for children.
            console.log("The two cells are the same rank. Are there pieces in between? Here's the list of cells to check:");
            rCBE = true;
            for (i=Math.min(file1Num,file2Num)+1;i<Math.max(file1Num,file2Num);i++){
                console.log(getElementByFR(i,rank1Num))
                if(getElementByFR(i,rank1Num).childElementCount>0) {
                    rCBE = false;
                    console.log("This cell contains a child.")
                }
            }
        }
    }
    else if (file2Num-file1Num==rank2Num-rank1Num){
        // if one cell is touching the other on a positive diagonal, there are no pieces in the way.
        if (Math.abs(colDiff)==1) {
            console.log("The two cells touch each other on a positive diagonal.");
            rCBE = true
        }
        else {
            // Loops through the intermediary cells to check for children.
            console.log("The two cells are on the same positive diagonal. Are there pieces in between? Here's the list of cells to check:");
            rCBE = true
            for (i=Math.min(file1Num,file2Num)+1;i<Math.max(file1Num,file2Num);i++){
                console.log(getElementByFR(i,rank1Num+i-file1Num))
                if(getElementByFR(i,rank1Num+i-file1Num).childElementCount>0) {
                    rCBE = false;
                    console.log("This cell contains a child.")
                }
            }
        }
    }
    else if (file2Num-file1Num==rank1Num-rank2Num){
        // if one cell is touching the other on a negative diagonal, there are no pieces in the way.
        if (Math.abs(colDiff)==1) {
            console.log("The two cells touch each other on a negative diagonal.");
            rCBE = true
        }
        else {
            // Loops through the intermediary cells to check for children.
            console.log("The two cells are on the same negative diagonal. Are there pieces in between? Here's the list of cells to check:");
            rCBE = true;
            j=Math.max(rank1Num,rank2Num)-1;
            for (i=Math.min(file1Num,file2Num)+1;i<Math.max(file1Num,file2Num);i++){
                console.log(getElementByFR(i,j))
                if(getElementByFR(i,j).childElementCount>0) {
                    rCBE = false;
                    console.log("This cell contains a child.")
                }
                j--;
            }
        }
    }
    else {rCBE = false}
    return rCBE
}

const chessMovePiece = () => {
    isMoveLegal=true;
    inputValue=chessInput.value.toUpperCase();
    if(inputValue==null){
        chessMessage.textContent=`Please type a piece name and a cell. ${currentPlayer} to play!`;
    }
    else {
        chessMessage.textContent=`Input not valid! ${currentPlayer} to play!`;
        chessInput.value="";
    }
    if(inputValue.substr(0,1)=="K") {
        pieceToMove = inputValue.substr(0,1);
    }
    else if ((currentPlayer=="White"&&numOfWhiteQueens==1&&inputValue.substr(0,1)=="Q")||(currentPlayer=="Black"&&numOfBlackQueens==1&&inputValue.substr(0,1)=="Q")){
        pieceToMove = inputValue.substr(0,1);
    }
    else {
        pieceToMove = inputValue.substr(0,2);
    }
    pieceToMoveEl = document.getElementById("chess"+currentPlayer+pieceToMove);
    console.log(pieceToMoveEl);
    currentSquareEl=pieceToMoveEl.parentElement;
    currentSquare=currentSquareEl.id.substr(-2,2);
    console.log(currentSquare);
    newSquare = inputValue.substr(-2,2);
    newSquareEl = document.getElementById("chess"+newSquare);
    console.log(newSquare);
    console.log(subtractCoords(currentSquare,newSquare));
    rankDiff=subtractCoords(currentSquare,newSquare)[0];
    fileDiff=subtractCoords(currentSquare,newSquare)[1];
    rankDiffAbs=Math.abs(rankDiff);
    fileDiffAbs=Math.abs(fileDiff);
    pieceToMoveType = pieceToMove.substr(0,1);
    console.log(pieceToMoveType)
    switch (pieceToMoveType) {
        case "K":
            console.log("This is a king.");
            if ((rankDiff==0 && fileDiffAbs==1) ||
            // King can move one square forwards or one square backwards.
            (rankDiffAbs==1 && fileDiffAbs==1) ||
            (rankDiffAbs==1 && fileDiff==0))
            // King can move one square sideways and one square forward/backward/not.
                {isMoveLegal=true;}
            else {
                isMoveLegal=false
            }
            break; 
        case "Q":
            console.log("This is a queen.");
            if (areCellsBetweenEmpty(currentSquare,newSquare) && 
            (rankDiff==0 || fileDiff==0 || fileDiffAbs==rankDiffAbs))
            {isMoveLegal=true;}
            // Queen can move along a rank, along a file, or the same distance sideways as vertically, if cells between are empty.
            else {
                isMoveLegal=false;
            }
            break; 
        case "R":
            console.log("This is a rook.");
            if (areCellsBetweenEmpty(currentSquare,newSquare) && 
            (rankDiff==0 || fileDiff==0))
            {isMoveLegal=true;}
            // Rook can move along a rank or along a file, if cells between are empty.
            else {
                isMoveLegal=false;
            }
            break; 
        case "N":
            console.log("This is a knight.");
            if (rankDiffAbs==2 && fileDiffAbs==1)
                {isMoveLegal=true;}
            else if (rankDiffAbs==1 && fileDiffAbs==2)
                {isMoveLegal=true;}
                // Knight can move 2 in any direction and 1 in any perpendicular direction.
            else {isMoveLegal=false};
            break;
        case "B":
            console.log("This is a bishop.");
            if (areCellsBetweenEmpty(currentSquare,newSquare) && fileDiffAbs==rankDiffAbs)
                {isMoveLegal=true;}
                // Bishop can move the same distance sideways as vertically, if cells between are empty.
            else {
                isMoveLegal=false;
        }
        break; 
        case "P":
            console.log("This is a pawn.");
            if (rankDiff==0 && fileDiff==1 && newSquareEl.childElementCount==0)
                {isMoveLegal=true;}
                // Pawn can go one square forwards if new square is empty.
            else if (rankDiff==1 && fileDiff==1 && newSquareEl.childElementCount>0)
                {isMoveLegal=true;}
                // Pawn can go one square forwards and one sideways if new square is occupied.
            else if (rankDiff==0 && fileDiff==2 && newSquareEl.childElementCount==0 && ((currentPlayer=="White"&&currentSquare.substr(1,1)=="2")||(currentPlayer=="Black"&&currentSquare.substr(1,1)=="7")) && areCellsBetweenEmpty(currentSquare,newSquare))
                {isMoveLegal=true;}
                // Pawn can go two squares forward if starting square is in rank 2 (White) or 7 (Black).
            else {isMoveLegal=false}
            break; 
    }
    console.log(`Legality is ${isMoveLegal}.`)
    if (isMoveLegal) {
        chessMessage.textContent="";
        if (newSquareEl.childElementCount>0){
            capturedPieceEl = newSquareEl.lastElementChild;
            console.log(`${capturedPieceEl.id} captured!`);
            if(capturedPieceEl.id.substr(-1,1)=="K"){
                chessKingColour = capturedPieceEl.id.substr(-6,5);
                chessWinner = otherPlayer(chessKingColour);
                chessMessage.textContent = `Checkmate! ${pieceToMoveEl.id.substr(5)} has captured the ${chessKingColour} king! ${chessWinner} has won!`;
                chessInput.style.display = "none";
                chessInputButton.style.display = "none";
            }
            else {
                chessMessage.textContent=`${capturedPieceEl.id.substr(5)} captured! `;
            }
            newSquareEl.removeChild(capturedPieceEl);
        }
        newSquareEl.appendChild(pieceToMoveEl);
        if (currentPlayer=="White"){promotionRow=8}
        else {promotionRow=1};
        if(pieceToMoveType=="P"&&cellRankNum(newSquare)==promotionRow)
            {
                chessMessage.textContent = `Promotion! ${pieceToMoveEl.id.substr(5)} has turned into a Queen. `;
                if (currentPlayer=="White") {
                    if (numOfWhiteQueens==1) {
                        document.getElementById("chessWhiteQ").id="chessWhiteQ1";
                        document.getElementById("chessWhiteQ1").textContent="Q1";
                    }
                    numOfWhiteQueens++;
                    pieceToMoveEl.id=`chessWhiteQ${numOfWhiteQueens}`;
                    pieceToMoveEl.textContent=`Q${numOfWhiteQueens}`;
                }
                else {
                    if (numOfBlackQueens==1) {
                        document.getElementById("chessBlackQ").id="chessBlackQ1";
                        document.getElementById("chessBlackQ1").textContent="Q1";
                    }
                    numOfBlackQueens++;
                    pieceToMoveEl.id=`chessBlackQ${numOfBlackQueens}`;
                    pieceToMoveEl.textContent=`Q${numOfBlackQueens}`;
                }
            }
        chessInput.value="";
        if(chessMessage.textContent.substr(0,9)!=="Checkmate"){
            currentPlayer=otherPlayer(currentPlayer);
            chessMessage.textContent += `${currentPlayer} to play!`
        }
    }
    else {
        if(newSquareEl!==null){
            chessMessage.textContent = `${pieceToMove} to ${newSquare.toLowerCase()} is illegal! ${currentPlayer} to play!`
        }
    }
}



chessInputButton.addEventListener("click",chessMovePiece)