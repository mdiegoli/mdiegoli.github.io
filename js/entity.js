class entity{
    constructor(level,xpos,offset){
		this.level = level;
		this.offset = offset;
		this.randomX = xpos;
		if(!this.__proto__.bulletId)this.__proto__.bulletId = 0;
		if(!this.__proto__.images)this.__proto__.images = {};
        if(!this.__proto__.images[level])this.__proto__.images[level] = {};
    }
	rightBorder2LeftBorder(){
		return new Promise((res,rej)=>{
			if(!this.dir)this.dir='r'
			
			if(this.randomX<gC.spritePosX && this.dir === 'r'){
				this.randomX++;
				this.BBoxX++;
			}else{
				if(this.randomX === gC.spritePosX) this.dir = 'l';
				if(this.randomX>0 && this.dir === 'l'){
					this.randomX--;
					this.BBoxX--;
				}else{
					this.dir = 'r';

				}	
			}
			res();
		})
		
	}
	animationOffset(){
		return new Promise((res,rej)=>{
			if(!this.dir)this.dir='r'
			if(!this.animOffsetX)this.animOffsetX=0;
			
			if(this.animOffsetX<this.offset && this.dir === 'r'){
				this.animOffsetX++;
				this.randomX++;
				this.BBoxX++;
			}else{
				if(this.animOffsetX === this.offset) this.dir = 'l';
				if(this.animOffsetX>0 && this.dir === 'l'){
					this.animOffsetX--;
					this.randomX--;
					this.BBoxX--;
				}else{
					this.dir = 'r';

				}	
			}
			res();
		})
		
	}
	
	gaussian(){
		return new Promise((res,rej)=>{
			if(!this.dir)this.dir='r'
			if(!this.animGaussX){
				this.animGaussX = [];
				for(let offset = this.offset;offset>0;){
					offset /= 2;
					this.animGaussX.push(offset)
				}
				for(let anim_length = this.animGaussX.length;anim_length>=0;anim_length--){
					this.animGaussX.push(this.animGaussX[anim_length])
				}
				
				this.animGaussXLength = this.animGaussX.length-1;
				this.indexAnimGaussXLength = this.animGaussXLength;
			}
			if(this.indexAnimGaussXLength >= 0 && this.dir === 'r'){
				this.animOffsetX+=this.animGaussX[this.indexAnimGaussXLength];
				this.randomX+=this.animGaussX[this.indexAnimGaussXLength];
				this.BBoxX+=this.animGaussX[this.indexAnimGaussXLength];
				this.indexAnimGaussXLength--;
				
			}else{
				if(this.indexAnimGaussXLength < 0){ 
					this.dir = 'l';
					this.indexAnimGaussXLength = 0;
				}
				if(this.indexAnimGaussXLength<this.animGaussLength && this.dir === 'l'){
					this.animOffsetX-=this.animGaussX[this.indexAnimGaussXLength];
					this.randomX-=this.animGaussX[this.indexAnimGaussXLength];
					this.BBoxX-=this.animGaussX[this.indexAnimGaussXLength];
					this.indexAnimGaussXLength++;
				}else{
					this.dir = 'r';

				}	
			}
			res();
		})
		
	}
	
    start(){
        var me = this;
        return new Promise((res,rej)=>{
		me.bbox()
		.then(
                    (succ)=>{
                        me.create()
			.then(
			    (succ)=>{
				res('done');
			    }
			)
			.catch(
			    (err)=>{
				res(err);
			    }
			)
                    }
                )
                .catch(
                    (err)=>{
                        res(err);
                    }
                )
                    
            })
    }
    
  
    create(){
        var me = this;
        return new Promise((res,rej)=>{
            
	    Utils.drawImages(me.__proto__.images[this.level], me.randomX, me.randomY);
		
            
            res();
            
        })
        
        
    }

    hit(x,y,w,h){
	 //https://stackoverflow.com/questions/2752349/fast-rectangle-to-rectangle-intersection   
	  if (x < this.BBoxX + this.BBoxW && this.BBoxX < x + w && y < this.BBoxY + this.BBoxH)
	    return true;
	  else
	    return false;

    }
	
paint(x,y){
        var me = this;
        return new Promise((res,rej)=>{
		
            Utils.drawImages(me.__proto__.images[this.level], x, y);
		
            
            res();
            
        })
        
        
    }
	
	bbox(){
		var me = this;
	return new Promise((res,rej)=>{
		if(me.dead === undefined){
			me.dead = false;
			if(!me.randomX)
				me.randomX = Utils.random(1,gC.spritePosX);
			me.BBoxX = me.randomX;
			me.randomY = 0;//Utils.random(1,gC.spritePosY);
			me.BBoxY = me.randomY;
			me.BBoxH = gC.spriteH;
			me.BBoxW = gC.spriteW;
			res();
			
                
            	}else{
			if(me.dead){
			    rej();
			}else{
				res();
			}
		    
            }
	})
}

    

}

