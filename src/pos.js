var width_x = 1920;
var height_y = 1080;
var pos = {
	hero:{ x: 952/1920, y: 819/1080 },
	enemy:{ x: 961/1920, y: 230/1080 },
	heropower:{ x: 1127/1920, y: 818/1080 },
	endturn:{ x: 1513/1920, y: 495/1080 },
	play:{ x: 432/1920, y: 589/1080 },
	confirm:{ x: 960/1920, y: 832/1080 },
	discover:{pos1:{ x: 770/1920, y: 500/1080 } , pos2:{ x: 950/1920, y: 500/1080 } , pos3:{ x: 1320/1920, y: 500/1080 } },
	mulligan:{
		first: {pos1:{ x: 640/1920, y: 500/1080 }, pos2:{ x: 965/1920, y: 500/1080 }, pos3:{ x: 1290/1920, y: 500/1080 } },
		second: {pos1:{ x: 600/1920, y: 500/1080 }, pos2:{ x: 840/1920, y: 500/1080 }, pos3:{ x: 1080/1920, y: 500/1080 }, pos4:{ x: 1320/1920, y: 500/1080 } }
	},
	hand:{
		1: {
			pos1:{ x: 920/1920, y: 1000/1080 }
		},
		2: {
			pos1:{ x: 850/1920, y:1000/1080},
			pos2:{ x: 990/1920, y:1000/1080}
		},
		3: {
			pos1:{ x: 790/1920, y: 1000/1080 },
			pos2:{ x: 920/1920, y: 1000/1080 },
			pos3:{ x: 1050/1920, y: 1000/1080 }
		},
		4: {
			pos1:{ x: 725/1920, y: 1000/1080 },
			pos2:{ x: 855/1920, y: 1000/1080 },
			pos3:{ x: 985/1920, y: 1000/1080 },
			pos4:{ x: 1115/1920, y: 1000/1080 }
		},
		5: {
			pos1:{ x: 710/1920, y: 1000/1080 } ,
			pos2:{ x: 817/1920, y: 1000/1080 } ,
			pos3:{ x: 923/1920, y: 1000/1080 } ,
			pos4:{ x: 1022/1920, y: 1000/1080 } ,
			pos5:{ x: 1131/1920, y: 1000/1080 }
		},
		6: {
			pos1:{ x: 700/1920, y: 1000/1080 } ,
			pos2:{ x: 788/1920, y: 1000/1080 } ,
			pos3:{ x: 876/1920, y: 1000/1080 } ,
			pos4:{ x: 964/1920, y: 1000/1080 } ,
			pos5:{ x: 1052/1920, y: 1000/1080 } ,
			pos6:{ x: 1140/1920, y: 1000/1080 }
		},
		7: {
			pos1:{ x: 694/1920, y: 1000/1080 } ,
			pos2:{ x: 768/1920, y: 1000/1080 } ,
			pos3:{ x: 846/1920, y: 1000/1080 } ,
			pos4:{ x: 913/1920, y: 1000/1080 } ,
			pos5:{ x: 994/1920, y: 1000/1080 } ,
			pos6:{ x: 1078/1920, y: 1000/1080 } ,
			pos7:{ x: 1145/1920, y: 1000/1080 }
		},
		8: {
			pos1:{ x: 672/1920, y: 1000/1080 },
			pos2:{ x: 728/1920, y: 1000/1080 },
			pos3:{ x: 836/1920, y: 1000/1080 },
			pos4:{ x: 878/1920, y: 1000/1080 },
			pos5:{ x: 924/1920, y: 1000/1080 },
			pos6:{ x: 973/1920, y: 1000/1080 },
			pos7:{ x: 1072/1920, y: 1000/1080 },
			pos8:{ x: 1144/1920, y: 1000/1080 }
		},
		9: {
			pos1:{ x: 676/1920, y: 1000/1080 },
			pos2:{ x: 723/1920, y: 1000/1080 },
			pos3:{ x: 780/1920, y: 1000/1080 },
			pos4:{ x: 812/1920, y: 1000/1080 },
			pos5:{ x: 865/1920, y: 1000/1080 },
			pos6:{ x: 927/1920, y: 1000/1080 },
			pos7:{ x: 990/1920, y: 1000/1080 },
			pos8:{ x: 1045/1920, y: 1000/1080 },
			pos9:{ x: 1131/1920, y: 1000/1080 }
		},
		10: {
			pos1:{ x: 647/1920, y: 1000/1080 },
			pos2:{ x: 695/1920, y: 1000/1080 },
			pos3:{ x: 767/1920, y: 1000/1080 },
			pos4:{ x: 836/1920, y: 1000/1080 },
			pos5:{ x: 853/1920, y: 1000/1080 },
			pos6:{ x: 902/1920, y: 1000/1080 },
			pos7:{ x: 954/1920, y: 1000/1080 },
			pos8:{ x: 1027/1920, y: 1000/1080 },
			pos9:{ x: 1051/1920, y: 1000/1080 },
			pos10:{ x: 1111/1920, y: 1000/1080 }
		}
	},
	boardf:{
		1: {
			pos1:{ x: 960/1920, y: 590/1080 }
		},
		2: {
			pos1:{ x: 895/1920, y: 590/1080 },
			pos2:{ x: 1025/1920, y: 590/1080 }
		},
		3: {
			pos1:{ x: 830/1920, y: 590/1080 },
			pos2:{ x: 960/1920, y: 590/1080 },
			pos3:{ x: 1090/1920, y: 590/1080 }
		},
		4: {
			pos1:{ x: 760/1920, y: 590/1080 },
			pos2:{ x: 890/1920, y: 590/1080 },
			pos3:{ x: 1020/1920, y: 590/1080 },
			pos4:{ x: 1150/1920, y: 590/1080 }
		},
		5: {
			pos1:{ x: 690/1920, y: 590/1080 },
			pos2:{ x: 820/1920, y: 590/1080 },
			pos3:{ x: 950/1920, y: 590/1080 },
			pos4:{ x: 1080/1920, y: 590/1080 },
			pos5:{ x: 1210/1920, y: 590/1080 }
		},
		6: {
			pos1:{ x: 630/1920, y: 590/1080 },
			pos2:{ x: 760/1920, y: 590/1080 },
			pos3:{ x: 890/1920, y: 590/1080 },
			pos4:{ x: 1020/1920, y: 590/1080 },
			pos5:{ x: 1150/1920, y: 590/1080 },
			pos6:{ x: 1280/1920, y: 590/1080 }
		},
		7: {
			pos1:{ x: 565/1920, y: 590/1080 },
			pos2:{ x: 695/1920, y: 590/1080 },
			pos3:{ x: 825/1920, y: 590/1080 },
			pos4:{ x: 955/1920, y: 590/1080 },
			pos5:{ x: 1085/1920, y: 590/1080 },
			pos6:{ x: 1215/1920, y: 590/1080 },
			pos7:{ x: 1345/1920, y: 590/1080 }
		}
	},
	boarde:{
		1: {
			pos1:{ x: 960/1920, y: 420/1080 }
		},
		2: {
			pos1:{ x: 895/1920, y: 420/1080 },
			pos2:{ x: 1025/1920, y: 420/1080 }
		},
		3: {
			pos1:{ x: 830/1920, y: 420/1080 },
			pos2:{ x: 960/1920, y: 420/1080 },
			pos3:{ x: 1090/1920, y: 420/1080 }
		},
		4: {
			pos1:{ x: 760/1920, y: 420/1080 },
			pos2:{ x: 890/1920, y: 420/1080 },
			pos3:{ x: 1020/1920, y: 420/1080 },
			pos4:{ x: 1150/1920, y: 420/1080 }
		},
		5: {
			pos1:{ x: 690/1920, y: 420/1080 },
			pos2:{ x: 820/1920, y: 420/1080 },
			pos3:{ x: 950/1920, y: 420/1080},
			pos4:{ x: 1080/1920, y: 420/1080 },
			pos5:{ x: 1210/1920, y: 420/1080 }
		},
		6: {
			pos1:{ x: 630/1920, y: 420/1080 },
			pos2:{ x: 760/1920, y: 420/1080 },
			pos3:{ x: 890/1920, y: 420/1080 },
			pos4:{ x: 1020/1920, y: 420/1080 },
			pos5:{ x: 1150/1920, y: 420/1080 },
			pos6:{ x: 1280/1920, y: 420/1080 }
		},
		7: {
			pos1:{ x: 565/1920, y: 420/1080 },
			pos2:{ x: 695/1920, y: 420/1080 },
			pos3:{ x: 825/1920, y: 420/1080 },
			pos4:{ x: 955/1920, y: 420/1080 },
			pos5:{ x: 1085/1920, y: 420/1080 },
			pos6:{ x: 1215/1920, y: 420/1080 },
			pos7:{ x: 1345/1920, y: 420/1080 }
		}
	}
}

module.exports.ratioJSON = pos;

module.exports.positionJSON = function(width, height){
	var keys = Object.keys(pos);
	var JSON = {};

	JSON.hero = { x: width*952/1920, y: height*819/1080 };

	JSON.enemy = { x: width*961/1920, y: height*230/1080 };
	
	JSON.heropower = { x: width*1127/1920, y: height*818/1080 };
	
	JSON.endturn = { x: width*1513/1920, y: height*495/1080 };
	
	JSON.play = { x: width*432/1920, y: height*589/1080 };
	
	JSON.confirm = { x: width*960/1920, y: height*832/1080 };

	JSON.discover = {pos1:{ x: width*770/1920, y: height*500/1080 } , pos2:{ x: width*950/1920, y: height*500/1080 } , pos3:{ x: width*1320/1920, y: height*500/1080 } };

	JSON.mulligan = {
		first: {pos1:{ x: (640/1920)*width, y: height*500/1080 }, pos2:{ x: (965/1920)*width, y: height*500/1080 }, pos3:{ x: (1290/1920)*width, y: height*500/1080 } },
		second: {pos1:{ x: width*600/1920, y: height*500/1080 }, pos2:{ x: width*840/1920, y: height*500/1080 }, pos3:{ x: width*1080/1920, y: height*500/1080 }, pos4:{ x: width*1320/1920, y: height*500/1080 } }
	};

	JSON.hand = {
		1: {
			pos1:{ x: width*920/1920, y: height*1000/1080 }
		},
		2: {
			pos1:{ x: width*850/1920, y: height*1000/1080},
			pos2:{ x: width*990/1920, y: height*1000/1080}
		},
		3: {
			pos1:{ x: width*790/1920, y: height*1000/1080 },
			pos2:{ x: width*920/1920, y: height*1000/1080 },
			pos3:{ x: width*1050/1920, y: height*1000/1080 }
		},
		4: {
			pos1:{ x: width*725/1920, y: height*1000/1080 },
			pos2:{ x: width*855/1920, y: height*1000/1080 },
			pos3:{ x: width*985/1920, y: height*1000/1080 },
			pos4:{ x: width*1115/1920, y: height*1000/1080 }
		},
		5: {
			pos1:{ x: width*710/1920, y: height*1000/1080 } ,
			pos2:{ x: width*817/1920, y: height*1000/1080 } ,
			pos3:{ x: width*923/1920, y: height*1000/1080 } ,
			pos4:{ x: width*1022/1920, y: height*1000/1080 } ,
			pos5:{ x: width*1131/1920, y: height*1000/1080 }
		},
		6: {
			pos1:{ x: width*700/1920, y: height*1000/1080 } ,
			pos2:{ x: width*788/1920, y: height*1000/1080 } ,
			pos3:{ x: width*876/1920, y: height*1000/1080 } ,
			pos4:{ x: width*964/1920, y: height*1000/1080 } ,
			pos5:{ x: width*1052/1920, y: height*1000/1080 } ,
			pos6:{ x: width*1140/1920, y: height*1000/1080 }
		},
		7: {
			pos1:{ x: width*694/1920, y: height*1000/1080 } ,
			pos2:{ x: width*768/1920, y: height*1000/1080 } ,
			pos3:{ x: width*846/1920, y: height*1000/1080 } ,
			pos4:{ x: width*913/1920, y: height*1000/1080 } ,
			pos5:{ x: width*994/1920, y: height*1000/1080 } ,
			pos6:{ x: width*1078/1920, y: height*1000/1080 } ,
			pos7:{ x: width*1145/1920, y: height*1000/1080 }
		},
		8: {
			pos1:{ x: width*672/1920, y: height*1000/1080 },
			pos2:{ x: width*728/1920, y: height*1000/1080 },
			pos3:{ x: width*836/1920, y: height*1000/1080 },
			pos4:{ x: width*878/1920, y: height*1000/1080 },
			pos5:{ x: width*924/1920, y: height*1000/1080 },
			pos6:{ x: width*973/1920, y: height*1000/1080 },
			pos7:{ x: width*1072/1920, y: height*1000/1080 },
			pos8:{ x: width*1144/1920, y: height*1000/1080 }
		},
		9: {
			pos1:{ x: width*676/1920, y: height*1000/1080 },
			pos2:{ x: width*723/1920, y: height*1000/1080 },
			pos3:{ x: width*780/1920, y: height*1000/1080 },
			pos4:{ x: width*812/1920, y: height*1000/1080 },
			pos5:{ x: width*865/1920, y: height*1000/1080 },
			pos6:{ x: width*927/1920, y: height*1000/1080 },
			pos7:{ x: width*990/1920, y: height*1000/1080 },
			pos8:{ x: width*1045/1920, y: height*1000/1080 },
			pos9:{ x: width*1131/1920, y: height*1000/1080 }
		},
		10: {
			pos1:{ x: width*647/1920, y: height*1000/1080 },
			pos2:{ x: width*695/1920, y: height*1000/1080 },
			pos3:{ x: width*767/1920, y: height*1000/1080 },
			pos4:{ x: width*836/1920, y: height*1000/1080 },
			pos5:{ x: width*853/1920, y: height*1000/1080 },
			pos6:{ x: width*902/1920, y: height*1000/1080 },
			pos7:{ x: width*954/1920, y: height*1000/1080 },
			pos8:{ x: width*1027/1920, y: height*1000/1080 },
			pos9:{ x: width*1051/1920, y: height*1000/1080 },
			pos10:{ x: width*1111/1920, y: height*1000/1080 }
		}
	};


	JSON.boardf = {
		1: {
			pos1:{ x: width*960/1920, y: height*590/1080 }
		},
		2: {
			pos1:{ x: width*895/1920, y: height*590/1080 },
			pos2:{ x: width*1025/1920, y: height*590/1080 }
		},
		3: {
			pos1:{ x: width*830/1920, y: height*590/1080 },
			pos2:{ x: width*960/1920, y: height*590/1080 },
			pos3:{ x: width*1090/1920, y: height*590/1080 }
		},
		4: {
			pos1:{ x: width*760/1920, y: height*590/1080 },
			pos2:{ x: width*890/1920, y: height*590/1080 },
			pos3:{ x: width*1020/1920, y: height*590/1080 },
			pos4:{ x: width*1150/1920, y: height*590/1080 }
		},
		5: {
			pos1:{ x: width*690/1920, y: height*590/1080 },
			pos2:{ x: width*820/1920, y: height*590/1080 },
			pos3:{ x: width*950/1920, y: height*590/1080 },
			pos4:{ x: width*1080/1920, y: height*590/1080 },
			pos5:{ x: width*1210/1920, y: height*590/1080 }
		},
		6: {
			pos1:{ x: width*630/1920, y: height*590/1080 },
			pos2:{ x: width*760/1920, y: height*590/1080 },
			pos3:{ x: width*890/1920, y: height*590/1080 },
			pos4:{ x: width*1020/1920, y: height*590/1080 },
			pos5:{ x: width*1150/1920, y: height*590/1080 },
			pos6:{ x: width*1280/1920, y: height*590/1080 }
		},
		7: {
			pos1:{ x: width*565/1920, y: height*590/1080 },
			pos2:{ x: width*695/1920, y: height*590/1080 },
			pos3:{ x: width*825/1920, y: height*590/1080 },
			pos4:{ x: width*955/1920, y: height*590/1080 },
			pos5:{ x: width*1085/1920, y: height*590/1080 },
			pos6:{ x: width*1215/1920, y: height*590/1080 },
			pos7:{ x: width*1345/1920, y: height*590/1080 }
		}
	};

	JSON.boarde = {
		1: {
			pos1:{ x: width*960/1920, y: height*420/1080 }
		},
		2: {
			pos1:{ x: width*895/1920, y: height*420/1080 },
			pos2:{ x: width*1025/1920, y: height*420/1080 }
		},
		3: {
			pos1:{ x: width*830/1920, y: height*420/1080 },
			pos2:{ x: width*960/1920, y: height*420/1080 },
			pos3:{ x: width*1090/1920, y: height*420/1080 }
		},
		4: {
			pos1:{ x: width*760/1920, y: height*420/1080 },
			pos2:{ x: width*890/1920, y: height*420/1080 },
			pos3:{ x: width*1020/1920, y: height*420/1080 },
			pos4:{ x: width*1150/1920, y: height*420/1080 }
		},
		5: {
			pos1:{ x: width*690/1920, y: height*420/1080 },
			pos2:{ x: width*820/1920, y: height*420/1080 },
			pos3:{ x: width*950/1920, y: height*420/1080},
			pos4:{ x: width*1080/1920, y: height*420/1080 },
			pos5:{ x: width*1210/1920, y: height*420/1080 }
		},
		6: {
			pos1:{ x: width*630/1920, y: height*420/1080 },
			pos2:{ x: width*760/1920, y: height*420/1080 },
			pos3:{ x: width*890/1920, y: height*420/1080 },
			pos4:{ x: width*1020/1920, y: height*420/1080 },
			pos5:{ x: width*1150/1920, y: height*420/1080 },
			pos6:{ x: width*1280/1920, y: height*420/1080 }
		},
		7: {
			pos1:{ x: width*565/1920, y: height*420/1080 },
			pos2:{ x: width*695/1920, y: height*420/1080 },
			pos3:{ x: width*825/1920, y: height*420/1080 },
			pos4:{ x: width*955/1920, y: height*420/1080 },
			pos5:{ x: width*1085/1920, y: height*420/1080 },
			pos6:{ x: width*1215/1920, y: height*420/1080 },
			pos7:{ x: width*1345/1920, y: height*420/1080 }
		}
	};
	return JSON;
}