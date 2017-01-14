var robot = require("robotjs");
var screenSize = robot.getScreenSize();
var protobuf = require("protobufjs");
var PowerHistory = require("./test/test_cap3");
var game = require("./src/game");

//test this when home..
PowerHistory.on("decoded", function(decoded){
	console.log(decoded);
});