class enemy{
    constructor(level){
        this.level = level;
        if(!this.__proto__.images)this.__proto__.images = {};
        if(!this.__proto__.images[level])this.__proto__.images[level] = {};
    }
	animation(){
		return new Promise((res,rej)=>{
			if(!this.dir)this.dir='r'
			
			if(this.randomX<gC.spritePosX && this.dir === 'r'){
				this.randomX++;
			}else{
				if(this.randomX === gC.spritePosX) this.dir = 'l';
				if(this.randomX>0 && this.dir === 'l'){
					this.randomX--;
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
                me.preload()
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
                        console.log(err);
                    }
                )
            })
    }
    
    preload(){
         var me = this;
	return new Promise((res,rej)=>{
		let preloaded = [];
		if(!this.indexes)
			this.indexes = {}
		
	    if(!this.indexes.LW)
            this.indexes.LW= Utils.random(1,36).toString().padStart(2,'0');
        if(!this.indexes.RW)
            this.indexes.RW= this.indexes.LW;
        if(!this.indexes.LB)
            this.indexes.LB= Utils.random(1,36).toString().padStart(2,'0');
        if(!this.indexes.HE)
            this.indexes.HE= Utils.random(1,36).toString().padStart(2,'0');
        if(!this.indexes.BO)
            this.indexes.BO= Utils.random(1,36).toString().padStart(2,'0');
		
		var lI = Utils.loadImage;
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demons/'+gC.demonData['LW'][this.indexes.LW].img, 'LW'));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demons/'+gC.demonData['RW'][this.indexes.RW].img, 'RW'));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demons/'+gC.demonData['LB'][this.indexes.LB].img, 'LB'));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demons/'+gC.demonData['BO'][this.indexes.BO].img, 'BO'));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demons/'+gC.demonData['HE'][this.indexes.HE].img, 'HE'));

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

    create(){
        var me = this;
        return new Promise((res,rej)=>{
            if(me.dead === undefined){
                me.dead = false;
                me.randomX = 0;
                me.randomY = Utils.random(1,gC.spritePosY);
                
            }else{
                if(me.dead){
                    alert('enemy dead')
                }
            }
	    //Utils.drawImages(me.__proto__.images[this.level], me.randomX, me.randomY);
            Utils.drawImagesNoDoubleBuffer(me.__proto__.images[this.level], me.randomX, me.randomY);
            res();
            
        })
        
        
    }
	
paint(x,y){
        var me = this;
        return new Promise((res,rej)=>{
		//Utils.drawImages(me.__proto__.images[this.level], x, y);
            Utils.drawImagesNoDoubleBuffer(me.__proto__.images[this.level], x, y);
            
            
            res();
            
        })
        
        
    }
    

}

//export { enemy };
