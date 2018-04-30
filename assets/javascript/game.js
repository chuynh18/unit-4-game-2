"use strict";

/*

Is this game ugly as sin?  Yes.  I didn't really spend any time or effort making it look pretty.
I just wanted to practice a little more jQuery and also learn some more logic.
I think this is the first thing I wrote from scratch where I had to keep track of state.
So that's pretty cool.  I also use arrays, objects, and arrays of objects.
Thinking through this HW was pretty fun.  The implementation is probably the messiest thing
I have done yet, but I just pounded this out in a few working hours on a Sunday.  So meh.

*/

// ----------------------- variables and such -----------------------

const characters = [
    {name: "Ratio Tile", src: "assets/images/ratio.jpg", class: "charImg lightSide", title: "<img src='assets/images/ratiotext.png'>", sound: "assets/sounds/ratio.webm", hp: 180, attack: 3, originalAttack: 3, counter: 9},
    {name: "Space General", src: "assets/images/spacegeneral.jpg", class: "charImg darkSide", title: "<img src='assets/images/spacegeneraltext.png'>", sound: "assets/sounds/spacegeneral.webm", hp: 200, attack: 2, originalAttack: 2, counter: 7},
    {name: "The", src: "assets/images/the.jpg", class: "charImg darkSide", title: "<img src='assets/images/thetext.png'>", sound: "assets/sounds/the.webm", hp: 150, attack: 4, originalAttack:4, counter: 8},
    {name: "Speaker D", src: "assets/images/speaker.jpg", class: "charImg darkSide", title: "<img src='assets/images/speakertext.png'>", sound: "assets/sounds/speaker.webm", hp: 115, attack: 5, originalAttack: 5, counter: 13}
];
var playerChar = {};
var activeEnemy = {};
var waitingEnemies = [];

const gameState = ["choosePlayerChar", "chooseEnemyChar", "battle"];
var currentGameState = gameState[0];
var audioElement = document.createElement("audio");

// ----------------------- functions -----------------------

// creates the clickable characters based on data from a given array of objects
var createCharSelect = function() {
    for (var i = 0; i < characters.length; i++) {
        var charContainer = $("<div>");
        var charImg = $("<img>");
        charContainer.addClass("charContainer");
        charContainer.attr("id", "char"+(i+1));
        charImg.attr("src", characters[i].src);
        charImg.addClass(characters[i].class);
        charImg.attr("alt", characters[i].name);
        charImg.attr("id", i);
        $("#charSelect").append(charContainer);
        $("#charSelect > #char"+(i+1)).append(charImg);
    }
};
// wanted to keep it DRY but don't know how yet
var createPlayerChar = function() {
    for (var i = 0; i < playerChar.length; i++) {
        var charContainer = $("<div>");
        var charImg = $("<img>");
        charContainer.addClass("charContainer");
        charContainer.attr("id", "char"+(i+1));
        charImg.attr("src", playerChar[i].src);
        charImg.addClass(playerChar[i].class);
        charImg.attr("alt", playerChar[i].name);
        charImg.attr("id", 420);
        $("#youArea").append(charContainer); // this line and the line below... I would need to make jQuery accept an argument from my function
        $("#youArea > #char"+(i+1)).append(charImg);
    }
};

var createWaitingEnemies = function() {
    $("#waitingRoom").empty();
    for (var i = 0; i < waitingEnemies.length; i++) {
        var charContainer = $("<div>");
        var charImg = $("<img>");
        charContainer.addClass("charContainer");
        charContainer.attr("id", "char"+(i+1));
        charImg.attr("src", waitingEnemies[i].src);
        charImg.addClass(waitingEnemies[i].class);
        charImg.attr("alt", waitingEnemies[i].name);
        charImg.attr("id", i);
        $("#waitingRoom").append(charContainer);
        $("#waitingRoom > #char"+(i+1)).append(charImg);
    }
};

var createActiveEnemy = function() {
    $("#enemyArea").empty();
    for (var i = 0; i < activeEnemy.length; i++) {
        var charContainer = $("<div>");
        var charImg = $("<img>");
        charContainer.addClass("charContainer");
        charContainer.attr("id", "char"+(i+1));
        charImg.attr("src", activeEnemy[i].src);
        charImg.addClass(activeEnemy[i].class);
        charImg.attr("alt", activeEnemy[i].name);
        charImg.attr("id", i);
        $("#enemyArea").append(charContainer);
        $("#enemyArea > #char"+(i+1)).append(charImg);
    }
};

var setGameState = function(gameStateIndex) {
    console.log("Game state transition from " + currentGameState + " to " + gameStateIndex);
    currentGameState = gameStateIndex;
};

// msg is a string (so use quotes!), num is 1 through 6
// 1, 2, 3 are 3 lines in the original character select box
// 4 is in the opponent box
// 5 is in your character's box
// 6 is in the enemyStats box
// 7 is the enemy's name
var messageWriter = function(msg, num) {
    $("#messageArea"+num).text(msg);
};

// just in case I need HTML
var htmlWriter = function(msg, num) {
    $("#messageArea"+num).html(msg);
};

// ----------------------- game code -----------------------

$(function() {
    // on page load, put the chars on the page and set the game state to "choosePlayerChar"

    // this is what I used to figure out why the heck the game was not resetting successfully
    // who designed this default behavior for const and arrays/objects?!?!?!
    for (var i = 0; i < characters.length; i++) {
        Object.freeze(characters[i]);
    };
    Object.freeze(characters);
    createCharSelect();
    messageWriter("Choose your character: ", 1);
    console.log("Current game state is: " + currentGameState);

    $(document).on("click", ".charImg", function() {

        if (currentGameState === gameState[0]) {
            // seriously, javascript?  thanks for nothing
            waitingEnemies = JSON.parse(JSON.stringify(characters));
            playerChar = waitingEnemies.splice(this.id,1);
            console.log("You chose: " + playerChar[0].name);
            console.log("You did not choose the sad fools in this array:");
            console.log(waitingEnemies);
            createPlayerChar();
            createWaitingEnemies();
            $("#charSelect").empty();
            messageWriter("", 1);
            messageWriter("", 2);
            messageWriter("", 3);
            messageWriter("", 6);
            messageWriter("", 7);
            htmlWriter(playerChar[0].title, 5);
            messageWriter("Choose your opponent...", 4);
            setGameState(gameState[1]);
        }

        else if (currentGameState === gameState[1]) {
            console.log(this.id);
            if (this.id > 10) {
                messageWriter("No, silly!  Click on an ENEMY, not yourself!", 1);
                messageWriter("Click on an enemy to fight them!", 4);
            }
            else if (this.id < 10) {
                activeEnemy = waitingEnemies.splice(this.id,1);
                console.log("You chose " + activeEnemy[0].name + " as your enemy.");
                console.log("You did not choose the sad fools in this array:");
                console.log(waitingEnemies);
                createWaitingEnemies();
                createActiveEnemy();
                htmlWriter(activeEnemy[0].title, 7);
                messageWriter("These fine gentlemen are waiting their turn to fight you!", 4);
                messageWriter("HP: " + playerChar[0].hp, 2);
                messageWriter("POWER LEVEL: " + playerChar[0].attack, 3);
                messageWriter("Click any portrait to fight!", 1);
                htmlWriter("HP: " + activeEnemy[0].hp + "<br>POWER LEVEL: " + activeEnemy[0].counter, 6);
                setGameState(gameState[2]);
            }
        }

        else if (currentGameState === gameState[2]) {
            activeEnemy[0].hp -= playerChar[0].attack;
            // console.log(activeEnemy[0].hp);
            playerChar[0].hp -= activeEnemy[0].counter;
            playerChar[0].attack += playerChar[0].originalAttack;
            messageWriter("HP: " + playerChar[0].hp, 2);
            messageWriter("POWER LEVEL: " + playerChar[0].attack, 3);
            htmlWriter("HP: " + activeEnemy[0].hp + "<br>POWER LEVEL: " + activeEnemy[0].counter, 6);
            
            if (waitingEnemies.length === 0 && activeEnemy[0].hp < 1) {
                for (var i = 1; i < 8; i++) {
                    messageWriter("You win!", i);
                };
                playerChar = {};
                activeEnemy = {};
                waitingEnemies = [];
                $("#enemyArea").empty();
                createCharSelect();
                messageWriter("Choose your character: ", 1);
                $("#youArea").empty()
                audioElement.play();
                setGameState(gameState[0]);
            }

            else if (playerChar[0].hp < 1) {
                for (var i = 1; i < 8; i++) {
                    messageWriter("Game over!", i);
                };
                $("#youArea").empty();
                $("#enemyArea").empty();
                audioElement.setAttribute("src", activeEnemy[0].sound);
                audioElement.play();
                playerChar = {};
                activeEnemy = {};
                waitingEnemies = [];
                createCharSelect();
                messageWriter("Choose your character: ", 1);
                setGameState(gameState[0]);
            }

            else if (activeEnemy[0].hp < 1) {
                messageWriter("Enemy defeated!", 6);
                messageWriter("Choose your next opponent!", 1);
                messageWriter("DEAD LOL", 7);
                $("#enemyArea").empty();
                audioElement.setAttribute("src", playerChar[0].sound);
                audioElement.play();
                currentGameState = gameState[1];
            }
            
        }

    })

});