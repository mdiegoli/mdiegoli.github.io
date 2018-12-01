class enemy{
    constructor(){
        
    }
	animation(){
		return new Promise((res,rej)=>{
			if(!this.dir)this.dir='r'
			
			if(this.randomX<gC.spritePosX && this.dir === 'r'){
				this.randomX++;
			}else{
				if(this.randomX === gC.spritePosX) this.dir = 'l';
				if(this.randomX>0 && this.dir === 'l'){
					this.randomX--;
				}else{
					this.dir = 'r';

				}	
			}
			res();
		})
		
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
        return new Promise((res,rej)=>{
            if(this.dead === undefined){
                this.dead = false;
                this.randomX = 0;
                this.randomY = Utils.random(1,gC.spritePosY);
                
            }else{
                if(this.dead){
                    alert('enemy dead')
                }
            }
            Utils.drawImages(this.randomX, this.randomY);
            res();
            
        })
        
        
    }

}

//export { enemy };