//This script sets up the Game object and Card object for use in parsing game decisions.
//These are more or less extremely simple data structures holding current game data.
//There will be certain actions called when a game starts and when a game ends and those
//are where the actual intelligence of the Game object is.
//The card object begs to be declared as an object literal, but it's a convenient way to follow the code

//a Game keeps track of all state variables and keeps them updated during a game, will make decisions at the end of a game and a start of a game.

function Game(){
	//Arrays of cards, Defined later.
	this.FriendlyBoard = []; //card obj and position
	this.EnemyBoard = []; 
	this.FriendlyHand = []; //card obj and position 
	this.EnemyHand = []; 
	this.FriendlyDeck = []; //cards remaining tracker
	this.EnemyDeck = [];  //unknown cards
}

Game.prototype.updateGame = function(){
	return;
}

Game.prototype.readGame = function(){
	return;
}

Game.prototype.startGame = function(){
	return;
}

Game.prototype.endGame = function(){
	return;
}

Game.prototype.getHandSize = function(friendly){
	return friendly ? this.FriendlyHand.length : this.EnemyHand.length;
}

Game.prototype.getDeckSize = function(friendly){
	return friendly? this.FriendlyDeck.length: this.EnemyDeck.length;
}

//Card Interface keeps track of cards handled by the game object

function Card(props, callback){
	// var example_props = {attack: 1, health: 1, name:"Novice Engineer", id:72};
	this.attack = props.attack;
	this.health = props.health;
	this.name = probs.name;
	this.id = props.id;
}

Card.prototype.updateCard= function(obj,callback){
	// var example_obj = {attack: attack, health:health, name:name, id:id}; example passed object
	return;
}

Card.prototype.getCard = function(obj,callback){
	// var example_obj = {attack: attack, health:health, name:name, id:id};
	return;
}