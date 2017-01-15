var robot = require("robotjs");
var screenSize = robot.getScreenSize();
var protobuf = require("protobufjs");
var PowerHistory = require("./src/capture");
var Game = require("./src/game").game;
var GameListener = require("./src/game");

var myGame = new Game();
myGame.startGame();
// var SHASAI = new SHASAI();

PowerHistory.on("decoded", function(decoded){
	myGame.updateGame(decoded);
});

GameListener.on("turn",function(turn){
	if(myGame.FriendlyTurn === turn){
		console.log("----------------------");
		console.log("YOUR TURN");
		console.log("YOUR MANA:",myGame.mana);
		console.log("----------------------");
		console.log(" ");
	}
});

GameListener.on("over",function(loser){
	if(myGame.FriendlyEntityId === loser){
		console.log("GAME LOST");
	}
	else{
		console.log("GAME WON");
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