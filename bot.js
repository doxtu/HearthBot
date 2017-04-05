var protobuf = require("protobufjs");
var PowerHistory = require("./src/capture");
var Game = require("./src/game").game;
var GameListener = require("./src/game");
var movement = require("./src/movement");
var Controller = new movement();
var SHASAI = require("./src/SHASAI");
var AI = new SHASAI();
var myGame, beginSequence,globalTurn,globalDecode;

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
	//this seems illogical and out of order
	startFirstTurn();
	//this is the first logical action that should happen
	Promise.all([
		new Promise(function(s,f){
			PowerHistory.once("decoded", function(decoded){
				console.log("----------------------");
				console.log("INITIAL DATA ARRIVAL");
				console.log("----------------------");
				console.log(" ");
			
				new Promise(function(su,fa){
					myGame.updateGame(decoded);
					console.log("game-updated");
					su();				
				}).then(function(){
					AI.update(myGame);
					console.log("ai-updated");
					s();
				});
			});			
		}),
		new Promise(function(s,f){
			GameListener.once("mulligan",function(){
				console.log("----------------------");
				console.log("MULLIGAN");
				console.log("----------------------");
				console.log(" ");
				myGame.mulligan = false;
				s();
			});			
		})
	]).then(function(){
		//why does the asyncronous action happen here?
		//this should also be a promise
		var action = AI.mulligan();
		setTimeout(function(){
			Controller.mulligan(action);
		},18*1000);
		localDecode = localMulligan = null;
		startGlobalDecode();
	});
	
}

function startFirstTurn(){
	//this should be merged somewhere as a promise in the init function
	GameListener.once("turn",function(turn,mulligan){			
		if(myGame.FriendlyTurn){
			console.log("----------------------");
			console.log("YOUR TURN");
			console.log("YOUR MANA:",myGame.mana);
			console.log("----------------------");
			console.log(" ");
			//strange use of timeout. should instead signal end of mulligan
			//via a promise or some other construct
			//should also switch between AI parsing and play.
			//One move at a time would be ideal
			//this becomes even more try in the startGlobalTurn function
			new Promise(function(s,f){
				setTimeout(function(){
					startGlobalTurn();
					var action = AI.play();
					console.log("ACTION",action);
					Controller.turn(action);
					s();
				},30*1000);				
			}).then(function(){
				AI.update(myGame);
				Controller.heroPower();
				Controller.endTurn();
			});
		}
	});
}

function startGlobalTurn(){
	GameListener.on("turn",function(turn,mulligan){			
		if(myGame.FriendlyTurn){
			console.log("----------------------");
			console.log("YOUR TURN");
			console.log("YOUR MANA:",myGame.mana);
			console.log("----------------------");
			console.log(" ");
			
			Promise.all([
				new Promise(function(s,f){
					setTimeout(function(){
						var action = AI.play();
						Controller.turn(action);
						s();
					},8*1000);
				}),
				new Promise(function(s,f){
					setTimeout(function(){
						AI.update(myGame);
						s();
					},10*1000);
				})
			]).then(function(){
				var action = AI.attack();
				console.log("ATTACK ACTION:", action);
				Controller.turn(action);
				Controller.heroPower();
				Controller.endTurn();
			});
		}
	});
}

function startGlobalDecode(){
		//strange that you have to do it this way. Is this even valid?
		globalDecode = PowerHistory.on("decoded", function(decoded){
			new Promise(function(su,fa){
				myGame.updateGame(decoded);
				su();				
			}).then(function(){
				AI.update(myGame);
			});
		});	
}
