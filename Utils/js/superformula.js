class superformulaobj{
    constructor(m,n1,n2,n3,a,b,i,x,y,numberOfP){
        this.numberOfPoints = numberOfP;
        this.m = m;
        this.n1 = n1;
        this.n2 = n2;
        this.n3 = n3;
        this.a = a;
        this.b = b;
        this.i = i;
        this.x = x;
        this.y = y;
    }
    create(){
        return new Promise((res,rej)=>{

        
        this.renderFormula(this.m,this.n1,this.n2,this.n3,this.a,this.b,this.i,this.x,this.y).then(
            ()=>{
              this.drawFormula(this.m,this.n1,this.n2,this.n3,this.a,this.b).then(
                (vec)=>{
                  res(vec)
                }
              )
            }
          )
        })
    }

    
    superformula(phi,a,b,m,n1,n2,n3) {
      return Math.pow( Math.pow( Math.abs( Math.cos(m * phi / 4) / a ), n2 ) + Math.pow( Math.abs( Math.sin(m * phi / 4) / b ), n3 ), -1 / n1 );
    }
    
    getCenterAndRadius(){
      let MX = this.maxX - this.offsetX - this.oldoffsetX;
      let mx = this.minX - this.offsetX - this.oldoffsetX;
      let MY = this.maxY - this.offsetY - this.oldoffsetY;
      let my = this.minY - this.offsetY - this.oldoffsetY;
      let c_r = (MX-mx)/2;
      let c_x = mx + (c_r);
      let c_y = my + ((MY-my)/2);
      return {x:c_x,y:c_y,r:c_r};
    }
    
    close(i){
      this.shapeindex = i;
    }
    
    drawFormula(m,n1,n2,n3,a,b) {
      return new Promise((res,rej)=>{

      
      //context.beginPath();
      var points_length = this.points.length;
      let str_path = '';
      if(!isFinite(this.offsetX) && !isFinite(this.oldoffsetX) && !isFinite(this.offsetY) && !isFinite(this.oldoffsetY)){
        this.offsetX = 0;
        this.oldoffsetX = 0;
        this.offsetY = 0;
        this.oldoffsetY = 0;      
      }
	  var ret_points = [];
      //creare una struttura dati che contiene informazioni sui lati del link, se c'è curva o no, memorizzare i punti della curva se si estende per più segmenti
      for (let index = 0; index < this.numberOfPoints; index++) {
			var x,y;
			//points[index]._x += offsetX;
			x = this.points[index]._x - this.offsetX - this.oldoffsetX;
			//points[index]._y += offsetY;
			y = this.points[index]._y - this.offsetY - this.oldoffsetY;
			if(!isFinite(x) && !isFinite(y)){
			x = 0;
			y = 0;
		}
		  if (index === 0) {
			//context.moveTo(x,y);
			str_path += 'M'+x+' '+y+' ';
		  } else {
			//context.lineTo(x,y);
			str_path += 'L'+x+' '+y+' ';
		  }
		  ret_points.push({x:x,y:y});
        
      }
      //context.closePath();
      //context.lineWidth = lineWidth;
      str_path += 'Z';
      let stroke_color = '';
      if(this.select){
        //rc.rectangle(this.minX - this.offsetX - this.oldoffsetX, this.minY - this.offsetY - this.oldoffsetY, this.maxX - this.minX, this.maxY - this.minY, { stroke: selected_color, strokeWidth: 1 });
        //context.rect(minX - offsetX - oldoffsetX, minY - offsetY - oldoffsetY, maxX - minX, maxY - minY);
        //stroke_color = selected_color;
      }else{
        //stroke_color = color;
      }
      //context.stroke();
      //rc.path(str_path, { stroke: stroke_color,fill: stroke_color, fillStyle: 'zigzag' });
    return res(ret_points);
      })
    }
    superformula(phi,a,b,m,n1,n2,n3) {
        return Math.pow( Math.pow( Math.abs( Math.cos(m * phi / 4) / a ), n2 ) + Math.pow( Math.abs( Math.sin(m * phi / 4) / b ), n3 ), -1 / n1 );
    }
    renderFormula(m,n1,n2,n3,a,b,i,x_par,y_par) {
      return new Promise((res,rej)=>{

      
      this.m = m;
      this.n1 = n1;
      this.n2 = n2;
      this.n3 = n3;
      this.a = a;
      this.b = b;
      this.points = [];
      if(isFinite(i))
        this.shapeindex = i;
      if(isFinite(x_par))
        this.moveX = x_par;
      if(isFinite(y_par))
        this.moveY = y_par;
      
      
      for (let index = 0; index < this.numberOfPoints; index++) {
        var x,y;
        
        const radius = this.superformula(index / this.numberOfPoints * Math.PI * 2,a,b,m,n1,n2,n3);
        x = Math.cos(index / this.numberOfPoints * Math.PI * 2) * radius;
        y = Math.sin(index / this.numberOfPoints * Math.PI * 2) * radius;
        
        if(index===0){
          this.minX=x;
          this.maxX=x;
          this.minY=y;
          this.maxY=y;
        }else{
          if(x<this.minX)
            this.minX=x;
          if(x>this.maxX)
            this.maxX=x;
          if(y<this.minY)
            this.minY=y;
          if(y>this.maxY)
            this.maxY=y;
        }
        function toFixed(n,mul,off){
          return Math.round((n.toFixed(2)*mul)+off);
        }
        this.points.push({_x:toFixed(x,100,this.moveX),_y:toFixed(y,20,this.moveY)});
        if(index==this.numberOfPoints-1)res();
      }
      })
    }
  }