let arrayOfAliens = [];

let hero = {name: 'USS HelloWorld', hitpoints: 20, firepower: 5, accuracy: 70}

initialize()
function initialize() {
    arrayOfAliens = [];
    hero = {name: 'USS HelloWorld', hitpoints: 20, firepower: 5, accuracy: 70}
    
    document.getElementById("startGame").disabled = false;
    document.getElementById("attackButton").disabled = true;
    document.getElementById("retreatButton").disabled = true;
    document.getElementById("nextButton").disabled = true;

    document.getElementById("nextButton").replaceWith(document.getElementById("nextButton").cloneNode(true)); 
}

function createAlien() {
    const alien = document.createElement("div");
    alien.className = 'alien';
    document.body.appendChild(alien);
}

function createAliens() {
    
    for (let i = 1; i <= 6; i++) {
        let name = 'Alien' + i;
        let hitpoints = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
        let firepower = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
        let accuracy = Math.floor(Math.random() * (80 - 60 + 1)) + 60;
        arrayOfAliens.push({name: name, hitpoints: hitpoints, firepower: firepower, accuracy: accuracy});
    }
}

function explainTheGame() {
    createAliens();

    document.getElementById("text").innerHTML = 'Welcome to Space Battle!\nYou are the captain of the spaceship USS HelloWorld and you are face-to-face with a horde of alien spaceships.\nYou will battle each alien one-by-one.\nChoose to attack the alien spaceship in front, or choose to retreat which results in you losing the battle.\nIf you can survive the assault from six alien spaceships back-to-back, you win the battle!<br />\nThe USS HelloWorld\'s stats are as follows: Hitpoints = 20, Firepower = 5, and Accuracy = 70%.\nGood luck!'

    document.getElementById("startGame").disabled = true;
    document.getElementById("attackButton").disabled = false;
    document.getElementById("retreatButton").disabled = false;
    document.getElementById("nextButton").disabled = true;
    
}

function retreatLose() {
    document.getElementById("text").innerHTML = 'The USS HelloWorld can\'t handle the aliens...you have lost the Space Battle!\nBetter luck next time...'
    initialize();
}

function attackOrRetreat() {
    document.getElementById("nextButton").replaceWith(document.getElementById("nextButton").cloneNode(true)); 
    document.getElementById("startGame").disabled = true;
    document.getElementById("attackButton").disabled = false;
    document.getElementById("retreatButton").disabled = false;
    document.getElementById("nextButton").disabled = true;
    document.getElementById("text").innerHTML = `You have ${hero.hitpoints} hitpoints left.\nClick on the Attack button to continue your attack. Otherwise, Retreat and end the game.`; 
}

function alienElimination() {
    document.getElementById("nextButton").replaceWith(document.getElementById("nextButton").cloneNode(true)); 
    if(arrayOfAliens[0].name === "Alien6" && arrayOfAliens[0].hitpoints <= 0) {
        document.getElementById("nextButton").addEventListener("click", checkForWin); 
    }
    else {
        document.getElementById("text").innerHTML = `${arrayOfAliens[0].name} has been eliminated! ${arrayOfAliens[1].name} steps up to the plate.`
        arrayOfAliens.shift();  
        document.getElementById("nextButton").addEventListener("click", attackOrRetreat); 
    }
}

function checkForWin() {
    if(arrayOfAliens[0].name === "Alien6" && arrayOfAliens[0].hitpoints <= 0) {
        document.getElementById("text").innerHTML = `There are no aliens left! The galaxy is safe once more...until the next Space Battle...<br />>>>Congratulations Captain! You have won the Space Battle!<<<`
        arrayOfAliens = [];
        initialize(); 
    }
    else {
        document.getElementById("text").innerHTML = `${arrayOfAliens[0].name} has been eliminated! ${arrayOfAliens[1].name} steps up to the plate.`
        arrayOfAliens.shift();  
        document.getElementById("nextButton").addEventListener("click", attackOrRetreat);
    }
}

function alienAttack() {
    document.getElementById("nextButton").replaceWith(document.getElementById("nextButton").cloneNode(true)); 
    if(Math.floor(Math.random()*100) <= arrayOfAliens[0].accuracy) {
        hero.hitpoints -= arrayOfAliens[0].firepower;
        document.getElementById("text").innerHTML = `${arrayOfAliens[0].name} has ${arrayOfAliens[0].hitpoints} hitpoints left. ${arrayOfAliens[0].name} attacks the USS HelloWorld! You take ${arrayOfAliens[0].firepower} damage.`
        if(hero.hitpoints > 0) { 
            document.getElementById("nextButton").addEventListener("click", attackOrRetreat);  
        }
        else {
            document.getElementById("text").innerHTML = 'Oh no! The USS HelloWorld has been eliminated!\nSorry...you have lost the Space Battle!\nBetter luck next time...'
            initialize();
        }
    }
    else {
        document.getElementById("text").innerHTML = `${arrayOfAliens[0].name} missed its attack on the USS HelloWorld! The USS HelloWorld takes 0 damage. Now, it's your turn!`
        document.getElementById("nextButton").addEventListener("click", attackOrRetreat);
    }
}

function attackAlien () {
    if(Math.floor(Math.random()*100) <= hero.accuracy) {
        arrayOfAliens[0].hitpoints -= hero.firepower;
        document.getElementById("text").innerHTML = `The USS HelloWorld attacks ${arrayOfAliens[0].name}!\n${arrayOfAliens[0].name} takes 5 damage. Alien has ${arrayOfAliens[0].accuracy} accuracy.`
        if(arrayOfAliens[0].hitpoints <= 0) {
            document.getElementById("startGame").disabled = true;
            document.getElementById("attackButton").disabled = true;
            document.getElementById("retreatButton").disabled = true;
            document.getElementById("nextButton").disabled = false;
            document.getElementById("nextButton").addEventListener("click", alienElimination);
        }
        else {
            document.getElementById("startGame").disabled = true;
            document.getElementById("attackButton").disabled = true;
            document.getElementById("retreatButton").disabled = true;
            document.getElementById("nextButton").disabled = false;
            document.getElementById("nextButton").addEventListener("click", alienAttack);
        }
    }
    else {
        document.getElementById("startGame").disabled = true;
        document.getElementById("attackButton").disabled = true;
        document.getElementById("retreatButton").disabled = true;
        document.getElementById("nextButton").disabled = false;
        document.getElementById("text").innerHTML = `The USS HelloWorld missed its attack on ${arrayOfAliens[0].name}!\n${arrayOfAliens[0].name} takes 0 damage. Now, the aliens attack! Alien has ${arrayOfAliens[0].accuracy} accuracy.`
        document.getElementById("nextButton").addEventListener("click", alienAttack);
    }
}
