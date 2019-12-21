//14:10
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();


var f3dwebgl = class{
	constructor(){
		this.lastSphereCenterX;
		this.lastSphereCenterY;
		this.oldX;
		this.oldY;
		this.lastSphere;
		this.container;
		this.camera;
		this.scene = [];
		this.renderer;
		//this.rollOverGeo;
		//this.rollOverMesh;
		//this.rollOverMaterial;
		this.mouse;
		this.raycaster;
		this.isShiftDown = false;
		this.plane;
		this.draw_mode = false;
		this.indexPickedObject;
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
		this.info.innerHTML = 'B to add new Body, C to add new Chain';

		this.container.appendChild( this.info );
		this.info2 = document.createElement( 'div' );
		this.info2.style.position = 'absolute';
		this.info2.style.top = '30px';
		this.info2.style.width = '100%';
		this.info2.style.textAlign = 'center';
		this.info2.innerHTML = 'selezione';
		this.container.appendChild( this.info2 );
		//camera
		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
		this.camera.position.set(0, 1000, 0 );
		this.camera.lookAt( new THREE.Vector3() );
		this.scene = new THREE.Scene();
		// roll-over helpers
		//this.rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
		//this.rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
		//this.rollOverMesh = new THREE.Mesh( this.rollOverGeo, this.rollOverMaterial );
		//scene.add( rollOverMesh );
		// WP
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
		this.scene.add( line );
		
		//
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();
		var geometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
		geometry.rotateX( - Math.PI / 2 );
		this.plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
		this.scene.add( this.plane );
		
		// Lights
		//var ambientLight = new THREE.AmbientLight( 0x606060 );
		//this.scene.add( ambientLight );
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
		this.scene.add(this.group);
		this.sphereScale = 10;
		//eventi
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

		
	}
	
	addBody(){
		//controllo se nel body precedente c'è almeno una sfera
		let canAdd = false;
		for(let c = 0,c_l = Object.keys(this.f3dWorld[+this.bodyNumber]).length;c<c_l;c++)
			if(Object.keys(this.f3dWorld[+this.bodyNumber][+c]).length > 0)
				canAdd = true;
		if(canAdd){
			this.bodyNumber++;
			this.chainsNumber = 0;
			this.spheresNumber = 0;
			this.f3dWorld[+this.bodyNumber] = {};
			this.f3dWorld[+this.bodyNumber][+this.chainsNumber] = {};
			this.f3dWorld[+this.bodyNumber][+this.chainsNumber][+this.spheresNumber] = {};
		} 
	}

	addChain(){
		//controllo se nella chain precedente c'è almeno una sfera
		if(Object.keys(this.f3dWorld[+this.bodyNumber][+this.chainsNumber]).length > 0){
			this.chainsNumber++;
			this.spheresNumber = 0;
			this.f3dWorld[+this.bodyNumber][+this.chainsNumber] = {};
			this.f3dWorld[+this.bodyNumber][+this.chainsNumber][+this.spheresNumber] = {};

		}
			
	}

	addSphereToScene (me,voxel,intersect){
		voxel.name = 'f3d_sphere_' + me.spheresNumber;
		
		me.setOldCoord(intersect.point.x,intersect.point.z);
		me.setLastSphereCenter(intersect.point.x,intersect.point.z);
		voxel.position.copy( intersect.point ).add( intersect.face.normal );
		//voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
		me.scene.add( voxel );
		me.spheresNumber += 1;		
	}
			
	createSphere(color,scale){
		var geometry = new THREE.SphereGeometry( 5, 32, 32 );
		var material = new THREE.MeshBasicMaterial( {color: color} );
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
		//this.group.children.length = 0;
		
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


	mousemove( event, x, y ) {
		this.mouse.set( ( x / window.innerWidth ) * 2 - 1, - ( y / window.innerHeight ) * 2 + 1 );

		this.raycaster.setFromCamera( this.mouse, this.camera );

		var intersects = this.raycaster.intersectObjects( this.scene.children );
		/*
		if( this.draw_mode ){
			if ( intersects.length > 0 ) {
				var intersect = intersects[ 0 ];
				//aumenta il raggio della sfera in fase di creazione
				this.setSphereScaleFromMouseDistance(intersect.point.x,intersect.point.z);
			}
			this.render();	
		}else{
		*/
		this.info2.innerHTML = '';
		var me = this;
		if ( intersects.length > 0 ) {
			intersects.map(
				function(e){
					me.info2.innerHTML += e.object.name + ' ';
				}
			);
			if(this.indexPickedObject || this.indexPickedObject === 0){
				for(let i = 0,intersect_length = intersects.length;i<intersect_length;i++){
					if(intersects[i].object.name.length === 0)
						me.f3dWorld[+me.bodyNumber][+me.chainsNumber][+(this.indexPickedObject)].sphere.position.copy( intersects[i].point );
						//this.scene.children[this.f3d_scene[0][this.indexPickedObject]].position.copy( intersects[i].point );
				}	
			}
		}

		//}
		this.render()
	}
	
	onDocumentMobileMouseDown( event ){
		var x = event.targetTouches[0].pageX;
		var y = event.targetTouches[0].pageY;
		this.mousedown(event, x,y);
	}

	onDocumentMouseDown( event ) {
		var x = event.clientX;
		var y =  event.clientY;
		this.mousedown(event, x,y,this);
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
				let index_f3d_sphere = parseInt(intersects[ 0 ].object.name.split('_')[2]);
				me.indexPickedObject = index_f3d_sphere;
				/*				
				for(let o = 0,scene_children_length = me.scene.children.length;o<scene_children_length;o++){
					
					if(me.scene.children[o].name === intersects[ 0 ].object.name){
						me.indexPickedObject = index_f3d_sphere;
						//me.render();
					}	
				}
				*/
			}else if(intersects[ 0 ].object.name.indexOf('interpolation_') !== -1){
				let token_objId1 = intersects[ 0 ].object.name.split('_')[1];
				let token_objId2 = intersects[ 0 ].object.name.split('_')[2];
				let firstRing = me.f3dWorld[+me.bodyNumber][+me.chainsNumber][+token_objId1];
				var voxel = me.createSphere(0xffff00,me.sphereScale);
				let ring = {back:null,head:firstRing.head,sphere:voxel};
				firstRing.head = me.spheresNumber;
				me.f3dWorld[+me.bodyNumber][+me.chainsNumber][+(me.spheresNumber)] = ring;
				me.indexPickedObject = me.spheresNumber;
				me.addSphereToScene(me, voxel, intersects[0]);
				me.render();

				/*
				for(let o = 0,group_children_length = me.group.children.length;o<group_children_length;o++){
					if(me.group.children[o].name === intersects[ 0 ].object.name){
						//ottendo id sfera dal gruppo
						//clono l'oggetto
						//lo inserisco nella scena
						//aggiungo un l'id alla this.f3d_scene(basta aggiungere, come ultimo elemento, l'ultimo id incrementato di uno)
						let token_objId = intersects[ 0 ].object.name.split('_')[1];
						let first = me.scene.children.slice(0,me.f3d_scene[0][token_objId]+1);
						let second = me.scene.children.slice(me.f3d_scene[0][token_objId]+1,me.scene.children.length);
						let obj = me.group.children[o].clone();
						obj.name = 'f3d_sphere_' + (parseInt(token_objId)+1);
						obj.material.color = {r:1,g:1,b:0};
						me.spheresNumber += 1;
						//scene.add( obj );						
						let tmp = first.concat(obj);
						second.map(function(e){
							let str = e.name.split('_');
							e.name = str[0]+'_'+str[1]+'_'+(parseInt(str[2])+1);
						})
						me.scene.children.length = 0;
						me.scene.children = tmp.concat(second);
						me.f3d_scene[0].push(me.f3d_scene[0][me.f3d_scene[0].length-1]+1);
						me.indexPickedObject = (parseInt(token_objId)+1);
						//me.render();
					}
						
				}
				*/
			}else{
				me.draw_mode = true;
				var intersect = intersects[ 0 ];
				var voxel = me.createSphere(0xffff00,me.sphereScale);
				me.addSphereToScene(me, voxel, intersect);
				//me.f3d_scene[0].push(me.scene.children.length-1);
				me.addNextRing(me,voxel);
				
				//me.render();
			}
			
		} else {
			console.log('nothing here');
		}
		//me.render();	
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
					st.head?this.interpolate2Spheres(s1,s2,s,st.head):'';
				}
			}
		}
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
		//todo: calcolare il numero dei tokens in base alla dimensione delle due sfere
		numberOfTokens = distance/60;
		
		token_position_x = x_diff/numberOfTokens;
		token_position_y = y_diff/numberOfTokens;
		token_position_z = z_diff/numberOfTokens;
		token_scale_x = scale_x_diff/numberOfTokens;
		token_scale_y = scale_y_diff/numberOfTokens;
		token_scale_z = scale_z_diff/numberOfTokens;
		
		//s<numberOfTokens-1, perché altrimenti la penultima sfera sarebbe grande come l'ultima
		for(let s = 0;s<numberOfTokens-1;s++){
			let sphere = this.createSphere(0xff0000);
			sphere.position.x = s1.position.x - token_position_x*(s+1);
			sphere.position.y = s1.position.y - token_position_y*(s+1);
			sphere.position.z = s1.position.z - token_position_z*(s+1);
			sphere.scale.x = s1.scale.x - token_scale_x*(s+1);
			sphere.scale.y = s1.scale.y - token_scale_y*(s+1);
			sphere.scale.z = s1.scale.z - token_scale_z*(s+1);
			sphere.name = 'interpolation_'+i+'_'+(ii);
			this.group.add( sphere );
		}
				
		//console.log(JSON.stringify(this.scene));
	}
	
	mouseup( event ){
	        this.info2.innerHTML = '';
		this.draw_mode = false;
		if(this.indexPickedObject || this.indexPickedObject !== undefined){
			this.indexPickedObject = undefined;
			//var scene = f.getScene();
			//this.group.children.length = 0;
						
		}
		this.group.children.length = 0;

		//if(Object.keys(this.f3dWorld[+this.bodyNumber][+this.chainsNumber]).length > 1){
		this.interpolateSpheres();
		//}
		
		
		this.render();	
	}
	
	onDocumentKeyDown( event ) {
		let x = event.which || event.keyCode;
		switch( event.keyCode ) {
			case 66: this.addBody(); break;
			case 67: this.addChain(); break;
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
	

}

var f = new f3dwebgl();
f.render();