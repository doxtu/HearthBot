var robot = require("robotjs");

robot.setMouseDelay(300);
console.log(robot.getMousePos());
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
