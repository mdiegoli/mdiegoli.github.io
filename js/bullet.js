class bullet extends entity{
    constructor(level){
        super(level)
    }
	
    create(){
		var me = this;
		return new Promise((res,rej)=>{
			
			
			Utils.drawImages(me.__proto__.images[this.level], me.randomX, me.randomY);
			//add the echo feature
			Utils.drawBBox(me.BBoxX, me.BBoxY,gC.bulletW,gC.bulletH);
			res();
		})
    }
	
    animation(){
		var me = this;
		return new Promise((res,rej)=>{
			if(!me.dir)me.dir='u'
			if(!me.randomX && !me.randomY){
				me.randomX = gC.player.getPosX();
				me.randomY = gC.player.getPosY();
				me.BBoxX = me.randomX + gC.spriteW/2 - gC.bulletW/2;
				me.BBoxY = me.randomY + gC.spriteH/2 - gC.bulletH/2;
			}
			if((me.randomY-gC.offset_bullet)>0 && me.dir === 'u'){
				me.randomY-=gC.offset_bullet;
				me.BBoxY  -=gC.offset_bullet;
				res();
			}else{
				rej();	
			}
			
		})

	}
    
    preload(){
         var me = this;
	return new Promise((res,rej)=>{
		let preloaded = [];
		if(!this.indexes)
			this.indexes = {}
		
	    if(!this.indexes.BU)
            	this.indexes.BU= Utils.random(1,4).toString().padStart(2,'0');
        
		
		var lI = Utils.loadImage;
		lI(me.__proto__.images[me.level],'assets/games/bullets/BULLET-001.png', 'BU');
		res();
        })
        
    }    
	
	bbox(){
		var me = this;
	return new Promise((res,rej)=>{
		if(me.dead === undefined){
			me.dead = false;
			me.randomX = gC.player.getPosX();
				me.randomY = gC.player.getPosY();
				me.BBoxX = me.randomX + gC.spriteW/2 - gC.bulletW/2;
				me.BBoxY = me.randomY + gC.spriteH/2 - gC.bulletH/2;
			res();
                
            	}else{
			if(me.dead){
			    rej('enemy dead')
				
			}else{
				res();
			}
		    
            }
	})
}

}

