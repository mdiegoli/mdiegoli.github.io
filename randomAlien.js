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

var config = {
    type: Phaser.AUTO,
    width: gC.width,
    height: gC.height,
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);
var dem;

var utils = class{
    constructor(){}
    random(s,e){
        return Math.floor(Math.random() * (e - s + 1)) + s;
    }
}

var Utils = new utils();


function preload() {
    this.aliens;
        var me = this;
        if(!me.demonData){
            var xmlhttp = new XMLHttpRequest();
            var url = 'assets/games/demons/demons4js.json';

            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    me.demonData = JSON.parse(this.responseText);
                    loadImages(this);
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
            
        }else{
            loadImages(this);
        }
        
    }
function loadImages(me){
            
        let LW= Utils.random(1,36).toString().padStart(2,'0');
        let RW= LW;
        let LB= Utils.random(1,36).toString().padStart(2,'0');
        let HE= Utils.random(1,36).toString().padStart(2,'0');
        let BO= Utils.random(1,36).toString().padStart(2,'0');


        me.load.image('invaderLW', 'assets/games/demons/'+me.demonData['LW'][LW].img, gC.spriteW, gC.spriteH);
        me.load.image('invaderRW', 'assets/games/demons/'+me.demonData['RW'][RW].img, gC.spriteW, gC.spriteH);
        me.load.image('invaderLB', 'assets/games/demons/'+me.demonData['LB'][LB].img, gC.spriteW, gC.spriteH);
        me.load.image('invaderBO', 'assets/games/demons/'+me.demonData['BO'][BO].img, gC.spriteW, gC.spriteH);
        me.load.image('invaderHE', 'assets/games/demons/'+me.demonData['HE'][HE].img, gC.spriteW, gC.spriteH);
        
    }



    function create(){
        this.aliens = this.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
        this.randomX = 0;//Utils.random(1,gC.spritePosX);
        this.randomY = Utils.random(1,gC.spritePosY);
        //nome immagine personalizzato
        //game.load.image('invaderLW', 'assets/games/demons/dem_'+gC.level+'_LW_1_'+this.demonData[gC.level]['layers'].LW.padStart(2,0)+'.png', 128, 128);
        //console.log('assets/games/demons/dem_'+gC.level+'_LW_1_'+this.demonData[gC.level]['layers'].LW.padStart(2,0)+'.png')
        let alienlw = this.aliens.create(this.randomX, this.randomY, 'invaderLW');
        //alienlw.anchor.setTo(0.5, 0.5);
        //game.load.image('invaderRW', 'assets/games/demons/dem_'+gC.level+'_RW_1_'+this.demonData[gC.level]['layers'].RW.padStart(2,0)+'.png', 128, 128);
        //console.log('assets/games/demons/dem_'+gC.level+'_RW_1_'+this.demonData[gC.level]['layers'].RW.padStart(2,0)+'.png')
        let alienrw = this.aliens.create(this.randomX, this.randomY, 'invaderRW');
        //alienrw.anchor.setTo(0.5, 0.5);
        //game.load.image('invaderLB', 'assets/games/demons/dem_'+gC.level+'_LB_2_'+this.demonData[gC.level]['layers'].LB.padStart(2,0)+'.png', 128, 128);
        //console.log('assets/games/demons/dem_'+gC.level+'_LB_1_'+this.demonData[gC.level]['layers'].LB.padStart(2,0)+'.png')
        let alienlb = this.aliens.create(this.randomX, this.randomY, 'invaderLB');
        //alienlb.anchor.setTo(0.5, 0.5);
        //game.load.image('invaderBO', 'assets/games/demons/dem_'+gC.level+'_BO_3_'+this.demonData[gC.level]['layers'].BO.padStart(2,0)+'.png', 128, 128);
        //console.log('assets/games/demons/dem_'+gC.level+'_BO_1_'+this.demonData[gC.level]['layers'].BO.padStart(2,0)+'.png')
        let alienbo = this.aliens.create(this.randomX, this.randomY, 'invaderBO');
        //alienbo.anchor.setTo(0.5, 0.5);
        //game.load.image('invaderHE', 'assets/games/demons/dem_'+gC.level+'_HE_4_'+this.demonData[gC.level]['layers'].HE.padStart(2,0)+'.png', 128, 128);
        //console.log('assets/games/demons/dem_'+gC.level+'_HE_1_'+this.demonData[gC.level]['layers'].HE.padStart(2,0)+'.png')
        let alienhe = this.aliens.create(this.randomX, this.randomY, 'invaderHE');
        //alienhe.anchor.setTo(0.5, 0.5);
        
        //this.tween(this.LW)
    }
    function tween(id){
        //https://phaser.io/docs/2.4.4/Phaser.Tween.html#to
        //to(properties, duration, ease, autoStart, delay, repeat, yoyo)
        /*
        let animPoints = {x:[],y:[]};
        for(let a = 1;a<=gC.muberAnimationPoints;a++){
            animPoints.x.push(this.randomX);
            this.randomY+=10;
            animPoints.y.push(this.randomY);
            
        }
        var tween = game.add.tween(this.aliens).to( animPoints, 3000, "Linear");
        */
        var tween = this.add.tween(this.aliens).to( { x: gC.width }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        //tween.start();
    }
var aliens;
function createAliens () {

    //random demon creator from game difficult level
    //...
    //test
    
    /*
    var alienlw = aliens.create(200, 200, 'invaderLW');
    alienlw.anchor.setTo(0.5, 0.5);
    alienlw.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
    alienlw.play('fly');
    alienlw.body.moves = false;
    var alienrw = aliens.create(200, 200, 'invaderRW');
    alienrw.anchor.setTo(0.5, 0.5);
    alienrw.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
    alienrw.play('fly');
    alienrw.body.moves = false;
    var alienlb = aliens.create(200, 200, 'invaderLB');
    alienlb.anchor.setTo(0.5, 0.5);
    alienlb.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
    alienlb.play('fly');
    alienlb.body.moves = false;
    var alienbo = aliens.create(200, 200, 'invaderBO');
    alienbo.anchor.setTo(0.5, 0.5);
    alienbo.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
    alienbo.play('fly');
    alienbo.body.moves = false;
    var alienhe = aliens.create(200, 200, 'invaderHE');
    alienhe.anchor.setTo(0.5, 0.5);
    alienhe.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
    alienhe.play('fly');
    alienhe.body.moves = false;
    
    aliens.x = 100;
    aliens.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(aliens).to( { x: 150 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween loops it calls descend
    tween.onLoop.add(descend, this);
    */
}

function setupInvader (invader) {


}

function descend() {

    aliens.y += 10;

}

function update() {


}

function render() {


}

function collisionHandler (bullet, alien) {


}

function enemyHitsPlayer (player,bullet) {
    

}

function enemyFires () {

    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length=0;

    aliens.forEachAlive(function(alien){

        // put every living enemy in an array
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {
        
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,player,120);
        firingTimer = game.time.now + 2000;
    }

}

function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }

}

function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}

function restart () {

    

}
