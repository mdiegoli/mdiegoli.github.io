import * as THREE from './three.module.js';

//https://stackoverflow.com/questions/11586527/converting-world-coordinates-to-screen-coordinates-in-three-js-using-projection
function toScreenXY(obj,cam){
    var width = window.innerWidth, height = window.innerHeight;
    var widthHalf = width / 2, heightHalf = height / 2;

    var pos = obj.position.clone();
    if(this){
        camera.updateMatrixWorld();
        pos.project(camera);
    }else{
        cam.updateMatrixWorld();
        pos.project(cam);
    }
    pos.x = ( pos.x * widthHalf ) + widthHalf;
    pos.y = - ( pos.y * heightHalf ) + heightHalf;
    return { 
        x: pos.x,
        y: pos.y
    };
  
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
