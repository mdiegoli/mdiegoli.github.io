//if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
import * as THREE from '../Utils/js/three.module.js';
import { ConvexBufferGeometry } from '../Utils/js/mod/ConvexGeometry.js';
import { TrackballControls } from '../Utils/js/mod/TrackballControls.js';
import { OrbitControls } from '../Utils/js/mod/OrbitControls.js';
import { GLTFExporter } from '../Utils/js/mod/GLTFExporter.js';

var superButtonWidget = class{
	constructor(obj,fn){
		document.getElementById('toolbar').innerHTML += `
			<div id="${fn}" class="barButton" onmousedown="${fn}(event,'${fn}')" onmousemove="event.stopPropagation()" onmouseup="event.stopPropagation()" ontouchstart="touch${fn}(event,'${fn}')" ontouchmove="event.stopPropagation()" ontouchend="event.stopPropagation();endTouch();">
			${fn}
			</div>`;
		//usare le api dom per registrare gli eventi
		obj[fn] = this.obj_cb;
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

var superNumericWidget = class{
	constructor(obj,fn){
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

//WIP
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
		var me = window.f3d;
		gltfExporter.parse( me.ch_group, function ( result ) {
			if ( result instanceof ArrayBuffer ) {
				me.saveArrayBuffer( result, 'scene.glb' );
			} else {
				var output = JSON.stringify( result, null, 2 );
				console.log( output );
				me.saveString( output, 'scene.gltf' );
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
		window.f3d.sphereScale = parseFloat(tmp.toFixed(2))
	}

	obj_decrease_cb(e,fn){
		if((window.f3d.sphereScale-0.1)>=0.1){
			let tmp = window.f3d.sphereScale - 0.1;
			window.f3d.sphereScale = parseFloat(tmp.toFixed(2))
		} 
	}

	obj_update_cb(e,fn){
		document.getElementById('sphereScale').innerText = window.f3d.sphereScale;
	}

}

var f3dwebgl = class{
	constructor(){
		this.lastSphereCenterX;
		this.lastSphereCenterY;
		this.oldX;
		this.oldY;
		this.lastX;
		this.lastY;
		this.lastSphere;
		this.container;
		this.camera;
		this.scene = [];
		this.renderer;
		this.mouse;
		this.raycaster;
		this.isShiftDown = false;
		this.plane;
		this.draw_mode = false;
		this.indexPickedObject;
		this.indexPickedBody;
		this.indexPickedChain;
		this.f3d_scene = [];
		this.f3d_scene[0] = [];
		this.group;
		this.info;
		this.info2;
		//div di debug
		this.container = document.createElement( 'div' );
		document.body.appendChild( this.container );
		this.info = document.createElement( 'div' );
		this.info.style.position = 'absolute';
		this.info.style.top = '10px';
		this.info.style.width = '100%';
		this.info.style.textAlign = 'center';
		//todo: create a js class to handle bar buttons
		this.sphereScale = 1;
		this.drawMove = 'MOVE';
		this.htmlWidgets = '';
		this.info.innerHTML = `
		<div id="toolbar" class="toolbar">
		</div>`;
		this.container.appendChild( this.info );
		this.link = document.createElement( 'a' );
		this.link.style.display = 'none';
		document.body.appendChild( this.link ); // Firefox workaround, see #6594
		this.info2 = document.createElement( 'div' );
		//this.info2.style.position = 'absolute';
		//this.info2.style.top = '30px';
		this.info2.style.width = '100%';
		this.info2.style.textAlign = 'center';
		this.info2.innerHTML = 'selezione';
		this.info.appendChild( this.info2 );
		//camera
		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100 );
		this.camera.position.set(0, 1000, 0 );
		this.camera.lookAt( new THREE.Vector3() );
		this.scene = new THREE.Scene();
		var sizeH = window.innerHeight, sizeW = window.innerWidth, step = 100;
		var geometry = new THREE.Geometry();
		for ( var i = -sizeH; i <= sizeH; i += step ) {
			geometry.vertices.push( new THREE.Vector3( -sizeW, 0, i ) );
			geometry.vertices.push( new THREE.Vector3(   sizeW, 0, i ) );
		}
		for ( var i = -sizeW; i <= sizeW; i += step ) {
			geometry.vertices.push( new THREE.Vector3( i, 0, -sizeH ) );
			geometry.vertices.push( new THREE.Vector3( i, 0,   sizeH ) );
		}
		var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );
		var line = new THREE.LineSegments( geometry, material );
		var geometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
		geometry.rotateX( - Math.PI / 2 );
		this.plane = new THREE.Mesh( geometry, new THREE.MeshToonMaterial( { visible: false } ) );
		this.plane.name = 'wp';
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();
		// Lights
		var spotLight = new THREE.SpotLight( 0xffffff );
		spotLight.position.set( 0, 1000, 0 );
		spotLight.castShadow = true;
		spotLight.shadow.mapSize.width = 1024;
		spotLight.shadow.mapSize.height = 1024;
		spotLight.shadow.camera.near = 500;
		spotLight.shadow.camera.far = 4000;
		spotLight.shadow.camera.fov = 30;
		spotLight.target = this.plane;
		this.scene.add( spotLight );
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setClearColor( 0xf0f0f0 );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.container.appendChild( this.renderer.domElement );
		this.group = new THREE.Group();
		this.ch_group = new THREE.Group();
		this.scene.add(this.group);
		this.scene.add(this.ch_group);
		this.controls = new OrbitControls( this.camera, this.renderer.domElement );
		this.controls.enabled = false;
		document.addEventListener( 'mousemove', this.onDocumentMouseMove.bind(this), false );
		document.addEventListener( 'touchmove', this.onDocumentMobileMouseMove.bind(this), false );
		document.addEventListener( 'mousedown', this.onDocumentMouseDown.bind(this), false );
		document.addEventListener( 'touchstart', this.onDocumentMobileMouseDown.bind(this), false );
		document.addEventListener( 'keydown', this.onDocumentKeyDown.bind(this), false );
		document.addEventListener( 'keyup', this.onDocumentKeyUp.bind(this), false );
		document.addEventListener( 'mouseup', this.onDocumentMouseUp.bind(this), false );
		document.addEventListener( 'touchend', this.onDocumentMobileMouseUp.bind(this), false );
		window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
		Array.prototype.insertAt = function(pos,val){
			let first = this.slice(0,pos+1);
			let second = this.slice(pos+1,this.length);
			return first.concat(val).concat(second);
		}
		this.spheresNumber = 0;
		this.chainsNumber = 0;
		this.bodyNumber = 0;
		this.f3dWorld = {};
		this.f3dWorld[+this.bodyNumber] = {};
		this.f3dWorld[+this.bodyNumber][+this.chainsNumber] = {};
		this.f3dWorld[+this.bodyNumber][+this.chainsNumber][+this.spheresNumber] = {};
		this.isTouched = false;
		this.hideConvexHull = false;
		this.frustumVertices = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(),new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
		this.planeMesh = this.createPlaneMesh();
		this.scene.add(this.planeMesh);
		this.setFrustumVertices(this.camera, this.frustumVertices);
		this.updatePlane();
		this.distanceFactor = 10;
		this.addbody = new widgetAddBody(this,'ADDBODY');
		this.addchain = new widgetAddChain(this,'ADDCHAIN');
		this.showmesh = new widgetShowMesh(this,'SHOWMESH');
		this.exportmesh = new widgetExportMesh(this,'EXPORTMESH');
		this.drawmove = new widgetDrawMove(this,'MOVE');
		this.spherescale = new widgetSphereScale(this,'SPHERESCALE');
		
	}
	//from https://codepen.io/looeee/pen/RMLJYw
	createPlaneMesh(){
		this.skyPlaneGeometry = new THREE.BufferGeometry();
		// positions
		const positions = new Float32Array( [
		0.0, 0.0,  1.0,
		1.0, 0.0,  1.0,
		1.0, 1.0,  1.0,
		0.0, 1.0,  1.0,
		] );
		this.skyPlanePositions = new THREE.BufferAttribute(positions, 3);
		this.skyPlanePositions.setDynamic(true);
		this.skyPlaneGeometry.addAttribute("position", this.skyPlanePositions);
		// indexes
		this.skyPlaneIndexes = new THREE.BufferAttribute(new Uint32Array([2,1,0, 3,2,0]), 1);
		this.skyPlaneGeometry.setIndex(this.skyPlaneIndexes);
		// uvs
		const uvs = new Float32Array([
		0.0, 0.0,
		0.0, 1.0,
		1.0, 1.0,
		1.0, 0.0
		]);
		this.skyPlaneUVs = new THREE.BufferAttribute( uvs, 2 );
		this.skyPlaneGeometry.addAttribute( 'uv', this.skyPlaneUVs);
		this.skyPlaneGeometry.computeBoundingSphere();
		var pmesh = new THREE.Mesh(this.skyPlaneGeometry, new THREE.MeshBasicMaterial({
		//depthTest: false,
		color: 0XFF0000,
		side: THREE.DoubleSide,
		//map: this.texture
		opacity: 0.5,
		transparent:true
		}));
		//this.mesh.frustumCulled = false;
		pmesh.name = 'wp';
		return pmesh;
	}
	
	setFrustumVertices(cam, corners){
		cam.projectionMatrix.copy(cam.projectionMatrix);
		var cornerIndex = 0;

		function addPoint(x, y, z) {
			corners[cornerIndex++].set(x, y, z).unproject(cam);
		}
		const w = 1;
		const h = 1;
		const n = -1;
		const f = 1;
		// near
		addPoint(- w, - h, n);
		addPoint(w, - h, n);
		addPoint(- w, h, n);
		addPoint(w, h, n);
		// far
		addPoint(- w - 0.25, - h - 0.25, f - 0.01);
		addPoint(w + 0.25, - h - 0.25, f - 0.01);
		addPoint(- w - 0.25, h + 0.25, f - 0.01);
		addPoint(w + 0.25, h + 0.25, f - 0.01);  
	}

	updatePlane(){
        var bottomLeftFarCorner = this.frustumVertices[4];
        var bottomRightFarCorner = this.frustumVertices[5];
        var topLeftFarCorner = this.frustumVertices[6];
        var topRightFarCorner = this.frustumVertices[7];
        var zOffset = 0;
        this.skyPlanePositions.setXYZ(
            0,
            bottomLeftFarCorner.x,
            bottomLeftFarCorner.y,
            bottomLeftFarCorner.z+zOffset // z fighting test
        );
        this.skyPlanePositions.setXYZ(
            1,
            topLeftFarCorner.x,
            topLeftFarCorner.y,
            topLeftFarCorner.z+zOffset
        );
        this.skyPlanePositions.setXYZ(
            2,
            topRightFarCorner.x,
            topRightFarCorner.y,
            topRightFarCorner.z+zOffset
        );
        this.skyPlanePositions.setXYZ(
            3,
            bottomRightFarCorner.x,
            bottomRightFarCorner.y,
            bottomRightFarCorner.z+zOffset
        );
		this.planeMesh.geometry.computeBoundingSphere();//<- serve ancora?
		this.planeMesh.geometry.computeBoundingBox();

		this.skyPlanePositions.needsUpdate = true;
		this.planeMesh.geometry.boundingBox.getCenter(this.controls.target);
	}

	addSphereToScene (me,voxel,intersect){
		voxel.name = 'f3d_sphere_' + me.spheresNumber + '_' + me.bodyNumber + '_' + me.chainsNumber;
		me.setOldCoord(intersect.point.x,intersect.point.z);
		me.setLastSphereCenter(intersect.point.x,intersect.point.z);
		voxel.position.copy( intersect.point ).add( intersect.face.normal );
		voxel.updateMatrixWorld();
		me.scene.add( voxel );
		me.spheresNumber += 1;
		if(!me.boxHelper){
			me.boxHelper = new THREE.BoxHelper( voxel, 0xffff00 );
			me.scene.add(me.boxHelper);
		}
		else{
			me.boxHelper.setFromObject(voxel);
		}
		
		
	}
			
	createSphere(color,scale){
		var geometry = new THREE.SphereGeometry( 5, 8, 8 );
		var material = new THREE.MeshToonMaterial( {color: color} );
		this.lastSphere = new THREE.Mesh( geometry, material );
		this.lastSphere.scale.x = scale;
		this.lastSphere.scale.y = scale;
		this.lastSphere.scale.z = scale;
		return this.lastSphere;
	}
	
	addNextRing(me,voxel){
		var ring = {};
		if(me.spheresNumber == 1){
			ring = {back:null,head:null,sphere:voxel};
		}else{
			ring = {back:me.spheresNumber-2,head:null,sphere:voxel};
			me.f3dWorld[+me.bodyNumber][+me.chainsNumber][+(me.spheresNumber-2)].head = me.spheresNumber-1;
		}	
		me.f3dWorld[+me.bodyNumber][+me.chainsNumber][+(me.spheresNumber-1)] = ring;
	}

	distance(x1,y1,x2,y2){
		var a = x1 - x2
		var b = y1 - y2
		return Math.sqrt( a*a + b*b );
	}
	
	render() {
		this.renderer.render( this.scene, this.camera );
	}
	
	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}

	onDocumentMobileMouseMove( event ){
		var x = event.targetTouches[0].pageX;
		var y = event.targetTouches[0].pageY;
		this.mousemove(event, x,y);
	}

	onDocumentMouseMove( event ) {
		var x = event.clientX;
		var y =  event.clientY;
		this.mousemove(event, x,y);
	}

	scaleSphere(grow){
		this.mouse.set( ( this.lastX / window.innerWidth ) * 2 - 1, - ( this.lastY / window.innerHeight ) * 2 + 1 );
		this.raycaster.setFromCamera( this.mouse, this.camera );
		var intersects = this.raycaster.intersectObjects( this.scene.children );
		if ( intersects.length > 0 ) {
			let index = intersects[0].object.name.split('_');
			if(index[1].includes('sphere')){
				let scale = this.f3dWorld[+this.bodyNumber][+this.chainsNumber][index[2]].sphere.scale;
				if(grow){
					scale.x++;
					scale.y++;
					scale.z++;
				}else{
					scale.x=((scale.x-1)>=0)?scale.x-1:0;
					scale.y=((scale.y-1)>=0)?scale.y-1:0;
					scale.z=((scale.z-1)>=0)?scale.z-1:0;
				}
				this.f3dWorld[+this.bodyNumber][+this.chainsNumber][index[2]].sphere.scale.set(scale.x,scale.y,scale.z);
			}
		}
		this.group.children.length = 0;
		this.interpolateSpheres();
		this.render();
	}

	mousemove( event, x, y ) {
		this.lastX = x;
		this.lastY = y;
		this.mouse.set( ( x / window.innerWidth ) * 2 - 1, - ( y / window.innerHeight ) * 2 + 1 );
		this.raycaster.setFromCamera( this.mouse, this.camera );
		var intersects = this.raycaster.intersectObjects( this.scene.children );
		this.info2.innerHTML = '';
		var me = this;
		if ( intersects.length > 0 ) {
			intersects.map(
				function(e){
					me.info2.innerHTML += e.object.name + ' ';
				}
			);
			if(me.indexPickedObject || me.indexPickedObject === 0){
				for(let i = 0,intersect_length = intersects.length;i<intersect_length;i++){
					if(intersects[i].object.name.indexOf('wp') != -1){
						me.f3dWorld[me.indexPickedBody][me.indexPickedChain][+(me.indexPickedObject)].sphere.position.copy( intersects[i].point );
						me.f3dWorld[me.indexPickedBody][me.indexPickedChain][+(me.indexPickedObject)].sphere.updateMatrixWorld();
					}
				}	
			}
		}
		this.render()
	}
	
	onDocumentMobileMouseDown( event ){
		if(!this.controls.enabled){
			var x = event.targetTouches[0].pageX;
			var y = event.targetTouches[0].pageY;
			this.mousedown(event, x,y,this);
		}
	}

	onDocumentMouseDown( event ) {
		if(!this.controls.enabled){
			var x = event.clientX;
			var y =  event.clientY;
			this.mousedown(event, x,y,this);
		}
	}

	mousedown( event, x, y,me ) {
		var maxX = x,
		    minX = x,
		    maxY = y,
		    minY = y;
		me.mouse.set( ( x / window.innerWidth ) * 2 - 1, - ( y / window.innerHeight ) * 2 + 1 );
		me.raycaster.setFromCamera( me.mouse, me.camera );
		var intersects = me.raycaster.intersectObjects( me.scene.children, true );
		
		if ( intersects.length > 0 ) {
			intersects.map(
				function(e){
					me.info2.innerHTML += e.object.name;
				}
			);
			if(intersects[ 0 ].object.name.indexOf('f3d_sphere_') !== -1){
				let sphereTokens = intersects[ 0 ].object.name.split('_');
				let index_f3d_sphere = parseInt(sphereTokens[2]);
				let index_body = parseInt(sphereTokens[3]);
				let index_chain = parseInt(sphereTokens[4]);
				me.indexPickedObject = index_f3d_sphere;
				me.indexPickedBody = index_body;
				me.indexPickedChain = index_chain;
			}else if(intersects[ 0 ].object.name.indexOf('interpolation_') !== -1){
				let interpolation_tokens = intersects[ 0 ].object.name.split('_');
				let token_objId1 = interpolation_tokens[1];
				let token_objId2 = interpolation_tokens[2];
				let token_body = interpolation_tokens[3];
				let token_chain = interpolation_tokens[4];
				let firstRing = me.f3dWorld[token_body][token_chain][+token_objId1];
				var voxel = me.createSphere(0xffff00,me.sphereScale);
				let ring = {back:null,head:firstRing.head,sphere:voxel};
				firstRing.head = me.spheresNumber;
				me.f3dWorld[token_body][token_chain][+(me.spheresNumber)] = ring;
				me.indexPickedObject = me.spheresNumber;
				me.indexPickedBody = token_body;
				me.indexPickedChain = token_chain;
				me.addSphereToScene(me, voxel, intersects[0]);
				me.render();
			}else if(intersects[ 0 ].object.name.indexOf('wp') !== -1){
				me.draw_mode = true;
				console.log(intersects[ 0 ].object.name);
				var intersect = intersects[ 0 ];
				var voxel = me.createSphere(0xffff00,me.sphereScale);
				me.addSphereToScene(me, voxel, intersect);
				me.addNextRing(me,voxel);
			}
			
		} else {
			console.log('nothing here');
		}
	}

	onDocumentMobileMouseUp( event ){
		this.mouseup(event);
	}

	onDocumentMouseUp( event ){
		this.mouseup(event);
	}

	interpolateSpheres(){
		for(let b = 0,b_l = Object.keys(this.f3dWorld).length;b<b_l;b++){
			for(let c = 0,c_l = Object.keys(this.f3dWorld[+b]).length;c<c_l;c++){
				for(let s = 0,s_l = Object.keys(this.f3dWorld[+b][+c]).length;s<s_l;s++){
					let st = this.f3dWorld[+b][+c][+s];
					let s1 = st.sphere;
					let s2 = this.f3dWorld[+b][+c][+st.head].sphere;
					st.head?this.r_interpolate2Spheres(s1,s2,s,st.head):'';
					if(!this.hideConvexHull) st.head?this.convexHullBetween2Spheres(s1,s2,s,st.head):'';
				}
			}
		}
	}

	convexHullBetween2Spheres(s1,s2,i,ii){
		var points = [];
        s1.geometry.vertices.map((e)=>{points.push(new THREE.Vector3( e.x, e.y, e.z ).applyMatrix4(s1.matrixWorld))});
		s2.geometry.vertices.map((e)=>{points.push(new THREE.Vector3( e.x, e.y, e.z ).applyMatrix4(s2.matrixWorld))});
		var geometry = new ConvexBufferGeometry( points );
		var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, opacity: 0.5,transparent:true} );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.name = "convexhull_"+i+"_"+ii;
		this.ch_group.add( mesh );
	}
	
	interpolate2Spheres(s1,s2,i,ii){
		let x_diff = s1.position.x - s2.position.x;
		let y_diff = s1.position.y - s2.position.y;
		let z_diff = s1.position.z - s2.position.z;
		let scale_x_diff = s1.scale.x - s2.scale.x;
		let scale_y_diff = s1.scale.y - s2.scale.y;
		let scale_z_diff = s1.scale.z - s2.scale.z;
		let token_position_x,token_position_y,token_position_z, token_scale_x,token_scale_y,token_scale_z;
		let distance = Math.sqrt(x_diff * x_diff + y_diff * y_diff + z_diff * z_diff);
		let numberOfTokens;
		numberOfTokens = distance/30;
		token_position_x = x_diff/numberOfTokens;
		token_position_y = y_diff/numberOfTokens;
		token_position_z = z_diff/numberOfTokens;
		token_scale_x = scale_x_diff/numberOfTokens;
		token_scale_y = scale_y_diff/numberOfTokens;
		token_scale_z = scale_z_diff/numberOfTokens;
		for(let s = 0;s<numberOfTokens-1;s++){
			let sphere = this.createSphere(0xff0000);
			sphere.position.x = s1.position.x - token_position_x*(s+1);
			sphere.position.y = s1.position.y - token_position_y*(s+1);
			sphere.position.z = s1.position.z - token_position_z*(s+1);
			sphere.scale.x = s1.scale.x - token_scale_x*(s+1);
			sphere.scale.y = s1.scale.y - token_scale_y*(s+1);
			sphere.scale.z = s1.scale.z - token_scale_z*(s+1);
			sphere.name = 'interpolation_'+i+'_'+ ii + '_' + this.bodyNumber + '_' + this.chainsNumber;

			this.group.add( sphere );
		}
	}
	
	r_interpolate2Spheres(s1,s2,i,ii){
		let x_diff = (s1.position.x - s2.position.x);
		let y_diff = (s1.position.y - s2.position.y);
		let z_diff = (s1.position.z - s2.position.z);
		let scale_x_diff = (s1.scale.x - s2.scale.x);
		let scale_y_diff = (s1.scale.y - s2.scale.y);
		let scale_z_diff = (s1.scale.z - s2.scale.z);
		let token_position_x,token_position_y,token_position_z, token_scale_x,token_scale_y,token_scale_z;
		let distance = Math.sqrt(x_diff * x_diff + y_diff * y_diff + z_diff * z_diff);
		let numberOfTokens;
		numberOfTokens = 2;
		token_position_x = x_diff/numberOfTokens;
		token_position_y = y_diff/numberOfTokens;
		token_position_z = z_diff/numberOfTokens;
		token_scale_x = scale_x_diff/numberOfTokens;
		token_scale_y = scale_y_diff/numberOfTokens;
		token_scale_z = scale_z_diff/numberOfTokens;
		let sphere = this.createSphere(0xff0000);
		sphere.position.x = s1.position.x - token_position_x;
		sphere.position.y = s1.position.y - token_position_y;
		sphere.position.z = s1.position.z - token_position_z;
		sphere.scale.x = s1.scale.x - token_scale_x;
		sphere.scale.y = s1.scale.y - token_scale_y;
		sphere.scale.z = s1.scale.z - token_scale_z;
		sphere.name = 'interpolation_'+i+'_'+ ii + '_' + this.bodyNumber + '_' + this.chainsNumber;
		this.group.add( sphere );
		if((distance > (s1.scale.x*this.distanceFactor)) || (distance > (s2.scale.x*this.distanceFactor))){
			this.r_interpolate2Spheres(s1,sphere,i,ii);
			this.r_interpolate2Spheres(sphere,s2,i,ii);
			
		}
	}

	mouseup( event ){
	    this.info2.innerHTML = '';
		this.draw_mode = false;
		if(this.indexPickedObject || this.indexPickedObject !== undefined){
			this.indexPickedObject = undefined;
			this.indexPickedBody = undefined;
			this.indexPickedChain = undefined;
		}
		this.group.children.length = 0;
		this.ch_group.children.length = 0;
		this.interpolateSpheres();
		this.setFrustumVertices(this.camera, this.frustumVertices);
		this.updatePlane();
		this.render();	
	}
	
	onDocumentKeyDown( event ) {
		let x = event.which || event.keyCode;
		//+ (187) to grow, - (189) to scale down
		switch( event.keyCode ) {
			case 187: this.scaleSphere(true); break;
			case 189: this.scaleSphere(false); break;
		}
	}
	
	onDocumentKeyUp( event ) {
		switch ( event.keyCode ) {
			case 16: this.isShiftDown = false; break;
		}
	}
	
	setOldCoord(x,y){
			this.oldX = x;
			this.oldY = y;
	}
	
	setLastSphereCenter(x,y){
		this.lastSphereCenterX = x;
		this.lastSphereCenterY = y;
	}
	
	setSphereScaleFromMouseDistance(x,y){
		let min_r = this.distance(this.lastSphereCenterX,this.lastSphereCenterY,this.oldX,this.oldY);
		let max_r = this.distance(this.lastSphereCenterX,this.lastSphereCenterY,x,y);
		if (min_r === 0)
			min_r = 1;
		let scale = max_r/min_r;
		this.lastSphere.scale.x += 1;
		this.lastSphere.scale.y += 1;
		this.lastSphere.scale.z += 1;
	}
	
	getOldCoord(){
		return {x:this.oldX,y:this.oldY};
	}
	
	getMouseDistance(x,y){
		return distamce(this.oldX,this.oldY,x,y);
	}
	
	getScene(){
		return this.scene;
	}
	
	//utility CH
	save( blob, filename ) {
		this.link.href = URL.createObjectURL( blob );
		this.link.download = filename;
		this.link.click();
	}

	saveString( text, filename ) {
		this.save( new Blob( [ text ], { type: 'text/plain' } ), filename );
	}

	saveArrayBuffer( buffer, filename ) {
		this.save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );
	}
	//end utility CH
}

window.f3d = new f3dwebgl();
window.f3d.render();
//only 1 touch at time
window.endTouch = () => {
	console.log('endTouch');
	window.f3d.isTouched = false;
}

