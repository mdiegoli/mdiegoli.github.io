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

var utils = class{
    constructor(){}
    random(s,e){
        return Math.floor(Math.random() * (e - s + 1)) + s;
    }
}
var Utils = new utils();


    var config = {
        type: Phaser.AUTO,
        width: gC.width,
        height: gC.height,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: {
            preload: preload,
            create: create
        }
    };

    var game = new Phaser.Game(config);

function readDemonData(){
            var me = this;
            var xmlhttp = new XMLHttpRequest();
            var url = 'assets/games/demons/demons4js.json';
             xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    me.demonData = JSON.parse(this.responseText);
                    me.preload();
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
            
        }
function preload(){
            this.aliens;
            this.load.json('demons4js.json', 'assets/games/demons/demons4js.json');
            var demonData = this.cache.getJSON('demons4js.json');
            
            
            var me = this;
                
            this.LW= Utils.random(1,36).toString().padStart(2,'0');
            this.RW= this.LW;
            this.LB= Utils.random(1,36).toString().padStart(2,'0');
            this.HE= Utils.random(1,36).toString().padStart(2,'0');
            this.BO= Utils.random(1,36).toString().padStart(2,'0');
            this.load.image('invaderLW', 'assets/games/demons/'+me.demonData['LW'][this.LW].img, gC.spriteW, gC.spriteH);
            this.load.image('invaderRW', 'assets/games/demons/'+me.demonData['RW'][this.RW].img, gC.spriteW, gC.spriteH);
            this.load.image('invaderLB', 'assets/games/demons/'+me.demonData['LB'][this.LB].img, gC.spriteW, gC.spriteH);
            this.load.image('invaderBO', 'assets/games/demons/'+me.demonData['BO'][this.BO].img, gC.spriteW, gC.spriteH);
            this.load.image('invaderHE', 'assets/games/demons/'+me.demonData['HE'][this.HE].img, gC.spriteW, gC.spriteH);
     }
    
function create(){
        this.aliens = game.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
        this.randomX = 0;//Utils.random(1,gC.spritePosX);
        this.randomY = Utils.random(1,gC.spritePosY);
        //nome immagine personalizzato
        //game.load.image('invaderLW', 'assets/games/demons/dem_'+gC.level+'_LW_1_'+this.demonData[gC.level]['layers'].LW.padStart(2,0)+'.png', 128, 128);
        //console.log('assets/games/demons/dem_'+gC.level+'_LW_1_'+this.demonData[gC.level]['layers'].LW.padStart(2,0)+'.png')
        let alienlw = this.aliens.create(this.randomX, this.randomY, 'invaderLW');
        alienlw.anchor.setTo(0.5, 0.5);
        //game.load.image('invaderRW', 'assets/games/demons/dem_'+gC.level+'_RW_1_'+this.demonData[gC.level]['layers'].RW.padStart(2,0)+'.png', 128, 128);
        //console.log('assets/games/demons/dem_'+gC.level+'_RW_1_'+this.demonData[gC.level]['layers'].RW.padStart(2,0)+'.png')
        let alienrw = this.aliens.create(this.randomX, this.randomY, 'invaderRW');
        alienrw.anchor.setTo(0.5, 0.5);
        //game.load.image('invaderLB', 'assets/games/demons/dem_'+gC.level+'_LB_2_'+this.demonData[gC.level]['layers'].LB.padStart(2,0)+'.png', 128, 128);
        //console.log('assets/games/demons/dem_'+gC.level+'_LB_1_'+this.demonData[gC.level]['layers'].LB.padStart(2,0)+'.png')
        let alienlb = this.aliens.create(this.randomX, this.randomY, 'invaderLB');
        alienlb.anchor.setTo(0.5, 0.5);
        //game.load.image('invaderBO', 'assets/games/demons/dem_'+gC.level+'_BO_3_'+this.demonData[gC.level]['layers'].BO.padStart(2,0)+'.png', 128, 128);
        //console.log('assets/games/demons/dem_'+gC.level+'_BO_1_'+this.demonData[gC.level]['layers'].BO.padStart(2,0)+'.png')
        let alienbo = this.aliens.create(this.randomX, this.randomY, 'invaderBO');
        alienbo.anchor.setTo(0.5, 0.5);
        //game.load.image('invaderHE', 'assets/games/demons/dem_'+gC.level+'_HE_4_'+this.demonData[gC.level]['layers'].HE.padStart(2,0)+'.png', 128, 128);
        //console.log('assets/games/demons/dem_'+gC.level+'_HE_1_'+this.demonData[gC.level]['layers'].HE.padStart(2,0)+'.png')
        let alienhe = this.aliens.create(this.randomX, this.randomY, 'invaderHE');
        alienhe.anchor.setTo(0.5, 0.5);
    }
