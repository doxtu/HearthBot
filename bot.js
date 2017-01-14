var robot = require("robotjs");
var screenSize = robot.getScreenSize();
var protobuf = require("protobufjs");
var PowerHistory = require("./src/capture");
var Game = require("./src/game").game;
var GameListener = require("./src/game");

//this program must be ran from the select deck screen.
//deck must be selected and mode must be chosen.

var myGame = new Game();
// var SHASAI = new SHASAI();

if(!myGame.running){
	//controller.startGame();
	myGame.startGame();
	//myGame.mulligan();
}

PowerHistory.on("decoded", function(decoded){
	myGame.updateGame(decoded);
});

GameListener.on("turn",function(playerEntityId){
	if(myGame.FriendlyEntityId === playerEntityId){
		//parse board, execute turn;
		console.log("YOUR TURN");
	}
});

function cleanup(){
	//myGame = new Game();
}

function parseGame(Game){
	// var PV = SHASAI.turn(Game);
}

function turn(play){
	//controller.execute(play);
}