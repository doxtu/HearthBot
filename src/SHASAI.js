//SHASAI = Simple Hearthstone AI

//todo:
//Identify all possible moves (play, attack)
//assign a value to each play
//find the best one and return

var combinations = require("combinations");


var TreeModel = require("tree-model");
var tree = new TreeModel();

function modelAction(type,source,target,card){
	return {"type": type, "source":source, "target":target, "card":card "children":[]};
}

var SHASAI = (function(){
	
	function SHASAI(game){
		this.mana = game.mana;
		this.friendlyBoard = game.FriendlyBoard;
		this.friendlyHand = game.FriendlyHand;
		this.enemyBoard = game.EnemyBoard;
	}
	
	SHASAI.prototype.update(game){
		this.mana = game.mana;
		this.friendlyBoard = game.FriendlyBoard;
		this.friendlyHand = game.FriendlyHand;
		this.enemyBoard = game.EnemyBoard;
	}
	
	SHASAI.prototype.mulligan(){
		//read mulligan cards (current hand)
		//keep 1 and 2 mana, discard rest
		return action;
	}
	
	SHASAI.prototype.construct(){
		//identify all possible card combinations store in array
		var plays = identifyPlays();
		var play = evalPlays(plays);
		//attack with all cards, including ones that were just played. even if they can't attack.
		//turn the best play into an action sequence.
		return action;
	}
	
	function identifyPlays(){
		
		var hand = this.friendlyHand;
		var boardf = this.friendlyBoard;
		var mana = this.mana;
		var boarde = this.enemyBoard;
		var plays = [];
		var playCombinations = combinations(hand);
		console.log("-----------------------");
		console.log("ORIGINAL:",playCombinations);
		console.log("-----------------------");
		
		playCombinations.reduce(function(play){
			var playMana = mana;
			play.forEach(function(card){
				playMana -= card.cost;
			});
			return playMana > 0;
		});
		
		console.log("-----------------------");
		console.log("REDUCED:",playCombinations);
		console.log("-----------------------");
		
		return plays;
	}
	
	function evalPlays(plays){	
	}
	
	return SHASAI;
	
})();

module.exports = SHASAI;