
//This is the initial value of the object called pet.
const startPet = {
    name: "Name",
    type: "animal",
    gender: "",
    subject: "it",
    possessive: "its",
    health: 50,
    hunger: 50,
    thirst: 50,
    boredom: 50,
    restlessness: 50,
  }
  
  let pet = startPet
  petDead = false;
  gameStarted = false;
  
  //rOT stands for "ravages of time". It worsens the lifesigns every two seconds.
  let rOT = setInterval(function() {
    if(gameStarted){
    pet.health-=5;
    pet.hunger+=5;
    pet.thirst+=8;
    pet.boredom+=5;
    pet.restlessness+=7;
    update();}
  },2000)
  
  const startROT = () => {rOT}
  
  //selectAnimal() runs when an animal picture is clicked.
  const selectAnimal = (animal) => {
    pet.type = animal;
    let name = prompt(`Please give your ${pet.type} a name.`,`${pet.name}`);
    let gender = prompt(`Please give your ${pet.type} a gender.`,`male/female`);
    document.getElementById("animalSelect").style.display = "none";
    document.getElementById("rubricDiv").style.display = "block";
    document.getElementById("petInRubric").innerHTML = pet.type;
    document.getElementById("nurtureContainer").style.display = "block";
    document.getElementById("lifesignContainer").style.display = "block";
    pet.name = name;
    pet.gender = gender;
    message = `You now have a ${pet.gender} ${pet.type} called ${pet.name}. `;
    gameStarted=true;
    document.getElementById("Message").innerHTML = message;
    petDead=false;
    setSynonyms();
    startDate = Date.now();
    update();
    startROT();
  }
  
  //setSynonyms() changes the pet's pronouns and death message according to its gender and type.
  const setSynonyms = () => {
    switch (pet.gender) {
      case "male":
        pet.subject = "he";
        pet.possessive = "his";
        break;
      case "m":
        pet.subject = "he";
        pet.possessive = "his";
        break;
      case "female":
        pet.subject = "she";
        pet.possessive = "her";
        break;
      case "f":
        pet.subject = "she";
        pet.possessive = "her";
        break;
      default:
        pet.subject = "it";
        pet.possessive = "its";
        break;
    }
  switch (pet.type) {
    case "dog":
      picURL = "https://farm2.staticflickr.com/1142/1139134023_c497d6b907_z.jpg";
      break;
    case "cat":
      picURL = "https://farm5.staticflickr.com/4447/37761450081_abd8bce5f8_k.jpg";
      break;
    case "rabbit":
      picURL = "https://farm1.staticflickr.com/929/43986331111_f71f9200c3_k.jpg";
      synonymOfIsDead = `has hopped ${pet.possessive} clogs`;
      break;
    case "parrot":
      picURL = "https://farm1.staticflickr.com/621/22243094746_b96fd558a8_b.jpg";
      synonymOfIsDead = `is 'pining for the fjords'`;
      break;
    case "snake":
      picURL = "https://farm5.staticflickr.com/4831/31237635227_ae50d4a8d0_b.jpg";
      synonymOfIsDead = `has slithered off ${pet.possessive} mortal coil`;
      break;
    default:
      synonymOfIsDead = `is an ex-${pet.type}, ${pet.subject}'s kicked the bucket, ${pet.subject}'s shuffled off ${pet.possessive} mortal coil, run down the curtain and joined the choir invisible`
  }
    document.getElementById("petPic").src=picURL;
  }
  
  //update() updates the lifesign values and messages onscreen.
  const update = () => {
    if (petDead) {
      message=`But ${pet.name} the ${pet.type} ${synonymOfIsDead}.`
    document.getElementById("Message").innerHTML+=message
    }
    if (petDead) {pet.health=0}
    else {
      health=100-1.9*Math.max(pet.hunger,pet.thirst,pet.boredom,pet.restlessness);
      if(pet.health>=100){pet.health=100}
      if(pet.hunger<=0){pet.hunger=0}
      if(pet.thirst<=0){pet.thirst=0}
      if(pet.boredom<=0){pet.boredom=0}
      if(pet.restlessness<=0){pet.restlessness=0}
   checkLifesigns();
    document.getElementById("hungerValue").innerHTML=pet.hunger;
    document.getElementById("thirstValue").innerHTML=pet.thirst;
    document.getElementById("restlessnessValue").innerHTML=pet.restlessness;
    document.getElementById("boredomValue").innerHTML=pet.boredom;
    document.getElementById("healthValue").innerHTML=pet.health;
            }
  }
  
  //The following functions run when the nurturing buttons are clicked.
  
  const giveFood = () => {
    pet.health+=5;
    pet.hunger-=10;
    pet.thirst+=8;
    pet.boredom-=8;
    pet.restlessness+=2;
    document.getElementById("Message").innerHTML+=`<br />${pet.name} has been given food. `;
    // startROT();
    update()
  }
  
  const giveWater = () => {
    pet.health+=5;
    pet.hunger-=3;
    pet.thirst-=10;
    pet.boredom+=8;
    pet.restlessness-=1;
    document.getElementById("Message").innerHTML+=`<br />${pet.name} has been given water. `;
    update()
  }
  
  const givePlay = () => {
    pet.health+=1;
    pet.hunger+=1;
    pet.thirst+=3;
    pet.boredom-=10;
    pet.restlessness-=6;
    document.getElementById("Message").innerHTML+=`<br />${pet.name} has been played with. `;
    update()
  }
  
  const giveWalk = () => {
    pet.health+=10;
    pet.hunger+=3;
    pet.thirst+=5;
    pet.boredom-=15;
    pet.restlessness-=14;
    document.getElementById("Message").innerHTML+=`<br />${pet.name} has been taken for a walk. `;
    update()
  }
  
  //checkLifesigns() runs whenever update() runs. It kills the pet if a lifesign is critical.
  const checkLifesigns = () => {
    if (petDead==false){
      message="";
      if (pet.health <= 0){
      message=` ${pet.name} the ${pet.type} has died of poor health`;
      killPet()
    }
    else if (pet.hunger >= 100){
      message=` ${pet.name} the ${pet.type} has died of hunger`;
      killPet()
    }
    else if (pet.thirst >= 100){
      message=` ${pet.name} the ${pet.type} has died of thirst`;
      killPet()
    }
    else if (pet.boredom >= 100){
      message=` ${pet.name} the ${pet.type} has died of boredom`;
      killPet()
    }
    else if (pet.restlessness >= 100){
      message=` ${pet.name} the ${pet.type} has died of restlessness`;
      killPet()
    }}
  }
  
  //killPet() runs when checkLifesigns() finds that a lifesign is critical.
  const killPet = () => {
    petDead = true;
    clearInterval(rOT);
    endDate = Date.now();
    ageAtDeath = Math.floor((endDate - startDate)/1000);
    document.getElementById("rubric").innerHTML=`Game over. ${pet.name} the ${pet.type} was ${ageAtDeath} seconds old.`;
    document.getElementById("Message").innerHTML+=message+=` at the venerable age of ${ageAtDeath} seconds.`;
  }