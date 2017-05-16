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
	console.log("mulligan phase",turn,"\n");
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
	console.log("updated game & ai\n");
	var friendly = null;
	AI = new SHASAI(myGame);	
	console.log("corrected ai data:",AI.corrected);
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
	console.log("attempting to execute turn\n",move,"\n");
	var action = [];
	new Promise(function(s,f){
		setTimeout(function(){
			console.log("friendly hand size",myGame.FriendlyHand.length);
			action = AI.play();
			console.log("timer over, AI made play\n");
			s();
		},10*1000)
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
	console.log("opened decoder\n");
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