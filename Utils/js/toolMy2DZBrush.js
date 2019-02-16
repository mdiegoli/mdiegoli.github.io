'use strict';

class toolMy2DZBrush extends tool{
	constructor(){
		super();
		this.endcircles = [];
	}

	custom_mouseMove(coord){
		Utils.clear()
		this.endcircles.forEach((e)=>{
			e.draw(coord.x,coord.y)
		})
	}

	custom_mouseDown(coord){
		gC.originX = coord.x;
		gC.originY = coord.y;
		this.endcircles.push(new Circle(coord.x,coord.y))
	}

	custom_mouseUp(coord){
	}

	custom_touchMove(coord){
		Utils.clear()
		gC.endcircles.push(new circle(coord.x,coord.y))
	}

	custom_touchDown(coord){
		gC.originX = coord.x;
		gC.originY = coord.y;
	}

	custom_touchUp(coord){
		Utils.endcircle(gC.oldCoordX,gC.oldCoordY)
	}

}
