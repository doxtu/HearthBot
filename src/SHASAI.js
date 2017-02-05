//SHASAI = Simple Hearthstone AI

//todo:
//Identify all possible moves (play, attack)
//assign a value to each play
//find the best one and return

var combinations = require("combinations");


var TreeModel = require("tree-model");
var tree = new TreeModel();

function modelAction(type,source,target,card){
	return {"type": type, "source":source, "target":target, "card":card, "children":[]};
}

var SHASAI = (function(){
	
	function SHASAI(){
		this.mana = 1;
		this.friendlyBoard = [];
		this.friendlyHand = [];
		this.enemyBoard = [];
	}
	
	SHASAI.prototype.update = function(game){
		this.mana = game.mana;
		this.friendlyBoard = game.FriendlyBoard;
		this.friendlyHand = game.FriendlyHand;
		this.enemyBoard = game.EnemyBoard;
	}
	
	SHASAI.prototype.mulligan = function(){
		//read mulligan cards (current hand)
		//keep 1 and 2 mana, discard rest
		return action;
	}
	
	SHASAI.prototype.construct = function(){
		//identify all possible card combinations store in array
		
		var hand = this.friendlyHand;
		var boardf = this.friendlyBoard;
		var mana = this.mana;
		var boarde = this.enemyBoard;
		var action = identifyPlays();
		
		function identifyPlays(){
			var playCombinations = combinations(hand);
			var plays = playCombinations.filter(function(play){
				try{
					var playMana = mana;
					play.forEach(function(card){
						playMana -= card.cost;
					});
					return playMana > 0;
				}catch(e){
					return false;
				}
			});
			return evalPlays(plays);
		}
		
		function evalPlays(plays){
			var eval = plays.map(function(play){
				try{
					play.forEach(function(card){
						if(card.attack && card.health){
							return (card.attack + card.health + card.divineShield + card.taunt + card.windfury);
						}
						else{
							return 1;
						}
					});
				}catch(e){
					return 0;
				}
			});
			
			var max = Math.max.apply(Math,eval);
			
			return actionify(plays[eval.indexOf(max)]);
		}
		
		function actionify(play){
			console.log("----------------------");
			console.log("THE_BEST_PLAY:");
			console.log(play);
			console.log("----------------------");
		}
		
		return action;
	}
	
	return SHASAI;
	
})();

module.exports = SHASAI;