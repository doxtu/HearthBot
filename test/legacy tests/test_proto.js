var protobuf = require("protobufjs");

protobuf.load("awesome.proto", function(err,root){
	if(err) throw err;
	var AwesomeMessage = root.lookup("awesomepackage.AwesomeMessage");
	
	var message = AwesomeMessage.create({});
	var buffer = AwesomeMessage.encode(message).finish();
	var decode = AwesomeMessage.decode(buffer);
	// console.log(message);
	// console.log(buffer);
	// console.log(Object.keys(decode));
	// console.log(decode.awesomeField +"\n");
});

protobuf.load("../proto/PegasusGame.proto",function(err,root){
	if(err) throw err;
	var Test = root.lookup("PegasusGame.PowerHistory");
	console.log(Test);
});