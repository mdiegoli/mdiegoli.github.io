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
                
            }else{
                if(me.dead){
                    alert('enemy dead')
                }
            }
	    Utils.drawImages(me.__proto__.images[this.level], me.randomX, me.randomY);
            
            res();
            
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

    right(){
        if((this.randomX+gC.offset_arrow) <= gC.spritePosX) this.randomX += gC.offset_arrow;
    }

    left(){
        if((this.randomX-gC.offset_arrow) > 0) this.randomX -= gC.offset_arrow;
    }

    fire(level){
        return new bullet(level);
    }

    getPosX(){
        return this.randomX;
    }
}

//export { enemy };
