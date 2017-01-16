var robot = require("robotjs");
robot.setMouseDelay(300);
var screenSize = robot.getScreenSize();
var width = screenSize.width;
var height = screenSize.height;
var pos = require("../lib/pos2").positionJSON(width,height);

var Controller = (function(){
	function Controller(){
		
	}
	
	Controller.prototype.move = function(source, target){
		
		robot.setMouseDelay(500);
		var src_x,src_y,trg_x,trg_y;
		
		if(source.locale === "hand" || source.locale === "boardf"){
			src_x = pos[source.locale][source.size][source.pos].x;
			src_y = pos[source.locale][source.size][source.pos].y;
		}
		
		if(target.locale === "boarde"){
			trg_x = pos[target.locale][target.size][target.pos].x;
			trg_y = pos[target.locale][target.size][target.pos].y;
		}else if(target.locale === "enemy"){
			trg_x = pos[target.locale].x;
			trg_y = pos[target.locale].y;
		}
		
		robot.moveMouseSmooth(src_x,src_y);
		robot.mouseToggle(["down"],["left"]);
		robot.moveMouseSmooth(trg_x,trg_y);
		robot.mouseToggle(["up"],["left"]);
	
	};
	
	return Controller;
	
})();

module.exports = Controller;