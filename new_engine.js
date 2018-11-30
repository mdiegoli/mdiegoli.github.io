var gC = {
    width: 600,
    height: 448,
    level:'A',
    spriteH:128,
    spriteW:128,
    muberAnimationPoints: 3
};

gC.spritePosX = gC.width-gC.spriteW;
gC.spritePosY = gC.height-gC.spriteH;

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
    appendB2A(a,b){
        a.appendChild(b);
    }
    setCanvas(e){
        this.c = e;
        this.ctx = e.getContext("2d")
    }
	animation(){
		if(!this.dir)this.dir='r'
		if(this.x<gC.spritePosX && this.dir === 'r'){
			this.x++;
		}else{
			if(this.x === gC.spritePosX) this.dir = 'l';
			if(this.x>0 && this.dir === 'l'){
				this.x--;
			}else{
				this.dir = 'r';

			}	
		}
	}
    drawImages(x,y){
	    if(!this.x && !this.y){
	    	this.x = x;
		this.y = y;
	    }
	let keys = Object.keys(this.images);
        for(let i = 0,k_l = keys.length;i<k_l;i++){
		this.ctx.drawImage(this.images[keys[i]], this.x, this.y)
	}
        
    }
    loadImage(str,type){
        var me = this;
	    
		return new Promise((res,rej)=>{
		if(!this.images[type]){
		    var img = new Image(gC.spriteW,gC.spriteH);
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
class enemy{
    constructor(){
        
    }
    start(){
        var me = this;
        return new Promise((res,rej)=>{
                me.readDemonData()
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
    readDemonData(){
        var me = this;
        return new Promise(function(res,rej){
            if(!gC.demonData){
                var xmlhttp = new XMLHttpRequest();
                var url = 'assets/games/demons/demons4js.json';
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        gC.demonData = JSON.parse(this.responseText);
                        me.preload()
                        .then(
                            (succ)=>{
                                return res();
                            }
                        )
                        .catch(
                            (err)=>{
                                return rej();
                            }
                        )
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }else{
                me.preload()
                    .then(
                        (succ)=>{
                            return res();
                        }
                    )
                    .catch(
                        (err)=>{
                            return rej();
                        }
                    )
            }
            
        })
        
        
    }
    preload(){
        var preloaded = [] 
	return new Promise((res,rej)=>{
	    if(!this.LW)
            	this.LW= Utils.random(1,36).toString().padStart(2,'0');
            if(!this.RW)
            	this.RW= this.LW;
            if(!this.LB)
            	this.LB= Utils.random(1,36).toString().padStart(2,'0');
            if(!this.HE)
            	this.HE= Utils.random(1,36).toString().padStart(2,'0');
            if(!this.BO)
            	this.BO= Utils.random(1,36).toString().padStart(2,'0');
		
		
		preloaded.push(Utils.loadImage('assets/games/demons/'+gC.demonData['LW'][this.LW].img, 'LW'));
		preloaded.push(Utils.loadImage('assets/games/demons/'+gC.demonData['RW'][this.RW].img, 'RW'));
		preloaded.push(Utils.loadImage('assets/games/demons/'+gC.demonData['LB'][this.LB].img, 'LB'));
		preloaded.push(Utils.loadImage('assets/games/demons/'+gC.demonData['BO'][this.BO].img, 'BO'));
		preloaded.push(Utils.loadImage('assets/games/demons/'+gC.demonData['HE'][this.HE].img, 'HE'));

		Promise.all(preloaded)
		.then(
		    (succ)=>{
			res();
		    }
		)
		.catch(
		    (err)=>{
			rej();
		    }
		)
        })
        
    }

    create(){
        var promises = [];
        return new Promise((res,rej)=>{
            this.randomX = 0;
            this.randomY = Utils.random(1,gC.spritePosY);
            Utils.drawImages(this.randomX, this.randomY);
            res();
            
        })
        
        
    }

}
var assets = [];
function startGame(){
    var canvas = Utils.getEBTN('canvas')
	if(typeof canvas === 'object' && canvas.length <= 0){
	    //non c'è canvas
	    var a = Utils.getEBTN('body')[0]
	    var b = Utils.createE('canvas')
	    //memorizzo canvas e contesto
	    Utils.setCanvas(b)
	    Utils.appendB2A(a,b)
	Utils.setAttribute(b,'width',gC.width)
	Utils.setAttribute(b,'height',gC.height)
	}
    let a_l = assets.length;
	for(let a = 0;a<a_l;a++)
    assets[a].start()
        .then(
            (succ)=>{
                console.log(succ);
            }
        )
        .catch(
            (err)=>{
                console.log(err);
            }
        )
	window.requestAnimationFrame(startGame);
}
assets.push(new enemy());
window.requestAnimationFrame(startGame);
