var artool = class {
  contructor(){

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
            Utils.setAttribute(b,'style','touch-action:none')
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
l(){
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


mouseMove(e){
	e.preventDefault();
	if(gC.paint){
		let coord = Utils.getRealMousePos(gC.canvas,e)
		this.custom_mouseMove(coord)
	}
}

mouseDown(e){
    e.preventDefault()
    let coord = Utils.getRealMousePos(gC.canvas,e)
    gC.oldCoordX = coord.x
    gC.oldCoordY = coord.y
	gC.paint = true;
	this.custom_mouseDown();
}

mouseUp(e){
	e.preventDefault();
    gC.paint = false;
    let coord = Utils.getRealMousePos(gC.canvas,e)
	this.custom_mouseUp(coord)
}

touchMove(e){
    e.preventDefault()
	if(gC.paint){
		let coord = Utils.getRealTouchPos(gC.canvas,e)
		this.custom_touchMove(coord);
	}
}

touchDown(e){
    e.preventDefault()
    let coord = Utils.getRealTouchPos(gC.canvas,e)
    gC.oldCoordX = coord.x
    gC.oldCoordY = coord.y
	gC.paint = true;
	this.custom_touchDown();
}

touchUp(e){
    e.preventDefault()
    gC.paint = false;
	this.custom_touchUp();
}
	  
custom_mouseMove(e){
}

custom_mouseDown(e){
}

custom_mouseUp(e){
}

custom_touchMove(e){
}

custom_touchDown(e){
}

custom_touchUp(e){
}

}