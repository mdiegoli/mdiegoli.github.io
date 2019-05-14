'use strict';

class toolMy2DZBrush extends tool{
	constructor(){
		super();
		this.endcircles = [];
	}

	custom_mouseMove(coord){
		Utils.clear();
		if(gC.mouseDown){
			if(gC.action == undefined){

				if(gC.circleSelection == undefined){
					//draw
					gC.action = 'draw';
					gC.circleSelection = this.endcircles.length;
					this.endcircles.push(new Circle(gC.originX,gC.originY))
				}else{
					//move
					gC.action = 'move';
				}
			}
			Utils.writeInElement('debug','Selection: '+gC.circleSelection+' x: '+coord.x+' y:'+coord.y+' action:'+gC.action)

			for(let el = 0,endcircles_l = this.endcircles.length;el<endcircles_l;el++){
				let e = this.endcircles[el];
				if(gC.circleSelection === el){
					if(gC.action.indexOf('draw') !== -1){
						e.draw(coord.x,coord.y)
					}else if(gC.action.indexOf('move') !== -1){
						e.move(gC.originX-coord.x,gC.originY-coord.y)
					}
				}else{
					e.draw()
				}
			}

			
		}
			
	}

	custom_mouseDown(coord){
		//to calculate offset from start interaction position
		gC.originX = coord.x;
		gC.originY = coord.y;
		let res;
		for(let i = 0, l = this.endcircles.length;i<l;i++){
			if(res == undefined || res == false){
				res = this.endcircles[i].hit(coord.x,coord.y)
				if(res){
					
					gC.circleSelection = i;
					Utils.writeInElement('debug','Selection: '+gC.circleSelection+' x: '+coord.x+' y:'+coord.y)
					return;
				}
			}
			 
		}
		
		if(!gC.action) delete gC.action;
		//}
		//if(!res) gC.circleSelection = this.endcircles.length;
		//this.endcircles.push(new Circle(coord.x,coord.y))
	}

	custom_mouseUp(coord){
		/*if(gC.action && gC.action.indexOf('move') !== -1) this.endcircles[gC.circleSelection].updatePosition(gC.originX-coord.x,gC.originY-coord.y);
		for(let el = 0,endcircles_l = this.endcircles.length;el<endcircles_l;el++){
			let e = this.endcircles[el];
			if(gC.circleSelection === el){
				if(gC.action.indexOf('draw') !== -1){
					e.draw(coord.x,coord.y)
				}else if(gC.action.indexOf('move') !== -1){
					e.move(gC.originX-coord.x,gC.originY-coord.y)
				}
			}else{
				e.draw()
			}
		}*/
		delete gC.action;
		delete gC.circleSelection;
		delete gC.originX;
		delete gC.originY;
	}

	custom_touchMove(coord){
		Utils.clear()
		//gC.endcircles.push(new circle(coord.x,coord.y))
	}

	custom_touchDown(coord){
		gC.originX = coord.x;
		gC.originY = coord.y;
	}

	custom_touchUp(coord){
		//Utils.endcircle(gC.oldCoordX,gC.oldCoordY)
	}

}
