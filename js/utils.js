class utils{
    constructor(){
	    this.images = {};
    }
    random(s,e){
        return Math.floor(Math.random() * (e - s + 1)) + s;
    }
    getEBTN(str){
    	return document.getElementsByTagName(str);
    }
    createE(str){
        return document.createElement(str);       
    }
    clearCanvas(){
        this.ctx.fillStyle = '#000';
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    }
    appendB2A(a,b){
        a.appendChild(b);
    }
    setCanvas(e){
        this.c = e;
        this.ctx = e.getContext("2d")
    }
	
    drawImages(x,y){
	    
	let levels = Object.keys(this.images);
        for(let i = 0,k_l = levels.length;i<k_l;i++){
		let keys = Object.keys(this.images[levels[i]]);
		for(let p = 0,p_l = keys.length;p<p_l;p++){
			this.ctx.drawImage(this.images[levels[i]][keys[p]], x, y)
		}
		
	}
        
    }
    loadImage(str,type,level){
	    console.log(str);
        var me = this;
	    
		return new Promise((res,rej)=>{
		if(!this.images[level]){
			this.images[level] = {};
		}
		if(!this.images[level][type]){
		    var img = new Image(gC.spriteW,gC.spriteH);
		    img.onload = function () {
			me.images[level][type] = img;
			res('image '+str+' loaded!')
		    }
		    img.onerror = function (e) {
			rej('load image '+str+' error: '+e)
		    }
		    img.src = str;
		}else{
			res('image just loaded')
		    }
		})
	    
        
        
    }
    setAttribute(e,name,val){
    	e.setAttribute(name,val);
    }
}

var Utils = new utils();

//export { Utils };
