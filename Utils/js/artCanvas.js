'use strict';

class artCanvas{
  constructor(){
    var canvas = Utils.getEBTN('canvas')
    if(typeof canvas === 'object' && canvas.length <= 0){
        //non c'è canvas
        var a = Utils.getEBTN('body')[0]
        var b = Utils.createE('canvas')
        //memorizzo canvas e contesto
        Utils.setCanvas(b)
        Utils.appendB2A(a,b)
      Utils.setSketchBlur();
        gC.canvas = b;
        Utils.setAttribute(b,'width',window.innerWidth)
        Utils.setAttribute(b,'height',window.innerHeight)
        Utils.setAttribute(b,'style','touch-action:none')

    }
  }
}
