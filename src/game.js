//This script sets up the Game object and Card object for use in parsing game decisions.
//These are more or less extremely simple data structures holding current game data.
//There will be certain actions called when a game starts and when a game ends and those
//are where the actual intelligence of the Game object is.
//The card object begs to be declared as an object literal, but it's a convenient way to follow the code

//a Game keeps track of all state variables and keeps them updated during a game, will make decisions at the end of a game and a start of a game.
var events = require("events");
module.exports = new events();

var cards = require("../lib/cards.json");
var GameTag = require("../lib/enums.json").GameTag;
var Zone = require("../lib/enums.json").Zone;
var ACCOUNT_ID = {hi: {low:1465140039, high:33554433, unsigned:true}, lo: {low:30433002, high:0, unsigned:true}};

// MY_GAMEACCOUNTID: Message {
  // hi: Long { low: 1465140039, high: 33554433, unsigned: true },
  // lo: Long { low: 30433002, high: 0, unsigned: true } }

var Game = (function(){

	function Game(){
		//Arrays of cards, Defined later.
		this.entities = [];
		this.FriendlyBoard = []; //card obj and position
		this.EnemyBoard = []; 
		this.FriendlyHand = []; //card obj and position 
		this.EnemyHand = []; 
		this.FriendlyDeck = []; //cards remaining tracker
		this.EnemyDeck = [];  //unknown cards
		this.graveyard = [];
		this.running = false;
		this.FriendlyTurn = false; //Is it your turn?
		this.FriendlyEntityId = 2;
	}

	Game.prototype.updateGame = function(message){
		
		for(var i in message){
			if(message[i].hasOwnProperty("createGame")){
				var GAME = new Card(this).updateCard(message[i].createGame.gameEntity.tags);
				var PLAYER1 = new Card(this).updateCard(message[i].createGame.players[0].entity.tags);
				var PLAYER2 = new Card(this).updateCard(message[i].createGame.players[1].entity.tags);
				
				this.FriendlyEntityId = _verifyGameAccountId(message[i].createGame.players[0].gameAccountId);
				
				this.entities.push(GAME);
				this.entities.push(PLAYER1);
				this.entities.push(PLAYER2);
			}
			else if(message[i].hasOwnProperty("fullEntity")){
				var NEW_ENTITY = new Card(this).updateCard(message[i].fullEntity.tags);
				NEW_ENTITY.name = message[i].name;
				this.entities.push(NEW_ENTITY);
			}
			else if(message[i].hasOwnProperty("tagChange")){
				try{
					this.entities[message[i].tagChange.entity - 1].updateCard(message[i].tagChange);
				}catch(e){
					var NEW_ENTITY = new Card(this).updateCard(message[i].tagChange);
					this.entities[message[i].tagChange.entity - 1] = NEW_ENTITY;
				}
			}
			else if(message[i].hasOwnProperty("showEntity")){
				try{
					this.entities[message[i].showEntity.entity - 1].updateCard(message[i].showEntity.tags);
					this.entities[message[i].showEntity.entity - 1].name = message[i].name;
					
				}catch(e){
					var NEW_ENTITY = new Card(this).updateCard(message[i].showEntity.tags);
					this.entities[message[i].showEntity.entity - 1] = NEW_ENTITY;
				}
			}
		}
		
		//reset board to replace entities
		this.FriendlyBoard = [];
		this.EnemyBoard = []; 
		this.FriendlyHand = [];
		this.EnemyHand = []; 
		this.FriendlyDeck = []; 
		this.EnemyDeck = []; 
		this.graveyard = [];
		
		for(var i in this.entities){
			//friendly section
			if(this.entities[i].mine && this.entities[i].zone === Zone.PLAY){
				this.FriendlyBoard.push(this.entities[i]);
			}
			else if(this.entities[i].mine && this.entities[i].zone === Zone.DECK){
				this.FriendlyDeck.push(this.entities[i]);
			}
			else if(this.entities[i].mine && this.entities[i].zone === Zone.HAND){
				this.FriendlyHand.push(this.entities[i]);
			}
			else if(this.entities[i].mine && this.entities[i].zone === Zone.GRAVEYARD){
				this.graveyard.push(this.entities[i]);
			}
			
			//enemy section
			if(!this.entities[i].mine && this.entities[i].zone === Zone.PLAY){
				this.EnemyBoard.push(this.entities[i]);
			}
			else if(!this.entities[i].mine && this.entities[i].zone === Zone.DECK){
				this.EnemyDeck.push(this.entities[i]);
			}
			else if(!this.entities[i].mine && this.entities[i].zone === Zone.HAND){
				this.EnemyHand.push(this.entities[i]);
			}
			else if(!this.entities[i].mine && this.entities[i].zone === Zone.GRAVEYARD){
				this.graveyard.push(entities[i]);
			}
		}

		//sort in correct order for parsing
		this.FriendlyBoard = sort(this.FriendlyBoard);
		this.EnemyBoard = sort(this.EnemyBoard); 
		this.FriendlyHand = sort(this.FriendlyHand);
		this.EnemyHand = sort(this.EnemyHand); 
		this.FriendlyDeck = sort(this.FriendlyDeck); 
		this.EnemyDeck = sort(this.EnemyDeck); 
		
		// console.log(this.entities);
		console.log("---------------------------------------------");
		console.log("---------------------------------------------");
		console.log("ENEMY HAND:", this.EnemyHand);
		console.log("ENEMY BOARD:",this.EnemyBoard);
		console.log("---------------------------------------------");
		console.log("FRIENDLY BOARD:", this.FriendlyBoard);
		console.log("FRIENDLY HAND:",this.FriendlyHand);
		console.log("---------------------------------------------");
		console.log("---------------------------------------------");	
	}
	
	function sort(arr){	
		var returnArr = [];
		for(var i in arr){
			returnArr[arr[i].position] = arr[i];
		}
		return returnArr;
	}
	
	function _verifyGameAccountId(key){
		
		var hi_high = key.hi.high;
		var hi_low = key.hi.low;
		var lo_high = key.lo.high;
		var lo_lo = key.lo.lo;
		
		if(!(hi_high === ACCOUNT_ID.hi.high)) return 3;
		if(!(hi_low === ACCOUNT_ID.hi.low)) return 3;
		if(!(lo_high == ACCOUNT_ID.lo.high)) return 3;
		if(!(lo_lo === ACCOUNT_ID.lo.lo)) return 3;
		
		return 2;
	}

	Game.prototype.readGame = function(){
		return;
	}

	Game.prototype.startGame = function(){
		this.running = true;
		return;
	}

	Game.prototype.endGame = function(){
		this.running = false;
		return;
	}

	Game.prototype.getHandSize = function(friendly){
		return friendly ? this.FriendlyHand.length : this.EnemyHand.length;
	}

	Game.prototype.getDeckSize = function(friendly){
		return friendly ? this.FriendlyDeck.length: this.EnemyDeck.length;
	}

	//Card Interface keeps track of cards handled by the game object

	function Card(context){
		//basic info
		this.id = -1;
		this.name = "";
		
		//game-type info
		this.game = context;
		
		//controller-type info
		this.mine = false;
		
		//minion, spell info
		this.attack = 0;
		this.health = 0;
		this.charge = 0;
		this.divineshield = 0;
		this.taunt = 0;
		this.windfury = 0;
		this.name = 0;
		this.zone = 0;
		this.position = 0;
		this.cost = 0;
	}

	Card.prototype.updateCard= function(tags){
		if(Array.isArray(tags)){	
			for(var i in tags){
				_decodeTag(tags[i],this);
			}
		}
		else{
			_decodeTag(tags,this);
		}
		return this;
	}
	
	function _decodeTag(tag, context){
		switch(tag.name || tag.tag){
			case GameTag.ENTITY_ID:
				context.id = tag.value;
				break;
			case GameTag.ATK:
				context.attack = tag.value;
				break;
			case GameTag.HEALTH:
				context.health = tag.value;
				break;
			case GameTag.CHARGE:
				context.charge = tag.value;
				break;
			case GameTag.DIVINE_SHIELD:
				context.divineshield = tag.value;
				break;
			case GameTag.TAUNT:
				context.taunt = tag.value;
				break;
			case GameTag.WINDFURY:
				context.windfury = tag.value;
				break;
			case GameTag.ZONE:
				context.zone = tag.value;
				break;
			case GameTag.ZONE_POSITION:
				context.position = tag.value;	
				break;
			case GameTag.CURRENT_PLAYER:
				if(context.game.FriendlyEntityId === tag.value + 1) context.game.FriendlyTurn = true;
				console.log(tag.value);
				module.exports.emit("turn", tag.value + 1); //may want to emit at end of updates
				break;	
			case GameTag.COST:
				context.cost = tag.value;
				break;
			case GameTag.CONTROLLER:
				if(context.game.FriendlyEntityId === tag.value + 1) context.mine = true;
				break;
			default:
				break;
		}
		
	}

	Card.prototype.getCard = function(id){
		return;
	}

	return Game;

})();

module.exports.game = Game;