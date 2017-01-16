var robot = require("robotjs");
var screenSize = robot.getScreenSize();
var protobuf = require("protobufjs");
var PowerHistory = require("./src/capture");
var Game = require("./src/game").game;
var GameListener = require("./src/game");
var movement = require("./src/movement");
var Controller = new movement();

var myGame;
cleanup();
// var SHASAI = new SHASAI();

PowerHistory.on("decoded", function(decoded){
	myGame.updateGame(decoded);
});

GameListener.on("turn",function(turn){
	var mulligan = false;
	var myTurn = false;
	if(myGame.mulligan){
			console.log("----------------------");
			console.log("MULLIGAN");
			console.log("----------------------");
			myGame.mulligan = false;
			mulligan = true;
	}
	if(myGame.FriendlyTurn === turn){
		console.log("----------------------");
		console.log("YOUR TURN");
		console.log("YOUR MANA:",myGame.mana);
		console.log("----------------------");
		console.log(" ");
		myTurn = true;
	}
	
	//SHASAI decides turn.
	//CONTROLLER EXECUTES.
});

GameListener.on("over",function(loser){
	if(myGame.FriendlyEntityId === loser){
		console.log("----------------------");
		console.log("GAME LOST");
		console.log("----------------------");
	}
	else{
		console.log("----------------------");
		console.log("GAME WON");
		console.log("----------------------");
	}
	console.log(" ");
	cleanup();
});

function cleanup(){
	myGame = new Game();
	myGame.startGame();
}

function parseGame(Game){
	// var PV = SHASAI.turn(Game);
}

function turn(play){
	//controller.execute(play);
}