'use strict';

class toolMy2DZBrush extends tool{
	constructor(){
		super();
	}

	custom_mouseMove(coord){
		Utils.circle(gC.oldCoordX,gC.oldCoordY,coord.x,coord.y)
	}

	custom_mouseDown(coord){
	}

	custom_mouseUp(coord){
		Utils.endcircle(coord.x,coord.y)
	}

	custom_touchMove(coord){
		Utils.circle(gC.oldCoordX,gC.oldCoordY,coord.x,coord.y)
	}

	custom_touchDown(coord){
	}

	custom_touchUp(coord){
		Utils.endcircle(gC.oldCoordX,gC.oldCoordY)
	}

}
