//SHASAI = Simple Hearthstone AI

//todo:
//Identify all possible moves (play, attack)
//assign a value to each play
//find the best one and return

var cards = 

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
		var action = {locale: null, size: null, pos:null};
		return action;
	}
	
	SHASAI.prototype.construct(){
		var action = {locale: null, size: null, pos:null};
		return action;
	}
	
	identifyPlays(){
		//play type --> {type: "play", target:{locale:"play",size:1,pos:"pos1"}};
		//attack type --> {type:"attack",start: {locale:"boardf",size:1,pos:"pos1"}, target:{locale:"boarde",size:1,pos:"pos1"}};
		var self = this;
		var plays = [];
		var remainingMana = this.mana;
		// for(var i in self.friendlyHand){
			// var play = [];
			// if(self.friendlyHand[i].cost < remainingMana){
				// var play = {"type":"play", "target":{"locale":"play"}};
			// }
			// plays.push(play);
		// }
		
		/*
			Insert a loop here for different possibilities for playing cards.
		*/
		
	}
	
	_isPlayInCurrentPlayVector(plays,play){
		for(var i in plays){
			var playInPlays = JSON.stringify(plays[i]);
			var playToBeChecked = JSON.stringify(play);
			if(playInPlays === playToBeChecked)
				return true;
		}
		return false;
	}
	
	evalPlays(plays){
		
	}
	
	return SHASAI;
	
})();