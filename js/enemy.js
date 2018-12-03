class enemy{
    constructor(level){
        this.level = level
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
        var preloaded = [] 
	return new Promise((res,rej)=>{
		if(!this.__proto__.indexes)
			this.__proto__.indexes = {}
		if(!this.__proto__.indexes[this.level])
			this.__proto__.indexes[this.level] = {}
		
	    if(!this.__proto__.indexes[this.level].LW)
            this.__proto__.indexes[this.level].LW= Utils.random(1,36).toString().padStart(2,'0');
        if(!this.__proto__.indexes[this.level].RW)
            this.__proto__.indexes[this.level].RW= this.__proto__.indexes[this.level].LW;
        if(!this.__proto__.indexes[this.level].LB)
            this.__proto__.indexes[this.level].LB= Utils.random(1,36).toString().padStart(2,'0');
        if(!this.__proto__.indexes[this.level].HE)
            this.__proto__.indexes[this.level].HE= Utils.random(1,36).toString().padStart(2,'0');
        if(!this.__proto__.indexes[this.level].BO)
            this.__proto__.indexes[this.level].BO= Utils.random(1,36).toString().padStart(2,'0');
		
		
		preloaded.push(Utils.loadImage('assets/games/demons/'+gC.demonData['LW'][this.__proto__.indexes[this.level].LW].img, 'LW'));
		preloaded.push(Utils.loadImage('assets/games/demons/'+gC.demonData['RW'][this.__proto__.indexes[this.level].RW].img, 'RW'));
		preloaded.push(Utils.loadImage('assets/games/demons/'+gC.demonData['LB'][this.__proto__.indexes[this.level].LB].img, 'LB'));
		preloaded.push(Utils.loadImage('assets/games/demons/'+gC.demonData['BO'][this.__proto__.indexes[this.level].BO].img, 'BO'));
		preloaded.push(Utils.loadImage('assets/games/demons/'+gC.demonData['HE'][this.__proto__.indexes[this.level].HE].img, 'HE'));

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
        return new Promise((res,rej)=>{
            if(this.dead === undefined){
                this.dead = false;
                this.randomX = 0;
                this.randomY = Utils.random(1,gC.spritePosY);
                
            }else{
                if(this.dead){
                    alert('enemy dead')
                }
            }
            Utils.drawImages(this.randomX, this.randomY);
            res();
            
        })
        
        
    }

}

//export { enemy };
