import * as THREE from './three.module.js';

//https://stackoverflow.com/questions/11586527/converting-world-coordinates-to-screen-coordinates-in-three-js-using-projection
  function toScreenXY(obj,cam){

    var vector = obj.clone();
    var windowWidth = window.innerWidth;
    var minWidth = 1280;
  
    if(windowWidth < minWidth) {
      windowWidth = minWidth;
    }
  
    var widthHalf = (windowWidth/2);
    var heightHalf = (window.innerHeight/2);
  
    if(this) vector.project(this.camera);
    else vector.project(cam);
  
    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;
    vector.z = 0;
  
    return vector;
  
  }
//https://gist.github.com/conorbuck/2606166
//var p1 = {
//	x: 20,
//	y: 20
//};

//var p2 = {
//	x: 40,
//	y: 40
//};

// angle in radians
//var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

function degreesBetweenTwoPoints(p1,p2){
            return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
}

export { toScreenXY, degreesBetweenTwoPoints };
