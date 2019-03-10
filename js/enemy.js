class enemy extends entity{
    constructor(level,xpos,offset){
		super(level,xpos,offset)
    }
	animation(){
		if(this.offset)
			return this.gaussian();
		else
			return this.rightBorder2LeftBorder();
		
	}
    
    preload(){
		 var me = this;
	return new Promise((res,rej)=>{
		let preloaded = [];
		if(!this.indexes)
			this.indexes = {}
		
	    if(!this.indexes.LW)
            this.indexes.LW= 35;//Utils.random( 1, Object.keys(gC.demonData.LW).length ).toString().padStart(2,'0');
        if(!this.indexes.RW)
            this.indexes.RW= this.indexes.LW;
        if(!this.indexes.LB)
            this.indexes.LB= 40;//Utils.random(1, Object.keys(gC.demonData.LB).length ).toString().padStart(2,'0');
        if(!this.indexes.HE)
            this.indexes.HE= 48;//Utils.random(1, Object.keys(gC.demonData.HE).length ).toString().padStart(2,'0');
        if(!this.indexes.BO)
            this.indexes.BO= 47;//Utils.random(1, Object.keys(gC.demonData.BO).length ).toString().padStart(2,'0');
		
		var lI = Utils.loadImage;
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demons/'+gC.demonData['LW'][this.indexes.LW].img, 'LW',gC.demonData['LW'][this.indexes.LW]));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demons/'+gC.demonData['RW'][this.indexes.RW].img, 'RW',gC.demonData['RW'][this.indexes.RW]));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demons/'+gC.demonData['LB'][this.indexes.LB].img, 'LB',gC.demonData['LB'][this.indexes.LB]));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demons/'+gC.demonData['BO'][this.indexes.BO].img, 'BO',gC.demonData['BO'][this.indexes.BO]));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demons/'+gC.demonData['HE'][this.indexes.HE].img, 'HE',gC.demonData['HE'][this.indexes.HE]));

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

}

//export { enemy };
