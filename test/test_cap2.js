var fs = require("fs");
var util = require('util');
var path = require('path');

var ipUtils = require('ip');
var protobuf = require('protobufjs');
var moment = require('moment');

var Cap = require('cap').Cap;
var decoders = require('cap').decoders;
var PROTOCOL = decoders.PROTOCOL;

var m = 0; //global message

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
var device = Cap.findDevice(ipUtils.address());
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
					handlePayload(Buffer.from(payload));
					// getPayloadData(Buffer.from(payload));
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

function handlePayload(payload){
	try{
		var reader = protobuf.Reader.create(payload);
		var type = reader.fixed32() >>> 0;
		var size = reader.fixed32() >>> 0;
		
		if(type === 19 && payload.length != 0){
			m = new Message(payload,type,size + 8);
		}
		else if(m === 0 || m.complete){
			return;
		}
		else{
			m.appendPayloadToCurrentMessage(payload);
		}
		
		m.checkIfMessageComplete();
		
		if(m.complete){
			decode(m);
			m = 0; //reset m
		}
	}catch(e){}
}

function decode(message){
	var path = "../proto/PegasusGame.proto";
	protobuf.load(path, function(err, root){
		var PowerHistory = root.lookup("PegasusGame.PowerHistory");
		var reader = protobuf.Reader.create(message.data);

		reader.fixed32() >>> 0; reader.fixed32() >>> 0; //clear out the size and type so we get the message;
		var decodedPowerHistory = PowerHistory.decode(reader,message.size-10);
		console.log("-------------:POWERHISTORY:-------------");
		for(var i in decodedPowerHistory.list){
			// console.log(decodedPowerHistory.list[i]);
			if(decodedPowerHistory.list[i].hasOwnProperty("createGame")){
				console.log("!!!!!!!!!!!!!!!!!CREATE_GAME!!!!!!!!!!!!!!!!!")
				console.log("GAME_ENTITY:", decodedPowerHistory.list[i].createGame.gameEntity);
				console.log("PLAYERS:", decodedPowerHistory.list[i].createGame.players);
				console.log("PLAYER1_GAID:", decodedPowerHistory.list[i].createGame.players[0].gameAccountId);
				console.log("PLAYER2_GAID:", decodedPowerHistory.list[i].createGame.players[1].gameAccountId);
				console.log("PLAYER1_ENTITY:", decodedPowerHistory.list[i].createGame.players[0].entity);
				console.log("PLAYER2_ENTITY:", decodedPowerHistory.list[i].createGame.players[1].entity);
				console.log("PLAYER1_TAGS:", decodedPowerHistory.list[i].createGame.players[0].entity.tags);
				console.log("PLAYER2_TAGS:", decodedPowerHistory.list[i].createGame.players[1].entity.tags);
			}
			if(decodedPowerHistory.list[i].hasOwnProperty("fullEntity")){
				console.log("!!!!!!!!!!!!!!!!!FULL_ENTITY!!!!!!!!!!!!!!!!!");
				console.log("ENTITY:", decodedPowerHistory.list[i].fullEntity.entity);
				console.log("NAME:", decodedPowerHistory.list[i].fullEntity.name);
				console.log("TAGS:", decodedPowerHistory.list[i].fullEntity.tags);
			}
			if(decodedPowerHistory.list[i].hasOwnProperty("tagChange")){
				console.log("!!!!!!!!!!!!!!!!!TAG_CHANGE!!!!!!!!!!!!!!!!!");
				console.log("ENTITY:", decodedPowerHistory.list[i].tagChange.entity);
				console.log("TAG:",decodedPowerHistory.list[i].tagChange.tag);
				console.log("VALUE:", decodedPowerHistory.list[i].tagChange.value);
			}
			if(decodedPowerHistory.list[i].hasOwnProperty("powerStart")){
				console.log("!!!!!!!!!!!!!!!!!POWER_START!!!!!!!!!!!!!!!!!");
				console.log("POWER_START:", decodedPowerHistory.list[i].powerStart);
			}
			if(decodedPowerHistory.list[i].hasOwnProperty("showEntity")){
				console.log("!!!!!!!!!!!!!!!!!SHOW_ENTITY!!!!!!!!!!!!!!!!!");
				console.log("ENTITY:", decodedPowerHistory.list[i].showEntity.entity);
				console.log("NAME:", decodedPowerHistory.list[i].showEntity.name);
				console.log("TAGS:",decodedPowerHistory.list[i].showEntity.tags);
			}
		}
		console.log("----------------------------------------");
	});
}

function Message(buffer, type, size){
	this.data = buffer;
	this.type = type;
	this.size = size;
	this.complete = false;
}

Message.prototype.appendPayloadToCurrentMessage= function(payload){
	this.data = Buffer.concat([this.data,payload]);
}

Message.prototype.checkIfMessageComplete = function(){
	if(this.data.length >= this.size){
		this.complete = true;
		if(this.data.length > this.size){
			var newData = this.data.slice(0,this.size);
			this.data = newData;
		}
	}
}