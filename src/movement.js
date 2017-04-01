var robot = require("robotjs");
robot.setMouseDelay(300);
var screenSize = robot.getScreenSize();
var width = screenSize.width;
var height = screenSize.height;
var pos = require("../lib/pos").positionJSON(width,height);

var Controller = (function(){
	function Controller(){
		
	}
	
	Controller.prototype.turn = function(actionSeq){
		var self = this;
		setTimeout(function(){
			actionSeq.forEach(function(action){
			self.move(action.source,action.target);
			});
		
			self.click({locale:"endturn"});
			},30*1000);
	};
	
	Controller.prototype.mulligan = function(clickSeq){
		var self = this;
		setTimeout(function(){
			clickSeq.forEach(function(action){
				self.click(action);
			});
			
			self.click({locale:"confirm"});				
		},20*1000);
	};
	
	Controller.prototype.move = function(source, target){
		// var mouseDelay = Math.floor(Math.random()*1000);
		robot.setMouseDelay(1000);
		var src_x,src_y,trg_x,trg_y;
		
		if(source.locale === "hand" || source.locale === "boardf"||source.locale === "heropower"){
			src_x = pos[source.locale][source.size][source.pos].x;
			src_y = pos[source.locale][source.size][source.pos].y;
		}
		
		if(target.locale === "boarde" || target.locale === "boardf"){
			trg_x = pos[target.locale][target.size][target.pos].x;
			trg_y = pos[target.locale][target.size][target.pos].y;
		}else if(target.locale === "enemy" || target.locale === "play"){
			trg_x = pos[target.locale].x;
			trg_y = pos[target.locale].y;
		}
		
		robot.moveMouseSmooth(src_x,src_y);
		robot.mouseToggle(["down"],["left"]);
		robot.moveMouseSmooth(trg_x,trg_y);
		robot.mouseToggle(["up"],["left"]);
	
	};
	
	Controller.prototype.click = function(target){
		if(!target) return;
		
		robot.setMouseDelay(1000);
		var x,y;
		
		if(target.locale != "mulligan"){
			x = pos[target.locale].x;
			y = pos[target.locale].y;
		} else{
			x = pos[target.locale][target.order][target.pos].x;
			y = pos[target.locale][target.order][target.pos].y;
		}
		
		robot.moveMouseSmooth(x,y);
		robot.mouseClick();
	}
	
	return Controller;
	
})();

module.exports = Controller;