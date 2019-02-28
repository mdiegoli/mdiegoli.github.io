class hero extends entity{
    constructor(level){
        super(level)
    }
	
    create(){
        var me = this;
        return new Promise((res,rej)=>{
            if(me.dead === undefined){
                me.dead = false;
                me.randomX = gC.spritePosX/2;
                me.randomY = gC.spritePosY;
   		me.right = '';
		me.left = '';
            }else{
                if(me.dead){
                    alert('enemy dead')
                }
            }
		if(me.right)
			me.rightfn()
		else if(me.left)
			me.leftfn()
        Utils.drawImages(me.__proto__.images[this.level], me.randomX, me.randomY);
        //Utils.drawBBox(me.BBoxX, me.BBoxY,me.BBoxW,me.BBoxH,'blue');

            
            res();
            
        })
        
        
    }
    
	
    rightDown(){
    	this.right = true;
    }
    rightUp(){
	    this.right = false;
    }
    leftDown(){
	    this.left = true;
    }
    leftUp(){
	    this.left = false;
    }
    preload(){
         var me = this;
	return new Promise((res,rej)=>{
		let preloaded = [];
		if(!this.indexes)
			this.indexes = {}
		
	    if(!this.indexes.LW)
            this.indexes.LW= Utils.random(1,5).toString().padStart(2,'0');
        if(!this.indexes.RW)
            this.indexes.RW= this.indexes.LW;
        if(!this.indexes.LB)
            this.indexes.LB= Utils.random(1,5).toString().padStart(2,'0');
        if(!this.indexes.HE)
            this.indexes.HE= Utils.random(1,5).toString().padStart(2,'0');
        if(!this.indexes.BO)
            this.indexes.BO= Utils.random(1,5).toString().padStart(2,'0');
		
		var lI = Utils.loadImage;
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonship/demonship/'+gC.shipData['LW'][this.indexes.LW].img, 'LW'));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonship/demonship/'+gC.shipData['RW'][this.indexes.RW].img, 'RW'));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonship/demonship/'+gC.shipData['LB'][this.indexes.LB].img, 'LB'));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonship/demonship/'+gC.shipData['BO'][this.indexes.BO].img, 'BO'));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonship/demonship/'+gC.shipData['HE'][this.indexes.HE].img, 'HE'));

		Promise.all(preloaded)
            .then(
                (succ)=>{
                res();
                }
            )
            .catch(
                (err)=>{
                rej();
                }
            )
        })
        
    }    

    rightfn(){
        if((this.randomX+gC.offset_arrow) <= gC.spritePosX){
            this.randomX += gC.offset_arrow;
            this.BBoxX += gC.offset_arrow;
        } 
    }

    leftfn(){
        if((this.randomX-gC.offset_arrow) > 0){
            this.randomX -= gC.offset_arrow;
            this.BBoxX -= gC.offset_arrow;
        } 
    }

    

    
	
	bbox(){
		var me = this;
	return new Promise((res,rej)=>{
		if(me.dead === undefined){
			me.dead = false;
			me.randomX = Utils.random(1,gC.spritePosX);;
			me.BBoxX = me.randomX+gC.spriteW/4;
			me.randomY = gC.spritePosY;
			me.BBoxY = me.randomY+gC.spriteH/2;
			me.BBoxH = gC.spriteH/2;
			me.BBoxW = gC.spriteW/2;
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

//export { enemy };
