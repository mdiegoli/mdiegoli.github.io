class bullet extends entity{
    constructor(level){
        super(level)
    }
	
    create(){
        var me = this;
         Utils.drawImages(me.__proto__.images[this.level], me.randomX, me.randomY);
    }
	
    animation(){
		return new Promise((res,rej)=>{
			if(!this.dir)this.dir='u'

			if((this.randomY-gC.offsetBullet)>0 && this.dir === 'U'){
				this.randomY-=gC.offsetBullet;
			}else{
				res();	
			}
			res();
		})

	}
    
    preload(){
         var me = this;
	return new Promise((res,rej)=>{
		let preloaded = [];
		if(!this.indexes)
			this.indexes = {}
		
	    if(!this.indexes.BU)
            	this.indexes.BU= Utils.random(1,36).toString().padStart(2,'0');
       
		
	var lI = Utils.loadImage;
	lI(me.__proto__.images[me.level],'assets/games/bullets/hero1.png', 'BU');
	res();
        })
        
    }    
}

//export { enemy };
