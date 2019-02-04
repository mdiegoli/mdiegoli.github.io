class bullet extends entity{
    constructor(level){
		super(level)
		this.id = this.__proto__.bulletId++;
		this.BBoxColor = 'green';
    }
	
    create(){
		var me = this;
		return new Promise((res,rej)=>{
			
			
			Utils.drawImages(me.__proto__.images[this.level], me.randomX, me.randomY);
			//add the echo feature
			Utils.drawBBox(me.BBoxX, me.BBoxY,gC.bulletW,gC.bulletH,me.BBoxColor);
			//gC.fireAudio.play();
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
			if((me.BBoxY-gC.offset_bullet)>0 && me.dir === 'u'){
				me.randomY-=gC.offset_bullet;
				me.BBoxY  -=gC.offset_bullet;
				for(let a = 0,a_l = assets.length;a<a_l;a++){
					if(!(assets[a] instanceof bullet) && !(assets[a] instanceof hero) && assets[a].hit(me.BBoxX,me.BBoxY,gC.bulletW,me.bulletW)){
						assets.splice(a,1);
						//todo: class explosion, who show animation and play audio
						gC.explosionAudio1.play();
						for(let b = 0;b<a_l;b++){
							if(assets[b].id && assets[b].id === me.id){
								me.BBoxColor = 'red'
								//assets.splice(b,1);
							}
						}		
					}
				}
				res();
			}else{
				let a_l = assets.length;
				for(let b = 0;b<a_l;b++){
					if(typeof assets[b].id !== 'undefined' && assets[b].id === me.id){
						assets.splice(b,1);
					}
				}	
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

