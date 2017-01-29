//SHASAI = Simple Hearthstone AI

//todo:
//Identify all possible moves (play, attack)
//assign a value to each play
//find the best one and return

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
		//identify array of possible plays
		//evaluate the best play
		//turn the best play into an action sequence.
		return action;
	}
	
	function identifyPlays(){
		
		return plays;
	}
	
	function evalPlays(plays){	
	}
	
	return SHASAI;
	
})();

module.exports = SHASAI;