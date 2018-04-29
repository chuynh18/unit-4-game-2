"use strict";

var playerChar;
var gameState;
var characters = [
    {name: "Ratio Tile", src: "assets/images/ratio.jpg", class: "charImg lightSide", hp: 200, attack: 10, counter: 6},
    {name: "Space General", src: "assets/images/spacegeneral.jpg", class: "charImg darkSide", hp: 250, attack: 8, counter: 7},
    {name: "The", src: "assets/images/the.jpg", class: "charImg darkSide", hp: 150, attack: 12, counter: 11},
    {name: "Speaker D", src: "assets/images/speaker.jpg", class: "charImg darkSide", hp: 225, attack: 13, counter: 5}
];

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
        $("#charSelect").append(charContainer);
        $("#char"+(i+1)).append(charImg);
    }
};

$(function() {

});