class splash{
    constructor(){
        this.images = {};
    }
    
    preload(){
		 var me = this;
	return new Promise((res,rej)=>{
		
		    var lI = Utils.loadImage;
		    lI(me.images,'assets/games/layout-draft/title/keplerion-title.gif', 'SP').then(
             (succ)=>{
		        res();
             }   
            )

        })
        
	}   
	

	
	   create(){
        var me = this;
        return new Promise((res,rej)=>{
        Utils.clearCanvas('#000');
        Utils.drawImage(me.images['SP'],100,100);
        Utils.drawText('Press s to start',100,200,'#FFF') 
        function k(e){
            switch(e.keyCode){
                case 83:
                    document.removeEventListener('keydown',k,false)
        
                    res();
                    break;
                
            }
        }
        document.addEventListener('keydown',k,false)
        Utils.c2c();
        
        
    })
		   
	createOffscreen(){
        var me = this;
        return new Promise((res,rej)=>{
        //Utils.clearCanvas('#000');
        Utils.drawImage(me.images['SP'],100,100);
        Utils.drawText('Press s to start',100,200,'#FFF') 
        function k(e){
            switch(e.keyCode){
                case 83:
                    document.removeEventListener('keydown',k,false)
        
                    res();
                    break;
                
            }
        }
        document.addEventListener('keydown',k,false)
        Utils.c2osc();
        
        
    })
}

}

//export { enemy };
