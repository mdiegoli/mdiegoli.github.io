'use strict';

var f3d = class extends artCanvas{
	constructor(){
		super();
	}
}

function setTool(str){
	switch(str){
		case 'mat-sat':
			if(!gC.matsat)
				gC.matsat = new toolMatSat();
			gC.matsat.setEvents();
			break;
		case 'my2dzbrush':
			if(!gC.my2dzbrush)
				gC.my2dzbrush = new toolMy2DZBrush();
			gC.my2dzbrush.setEvents();
			break;
	}
}

function l(){
	const app = new f3d();
}
