"use strict";

// ----------------------- variables and such -----------------------

const characters = [
    {name: "Ratio Tile", src: "assets/images/ratio.jpg", class: "charImg lightSide", hp: 200, attack: 10, counter: 6},
    {name: "Space General", src: "assets/images/spacegeneral.jpg", class: "charImg darkSide", hp: 250, attack: 8, counter: 7},
    {name: "The", src: "assets/images/the.jpg", class: "charImg darkSide", hp: 150, attack: 12, counter: 11},
    {name: "Speaker D", src: "assets/images/speaker.jpg", class: "charImg darkSide", hp: 225, attack: 13, counter: 5}
];
var playerChar = {};
var activeEnemy = {};
var waitingEnemies = [];

const gameState = ["choosePlayerChar", "chooseEnemyChar", "battle"];
var currentGameState = gameState[0];

// ----------------------- functions -----------------------

// creates the clickable characters based on data from a given array of objects
var createCharSelect = function(inputArrayOfObjects) {
    for (var i = 0; i < inputArrayOfObjects.length; i++) {
        var charContainer = $("<div>");
        var charImg = $("<img>");
        charContainer.addClass("charContainer");
        charContainer.attr("id", "char"+(i+1));
        charImg.attr("src", inputArrayOfObjects[i].src);
        charImg.addClass(inputArrayOfObjects[i].class);
        charImg.attr("alt", inputArrayOfObjects[i].name);
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
        charImg.attr("id", i);
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
    // on page load, put the chars on the page and set the game state to choosePlayerChar
    createCharSelect(characters);
    messageWriter("Choose your character: ", 1);
    console.log("Current game state is: " + currentGameState);

    $(document).on("click", ".charImg", function() {
        if (currentGameState === gameState[0]) {
            waitingEnemies = characters;
            playerChar = waitingEnemies.splice(this.id,1);
            console.log("You chose: " + playerChar[0].name);
            console.log("You did not choose the sad fools in this array:");
            console.log(waitingEnemies);
            createPlayerChar();
            createWaitingEnemies();
            $("#charSelect").empty();
            messageWriter("", 1);
            messageWriter("You", 5);
            messageWriter("Choose your opponent...", 4);
            setGameState(gameState[1]);
        }

        else if (currentGameState === gameState[1]) {
            activeEnemy = waitingEnemies.splice(this.id,1);
            console.log("You chose " + activeEnemy[0].name + " as your enemy.");
            console.log("You did not choose the sad fools in this array:");
            console.log(waitingEnemies);
            createWaitingEnemies();
            createActiveEnemy();
            messageWriter("Your enemy", 7);
            messageWriter("These fine gentlemen are waiting their turn to fight you!", 4);
            messageWriter("HP: " + playerChar[0].hp, 2);
            messageWriter("POWER LEVEL: " + playerChar[0].attack, 3);
            setGameState(gameState[2]);
        }

        else if (currentGameState === gameState[2]) {

        }

    })

});