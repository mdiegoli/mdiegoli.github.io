//import { gC } from "./conf.js";
//import { Utils } from "./utils.js";
//import { enemy } from "./enemy.js";

var assets = [];

function startGame(){
    
	Utils.showScore(gC.score)
    let a_l = assets.length;
    gC.demonBulletFrame%=gC.demonBulletInterval;

    if(!gC.demonBulletFrame) var demonFire = true;

    gC.demonBulletFrame++;
    if(gC.demonsCountdown){
        for(let a = 0;a<a_l;a++){
            if(!assets[a].end){
                if(assets[a] instanceof enemy && demonFire){
                     assets.push(assets[a].fire('bd_a','d'))
                     demonFire = false;
                }
                assets[a].start()
                .then(
                    (succ)=>{
                    if(assets[a].animation)
                        assets[a].animation(assets[a].getPosX(),assets[a].getPosY())
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
                    //else
                    //    console.log('asset senza animazione')
                    }
                )
                .catch(
                    (err)=>{
                    console.log(err);
                    }
                )
            }
            if(a==(a_l-1)){
                
                /*
                for(let e = 0;e<a_l;e++){
                    if(assets[e].end)
                        assets.splice(e,1);
                }
                */    
                //Utils.c2osc();
                Utils.c2c();
                requestAnimationFrame(this.gAF)
            }
        }
    }else{
        gC.gameLevel++;
        gC.numbOfDemons--;
        showSplashLevel().then(
            (succ)=>{
                l()
            }
        )
    }
	
}

function addDemoAssets(c,n){
    return new Promise(function(res,rej){
	    //ToDo:finish line of enemies
	    var totFreeSpaceFromEnemies, freeSpaceBetweenEnemies;
	    if(n){
            gC.demonsCountdown = n;
            let spritesTotWidth = gC.spriteW * n;
            if(spritesTotWidth<gC.width){
                totFreeSpaceFromEnemies = gC.width - spritesTotWidth;
                freeSpaceBetweenEnemies = Math.round(totFreeSpaceFromEnemies / (n + 1));
                let spriteXPos = 0;
                function addAllDemons(spr){
                    var e = new enemy(c,freeSpaceBetweenEnemies+spriteXPos,freeSpaceBetweenEnemies);
                    spriteXPos += freeSpaceBetweenEnemies + gC.spriteW;
                    e.preload().then(
                        (succ) => {
                            assets.push(e);
                            if(spr<n-1) return addAllDemons(spr+1)
                            else return res()
                        }
                    )
                }
                return addAllDemons(0)
            }
	    }else{
            var e = new enemy(c);
            e.preload().then(
                (succ) => {
                    assets.push(e);
                    res();
                }
            )
        }
        
    })
    
        
}

function addHero(l){
    return new Promise(function(res,rej){
    
        gC.player = new hero(l);
        gC.player.preload().then(
            (succ) => {
                assets.push(gC.player);
                res();
            }
        )
    })
        
}

function showSplash(){
    return new Promise(function(res,rej){
    
        let splasho = new splash();
        splasho.preload().then(
            (succ) => {
                splasho.create().then(
                    (succ) => {
                        res();
                    }
                )
            }
        )
    })
        
}

function showSplashEnd(){
    return new Promise(function(res,rej){
    
        let splasho = new splash('Game Over: Press s to restart');
        splasho.preload().then(
            (succ) => {
                splasho.create().then(
                    (succ) => {
                        res();
                    }
                )
            }
        )
    })
        
}

function showSplashLevel(){
    return new Promise(function(res,rej){
    
        let splasho = new splash('Next Level: '+gC.gameLevelChar[gC.gameLevel-1]);
        splasho.preload().then(
            (succ) => {
        splasho.createLevel().then(
                    (succ) => {
                        res();
                    }
                )
                })
    })
        
}

function addBullet(l){
    return new Promise(function(res,rej){
    
        gC.bullet = new bullet(l);
        gC.bullet.preload().then(
            (succ) => {
                res();
            }
        )
    })
        
}

function addBulletD(l){
    return new Promise(function(res,rej){
    
        gC.bulletD = new bulletD(l);
        gC.bulletD.preload().then(
            (succ) => {
                res();
            }
        )
    })
        
}

function addExplosion(l){
    return new Promise(function(res,rej){
    
        gC.explosion = new explosion(l);
        gC.explosion.preload().then(
            (succ) => {
                res();
            }
        )
    })
        
}

function addBack(l){
    return new Promise(function(res,rej){
    
        gC.back = new back(l);
        gC.back.preload().then(
            (succ) => {
                assets.push(gC.back);
                res();
            }
        )
    })
        
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

function readShipData(){
    var me = this;
    return new Promise(function(res,rej){
        if(!gC.shipData){
            var xmlhttp = new XMLHttpRequest();
            var url = 'assets/games/demonship/demonship/demonship4js.json';
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    gC.shipData = JSON.parse(this.responseText);
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

function readBackData(){
    var me = this;
    return new Promise(function(res,rej){
        if(!gC.demonBack){
            var xmlhttp = new XMLHttpRequest();
            var url = 'assets/games/demonback/demonback4js.json';
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    gC.demonBack = JSON.parse(this.responseText);
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
            //var a = Utils.getEBTN('body')[0]
            var a = Utils.getEBI('box');
            var b = Utils.createE('canvas');
            //memorizzo canvas e contesto
            Utils.setCanvas(b)
            
	    //Utils.setOffScreen(b)
            Utils.appendB2A(a,b)
            Utils.setAttribute(b,'width',gC.width)
            Utils.setAttribute(b,'height',gC.height)
            document.addEventListener('keydown',(e)=>{
                switch(e.keyCode){
                    case 37:
                        gC.player.leftDown();
                        break;
                    case 39:
                        gC.player.rightDown();
                        break;
                    case 32:
                        assets.push(gC.player.fire('b_a','u'));
                        
                        break;
                }
            })
		
	    document.addEventListener('keyup',(e)=>{
                switch(e.keyCode){
                    case 37:
                        gC.player.leftUp();
                        break;
                    case 39:
                        gC.player.rightUp();
                        break;
                    case 32:
                        //assets.push(gC.player.fire('b_a'));
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
    
    startGame()
}

function s(){
    gC.demoClock = 0;
    gC.numbOfDemons = 5;
    gC.gameLevel = 1;
    gC.demonBulletInterval = 100;
    gC.demonBulletFrame = 1;
    gC.gameLevelChar = 'abcdefghijklmnopqrstuvwxyz';
    addCanvas().then(
        (succ)=>{
            showSplash().then(
                (succ)=>{
                    l()
                }
            )
        }
        
    )
}

function loadMp3(){
    return new Promise(function(res,rej){
        gC.fireAudio = new Audio('assets/games/audio/Shoot001.mp3');
        gC.explosionAudio1 = new Audio('assets/games/audio/Explosion001.mp3');
        gC.explosionAudio2 = new Audio('assets/games/audio/Explosion002.mp3');
        res();
    })
}
//every frame value, draw scene
function l(){
    
    var levelChar = gC.gameLevelChar[gC.gameLevel-1];
    assets.length = 0;
    if(gC.numbOfDemons){
        readBackData().then(
            (succ)=>{
                readDemonData().then(
                    (succ) => {
                        readShipData().then(
                            (succ) => {
                                addBack('k_'+levelChar).then(
                                    (succ) => {
                                        addHero('h_'+levelChar).then(
                                            (succ) => {
                                                addDemoAssets('e_'+levelChar,gC.numbOfDemons).then(
                                                    
                                                    (succ) => {
                                                        loadMp3().then(
                                                    
                                                            (succ) => {
                                                                addBullet('b_'+levelChar).then(
                                                    
                                                                    (succ) => {
                                                                        addExplosion('x_'+levelChar).then(
                                                    
                                                                            (succ) => {
                                                                                addBulletD('bd_'+levelChar).then(
                                                    
                                                                                    (succ) => {
                                                                                        requestAnimationFrame(gAF);
                                                                                        
                                                                                    }
                                                                                )
                                                                                
                                                                            }
                                                                        )
                                                                        
                                                                    }
                                                                )
                                                                
                                                            }
                                                        )
                                                    }
                                                )
                                            }
                                        )
                                    }
                                )                                    
                            }
                        )
                    }
                )
            }
        )
    }else{
        this.showSplashEnd().then(
            (succ)=>{
                gC.numbOfDemons = 5;
                gC.gameLevel = 1;
                l()
            }
        );
    }
    
    
    //    }
    //)
    
    
}

