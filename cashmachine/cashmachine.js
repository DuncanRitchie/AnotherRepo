let accountPin = 1234;
let accountTotal = 1000;
let quizQuestions = ["At the start of a for-loop, what symbol separates the three declarations within the round brackets?","What word do we call a variable, marked with square brackets, that can contain multiple values?","What is the method in a class that is used to create the keys across multiple objects?","What keyword is the modern version of var, used to declare a variable that can be changed later?","What symbols do we put between two booleans, so that they return false when both are false, and return true otherwise?","What symbols to we put between two booleans, so that they return true only when both are true?","JavaScript is named after an island in what country?","What two letters are used in the command line to change the current folder to another folder?","What is the three-letter name of the very popular software that runs in the command line and tracks changes to files?","What adjective describes a repository that is not local, but on a website?"];
quizCorrectAnswers = [";","array","constructor","let","||","&&","Indonesia","cd","Git","remote"];
quizAnswers = [];

const are2ArraysTheSame = (array1,array2) => {
  return array1.join("#").toLowerCase()==array2.join("#").toLowerCase()
}

const launchPrompt = () => {
  let pin = prompt("Please enter your PIN.", "0000");
if (pin == accountPin) {
  pinCorrect = true;
    let amount = prompt("Please enter a positive number to withdraw that amount, enter 0 to view your balance, or enter a negative number to play a quiz for that amount.",10);
  if (isNaN(amount)){
  message=`You didn’t enter an amount to withdraw. Your balance is still £${accountTotal}.`
                    }
 else if (amount == 0){
    message = `Your balance is £${accountTotal}.`
                      }
 else if (amount>0) {
       if (amount <= accountTotal){
     oldTotal = accountTotal;
     accountTotal -= amount;
     message = `Withdrawing £${amount} from your account. Your balance was £${oldTotal}, but now it’s £${accountTotal}.`
                                  }
        else {
      message = `Insufficient funds! You cannot withdraw £${amount} because you only have £${accountTotal} in this account.`
            }
                   }
 else if (amount<0) {
      quizAnswers = [];
      let quizStart = prompt(`You are trying to add £${Math.abs(amount)} to your account. To do that, you have to complete a quiz correctly. Enter "Start" to start the quiz.`,"Start")
      if(quizStart="Start") {
        for (i=0;i<quizQuestions.length;i++) {
          quizNewAnswer = prompt(quizQuestions[i],"Answer");
          quizAnswers.push(quizNewAnswer);
        }
        if (are2ArraysTheSame(quizAnswers,quizCorrectAnswers)) {
        accountTotal -= amount;
        message = `You got it all right! Adding £${Math.abs(amount)}. Your balance is now £${accountTotal}.`}
        else {message = `You answered ${quizAnswers}. The correct answers were ${quizCorrectAnswers}. You’ve gone wrong. Try again. Your balance is still £${accountTotal}.`}
      }
      else {message = "You have to complete the quiz to add money to your account."}
                 }
 else {
  message=`You didn’t enter a valid amount to withdraw. Your balance is still £${accountTotal}.`
      }   
  if (accountTotal == 0 && pinCorrect == true){
    message+=` You have £0. You’re bankrupt!`
     }}
else { 
    accountTotal = accountTotal
    message = `Wrong PIN!`;
    pinCorrect = false;
     }
 quizAnswers=[];  document.getElementById("Message").innerHTML += message+"<br />";
    }

const changePinPrompt = () => {
  let pin = prompt("Please enter your current PIN.", "0000");
 if (pin == accountPin) {
    let newPin = prompt("Please enter a new PIN.","0000");
       if (newPin !== null && newPin>=0) {
        if(newPin == accountPin) {
          message=`Your new PIN is the same as your old one. Your PIN has not changed.`
        }
        else {
          accountPin = newPin;
          message=`You have successfully changed your PIN.`
             }
                                         }
      else {message =`You typed ${newPin}, which is not a valid new PIN. Your PIN has not changed.`; 
           }
                       }
 else {
    accountTotal = accountTotal
    message = `Wrong PIN!`
      }
          quizAnswers = [];
  document.getElementById("Message").innerHTML += message+"<br />";
    }