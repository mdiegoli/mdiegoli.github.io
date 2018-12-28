class back extends entity{
    constructor(level){
        super(level)
    }
    
    preload(){
		 var me = this;
	return new Promise((res,rej)=>{
		let preloaded = [];
		if(!this.indexes)
			this.indexes = {}
		
	    if(!this.indexes.LW)
            this.indexes.LW= Utils.random(1,9).toString().padStart(2,'0');
        if(!this.indexes.RW)
            this.indexes.RW= this.indexes.LW;
        if(!this.indexes.LB)
            this.indexes.LB= Utils.random(1,9).toString().padStart(2,'0');
        if(!this.indexes.HE)
            this.indexes.HE= Utils.random(1,9).toString().padStart(2,'0');
        if(!this.indexes.BO)
            this.indexes.BO= Utils.random(1,9).toString().padStart(2,'0');
		
		var lI = Utils.loadImage;
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonback/'+gC.demonBack['LW'][this.indexes.LW].img, 'LW'));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonback/'+gC.demonBack['RW'][this.indexes.RW].img, 'RW'));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonback/'+gC.demonBack['LB'][this.indexes.LB].img, 'LB'));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonback/'+gC.demonBack['BO'][this.indexes.BO].img, 'BO'));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonback/'+gC.demonBack['HE'][this.indexes.HE].img, 'HE'));

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
	
	bbox(){
		var me = this;
		return new Promise((res,rej)=>{
			me.randomX = 0;
			me.randomY = 0;//Utils.random(1,gC.spritePosY);
			res();			
		})
	}

	hit(x,y,w,h){
		   return false;
	   }
	
	   create(){
        var me = this;
        return new Promise((res,rej)=>{
            
	    Utils.drawBackground(me.__proto__.images[this.level]);
		
            
            res();
            
        })
        
        
    }

}

//export { enemy };
