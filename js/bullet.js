class bullet extends entity{
    constructor(level){
        super(level)
    }
	
    create(){
		var me = this;
		return new Promise((res,rej)=>{
			
			
			Utils.drawImages(me.__proto__.images[this.level], me.randomX, me.randomY);
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
			}
			if((me.randomY-gC.offset_bullet)>0 && me.dir === 'u'){
				me.randomY-=gC.offset_bullet;
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
	return new Promise((res,rej)=>{
		if(me.dead === undefined){
			me.dead = false;
			me.randomX = 0;
			me.BBoxX = 0; //redefine
			me.randomY =  0; //redefine
			me.BBoxY = me.randomY;  //redefine
			me.BBoxH = gC.spriteH;  //redefine
			me.BBoxW = gC.spriteW; //redefine
			
                
            	}else{
			if(me.dead){
			    alert('enemy dead')
			}
		    
            }
	})
}

}

