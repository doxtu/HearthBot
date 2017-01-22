//SHASAI = Simple Hearthstone AI

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
	
	return SHASAI;
	
})();