class entity{
    constructor(level){
        this.level = level;
        if(!this.__proto__.images)this.__proto__.images = {};
        if(!this.__proto__.images[level])this.__proto__.images[level] = {};
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
	    Utils.drawImages(me.__proto__.images[this.level], me.randomX, me.randomY);
            
            res();
            
        })
        
        
    }
	
paint(x,y){
        var me = this;
        return new Promise((res,rej)=>{
            Utils.drawImages(me.__proto__.images[this.level], x, y);
            
            res();
            
        })
        
        
    }
    

}
