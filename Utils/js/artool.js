class artool{
  contructor(){

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
	this.custom_mouseDown(coord);
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
	this.custom_touchDown(coord);
}

touchUp(e){
    e.preventDefault()
	let coord = Utils.getRealTouchPos(gC.canvas,e)
    gC.paint = false;
	this.custom_touchUp(coord);
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
