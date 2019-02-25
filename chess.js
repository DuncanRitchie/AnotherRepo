let chessBoard = document.getElementById("chessBoard");
let chessInput = document.getElementById("chessInput");
let chessInputButton = document.getElementById("chessInputButton");
let chessMessage = document.getElementById("chessMessageDiv");
let currentPlayer = "White";
let currentSquare, currentSquareEl, newSquare, newSquareEl, pieceToMove, pieceToMoveEl, castlingRookToMove, castlingRookToMoveEl;
let isMoveLegal = false;
let whiteRook1Moved = false;
let whiteRook2Moved = false;
let blackRook1Moved = false;
let blackRook2Moved = false;
let whiteKingMoved = false;
let blackKingMoved = false;
let numOfWhiteQueens = 1;
let numOfBlackQueens = 1;
let file1Num,file2Num,rank1Num,rank2Num,castlingRank,newRookFile;

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

const isInCheck = () => {
    allOpponentPieces = document.querySelectorAll(`.chessPiece${otherPlayer(currentPlayer)}`);
    for (i=0;i<allDivs.length;i++) {
        
    }
}

const isHypotheticalMoveLegal = (hypotheticalPieceType,fromSquare,toSquare) => {
    hypotheticalFileDiff=subtractCoords(fromSquare,toSquare)[0];
    hypotheticalRankDiff=subtractCoords(fromSquare,toSquare)[1];
    hypotheticalFileDiffAbs=Math.abs(hypotheticalFileDiff);
    hypotheticalRankDiffAbs=Math.abs(hypotheticalRankDiff);
    hypotheticalPlayer=otherPlayer(currentPlayer);
    toSquareEl=document.getElementById("chess"+toSquare)
    switch (hypotheticalPieceType) {
        case "K":
            console.log("This is a king.");
            if ((hypotheticalFileDiff==0 && hypotheticalRankDiffAbs==1) ||
            // King can move one square forwards or one square backwards.
            (hypotheticalFileDiffAbs==1 && hypotheticalRankDiffAbs==1) ||
            (hypotheticalFileDiffAbs==1 && hypotheticalRankDiff==0)) {
            // King can move one square sideways and one square forward/backward/not.
                hypotheticalMoveIsLegal=true;}
            else {
                hypotheticalMoveIsLegal=false
            }
            break; 
        case "Q":
            console.log("This is a queen.");
            if (areCellsBetweenEmpty(fromSquare,toSquare) && 
            (hypotheticalFileDiff==0 || hypotheticalRankDiff==0 || hypotheticalRankDiffAbs==hypotheticalFileDiffAbs))
            {hypotheticalMoveIsLegal=true;}
            // Queen can move along a rank, along a file, or the same distance sideways as vertically, if cells between are empty.
            else {
                hypotheticalMoveIsLegal=false;
            }
            break; 
        case "R":
            console.log("This is a rook.");
            if (areCellsBetweenEmpty(fromSquare,toSquare) && 
            (hypotheticalFileDiff==0 || hypotheticalRankDiff==0))
            {hypotheticalMoveIsLegal=true;
            // Rook can move along a rank or along a file, if cells between are empty.
            }
            else {
                hypotheticalMoveIsLegal=false;
            }
            break; 
        case "N":
            console.log("This is a knight.");
            if (hypotheticalFileDiffAbs==2 && hypotheticalRankDiffAbs==1)
                {hypotheticalMoveIsLegal=true;}
            else if (hypotheticalFileDiffAbs==1 && hypotheticalRankDiffAbs==2)
                {hypotheticalMoveIsLegal=true;}
                // Knight can move 2 in any direction and 1 in any perpendicular direction.
            else {hypotheticalMoveIsLegal=false};
            break;
        case "B":
            console.log("This is a bishop.");
            if (areCellsBetweenEmpty(fromSquare,toSquare) && hypotheticalRankDiffAbs==hypotheticalFileDiffAbs)
                {hypotheticalMoveIsLegal=true;}
                // Bishop can move the same distance sideways as vertically, if cells between are empty.
            else {
                hypotheticalMoveIsLegal=false;
        }
        break; 
        case "P":
            console.log("This is a pawn.");
            if (hypotheticalFileDiff==0 && hypotheticalRankDiff==1 && toSquareEl.childElementCount==0)
                {hypotheticalMoveIsLegal=true;}
                // Pawn can go one square forwards if new square is empty.
            else if (hypotheticalFileDiffAbs==1 && hypotheticalRankDiff==1 && toSquareEl.childElementCount>0)
                {hypotheticalMoveIsLegal=true;}
                // Pawn can go one square forwards and one sideways if new square is occupied.
            else if (hypotheticalFileDiff==0 && hypotheticalRankDiff==2 && toSquareEl.childElementCount==0 && ((hypotheticalPlayer=="White"&&fromSquare.substr(1,1)=="2")||(hypotheticalPlayer=="Black"&&fromSquare.substr(1,1)=="7")) && areCellsBetweenEmpty(fromSquare,toSquare))
                {hypotheticalMoveIsLegal=true;}
                // Pawn can go two squares forward if starting square is in rank 2 (White) or 7 (Black).
            else {hypotheticalMoveIsLegal=false}
            console.log("There are "+toSquareEl.childElementCount+" children in the new square.");
            console.log(`Legality is ${hypotheticalMoveIsLegal}.`);
            break; 
    } //end of switch
    return hypotheticalMoveIsLegal;
}

console.log(isHypotheticalMoveLegal("N","E2","F4"))

const isNonCastlingMoveLegal = () => {
    switch (pieceToMoveType) {
        case "K":
            console.log("This is a king.");
            if ((fileDiff==0 && rankDiffAbs==1) ||
            // King can move one square forwards or one square backwards.
            (fileDiffAbs==1 && rankDiffAbs==1) ||
            (fileDiffAbs==1 && rankDiff==0)) {
            // King can move one square sideways and one square forward/backward/not.
                if(currentPlayer=="White"){
                    whiteKingMoved = true;
                }
                else {
                    blackKingMoved = true;
                };
                isMoveLegal=true;}
            else {
                isMoveLegal=false
            }
            break; 
        case "Q":
            console.log("This is a queen.");
            if (areCellsBetweenEmpty(currentSquare,newSquare) && 
            (fileDiff==0 || rankDiff==0 || rankDiffAbs==fileDiffAbs))
            {isMoveLegal=true;}
            // Queen can move along a rank, along a file, or the same distance sideways as vertically, if cells between are empty.
            else {
                isMoveLegal=false;
            }
            break; 
        case "R":
            console.log("This is a rook.");
            if (areCellsBetweenEmpty(currentSquare,newSquare) && 
            (fileDiff==0 || rankDiff==0))
            {isMoveLegal=true;
            // Rook can move along a rank or along a file, if cells between are empty.
                if (currentPlayer=="White") {
                    if (pieceToMove=="R1"){
                        whiteRook1Moved=true
                    }
                    else if (pieceToMove=="R2"){
                        whiteRook2Moved=true
                    }
                }
                else if (currentPlayer=="White") {
                    if (pieceToMove=="R1"){
                        whiteRook1Moved=true
                    }
                    else if (pieceToMove=="R2"){
                        whiteRook2Moved=true
                    }
                }
            }
            else {
                isMoveLegal=false;
            }
            break; 
        case "N":
            console.log("This is a knight.");
            if (fileDiffAbs==2 && rankDiffAbs==1)
                {isMoveLegal=true;}
            else if (fileDiffAbs==1 && rankDiffAbs==2)
                {isMoveLegal=true;}
                // Knight can move 2 in any direction and 1 in any perpendicular direction.
            else {isMoveLegal=false};
            break;
        case "B":
            console.log("This is a bishop.");
            if (areCellsBetweenEmpty(currentSquare,newSquare) && rankDiffAbs==fileDiffAbs)
                {isMoveLegal=true;}
                // Bishop can move the same distance sideways as vertically, if cells between are empty.
            else {
                isMoveLegal=false;
        }
        break; 
        case "P":
            console.log("This is a pawn.");
            if (fileDiff==0 && rankDiff==1 && newSquareEl.childElementCount==0)
                {isMoveLegal=true;}
                // Pawn can go one square forwards if new square is empty.
            else if (fileDiffAbs==1 && rankDiff==1 && newSquareEl.childElementCount>0)
                {isMoveLegal=true;}
                // Pawn can go one square forwards and one sideways if new square is occupied.
            else if (fileDiff==0 && rankDiff==2 && newSquareEl.childElementCount==0 && ((currentPlayer=="White"&&currentSquare.substr(1,1)=="2")||(currentPlayer=="Black"&&currentSquare.substr(1,1)=="7")) && areCellsBetweenEmpty(currentSquare,newSquare))
                {isMoveLegal=true;}
                // Pawn can go two squares forward if starting square is in rank 2 (White) or 7 (Black).
            else {isMoveLegal=false}
            console.log("There are "+newSquareEl.childElementCount+" children in the new square.");
            console.log(`Legality is ${isMoveLegal}.`);
            break; 
    } //end of switch
}


const chessMovePiece = () => {
    isMoveLegal=true;
    inputValue=chessInput.value.toUpperCase();
    pieceToMove=null;
    if(inputValue==""){
        chessMessage.textContent=`Please type a piece name and a cell. ${currentPlayer} to play!`;
    }
    else {
        chessMessage.textContent=`Input not valid! ${currentPlayer} to play!`;
        chessInput.value="";
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
        if (pieceToMoveEl!==null) {
            currentSquareEl=pieceToMoveEl.parentElement;
            currentSquare=currentSquareEl.id.substr(-2,2);
            if (currentSquareEl!==null) {
                newSquare = inputValue.substr(-2,2);
                newSquareEl = document.getElementById("chess"+newSquare);
                console.log(newSquare);
                if (newSquareEl!==null && pieceToMoveEl!==null) {
                    currentSquareEl=pieceToMoveEl.parentElement;
                    console.log(currentSquare);
                    console.log(pieceToMoveEl);
                    console.log(subtractCoords(currentSquare,newSquare));
                    fileDiff=subtractCoords(currentSquare,newSquare)[0];
                    rankDiff=subtractCoords(currentSquare,newSquare)[1];
                    fileDiffAbs=Math.abs(fileDiff);
                    rankDiffAbs=Math.abs(rankDiff);
                    pieceToMoveType = pieceToMove.substr(0,1);
                    console.log(pieceToMoveType);
                    if ((currentPlayer=="White" && 
                    !whiteKingMoved && 
                    (pieceToMove=="K" && (newSquare=="C1" || newSquare=="G1")) || (pieceToMove=="R1" && !whiteRook1Moved && newSquare=="D1") || (pieceToMove == "R2" && !whiteRook2Moved && newSquare=="F1")) || 
                    (currentPlayer=="Black" && 
                    !blackKingMoved && 
                    (pieceToMove=="K" && (newSquare=="C8" || newSquare=="G8")) || (pieceToMove=="R1" && !blackRook1Moved && newSquare=="D8") || (pieceToMove == "R2" && !blackRook2Moved && newSquare=="F8"))) {
                            console.log("We are castling?");
                            if (pieceToMoveType=="R") {
                                castlingRookToMove = pieceToMove;
                                castlingRookToMoveEl =  pieceToMoveEl;
                                pieceToMove = "K";
                                pieceToMoveType="K";
                                pieceToMoveEl = document.getElementById(`chess${currentPlayer}K`);
                            }
                            else {
                                if (newSquare.substr(-2,1)=="C") {
                                    castlingRookToMove = "R1"
                                }
                                else if (newSquare.substr(-2,1)=="G") {
                                    castlingRookToMove = "R2"
                                }
                                castlingRookToMoveEl = document.getElementById("chess"+currentPlayer+castlingRookToMove);
                            }
                            console.log(pieceToMove);
                            console.log(pieceToMoveEl);
                            console.log(castlingRookToMove);
                            console.log(castlingRookToMoveEl);
                            isMoveLegal=false; //This changes to true as appropriate later.
                            if (castlingRookToMoveEl==null||pieceToMoveEl==null){
                                    console.log("Castling input invalid!")
                            }
                            else {
                                if (currentPlayer=="White") {castlingRank=1} else {castlingRank=8}; //Castling happens on Rank 1 or 8.
                                currentSquareEl=pieceToMoveEl.parentElement; //This is the square the king is on.
                                if (castlingRookToMove == "R1") {
                                    newRookFile=4;
                                    newKingFile=3
                                } else {
                                    newRookFile=6;
                                    newKingFile=7;
                                }; //The king should move two squares towards the rook and the rook should move to the file the king passed through.
                                newRookSquareEl = getElementByFR(newRookFile,castlingRank); //This is the square the rook is going to.
                                newSquareEl = getElementByFR(newKingFile,castlingRank); //This is the square the king is going to.
                                currentSquare=currentSquareEl.id.substr(-2,2);
                                newSquare=newSquareEl.id.substr(-2,2);
                                console.log("The king is in "+currentSquare);
                                console.log("The king should go to "+newSquare);
                                console.log("The rook should go to "+newRookSquareEl.id.substr(-2,2));
                                if (areCellsBetweenEmpty(currentSquare,castlingRookToMoveEl.parentElement.id.substr(-2,2))) {
                                    if(currentPlayer=="White" && !whiteKingMoved){
                                        if(castlingRookToMove=="R1" && !whiteRook1Moved) {
                                            console.log("White King is moving for the first time");
                                            console.log("White Rook 1 is moving for the first time");
                                            console.log(whiteKingMoved);
                                            isMoveLegal=true;
                                            whiteRook1Moved=true;
                                            whiteKingMoved=true;
                                        }
                                        else if(castlingRookToMove=="R2" && !whiteRook2Moved) {
                                            console.log("White King is moving for the first time");
                                            console.log("White Rook 2 is moving for the first time");
                                            console.log(whiteKingMoved);
                                            isMoveLegal=true;
                                            whiteRook2Moved=true;
                                            whiteKingMoved=true;
                                        }
                                    }
                                    else if(currentPlayer=="Black" && !blackKingMoved) {
                                        if(castlingRookToMove=="R1" && !blackRook1Moved) {
                                            console.log("Black King is moving for the first time");
                                            console.log("Black Rook 1 is moving for the first time");
                                            console.log(blackKingMoved);
                                            isMoveLegal=true;
                                            blackRook1Moved=true;
                                            blackKingMoved=true;
                                        }
                                        else if(castlingRookToMove=="R2" && !blackRook2Moved) {
                                            console.log("Black King is moving for the first time");
                                            console.log("Black Rook 2 is moving for the first time");
                                            console.log(blackKingMoved);
                                            isMoveLegal=true;
                                            blackRook2Moved=true;
                                            blackKingMoved=true;
                                        }
                                    }
                                    else {isMoveLegal=false};
                                }
                                if(isMoveLegal) {
                                    console.log("Castling is happening!");
                                    newSquareEl.appendChild(pieceToMoveEl); //This moves the king to its new square.
                                    newRookSquareEl.appendChild(castlingRookToMoveEl); //This moves the rook to its new square.
                                    console.log("That was a move played by "+currentPlayer+".")
                                    currentPlayer=otherPlayer(currentPlayer);
                                    console.log("Now the current player is "+currentPlayer+".")
                                    chessMessage.textContent = `${otherPlayer(currentPlayer)} has castled successfully! ${currentPlayer} to play!`
                                }
                                else {
                                    console.log(`Castling with ${castlingRookToMove} is illegal! ${currentPlayer} to play!`);
                                    chessMessage.textContent = `Castling with ${castlingRookToMove} is illegal! ${currentPlayer} to play!`
                                }
                            }
                    }  //End of castling code. The code below only runs if we're not castling.
                    else {
                        isNonCastlingMoveLegal();
                        if (newSquareEl==currentSquareEl){
                            isMoveLegal = false;
                            chessMessage.innerHTML = `You&rsquo;re trying to move ${pieceToMove} to its current square! That&rsquo;s not a move! ${currentPlayer} to play!`
                        }
                        else { //The following code runs if the current and new squares are different.
                            if (newSquareEl.childElementCount>0) {
                                capturedPieceEl = newSquareEl.lastElementChild;
                                if (capturedPieceEl.id.substr(5,5)==currentPlayer) {
                                    isMoveLegal = false;
                                    chessMessage.innerHTML = `You&rsquo;re trying to capture your own ${capturedPieceEl.id.substr(10)}; that&rsquo;s illegal! ${currentPlayer} to play!`;
                                }
                                else { //This section of code runs only on the capture of a piece.
                                    if (isMoveLegal == true){
                                        console.log(`${capturedPieceEl.id} captured!`);
                                        if(capturedPieceEl.id.substr(-1,1)=="K"){
                                            chessKingColour = capturedPieceEl.id.substr(-6,5);
                                            chessWinner = otherPlayer(chessKingColour);
                                            chessMessage.textContent = `Checkmate! ${pieceToMoveEl.id.substr(5)} has captured the ${chessKingColour} king! ${chessWinner} has won!`;
                                            chessInput.style.display = "none";
                                            chessInputButton.style.display = "none";
                                        }
                                        else {
                                            chessMessage.textContent=`${capturedPieceEl.id.substr(5)} captured!`;
                                        }
                                        newSquareEl.removeChild(capturedPieceEl);
                                    }
                                    else {
                                        chessMessage.textContent = `${pieceToMove} to ${newSquare.toLowerCase()} is illegal! ${currentPlayer} to play!`
                                    }
                                }
                            }
                            else {
                                chessMessage.textContent="";
                            }
                            // The following code runs regardless of whether we are capturing or not.
                            console.log(`Legality is ${isMoveLegal}.`)
                            if (isMoveLegal) {
                                newSquareEl.appendChild(pieceToMoveEl);
                                if (currentPlayer=="White"){promotionRow=8}
                                else {promotionRow=1};
                                if(pieceToMoveType=="P"&&cellRankNum(newSquare)==promotionRow) {
                                    console.log("We are promoting!");
                                    chessMessage.innerHTML += ` Promotion &mdash; ${pieceToMoveEl.id.substr(5)} has turned into a Queen! `;
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
                                    chessMessage.textContent += ` ${currentPlayer} to play!`
                                }
                            }
                            else {
                                if(newSquareEl!==null && newSquareEl.childElementCount==0){
                                    chessMessage.textContent = `${pieceToMove} to ${newSquare.toLowerCase()} is illegal! ${currentPlayer} to play!`
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}



chessInputButton.addEventListener("click",chessMovePiece)