//import { gC } from "./conf.js";
//import { Utils } from "./utils.js";
//import { enemy } from "./enemy.js";

var gC = {};

function addCanvas(){
    var me = this;
    return new Promise(function(res,rej){
        var canvas = Utils.getEBTN('canvas')
        if(typeof canvas === 'object' && canvas.length <= 0){
            //non c'è canvas
            var a = Utils.getEBTN('body')[0]
            var b = Utils.createE('canvas')
            //memorizzo canvas e contesto
            Utils.setCanvas(b)
            Utils.appendB2A(a,b)
	    gC.canvas = b;
            Utils.setAttribute(b,'width',window.innerWidth)
            Utils.setAttribute(b,'height',window.innerHeight)
		a.addEventListener('mousedown',mouseDown)
		a.addEventListener('mouseup',mouseUp)
		a.addEventListener('mousemove',mouseMove)
		a.addEventListener('touchstart',touchDown)
		a.addEventListener('touchend',touchUp)
		a.addEventListener('touchmove',touchMove)
        }
        res();
    })
}
//every frame value, draw scene
function l(){
    var demoClock = 0;
    addCanvas().then(
        (succ)=>{
            console.log('start!');
        }
        ).catch(
        (err) => {
            console.log(err);
        }
        )			

    
}


function mouseMove(e){
	e.preventDefault();
	if(gC.paint){
		let coord = Utils.getMousePos(gC.canvas,e)
		Utils.sketch(gC.oldCoordX,gC.oldCoordY,coord.x,coord.y)
	}
}

function mouseDown(e){
    let coord = Utils.getMousePos(gC.canvas,e)
    gC.oldCoordX = coord.x
    gC.oldCoordY = coord.y
	e.preventDefault();
	gC.paint = true;
}

function mouseUp(e){
	e.preventDefault();
    gC.paint = false;
    let coord = Utils.getMousePos(gC.canvas,e)
	Utils.endsketch(coord.x,coord.y)
}

function touchMove(e){
	e.preventDefault();
	if(gC.paint){
		let coord = Utils.getTouchPos(gC.canvas,e)
		Utils.sketch(gC.oldCoordX,gC.oldCoordY,coord.x,coord.y)
	}
}

function touchDown(e){
    let coord = Utils.getTouchPos(gC.canvas,e)
    gC.oldCoordX = coord.x
    gC.oldCoordY = coord.y
	e.preventDefault();
	gC.paint = true;
}

function touchUp(e){
	e.preventDefault();
    gC.paint = false;
	Utils.endsketch(gC.oldCoordX,gC.oldCoordY)
}
