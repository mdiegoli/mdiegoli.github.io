//import { gC } from "./conf.js";
//import { Utils } from "./utils.js";
//import { enemy } from "./enemy.js";

var assets = [];

function startGame(){
    
	Utils.clearCanvas()
    let a_l = assets.length;
	for(let a = 0;a<a_l;a++)
    assets[a].start()
        .then(
            (succ)=>{
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
            }
        )
        .catch(
            (err)=>{
                console.log(err);
            }
        )
}

function addDemoAssets(t){
    var levels = ['A','B','C'];
    assets.push(new enemy(levels[t%3]));

        
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
            var a = Utils.getEBI('canvases')
            Utils.setAttribute(a,'style','width:'+window.innerWidth+';height:'+window.innerHeight)
            var b = Utils.createE('canvas')
            var b2 = Utils.createE('canvas')
            //memorizzo canvas e contesto
            Utils.setCanvas(b)
            Utils.setCanvas2(b2)
            Utils.appendB2A(a,b)
            Utils.appendB2A(a,b2)
            
        gC.canvas = b;
        gC.canvas2 = b2;
            Utils.setAttribute(b,'width',window.innerWidth)
            Utils.setAttribute(b,'height',window.innerHeight)
            Utils.setAttribute(b,'style','z-index: -10;position:absolute')
            Utils.setAttribute(b2,'width',window.innerWidth)
            Utils.setAttribute(b2,'height',window.innerHeight)
            Utils.setAttribute(b2,'style','z-index: -1;position:absolute;pointer-events:none')
            
		a.addEventListener('mousedown',Utils.mouseDown)
		a.addEventListener('mouseup',Utils.mouseUp)
		a.addEventListener('mousemove',Utils.mouseMove)
		a.addEventListener('touchstart',Utils.touchDown)
		a.addEventListener('touchend',Utils.touchUp)
		a.addEventListener('touchmove',Utils.touchMove)
        document.addEventListener('keydown',Utils.selectDemon)
        Utils.setRandomData()
		let type = gC.demonType?gC.demonType:'';
    let filter = gC.canvasFilter?gC.canvasFilter:'';
    Utils.writeOnSecondCanvas('demon type: '+type+', filter: '+filter,10,20)
	
        }
        res();
    })
}
//every frame value, draw scene
function l(){
    var demoClock = 0;
	readDemonData()
		.then(
			(succ)=>{
				addCanvas().then(
					(succ)=>{
					    console.log('start!');
					}
				    ).catch(
					(err) => {
						console.log(err);
					}
				    )			
			}
		)
		.catch(
		
			(err) => {
				console.log(err);
			}
		)
    
}



