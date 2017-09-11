//SHASAI = Simple Hearthstone AI

//todo:
//Identify all possible moves (play, attack)
//assign a value to each play
//find the best one and return

var combinations = require("combinations");

function modelAction(type,source,target,card){
	return {"type": type, "source":source, "target":target, "card":card, "children":[]};
}

var SHASAI = (function(){
	
	function SHASAI(game){
		this.game = game || null;
		this.mana = 1;
		this.FriendlyBoard = game.FriendlyBoard;
		this.FriendlyHand = game.FriendlyHand;
		this.EnemyBoard = game.EnemyBoard;
		this.EnemyHand = game.EnemyHand;
		this.corrected = false;
		
		var sum = 0;
		for(var i = 0; i < game.FriendlyHand.length; i++)
			sum += game.FriendlyHand[i].cost;
		
		if(!sum){
			this.FriendlyBoard = game.EnemyBoard;
			this.FriendlyHand = game.EnemyHand;
			this.EnemyHand = game.FriendlyHand;
			this.EnemyBoard = game.FriendlyBoard;
			
			game.FriendlyHand.forEach(function(card){
				card.mine = true;
			})
			game.EnemyHand.forEach(function(card){
				card.mine = false;
			})
			
			if(game.FriendlyEntityId == 2) game.FriendlyEntityId = 3;
			else if(game.FriendlyEntityId ==3) game.FriendlyEntityId = 2;
			
			this.corrected = true;
		}
	}
	
	SHASAI.prototype.mulligan = function(){
		//read mulligan cards (current hand)
		//keep 1 and 2 mana, discard rest
		var hand = this.FriendlyHand;
		var action = [{locale:"confirm"}];
		
		if(hand.length > 0){
			action = hand.map(function(card){
				if(card.cost > 2) return 1;
				return 0;
			})
			action = action.map(function(click,i){
				if(hand.length > 3 && action[i] == 1){
					return {locale:"mulligan", order:"second",pos:"pos" + hand[i].position};
				} else if(hand.length < 4 && action[i] == 1){
					return {locale:"mulligan", order:"first",pos:"pos" + hand[i].position};
				} else{
					return null;
				}
			});
		}
		
		return action;
	}
	
	SHASAI.prototype.play = function(){
		//identify all possible card combinations store in array
		
		// this.FriendlyHand = this.game.FriendlyHand;
		// this.FriendlyBoard = this.game.FriendlyBoard;
		// this.EnemyBoard = this.game.EnemyBoard;
		// this.EnemyHand = this.game.EnemyHand;
		
		var self = this;
		var hand = this.FriendlyHand || [];
		console.log("hand", hand);
		var boardf = this.FriendlyBoard.filter(function(card){
			return card.position > 0;
		});
		var mana = this.mana || 0;
		var boarde = this.EnemyBoard || [];
		var action = identifyPlays() || [];
		
		function identifyPlays(){
			var playCombinations = combinations(hand);
			var plays = playCombinations.filter(function(play){
				try{
					var playMana = mana;
					play.forEach(function(card){
						playMana -= card.cost;
					});
					return playMana >= 0;
				}catch(e){
					return false;
				}
			});
			
			// console.log("plays:", plays);
			
			return evalPlays(plays);
		}
		
		function evalPlays(plays){
			var eval = plays.map(function(play){
				var sum =0;
				try{
					play.forEach(function(card){
						if(card.health){
							sum += (card.attack + card.health + card.divineshield + card.taunt + card.windfury);
						}
						else{
							sum += 1;
						}
					});
				}catch(e){
					console.log("opps");
				}
				return sum;
			});
			var max = Math.max.apply(Math,eval);
			
			// console.log("best-play:",plays[eval.indexOf(max)]);
			
			return actionify(plays[eval.indexOf(max)]);
		}
		
		function actionify(play){
			//provides an array of cards, turn each of those into an array of actions
			if(!play) return [];
			var ret = play.map(function(card){
				if(card.attack == 0 && card.health == 0)
					return {
						source:{locale:"hand",size:hand.length,pos:"pos" + card.position},
						target:{locale:"enemy"}
					}
				else{
					return {
						source:{locale:"hand",size:hand.length,pos:"pos" + card.position},
						target:{locale:"play"}
					}
				}
			});
			
			return ret;
		}
		
		return action;
	}
	
	SHASAI.prototype.attack = function(){
		var action = null,boardf = this.FriendlyBoard,boarde = this.EnemyBoard;
		
		action = boardf.map(function(card){
			return {
				source:{locale:"boardf",size:boardf.length,pos:"pos" + card.position},
				target:{locale:"enemy"}
			}
		});
		
		return action;
	}
	
	return SHASAI;
	
})();

module.exports = SHASAI;