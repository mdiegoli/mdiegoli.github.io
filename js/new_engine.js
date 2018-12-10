//import { gC } from "./conf.js";
//import { Utils } from "./utils.js";
//import { enemy } from "./enemy.js";

var assets = [];

function startGame(){
    
	
    	let a_l = assets.length;
	for(let a = 0;a<a_l;a++){
	    assets[a].start()
		.then(
		    (succ)=>{
			if(assets[a].animation)
			    assets[a].animation()
				.then(
				    (succ)=>{
				    //console.log(succ);
				    }
				)
				.catch(
				    (err)=>{
				    console.log(err);
				    }
				)
			else
			    console.log('asset senza animazione')
		    }
		)
		.catch(
		    (err)=>{
			console.log(err);
		    }
		)
        if(a==(a_l-1)){
        
        Utils.c2c();
        requestAnimationFrame(this.gAF)
        }
	}
}

function addDemoAssets(){
    var levels = ['A','B','C'];
    assets.push(new enemy(levels[gC.demoClock%3]));
    gC.demoClock++;

        
}

function addHero(){
    gC.player = new hero();
    assets.push(gC.player);

        
}

function readDemonData(){
    var me = this;
    return new Promise(function(res,rej){
        if(!gC.demonData){
            var xmlhttp = new XMLHttpRequest();
            var url = 'assets/games/demons/demons4js.json';
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    gC.demonData = JSON.parse(this.responseText);
                    return res();
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }else{
            return res();
        }
    })
    
    
}
function addCanvas(){
    var me = this;
    return new Promise(function(res,rej){
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
            document.addEventListener('keydown',(e)=>{
                switch(e.keyCode){
                    case 37:
                        gC.player.left();
                        break;
                    case 39:
                        gC.player.right();
                        break;
                    case 32:
                        assets.push(gC.player.fire('a'));
                        break;
                }
            })
        }
        res();
    })
}

function gAF(c){
    gC.demoClock++;
    Utils.clearCanvas();
    addDemoAssets();
    startGame()
}

//every frame value, draw scene
function l(){
    gC.demoClock = 0;
    addCanvas().then(
        (succ)=>{
            readDemonData().then(
                (succ) => {
			        addHero();
                    requestAnimationFrame(gAF);
                    
                }
            )
        }
    )
    
    
}

