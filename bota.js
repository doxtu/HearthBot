var PowerHistory = require("./src/capture");
var Game = require("./src/game").game;
var GameListener = require("./src/game");
var movement = require("./src/movement");
var Controller = new movement();
var SHASAI = require("./src/SHASAI");
var myGame;

/*
	INITIALIZE FOR SETUP AND CLOSING
*/
init();

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
});

function init(){
	myGame = new Game();
	AI = new SHASAI(myGame);
	myGame.startGame();
	
	Promise.all([
		new Promise(waitForInitialDecode),
		new Promise(waitForMulligan),
		new Promise(waitForTurn)
	])
	.then(turn)
	.catch(function(){
		console.log("Error incurred");
		process.exit();
	});
}

//BOT SPECIFIC ACTIONS

function mulligan(){
	var action = AI.mulligan();
	new Promise(function(s,f){
		setTimeout(function(){
			Controller.mulligan(action);
			s();
		},18*1000);		
	})
	.then(waitForTurn);
}

function turn(passed){
	//Execute mulligan controls and wait
	if(passed[2] == 1){
		console.log("--YOU-GO-FIRST--\n");
		//Mulligan and then take turn after mulligan completed;
	}
	else if(passed[2] == 2){
		console.log("--YOU-GO-SECOND--\n");
		//Initialize global turn listener;
	}	
}


//PROMISE FUNCTIONS, ASYNCRONOUS ACTIONS

function waitForInitialDecode(s,f){
	PowerHistory.once("decoded",function(decoded){
		//initial decode
		console.log("--INITIAL-DECODE--\n");
		myGame.updateGame(decoded);
		s();
	});	
}

function waitForMulligan(s,f){
	GameListener.once("mulligan",function(){
		console.log("--MULLIGAN--\n");
		myGame.mulligan = false;
		s();
	});
}

function waitForTurn(s,f){
	GameListener.once("turn",function(){
		if(myGame.FriendlyTurn){
			s(1);
		}
		s(2);		
	});
}