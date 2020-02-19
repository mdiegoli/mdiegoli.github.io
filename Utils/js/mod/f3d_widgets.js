import { GLTFExporter } from './GLTFExporter.js';
var superWidget = class{
	constructor(obj,fn){
		window[fn] = this.win_cb;
		window['touch'+fn] = this.win_touchcb;
	}

	win_cb(e,fn){
		e.stopPropagation();
		window.f3d[fn](fn);
	}

	win_touchcb(e,fn){
		e.stopPropagation();
		e.preventDefault();
		//sigle touch event (and mouse event)
		if(window.f3d.isTouched == false){
			console.log('touchBody');
			window.f3d.isTouched = true;
			window.f3d[fn](fn);
		}
	}
}
var superButtonWidget = class extends superWidget{
	constructor(obj,fn){
		super(obj,fn);
		document.getElementById('toolbar').innerHTML += `
			<div id="${fn}" class="barButton" onmousedown="${fn}(event,'${fn}')" onmousemove="event.stopPropagation()" onmouseup="event.stopPropagation()" ontouchstart="touch${fn}(event,'${fn}')" ontouchmove="event.stopPropagation()" ontouchend="event.stopPropagation();endTouch();">
			${fn}
			</div>`;
		//usare le api dom per registrare gli eventi
		obj[fn] = this.obj_cb;
		
	}

	win_cb(e,fn){
		e.stopPropagation();
		window.f3d[fn](fn);
	}

	win_touchcb(e,fn){
		e.stopPropagation();
		e.preventDefault();
		//sigle touch event (and mouse event)
		if(window.f3d.isTouched == false){
			console.log('touchBody');
			window.f3d.isTouched = true;
			window.f3d[fn](fn);
		}
	}

}

var superNumericWidget = class extends superWidget{
	constructor(obj,fn){
		super(obj,fn);
		document.getElementById('toolbar').innerHTML += `
		<div>
			<div class="barLabel">
			${fn}
			</div> 
			<div class="barButton" onmousedown="decrease${fn}_fn(event,'${fn}')" onmousemove="event.stopPropagation()" onmouseup="event.stopPropagation()"  ontouchstart="decrease${fn}_fn(event,'${fn}')" ontouchmove="event.stopPropagation()" ontouchend="event.stopPropagation();">
				-
			</div>
			<div id="sphereScale" class="barButton">
			`+obj.sphereScale+`
			</div>
			<div class="barButton" onmousedown="increase${fn}_fn(event,'${fn}')" onmousemove="event.stopPropagation()" onmouseup="event.stopPropagation()"  ontouchstart="increase${fn}_fn(event,'${fn}')" ontouchmove="event.stopPropagation()" ontouchend="event.stopPropagation();">
				+
			</div>
		</div>`;
		//usare le api dom per registrare gli eventi
		obj['increase'+fn+'_fn'] = this.obj_increase_cb;
		window['increase'+fn+'_fn'] = this.win_increase_cb;
		obj['decrease'+fn+'_fn'] = this.obj_decrease_cb;
		obj['update'+fn+'_fn'] = this.obj_update_cb;
		window['decrease'+fn+'_fn'] = this.win_decrease_cb;
	}

	win_increase_cb(e,fn) {
		e.stopPropagation();
		window.f3d['increase'+fn+'_fn']();
		window.f3d['update'+fn+'_fn']();
	}
	
	win_decrease_cb(e,fn){
		e.stopPropagation();
		window.f3d['decrease'+fn+'_fn']();
		window.f3d['update'+fn+'_fn']();
	}
}

var superTextWidget = class extends superWidget{
	constructor(obj,fn){
		super(obj,fn);
		document.getElementById('toolbar').innerHTML += `
		<div> 
			<div class="barButton" onmousedown="${fn}_fn(event,'${fn}')" onmousemove="event.stopPropagation()" onmouseup="event.stopPropagation()"  ontouchstart="${fn}touch_fn(event,'${fn}')" ontouchmove="event.stopPropagation()" ontouchend="event.stopPropagation();">
				${fn}
			</div>
			<input id="${fn}Text" class="barInputText" type="text" onmousedown="event.stopPropagation();" onmousemove="event.stopPropagation()" onmouseup="event.stopPropagation()"  ontouchstart="event.stopPropagation();" ontouchmove="event.stopPropagation()" ontouchend="event.stopPropagation();"></input>
		</div>`;
		//usare le api dom per registrare gli eventi
		obj[fn+'_fn'] = this.obj_text_cb;
		window[fn+'_fn'] = this.win_text_cb;
		window[fn+'touch_fn'] = this.win_text_cb;

	}
	
	win_text_cb(e,fn){
		e.stopPropagation();
		window.f3d[fn+'_fn'](e,fn);
	}
}


var widgetAddBody = class extends superButtonWidget{
	constructor(obj,fn){
		super(obj,fn)
	}
	obj_cb(fn) {
		let canAdd = false;
		for(let c = 0,c_l = Object.keys(window.f3d.f3dWorld[+window.f3d.bodyNumber]).length;c<c_l;c++){
			let chain_length = Object.keys(window.f3d.f3dWorld[+window.f3d.bodyNumber][+c]).length; 
			if(chain_length > 0){
				if(canAdd == false){
					canAdd = true;
					window.f3d.bodyNumber++;
					console.log('addbody, c:' + c + ', c_l:' + c_l + ', chain_length: ' + chain_length);
					window.f3d.chainsNumber = 0;
					window.f3d.spheresNumber = 0;
					window.f3d.f3dWorld[+window.f3d.bodyNumber] = {};
					window.f3d.f3dWorld[+window.f3d.bodyNumber][+window.f3d.chainsNumber] = {};
					window.f3d.f3dWorld[+window.f3d.bodyNumber][+window.f3d.chainsNumber][+window.f3d.spheresNumber] = {};
					break;
				}
			}
		}
	}
}

var widgetAddChain = class extends superButtonWidget{
	constructor(obj,fn){
		super(obj,fn)
	}
	obj_cb(fn) {
		if(Object.keys(window.f3d.f3dWorld[+window.f3d.bodyNumber][+window.f3d.chainsNumber]).length > 0){
			window.f3d.chainsNumber++;
			window.f3d.spheresNumber = 0;
			window.f3d.f3dWorld[+window.f3d.bodyNumber][+window.f3d.chainsNumber] = {};
			window.f3d.f3dWorld[+window.f3d.bodyNumber][+window.f3d.chainsNumber][+window.f3d.spheresNumber] = {};
		}
	}
}

var widgetShowMesh = class extends superButtonWidget{
	constructor(obj,fn){
		super(obj,fn)
	}
	obj_cb(fn) {
		window.f3d.hideConvexHull = !window.f3d.hideConvexHull;
		if(window.f3d.hideConvexHull){
			window.f3d.hideShowCH = 'SHOWMESH';	
		}
		else{
			window.f3d.hideShowCH = 'HIDEMESH';
		}
		document.getElementById(fn).innerText = window.f3d.hideShowCH;
		window.f3d.mouseup();
		
	}
}

var widgetDrawMove = class extends superButtonWidget{
	constructor(obj,fn){
		super(obj,fn)
	}
	obj_cb(fn) {
		if(window.f3d.drawMove.indexOf('MOVE') != -1){
			window.f3d.controls.enabled = true;
			window.f3d.drawMove = 'DRAW';	
		}
		else{
			window.f3d.controls.enabled = false;
			window.f3d.drawMove = 'MOVE';
		}
		document.getElementById(fn).innerText = window.f3d.drawMove;
	}
}

var widgetExportMesh = class extends superButtonWidget{
	constructor(obj,fn){
		super(obj,fn)
	}
	obj_cb(fn) {
		var gltfExporter = new GLTFExporter();
		var options = {
			trs: false,
			onlyVisible: true,
			truncateDrawRange: true,
			binary: false,
			forceIndices: true,
			forcePowerOfTwoTextures: false,
			maxTextureSize: Infinity 
		};
		var group = {};
		if(window.f3d.hideConvexHull) group = window.f3d.group.children;
		else group = window.f3d.ch_group;
		gltfExporter.parse( group, function ( result ) {
			if ( result instanceof ArrayBuffer ) {
				window.f3d.saveArrayBuffer( result, 'scene.glb' );
			} else {
				var output = JSON.stringify( result, null, 2 );
				console.log( output );
				window.f3d.saveString( output, 'scene.gltf' );
			}
		}, options );
	}
}

var widgetSphereScale = class extends superNumericWidget{
	constructor(obj,fn){
		super(obj,fn);
	}

	obj_increase_cb(e,fn){
		let tmp = window.f3d.sphereScale + 0.1;
		window.f3d.sphereScale = parseFloat(tmp.toFixed(2));
		window.f3d.f3dWorld[+window.f3d.indexPickedBody][+window.f3d.indexPickedChain][+(window.f3d.indexPickedObject)].sphere.scale.x = window.f3d.sphereScale;
		window.f3d.f3dWorld[+window.f3d.indexPickedBody][+window.f3d.indexPickedChain][+(window.f3d.indexPickedObject)].sphere.scale.y = window.f3d.sphereScale;
		window.f3d.f3dWorld[+window.f3d.indexPickedBody][+window.f3d.indexPickedChain][+(window.f3d.indexPickedObject)].sphere.scale.z = window.f3d.sphereScale;
		window.f3d.mouseup();
	}

	obj_decrease_cb(e,fn){
		if((window.f3d.sphereScale-0.1)>=0.1){
			let tmp = window.f3d.sphereScale - 0.1;
			window.f3d.sphereScale = parseFloat(tmp.toFixed(2));
			window.f3d.f3dWorld[+window.f3d.indexPickedBody][+window.f3d.indexPickedChain][+(window.f3d.indexPickedObject)].sphere.scale.x = window.f3d.sphereScale;
			window.f3d.f3dWorld[+window.f3d.indexPickedBody][+window.f3d.indexPickedChain][+(window.f3d.indexPickedObject)].sphere.scale.y = window.f3d.sphereScale;
			window.f3d.f3dWorld[+window.f3d.indexPickedBody][+window.f3d.indexPickedChain][+(window.f3d.indexPickedObject)].sphere.scale.z = window.f3d.sphereScale;
			window.f3d.mouseup();
		} 
	}

	obj_update_cb(e,fn){
		document.getElementById('sphereScale').innerText = window.f3d.sphereScale;
	}

}

var widgetSphereScale = class extends superNumericWidget{
	constructor(obj,fn){
		super(obj,fn);
	}

	obj_text_cb(e,fn){
		window.f3d.mouseup(document.getElementById(fn+'Text').value); 
	}

}

var saveWidget = class extends superTextWidget{
	constructor(obj,fn){
		super(obj,fn);
	}
	obj_text_cb(e,fn){
		let str = document.getElementById(fn+'Text').value;
		if(!str) alert('No file name!')
		else localStorage[str] = JSON.stringify(window.f3d.f3dWorld);
	};
		
}

export {saveWidget,superButtonWidget,superNumericWidget,widgetAddBody,widgetAddChain,widgetShowMesh,widgetDrawMove,widgetExportMesh,widgetSphereScale,superTextWidget}
