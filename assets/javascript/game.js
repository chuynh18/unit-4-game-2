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
var currentGameState;

// ----------------------- functions -----------------------

// creates the clickable characters based on data from the "characters" array of objects
var createChars = function() {
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
        $("#char"+(i+1)).append(charImg);
    }
};

var setGameState = function(gameStateIndex) {
    currentGameState = gameStateIndex;
}

// ----------------------- game code -----------------------

$(function() {
    // on page load, put the chars on the page and set the game state to choosePlayerChar
    createChars();
    setGameState(gameState[0]);

    $(".charImg").on("click", function() {
        if (currentGameState === gameState[0]) {
            waitingEnemies = characters;
            playerChar = waitingEnemies.splice(this.id,1)[0];
            console.log("You chose: " + playerChar.name);
            console.log(waitingEnemies);
            setGameState(gameState[1]);
        }

    })

});