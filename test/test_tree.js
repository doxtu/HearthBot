var TreeModel = require("tree-model");

var tree = new TreeModel();

function modelAction(type,source,target){
	return {type: type, source:source, target:target, children:[]};
}

var type = "play";
var source = {locale:"hand",size:4,pos:"pos1"};
var target = {locale:"play",size:0,pos:"pos1"};

var node = tree.parse(modelAction(type,source,target));
var child = tree.parse(modelAction("play",{locale:"boardf",size:1,pos:"pos1"},{locale:"enemy"}));
console.log(node.addChild(child).addChild(child));
console.log(node.addChild(child));
console.log(node);