var PowerHistory = require("./src/capture");
var Game = require("./src/game").game;
var GameListener = require("./src/game");
var movement = require("./src/movement");
var Controller = new movement();
var SHASAI = require("./src/SHASAI");
var myGame,turnStack = [];

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

//BOT SPECIFIC ACTIONS: 
//turn is the 1st turn, and then every turn after, turnAfterFirst is used

function mulligan(turn){
	var action = AI.mulligan();
	new Promise(function(s,f){
		setTimeout(function(){
			Controller.mulligan(action);
			if(turn == 1)
				s();
			else
				f();
		},19*1000);		
	})
	.then(executeTurn)
	.catch(gameControl)
}

function turn(passed){
	//Execute mulligan controls and wait
	AI = new SHASAI(myGame);
	if(passed[2] == 1){
		console.log("--YOU-GO-FIRST--\n");
	}
	else if(passed[2] == 2){
		console.log("--YOU-GO-SECOND--\n");
	}	
	mulligan(passed[2]);
}

function turnAfterFirst(passed){
	if(passed[2] == 1){
		console.log("--YOUR-TURN--\n");
	}
}

//GAME CONTROL FLOW

function gameControl(){
	Promise.all([
		new Promise()
	])
}

function executeTurn(){
	//execute move, analyze, repeat, and then pass to game control
	new Promise(function(s,f){
		setTimeout(function(){
			
		},10*1000)
	})
}

function executeMove(){
	//determine the ONE play and then return to execute turn
}

//DATA LISTENERS
	
function decodedHandler(){
	console.log("--DATA-IN--\n");
	myGame.updateGame(decoded);		
}

function openDecode(){
	PowerHistory.on("decoded",decodedHandler);	
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