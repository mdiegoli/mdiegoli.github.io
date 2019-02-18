'use strict';

class toolMy2DZBrush extends tool{
	constructor(){
		super();
		this.endcircles = [];
	}

	custom_mouseMove(coord){
		Utils.clear();
		var me = this;
		if(gC.mouseDown){
			if(!gC.action){

				if(!gC.circleSelection){
					//draw
					gC.action = 'draw';
					gC.circleSelection = this.endcircles.length;
					this.endcircles.push(new Circle(gC.originX,gC.originY))
					loop();
				}else{
					//move
					gC.action = 'move';
					loop();
				}
			}
			function loop(){
				me.endcircles.forEach((e,i)=>{
					if(gC.circleSelection === i){
						if(gC.action.indexOf('draw') !== -1){
							e.draw(coord.x,coord.y)
						}else if(gC.action.indexOf('move') !== -1){
							e.move(gC.originX-coord.x,gC.originY-coord.y)
						}
					}else e.draw()
				})
			}
			
		}
			
	}

	custom_mouseDown(coord){
		//to calculate offset from start interaction position
		gC.originX = coord.x;
		gC.originY = coord.y;
        gC.mouseDown = true;
		let res;
		for(let i = 0, l = this.endcircles.length;i<l;i++){
			if(!res){
				res = this.endcircles[i].hit(coord.x,coord.y)
				if(res){
					gC.circleSelection = i;
					break;
				}
			}
			 
		}
		
		if(!res){
			delete gC.action;
		}
		//if(!res) gC.circleSelection = this.endcircles.length;
		//this.endcircles.push(new Circle(coord.x,coord.y))
	}

	custom_mouseUp(coord){
		if(gC.action && gC.action.indexOf('move') !== -1) this.endcircles[gC.circleSelection].updatePosition(gC.originX-coord.x,gC.originY-coord.y);
		delete gC.action;
		delete gC.circleSelection;
		delete gC.originX;
		delete gC.originY;
		gC.mouseDown = false;
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
