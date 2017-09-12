var fs = require("fs");
var util = require('util');
var path = require('path');

var ipUtils = require('ip');
var protobuf = require('protobufjs');
var moment = require('moment');

var Cap = require('cap').Cap;
var decoders = require('cap').decoders;
var PROTOCOL = decoders.PROTOCOL;

// raw packet data === buffer.slice(0, nbytes) 
// var protoReader = require('./proto/protoLoader');

var blacklist = [
    '12.129.242.24',   // iir.blizzard.com
    '12.129.236.214',  // test.patch.battle.net
    '12.129.206.133',  // us.patch.battle.net
    '213.248.127.133', // eu.patch.battle.net
    '12.129.206.130',  // us.logon.battle.net
    '213.248.127.130', // eu.logon.battle.net
    '12.130.244.193',  // us.actual.battle.net
    '80.239.208.193',  // eu.actual.battle.net
    '87.248.207.183',  // eu.depot.battle.net
    '12.129.222.51',   // us.tracker.worldofwarcraft.com
    '195.12.234.51',   // eu.tracker.worldofwarcraft.com
    '67.215.65.132',   // tracker.worldofwarcraft.com
];

var c = new Cap();
var device = Cap.findDevice('192.168.0.7');
var filter = '(tcp or udp) and ((dst port 1119 or dst port 3724) or (src port 1119 or src port 3724))';
var bufSize = 10 * 1024 * 1024;
var buffer = Buffer.alloc(65535);
var linkType = c.open(device, filter, bufSize, buffer);
c.setMinBytes && c.setMinBytes(0);

var ip_blacklisted = function(ip, blacklist) {
    return blacklist.indexOf(ip) != -1;
}

console.log('Listening to tcp traffic on '+device+'.');
console.log('Press ctrl+c to quit.');

c.on("packet", function(nbytes,trunc){
	var payload
	if(linkType === "ETHERNET"){
		var ret = decoders.Ethernet(buffer);
		if(ret.info.type === PROTOCOL.ETHERNET.IPV4){
			//Decoding IPV4
			ret = decoders.IPV4(buffer,ret.offset);
			var srcaddr = ret.info.srcaddr;
			var dstaddr = ret.info.dstaddr;
			if(!ip_blacklisted(srcaddr, blacklist) && !ip_blacklisted(dstaddr, blacklist)){
				//IP is not in blacklist, so we will read TCP
				if(ret.info.protocol === PROTOCOL.IP.TCP){
					//Decoding TCP stream and getting payload
					ret= decoders.TCP(buffer,ret.offset);
					payload = buffer.slice(ret.offset, nbytes);
					getPayloadData(Buffer.from(payload));
				}
				else if(ret.info.protocol === PROTOCOL.IP.UDP){
					//Decoding UDP stream and getting payload
					ret = decoders.UDP(buffer,ret.offset);
					payload = buffer.slice(ret.offset,nbytes);
					getPayloadData(Buffer.from(payload));
				}
			}
		}
		else{
			console.log("unsupported ipv4:",PROTOCOL.IP[ret.info.protocol]);
		}
	}
	else{
		console.log("unsupported ethertype:",PROTOCOL.ETHERNET[ret.info.type]);
	}
});


function getPayloadData(data){
	var proto2 = "../proto/PegasusGame.proto";
	protobuf.load(proto2,function(err, root){
		try{
			var PowerHistory = root.lookup("PegasusGame.PowerHistory");
			var reader = protobuf.Reader.create(data);
			var type = reader.fixed32() >>> 0;
			var size = reader.fixed32() >>> 0;
			if(size > data.length) size = data.length-10;
		} catch(e){
			// console.log(e);
		}
		
		
		try{
			if (type === 19) {
				
				var myPowerHistory = PowerHistory.decode(reader, size);
				console.log("POWERHISTORY");
				for(var i in myPowerHistory.list){
					console.log(myPowerHistory.list[i]);
					if(myPowerHistory.list[i].hasOwnProperty("showEntity")){
						console.log("TAGS:", myPowerHistory.list[i].showEntity.tags);
					}
					if(myPowerHistory.list[i].hasOwnProperty("createGame")){
						console.log(myPowerHistory.list[i].createGame.players);
					}
				}
				console.log("----------------");
			}
			
			
		} catch(e){
			console.log(e);
		}
	});
}