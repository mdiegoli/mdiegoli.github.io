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
    getEBI(str){
        return document.getElementById(str);
    }
    createE(str){
        return document.createElement(str);       
    }
    clearCanvas(){
		
        this.ctx.fillStyle = '#000';
        this.ctx.clearRect(0, 0, gC.width, gC.height);
    }
    appendB2A(a,b){
        a.appendChild(b);
    }
    setCanvas(e){
        this.c = e;
        this.ctx = e.getContext("2d");
        this.co = this.createE('canvas');
        this.setAttribute(this.co,'width',gC.width)
        this.setAttribute(this.co,'height',gC.height)
        this.ctxo = this.co.getContext("2d");
    }
	
	c2c(){
		this.ctx.drawImage(this.co,0,0)
		this.ctxo.fillStyle = '#FFF';
        	this.ctxo.fillRect(0, 0, gC.width, gC.height);
        
	}
	
    drawImages(images,x,y){
	    
	
		let keys = Object.keys(images);
		for(let p = 0,p_l = keys.length;p<p_l;p++){
			this.ctxo.drawImage(images[keys[p]], x, y)
		}
		
	
        
    }
    drawImage(img,x,y){
        this.ctxo.drawImage(img, x, y)
    }
	drawBBox(x,y,w,h){
		this.ctxo.globalAlpha = 0.2;
		this.ctxo.fillStyle = "green"; 
		this.ctxo.fillRect(x, y, w, h);
		this.ctxo.globalAlpha = 1.0;
		//ctx.fill();
	}
    loadImage(images,str,type){
	    var me = this;
	    
		return new Promise((res,rej)=>{
        if(!images[type]){
		    let img = new Image(gC.spriteW,gC.spriteH);
		    img.onload = function () {
			images[type] = img;
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
