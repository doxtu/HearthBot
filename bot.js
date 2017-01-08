var robot = require("robotjs");
var Farseer = require('./node_modules/farseer/lib/index.js').default;
var farseer = new Farseer();
var screenSize = robot.getScreenSize();
var protobuf = require("protobufjs");