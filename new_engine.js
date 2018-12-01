//import { gC } from "./conf.js";
//import { Utils } from "./utils.js";
//import { enemy } from "./enemy.js";

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
	Utils.clearCanvas()
    let a_l = assets.length;
	for(let a = 0;a<a_l;a++)
    assets[a].start()
        .then(
            (succ)=>{
                assets[a].animation()
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
            }
        )
        .catch(
            (err)=>{
                console.log(err);
            }
        )
}

assets.push(new enemy());
assets.push(new enemy());

//every frame value, draw scene
function l(){
    l_i = setInterval(function() {
        startGame()
    }, gC.fr);
}

l();
