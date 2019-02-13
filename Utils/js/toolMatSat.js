'use strict';

class toolMatSat{
	constructor(){
		this.setEvents();
	}
	
	setEvents(){
		b.addEventListener('mousedown',this.mouseDown.bind(this))
		b.addEventListener('mouseup',this.mouseUp.bind(this))
		b.addEventListener('mousemove',this.mouseMove.bind(this))
		b.addEventListener('touchstart',this.touchDown.bind(this))
		b.addEventListener('touchend',this.touchUp.bind(this))
		b.addEventListener('touchmove',this.touchMove.bind(this))
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
		//let coord = Utils.getRealTouchPos(gC.canvas,e)
	    gC.paint = false;
		this.custom_touchUp();
	}

	custom_mouseMove(coord){
		Utils.sketch(gC.oldCoordX,gC.oldCoordY,coord.x,coord.y)
	}

	custom_mouseDown(coord){
	}

	custom_mouseUp(coord){
		Utils.endsketch(coord.x,coord.y)
	}

	custom_touchMove(coord){
		Utils.sketch(gC.oldCoordX,gC.oldCoordY,coord.x,coord.y)
	}

	custom_touchDown(coord){
	}

	custom_touchUp(coord){
		Utils.endsketch(gC.oldCoordX,gC.oldCoordY)
	}

}
