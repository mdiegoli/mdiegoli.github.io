class splash{
    constructor(str){
        this.images = {};
        this.stringToWrite = str;
    }
    
    preload(){
		 var me = this;
	return new Promise((res,rej)=>{
		
		    var lI = Utils.loadImage;
		    lI(me.images,'assets/games/demontitle/badge_A_HE_1_01.png', 'SP').then(
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
        Utils.drawImage(me.images['SP'],0,100);
        if(!this.stringToWrite) this.stringToWrite = 'Press  s  to  start';
        Utils.drawText(this.stringToWrite,380,400,'#FFF') 
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

    
		/*   
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
        
        
    })*/
}
createLevel(){
    var me = this;
    return new Promise((res,rej)=>{
    Utils.clearCanvas('#000');
    if(!this.stringToWrite) this.stringToWrite = 'Press  s  to  start';
    Utils.drawText(this.stringToWrite,380,400,'#FFF') 
    Utils.c2c();
    res();
        
})
}
}

//export { enemy };
