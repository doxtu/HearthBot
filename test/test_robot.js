var robot = require("robotjs");
var screenSize = robot.getScreenSize();
var movement = require("../src/movement");
var Controller = new movement();

robot.setMouseDelay(300);
// console.log(robot.getMousePos());
console.log(screenSize.width, screenSize.height);

robot.moveMouse(screenSize.width/2, screenSize.height/2);
robot.mouseClick();

function startGame(){
	robot.setMouseDelay(1250);
	desiredPositions.forEach(function(point){
		robot.moveMouse(point.x, point.y);
		robot.mouseClick();
	});
}

function moveCardToPlay(card, handSize){
	robot.setMouseDelay(500);
	robot.moveMouseSmooth(512,859);
	robot.mouseToggle(["down"],["left"]);
	robot.moveMouseSmooth(411,512);
	robot.mouseToggle(["up"],["left"]);
}


var source = {locale:"hand",size:5,pos:"pos3"};
var target = {locale:"play",size:1,pos:"pos1"};
Controller.move(source,target);

var source = {locale:"boardf",size:3,pos:"pos1"};
var target = {locale:"boarde",size:2,pos:"pos2"};
Controller.move(source,target);

var end = {locale:"endturn"};
Controller.click(end);
