"use strict";

const ipUtils = require('ip');
const ip = ipUtils.address();
const cap = require("../src/capture");
console.log(ip);
cap.on("decoded",function(d){
	console.log(d);
});