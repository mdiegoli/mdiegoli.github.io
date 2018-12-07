class bullet extends entity{
    constructor(level){
        super(level)
    }
	
    create(){
        var me = this;
         Utils.drawImages(me.__proto__.images[this.level], me.randomX, me.randomY);
        
        
    }
    
    preload(){
         var me = this;
	return new Promise((res,rej)=>{
		let preloaded = [];
		if(!this.indexes)
			this.indexes = {}
		
	    if(!this.indexes.LW)
            this.indexes.BU= Utils.random(1,36).toString().padStart(2,'0');
       
		
	var lI = Utils.loadImage;
	lI(me.__proto__.images[me.level],'assets/games/bullets/hero1.png', 'LW');
	res();
        })
        
    }    

    right(){
        if((this.randomX+gC.offset_arrow) <= gC.spritePosX) this.randomX += gC.offset_arrow;
    }

    left(){
        if((this.randomX-gC.offset_arrow) > 0) this.randomX -= gC.offset_arrow;
    }
}

//export { enemy };
