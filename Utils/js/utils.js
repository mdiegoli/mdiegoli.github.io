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
    clearCanvas(c){
        if(!c)
            c = '#000';
        this.ctx.fillStyle = c;
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
	
	setOffScreen(e){
	this.c = e;
        this.ctx = e.getContext("bitmaprenderer");
        this.co = new OffscreenCanvas(996,498);
        this.ctxo = this.co.getContext("2d");
    }
	
	c2c(){
		this.ctx.drawImage(this.co,0,0)
		this.ctxo.fillStyle = '#FFF';
        	this.ctxo.fillRect(0, 0, gC.width, gC.height);
        
	}
	
	c2osc(){
		var bitmapOne = this.co.transferToImageBitmap();
		this.c.transferFromImageBitmap(bitmapOne);
		this.ctxo.fillStyle = '#FFF';
        	this.ctxo.fillRect(0, 0, gC.width, gC.height);
        
	}
	
    drawImages(images,x,y){
	    
	
		let keys = Object.keys(images);
		for(let p = 0,p_l = keys.length;p<p_l;p++){
			this.ctxo.drawImage(images[keys[p]], x, y)
		}
		
	
        
    }
	
	drawImagesNoDoubleBuffer(images,x,y){
	    
	
		let keys = Object.keys(images);
		for(let p = 0,p_l = keys.length;p<p_l;p++){
			this.ctx.drawImage(images[keys[p]], x, y)
		}
		
	
        
    }

    drawBackground(images){
	    this.ctxo.save();
        this.ctxo.scale(2,2);
		let keys = Object.keys(images);
		for(let p = 0,p_l = keys.length;p<p_l;p++){
			this.ctxo.drawImage(images[keys[p]],0,0)
        }
        this.ctxo.restore();
		
	
        
    }
    drawImage(img,x,y){
        this.ctxo.drawImage(img, x, y)
    }
    drawText(src,x,y,c){
        this.ctxo.font = "30px Arial";
		this.ctxo.fillStyle = c;
        this.ctxo.fillText(src, x, y);
    }
	drawBBox(x,y,w,h,c){
		this.ctxo.globalAlpha = 0.2;
		this.ctxo.fillStyle = c; 
		this.ctxo.fillRect(x, y, w, h);
		//comment the line under for echo effect
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
    sketch(ox,oy,x,y){
        if(!this.path){ 
            this.ctx.beginPath();
            this.ctx.moveTo(ox, oy);
            this.ctx.lineTo(x, y);
            this.path = 'M '+ox+' '+oy+' L '+x+' '+y+' ';
        }else{
            this.ctx.lineTo(x, y);
            this.path += 'L '+x+' '+y+' ';
        }
        this.ctx.stroke();

    }
    endsketch(x,y){
            this.ctx.lineTo(x, y);
            this.path += 'Z';
	    let bezierLoops = FloMat.getPathsFromStr(this.path);
    	let mats = FloMat.findMats(bezierLoops, 3);
	this.drawMats(mats, 'mat');
        
    }
	
	getLinePathStr(ps) {
    let [[x0,y0],[x1,y1]] = ps;
    return `M${x0} ${y0} L${x1} ${y1}`;
}

getQuadBezierPathStr(ps) {
    let [[x0,y0],[x1,y1],[x2,y2]] = ps;
    return `M${x0} ${y0} Q${x1} ${y1} ${x2} ${y2}`;
}


getCubicBezierPathStr(ps) {
    let [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;
    return `M${x0} ${y0} C${x1} ${y1} ${x2} ${y2} ${x3} ${y3}`;
}
	
	
	drawMats(
        mats,
        type) {

    mats.forEach(f);

    /**
     * Draws a MAT curve on an SVG element.
     */
     function f(mat) {
        let cpNode = mat.cpNode;
        
        if (!cpNode) { return; }

        let fs = [,,this.getLinePathStr, this.getQuadBezierPathStr, this.getCubicBezierPathStr];

        traverseEdges(cpNode, function(cpNode) {
            if (cpNode.isTerminating()) { return; }
            let bezier = cpNode.matCurveToNextVertex;
            if (!bezier) { return; }

            let $path = document.createElementNS(NS, 'path');
            $path.setAttributeNS(
                null, 
                "d", 
                fs[bezier.length](bezier)
            );
            $path.setAttributeNS(null, "class", type);

            svg.appendChild($path);
        });
    }
}
}

var Utils = new utils();

//export { Utils };
