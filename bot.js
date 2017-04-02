var protobuf = require("protobufjs");
var PowerHistory = require("./src/capture");
var Game = require("./src/game").game;
var GameListener = require("./src/game");
var movement = require("./src/movement");
var Controller = new movement();
var SHASAI = require("./src/SHASAI");
var AI = new SHASAI();
var myGame, beginSequence,globalTurn,globalDecode;

cleanup();

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
	startFirstTurn();
	
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
		var action = AI.mulligan();
		setTimeout(function(){
			Controller.mulligan(action);
		},16*1000);
		localDecode = localMulligan = null;
		startGlobalDecode();
	});
	
}

function startFirstTurn(){
	GameListener.once("turn",function(turn,mulligan){			
		if(myGame.FriendlyTurn){
			console.log("----------------------");
			console.log("YOUR TURN");
			console.log("YOUR MANA:",myGame.mana);
			console.log("----------------------");
			console.log(" ");
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
					},30*1000);
				}),
				new Promise(function(s,f){
					setTimeout(function(){
						AI.update(myGame);
						s();
					},45*1000);
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
		globalDecode = PowerHistory.on("decoded", function(decoded){
			new Promise(function(su,fa){
				myGame.updateGame(decoded);
				// console.log("game-updated");
				su();				
			}).then(function(){
				AI.update(myGame);
				// console.log("ai-updated");
			});
		});	
}
