"use strict"

const PowerHistory = require("./src/capture");
const Game = require("./src/game").game;
const GameListener = require("./src/game");
const movement = require("./src/movement");
const Controller = new movement();
const SHASAI = require("./src/SHASAI");
const myGame,turnStack = [];

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
	closeDecode();
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
			if(Controller.mulligan(action)){
				if(turn == 1)
					s();
				else
					f();
			}
		},19*1000);		
	})
	.then(executeTurn)
	.catch(gameControl)
}

function turn(passed){
	//Execute mulligan controls and wait
	var friendly = null;
	AI = new SHASAI(myGame);	
	if(AI.corrected && passed[2] == 1){
		passed[2] = 2;
	} else if(AI.corrected && passed[2] == 2){
		passed[2] = 1;
	}
	
	openDecode();
	
	mulligan(passed[2]);
}

//GAME CONTROL FLOW

function gameControl(){
	// console.log("game control entered\n");
	new Promise(waitForTurnInGame)
	.then(function(passed){
		if(passed == 1){
			executeTurn();
		} else{
			gameControl();
		}
	})
	.catch(gameControl);
}

function executeTurn(move){
	//execute move, analyze, repeat, and then pass to game control
	var action = [];
	new Promise(function(s,f){
		setTimeout(function(){
			action = AI.play();
			s();
		},11*1000)
	})
	.then(function(){
		return new Promise(executeMove)
	})
	.then(executeTurn)
	.catch(gameControl);

	function executeMove(s,f){
		console.log("executeMove is running\n",action,"\n");
		//determine the ONE play and then return to execute turn
		if(action.length>0 && Controller.turn(action.shift())) s(1);
		else f(Controller.endTurn());
	}	
}

//DATA LISTENERS
	
function decodedHandler(decoded){
	// console.log("--DATA-IN--\n");
	myGame.updateGame(decoded);		
}

function openDecode(){
	console.log("--OPENED-DECODER--\n");
	PowerHistory.on("decoded",decodedHandler);	
}

function closeDecode(){
	console.log("closed decoder\n");
	PowerHistory.removeListener("decoded",decodedHandler);
}

//PROMISE FUNCTIONS, ASYNCRONOUS ACTIONS


function waitForInitialDecode(s,f){
	PowerHistory.once("decoded",function(decoded){
		//initial decode
		console.log("--INITIAL-DECODE--\n");
		myGame.updateGame(decoded);
		AI = new SHASAI(myGame);
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

function waitForTurnInGame(s,f){
	GameListener.once("turn",function(){
		if(myGame.FriendlyTurn)
			s(1);
		else
			f();
	});
}