'use strict';

class utils{
    constructor(){
	    this.images = {};
	    this.sketches = [];
	    this.numSketch = 0;
    }
    random(s,e){
        return Math.floor(Math.random() * (e - s + 1)) + s;
    }
    getEBTN(str){
    	return document.getElementsByTagName(str);
    }
    getEBCN(str){
    	return document.getElementsByClassName(str);
    }
    getEBI(str){
        return document.getElementById(str);
    }
    createE(str){
        return document.createElement(str);       
    }
	writeInElement(id,str){
		this.getEBI(id).innerHTML = str;
	
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
	setCanvas2(e){
        this.c2 = e;
        this.ctx2 = e.getContext("2d");
        this.co2 = this.createE('canvas');
        this.setAttribute(this.co2,'width',gC.width)
        this.setAttribute(this.co2,'height',gC.height)
        this.ctxo2 = this.co2.getContext("2d");
    }
	setOffScreen(e){
	this.c = e;
        this.ctx = e.getContext("bitmaprenderer");
        this.co = new OffscreenCanvas(996,498);
        this.ctxo = this.co.getContext("2d");
    }
	setSketchBlur(){
		this.ctx.shadowBlur = 10;
  		this.ctx.shadowColor = 'rgb(0, 0, 0)';
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
    
	writeOnSecondCanvas(str,x,y){
        this.ctx2.font = "30px Arial";
        this.ctx2.fillStyle = "red";
        this.ctx2.clearRect(0,0,gC.width,gC.height)
        this.ctx2.fillText(str, x, y);
    }
    drawImages(images,x,y){
	    
	
		let keys = Object.keys(images);
		for(let p = 0,p_l = keys.length;p<p_l;p++){
			this.ctxo.drawImage(images[keys[p]], x, y)
		}
		
	
        
    }

    drawAnimation(images,srcX,srcY,width,height,realx,realy,realwidth,realheight){
	    
	
		let keys = Object.keys(images);
		for(let p = 0,p_l = keys.length;p<p_l;p++){
			this.ctxo.drawImage(images[keys[p]], srcX,srcY,width,height,realx,realy,realwidth,realheight)
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
        this.ctxo.font = "30px Arcadeclassic";
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
		    let img = new Image();
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
        if(!this.mypath){ 
            this.ctx.beginPath();
            this.ctx.moveTo(ox, oy);
            this.ctx.lineTo(x, y);
            this.mypath = 'M '+ox+' '+oy+' L '+x+' '+y+' ';
		this.sketches[this.numSketch] = [];
		this.sketches[this.numSketch].push([ox,oy])
		this.sketches[this.numSketch].push([x,y])
        }else{
            this.ctx.lineTo(x, y);
            this.mypath += 'L '+x+' '+y+' ';
		this.sketches[this.numSketch].push([x,y])
        }
        this.ctx.stroke();

    }
    endsketch(x,y){
            
        var last_first = this.sketches[this.numSketch][0];
        this.mypath += 'L '+last_first[0]+' '+last_first[1]+' Z';
        this.sketches[this.numSketch].push(this.sketches[this.numSketch][0])
        this.ctx.lineTo(last_first[0],last_first[1]);
        this.ctx.stroke();
        let bezierLoops = FloMat.getPathsFromStr(this.mypath);
        delete this.mypath;
        let mats = FloMat.findMats(bezierLoops, 3);
        this.drawMats(mats, 'mat');

        let sats = mats.map(mat => FloMat.toScaleAxis(mat, 1.5));

        this.drawMats(sats, 'sat');
        this.numSketch++;
        this.findIntersection();
    
    }
	
	getLinePathStr(ps) {
    let [[x0,y0],[x1,y1]] = ps;
    return `M${x0} ${y0} L${x1} ${y1}`;
}
isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
setFilter(k){
    let filter = '';
    switch(k){
        case '0':
            filter = 'none';
            break;
        case '1':
            filter = 'sepia(100%)';
            break;
        case '2':
            filter = 'opacity(50%)';
            break;
        case '3':
            filter = 'invert(100%)';
            break;
        case '4':
            filter = 'grayscale(100%)';
            break;
        case '5':
            filter = 'contrast(0%)';
            break;
        case '6':
            filter = 'brightness(150%)';
            break;
        case '7':
            filter = 'blur(100%)';
            break;
        case '8':
            filter = 'saturate(0%)';
            break;
        case '9':
            filter = 'hue-rotate(90deg)';
            break;
    }
    this.ctx.filter = filter;
    gC.canvasFilter = filter;
            
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
	var me = this;
    mats.forEach(f);

    /**
     * Draws a MAT curve on an SVG element.
     */
     function f(mat) {
        let cpNode = mat.cpNode;
        
        if (!cpNode) { return; }

        let fs = ['','',me.getLinePathStr, me.getQuadBezierPathStr, me.getCubicBezierPathStr];

        FloMat.traverseEdges(cpNode, function(cpNode) {
            if (cpNode.isTerminating()) { return; }
            let bezier = cpNode.matCurveToNextVertex;
            if (!bezier) { return; }
            let path_piece = fs[bezier.length](bezier);
            if(!me.mat_path){ 
		    me.mat_path = path_piece;
		     //me.ctx.beginPath();
		    //me.ctx.moveTo(bezier[0][0], bezier[0][1]);
		    //me.ctx.lineTo(bezier[1][0], bezier[1][1]);
	    }else{
	    	//me.ctx.lineTo(bezier[1][0], bezier[1][1]);
            	me.mat_path += path_piece;
        }
        let o_path2d = new Path2D(path_piece);
        if(type.indexOf('mat') !== -1) me.ctx.strokeStyle = '#0000FF';
        else me.ctx.strokeStyle = '#FF0000';
        me.ctx.stroke(o_path2d);
		me.ctx.strokeStyle = '#000000';
        });
    }
		me.path += 'Z';
}
setRandomData(){
    let az = 'abcdefghijklmnopqrstuvwxyz';
    let index_d = this.random(0,25);
    let index_filter = Utils.random(0,9)
    Utils.setFilter(index_filter.toString())
    let char_demon = az.charAt(index_d);
    gC.brush = new enemy(char_demon)
        gC.demonType = char_demon
        gC.brush.preload().then(
            (succ)=>{
                console.log('preload done');
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
}
	createAudio(){
		return new Promise(function(res,rej){
			const AudioContext = window.AudioContext || window.webkitAudioContext;
			gC.audioCtx = new AudioContext();
			gC.oscillatorNode = gC.audioCtx.createOscillator();
			gC.gainNode = gC.audioCtx.createGain();
			var finish = gC.audioCtx.destination;
			gC.oscillatorNode.connect(gC.gainNode);
			gC.gainNode.connect(gC.audioCtx.destination);
			gC.oscillatorNode.type = 'square';
			gC.oscillatorNode.frequency.value = 100;
			res();
		})
		
	}
	
	 selectDemon(e){
    let key = e.key;
    if(this.isNumber(key)){
        this.setFilter(key)
    }else{
        gC.brush = new enemy(key)
        gC.demonType = key
        gC.brush.preload().then(
            (succ)=>{
                console.log('preload done');
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }
    let type = gC.demonType?gC.demonType:'';
    let filter = gC.canvasFilter?gC.canvasFilter:'';
    this.writeOnSecondCanvas('demon type: '+type+', filter: '+filter,10,20)
}

 mouseMove(e){
	e.preventDefault();
	if(gC.paint){
		let coord = this.getMousePos(gC.canvas,e)
		if(gC.brush) gC.brush.paint(coord.x,coord.y)
    }
    gC.fireAudio.play();
}

 mouseDown(e){
	e.preventDefault();
    gC.paint = true;
    let coord = this.getMousePos(gC.canvas,e)
		if(gC.brush) gC.brush.paint(coord.x,coord.y)
    /*
    if(!gC.audioCtx){
		this.createAudio().then(
			(succ)=>{
				gC.oscillatorNode.start(0);
    				gC.gainNode.gain.value = 0.1;
			}
		)
		
	}else{
		if(gC.audioCtx.state === 'suspended') {
		      gC.audioCtx.resume()
		    }
	}
    */
   gC.fireAudio.play();
	
}

 touchMove(e){
	e.preventDefault();
	if(gC.paint){
		let coord = this.getTouchPos(gC.canvas,e)
		if(gC.brush) gC.brush.paint(coord.x,coord.y)
    }
    gC.fireAudio.play();
}

 touchDown(e){
	e.preventDefault();
    gC.paint = true;
    let coord = this.getTouchPos(gC.canvas,e)
		if(gC.brush) gC.brush.paint(coord.x,coord.y)
    /*
    if(!gC.audioCtx){
		this.createAudio().then(
			(succ)=>{
				gC.oscillatorNode.start(0);
    				gC.gainNode.gain.value = 0.1;
			}
		)
		
	}else{
		if(gC.audioCtx.state === 'suspended') {
		      gC.audioCtx.resume()
		    }
    }
    */
   gC.fireAudio.play();
	
	
}

 mouseUp(e){
	e.preventDefault();
	gC.paint = false;
	
      //gC.audioCtx.suspend();
}

 touchUp(e){
	e.preventDefault();
	gC.paint = false;
	
      //gC.audioCtx.suspend();
}

 getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		  x: evt.clientX - rect.left-(gC.spriteW/2),
		  y: evt.clientY - rect.top-(gC.spriteH/2)
	};
}

getRealMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		  x: evt.clientX - rect.left,
		  y: evt.clientY - rect.top
	};
}

 getRealTouchPos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		  x: evt.touches[0].clientX - rect.left,
		  y: evt.touches[0].clientY - rect.top
	};
}
intersects(a,b,c,d,p,q,r,s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}
drawPoint(x,y,color,r){
    let center = Math.ceil(r/2);
    this.ctx.save();
    this.ctx.fillStyle  = color;
    this.ctx.beginPath();
    this.ctx.arc(x+center, y+center, r, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.restore();
}
findIntersection(){
    if(this.numSketch>1){
        var sketches_length = this.sketches.length;
        for(var s = 0;s<sketches_length;s++){
            for(var s2 = s+1;s2<sketches_length;s2++){
                var sketch_length1 = this.sketches[s].length;
                var sketch_length2 = this.sketches[s2].length;
                for(var seg1 = 1;seg1<sketch_length1;seg1++){
                    var seg1point1 =  this.sketches[s][seg1-1];
                    var seg1point2 = this.sketches[s][seg1];
                    for(var seg2 = 1;seg2<sketch_length2;seg2++){
                        var seg2point1 =  this.sketches[s2][seg2-1];
                        var seg2point2 = this.sketches[s2][seg2];
                        var ret = this.intersects(seg1point1[0],seg1point1[1],seg1point2[0],seg1point2[1],seg2point1[0],seg2point1[1],seg2point2[0],seg2point2[1]);
                        if(ret){
                            let intersection = this.lineSegmentsIntersect(seg1point1[0],seg1point1[1],seg1point2[0],seg1point2[1],seg2point1[0],seg2point1[1],seg2point2[0],seg2point2[1]);
                            this.drawPoint(intersection.x,intersection.y,'#00FF00',4);
                        }
                    }   
                }
            }
        }
    }
}
lineSegmentsIntersect(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
/*
        // it is worth noting that this should be the same as:
        x = line2StartX + (b * (line2EndX - line2StartX));
        y = line2StartX + (b * (line2EndY - line2StartY));
        */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
}
	pad(num,length,fill){
		if(!(typeof num === 'string'))
			num = num.toString()
		let num_length = num.length;
		if(num_length < length)
			for(;num_length<length;num_length++)
				num = fill+num;
		return num;
	}
showScore(input) {
    var output = this.getEBCN('score')[0];
    output.innerHTML = '';
    input = input.toString();
	input = this.pad(input,7,0);
    for (var i = 0; i < input.length; i++) {
        var chr = input.substring(i, i + 1)
        if (chr == '£') {
            output.innerHTML += '<img border="0" height="30px" src="pound.gif">';
        } else if (chr == '.') {
            output.innerHTML += '<img border="0" height="30px" src="assets/games/layout-draft/score/score-dot.png">';
        } else {
            output.innerHTML += '<img border="0" height="30px" src="assets/games/layout-draft/score/score-'+(chr)+'.png">';
        }
    }
}

    distance(x1,y1,x2,y2){
        var a = x1 - x2;
        var b = y1 - y2;

        return Math.sqrt( a*a + b*b );
    }

    clear(){
        this.ctx.clearRect(0, 0, gC.canvas.width, gC.canvas.height);
    }

    getCtx(){
        return this.ctx;
    }
}

var Utils = new utils();

class Circle{
    constructor(ox,oy){
        this.ox = ox;
        this.oy = oy;
	    this.offsetX = 0;
	    this.offsetY = 0;
        this.ctx = Utils.getCtx();
    }
    
    draw(x,y){
           if(!isNaN(x) && !isNaN(y)){
               this.ex = x;
               this.ey = y;
           }
            this.r = Utils.distance(this.ox+this.offsetX,this.oy+this.offsetY,this.ex,this.ey);
            this.ctx.beginPath();
            this.ctx.arc(this.ox+this.offsetX,this.oy+this.offsetY,this.r, 0, 2 * Math.PI)
            this.ctx.stroke();
    }
    
    endcircle(x,y){
    }

    hit(x,y){
        var r = Utils.distance(this.ox+this.offsetX,this.oy+this.offsetY,x,y);
        if(r<=this.r) return true;
        else return false;
    }
    updatePosition(x,y){
        this.ox -= x;
        this.oy -= y;
    }
    move(x,y){
        this.ctx.beginPath();
	    this.offsetX = x;
	    this.offsetY = y;
        this.ctx.arc(this.ox-x,this.oy-y,this.r, 0, 2 * Math.PI)
        this.ctx.stroke();
    }

}
