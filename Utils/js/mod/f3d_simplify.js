import * as THREE from './three.module.js';

//https://stackoverflow.com/questions/27409074/converting-3d-position-to-2d-screen-position-r69
function toScreenXY(obj,cam){

    var vector = new THREE.Vector3();

    var widthHalf = 0.5*renderer.context.canvas.width;
    var heightHalf = 0.5*renderer.context.canvas.height;

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    if(this) vector.project(this.camera);
    else vector.project(cam);

    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;

    return { 
        x: vector.x,
        y: vector.y
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
