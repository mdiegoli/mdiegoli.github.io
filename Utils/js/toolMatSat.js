'use strict';

class toolMatSat extends tool{
	constructor(){
		super()
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
