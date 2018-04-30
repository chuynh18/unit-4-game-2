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

var setGameState = function(gameStateIndex) {
    console.log("Game state transition from " + currentGameState + " to " + gameStateIndex);
    currentGameState = gameStateIndex;
};

// msg is a string (so use quotes!), num is 1, 2, or 3 depending on where you want the message to appear.  1 top, 3 bottom
var messageWriter = function(msg, num) {
    $("#messageArea"+num).text(msg);
};

// ----------------------- game code -----------------------

$(function() {
    // on page load, put the chars on the page and set the game state to choosePlayerChar
    createCharSelect(characters);
    messageWriter("Choose your character: ", 1);
    console.log("Current game state is: " + currentGameState);

    $(".charImg").on("click", function() {
        if (currentGameState === gameState[0]) {
            waitingEnemies = characters;
            playerChar = waitingEnemies.splice(this.id,1);
            console.log("You chose: " + playerChar[0].name);
            console.log(waitingEnemies);
            createPlayerChar();
            createWaitingEnemies();
            $("#charSelect").empty();
            messageWriter("", 1);
            messageWriter("Choose your opponent...", 4);
            setGameState(gameState[1]);
        }

    })

});