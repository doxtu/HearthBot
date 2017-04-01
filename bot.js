var protobuf = require("protobufjs");
var PowerHistory = require("./src/capture");
var Game = require("./src/game").game;
var GameListener = require("./src/game");
var movement = require("./src/movement");
var Controller = new movement();
var SHASAI = require("./src/SHASAI");
var AI = new SHASAI();
var myGame;
cleanup();

PowerHistory.on("decoded", function(decoded){
	myGame.updateGame(decoded);
	AI.update(myGame);
});

GameListener.on("turn",function(turn,mulligan){
	if(myGame.FriendlyTurn){
		console.log("----------------------");
		console.log("YOUR TURN");
		console.log("YOUR MANA:",myGame.mana);
		console.log("----------------------");
		console.log(" ");
		var action = AI.construct();
		Controller.turn(action);
	}
});

GameListener.on("mulligan",function(){
	console.log("----------------------");
	console.log("MULLIGAN");
	console.log("----------------------");
	console.log(" ");
	var action = AI.mulligan();
	Controller.mulligan(action);
	myGame.mulligan = false;
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
	process.exit();
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