var robot = require("robotjs");
var screenSize = robot.getScreenSize();
var protobuf = require("protobufjs");
var PowerHistory = require("./src/capture");
var Game = require("./src/game").game;
var GameListener = require("./src/game");

// Todo list:
// -Signal when game over
// -Track health of minions, and resolve overstayed minion bug
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

GameListener.on("turn",function(turn){
	if(myGame.FriendlyTurn === turn){
		console.log("YOUR TURN");
	}
});

GameListener.on("over",function(loser){
	if(myGame.FriendlyEntityId === loser){
		console.log("GAME LOST");
	}
	else{
		console.log("GAME WON");
	}
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