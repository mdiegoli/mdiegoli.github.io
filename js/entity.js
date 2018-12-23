class entity{
    constructor(level){
        this.level = level;
		if(!this.__proto__.bulletId)this.__proto__.bulletId = 0;
		if(!this.__proto__.images)this.__proto__.images = {};
        if(!this.__proto__.images[level])this.__proto__.images[level] = {};
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
			me.randomX = Utils.random(1,gC.spritePosX);
			me.BBoxX = me.randomX;
			me.randomY = Utils.random(1,gC.spritePosY);
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

