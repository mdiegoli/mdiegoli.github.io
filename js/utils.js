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
	
    drawImages(images,x,y){
	    
	
		let keys = Object.keys(images);
		for(let p = 0,p_l = keys.length;p<p_l;p++){
			this.ctx.drawImage(images[keys[p]], x, y)
		}
		
	
        
    }
    drawImage(img,x,y){
        this.ctx.drawImage(img, x, y)
    }
    loadImage(str,type){
	    var me = this;
	    
		return new Promise((res,rej)=>{
		
		if(!me.images[type]){
		    let img = new Image(gC.spriteW,gC.spriteH);
		    img.onload = function () {
			me.images[type] = img;
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
