var artool = class {
  contructor(){
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
	    gC.canvas = b;
            Utils.setAttribute(b,'width',window.innerWidth)
            Utils.setAttribute(b,'height',window.innerHeight)
            Utils.setAttribute(b,'style','touch-action:none')
		a.addEventListener('mousedown',onMouseDown)
		a.addEventListener('mouseup',onMouseUp)
		a.addEventListener('mousemove',onMouseMove)
		a.addEventListener('touchstart',onTouchStart)
		a.addEventListener('touchend',onTouchEnd)
		a.addEventListener('touchmove',onTouchMove)
        }
        res();
    })
  }
  
  onMouseDown(){}
  onMouseUp(){}
  onMouseMove(){}
  onTouchStart(){}
  onTouchEnd(){}
  onTouchMove(){}
  
  getMouseCoord(e){}
  getTouchCoord(e){}
}
