var robot = require("robotjs");
var screenSize = robot.getScreenSize();
var protobuf = require("protobufjs");
var PowerHistory = require("./src/capture");
var Game = require("./src/game").game;
var GameListener = require("./src/game");

// Todo list:
// -Signal when game over
// -Signal turn change after all updates complete
// -Ignore position 0 on board, find hero cards. Hero cards are deleted from board. create play field for them? 
// -Track Current Resources

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