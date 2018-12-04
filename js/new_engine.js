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
    var i_l = 0;
    if(t%3)
        assets.push(new enemy(levels[++i_l%3]));

        
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
        }
        res();
    })
}
//every frame value, draw scene
function l(){
    var demoClock = 0;
    addCanvas().then(
        (succ)=>{
            readDemonData().then(
                (succ) => {
                    gC.l_i = setInterval(function() {
                        demoClock++;
                        addDemoAssets(demoClock);
                        startGame()
                    }, gC.fr);
                }
            )
        }
    )
    
    
}

