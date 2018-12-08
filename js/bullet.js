class bullet extends entity{
    constructor(level){
        super(level)
    }
	
    create(){
		var me = this;
		return new Promise((res,rej)=>{
			
			
			Utils.drawImages(me.__proto__.images[this.level], me.randomX + me.randomX/2, me.randomY);
			res();
		})
    }
	
    animation(){
		var me = this;
		return new Promise((res,rej)=>{
			if(!me.dir)me.dir='u'

			if((me.randomY-gC.offset_bullet)>0 && me.dir === 'u'){
				me.randomY-=gC.offset_bullet;
			}else{
				res();	
			}
			res();
		})

	}
    
    preload(){
         var me = this;
	return new Promise((res,rej)=>{
		let preloaded = [];
		if(!this.indexes)
			this.indexes = {}
		
	    if(!this.indexes.BU)
            	this.indexes.BU= Utils.random(1,36).toString().padStart(2,'0');
        if(!me.randomX && !me.randomY){
			me.randomX = gC.player.getPosX();
			me.randomY = gC.spritePosY;
		}
		
		var lI = Utils.loadImage;
		lI(me.__proto__.images[me.level],'assets/games/bullets/hero1.png', 'BU');
		res();
        })
        
    }    
}

//export { enemy };
