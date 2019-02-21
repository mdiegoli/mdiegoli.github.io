class bullet extends entity{
    constructor(level){
		super(level)
		//this.id = this.__proto__.bulletId++;
		this.BBoxColor = 'green';
		this.frames;
		this.frame = 0;
    }
	
    create(){
		var me = this;
		return new Promise((res,rej)=>{
			
			if(!me.frames) me.frames = me.__proto__.images[me.level]['BU'].width/gC.spriteW;
			if(me.frame===me.frames){
				me.frame=0;
			}
			Utils.drawAnimation(me.__proto__.images[me.level], gC.spriteW*me.frame, 0,gC.spriteW,gC.spriteH, me.randomX, me.randomY,gC.spriteW,gC.spriteH);
			//add the echo feature
			Utils.drawBBox(me.BBoxX, me.BBoxY,gC.bulletW,gC.bulletH,me.BBoxColor);
			//gC.fireAudio.play();
			me.frame++;
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
			if((me.BBoxY-gC.offset_bullet)>0){
				if(me.dir === 'u'){
					me.randomY-=gC.offset_bullet;
					me.BBoxY  -=gC.offset_bullet;
					for(let a = 0,a_l = assets.length;a<a_l;a++){
						if((assets[a] instanceof enemy) && assets[a].hit(me.BBoxX,me.BBoxY,gC.bulletW,me.bulletW)){
							assets.push(new explosion('x_a',assets[a].getPosX(),assets[a].getPosY()))
							
							console.log('remove demon')
							assets[a].end = true;
							this.removeBullet();
							gC.score += 50;
							gC.demonsCountdown--;
							gC.explosionAudio1.play();
							
						}
					}
					res();
				}
			}else{
				this.removeBullet();	
				rej();	
			}
			
		})

	}
	
	removeBullet(){
		let a_l = assets.length;
		return new Promise((res,rej)=>{
			for(let b = 0;b<a_l;b++){
				if(typeof assets[b].id !== 'undefined' && assets[b].id === this.id){
					console.log('remove bullet')
					assets[b].end = true;
					return res();
					
				}
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
		//lI(me.__proto__.images[me.level],'assets/games/bullets/BULLET-001.png', 'BU');
		lI(me.__proto__.images[me.level],'assets/games/animations/bullets/bullet1.png', 'BU');
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

