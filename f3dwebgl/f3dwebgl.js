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
		this.scene;
		this.renderer;
		this.rollOverGeo;
		this.rollOverMesh;
		this.rollOverMaterial;
		this.mouse;
		this.raycaster;
		this.isShiftDown = false;
		this.plane;
		this.number_of_f3d_spheres = 1;
		this.draw_mode = false;
		this.indexPickedObject;
		this.f3d_scene = [];
		this.scene[0] = [];
		this.group;
		this.info;
		this.info2;
	
		this.container = document.createElement( 'div' );
		document.body.appendChild( container );
		this.info = document.createElement( 'div' );
		this.info.style.position = 'absolute';
		this.info.style.top = '10px';
		this.info.style.width = '100%';
		this.info.style.textAlign = 'center';
		this.info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a>';
		this.container.appendChild( this.info );
		this.info2 = document.createElement( 'div' );
		this.info2.style.position = 'absolute';
		this.info2.style.top = '30px';
		this.info2.style.width = '100%';
		this.info2.style.textAlign = 'center';
		this.info2.innerHTML = 'selezione';
		this.container.appendChild( this.info2 );
		
		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
		this.camera.position.set(0, 1000, 0 );
		this.camera.lookAt( new THREE.Vector3() );
		this.scene = new THREE.Scene();
		// roll-over helpers
		this.rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
		this.rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
		this.rollOverMesh = new THREE.Mesh( this.rollOverGeo, this.rollOverMaterial );
		//scene.add( rollOverMesh );
		// grid
		
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
		var ambientLight = new THREE.AmbientLight( 0x606060 );
		this.scene.add( ambientLight );
		var directionalLight = new THREE.DirectionalLight( 0xffffff );
		directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
		this.scene.add( directionalLight );
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setClearColor( 0xf0f0f0 );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.container.appendChild( this.renderer.domElement );
		this.group = new THREE.Group();
		this.scene.add(this.group);
		document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
		document.addEventListener( 'touchmove', this.onDocumentMobileMouseMove, false );
		document.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
		document.addEventListener( 'touchstart', this.onDocumentMobileMouseDown, false );
		document.addEventListener( 'keydown', this.onDocumentKeyDown, false );
		document.addEventListener( 'keyup', this.onDocumentKeyUp, false );
		document.addEventListener( 'mouseup', this.onDocumentMouseUp, false );
		document.addEventListener( 'touchend', this.onDocumentMobileMouseUp, false );
		//
		window.addEventListener( 'resize', this.onWindowResize, false );
		Array.prototype.insertAt = function(pos,val){
			let first = this.slice(0,pos+1);
			let second = this.slice(pos+1,this.length);
			return first.concat(val).concat(second);
		}
	}
	
			
	Sphere(color){
		var geometry = new THREE.SphereGeometry( 5, 32, 32 );
		var material = new THREE.MeshBasicMaterial( {color: color} );
		this.lastSphere = new THREE.Mesh( geometry, material );
		
		
		return this.lastSphere;
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

	sketch(){
		var geometry = new THREE.Geometry();
		for(var i = 0;i<draw.length-1;i++){
			geometry.vertices.push(new THREE.Vector3(draw[i].x, 1, draw[i].z));
			geometry.vertices.push(new THREE.Vector3(draw[i+1].x, 1, draw[i+1].z));
			var line = new THREE.Line(geometry, material);
			this.scene.add(line);
		}
	}

	drawTube(){
		var result = simplify(draw, 1, false);
		console.log('draw length '+draw.length);
		console.log('result length '+result.length);
	}

	drawPolyline(){
		var corners=[draw[0]]
		var n=0
		var t=0
		var lastCorner=draw[0]
		for (var i=1; i<draw.length-2; i++){

		  var pt=draw[i+1]
		  var d=delta(lastCorner, draw[i-1])

		  if (len(d)>20 && n>2){
			ac=delta(draw[i-1], pt)
			if (Math.abs(angle_between(ac, d)) > Math.PI/4){
			  pt.index=i
			  corners.push(pt)
			  lastCorner=pt
			  n=0
			  t=0
			}
		  }
		  n++
		}

		if (len(delta(draw[draw.length-1], draw[0]))<25){
		  corners.push(draw[0])

		  //c.fillStyle='rgba(0, 0, 255, 0.3)'

		  //if (corners.length==5){
			//check for square
			var p1=corners[0]
			var p2=corners[1]
			var p3=corners[2]
			var p4=corners[3]
			var p1p2=delta(p1, p2)
			var p2p3=delta(p2, p3)
			var p3p4=delta(p3, p4)
			var p4p1=delta(p4, p1)
			if ((Math.abs(angle_between(p1p2, p2p3)-Math.PI/2))<Math.PI/6
			&& (Math.abs(angle_between(p2p3, p3p4)-Math.PI/2))<Math.PI/6
			&& (Math.abs(angle_between(p3p4, p4p1)-Math.PI/2))<Math.PI/6
			&& (Math.abs(angle_between(p4p1, p1p2)-Math.PI/2))<Math.PI/6){
			  //c.fillStyle='rgba(0, 255, 255, 0.3)'
			  var p1p3=delta(p1, p3)
			  var p2p4=delta(p2, p4)

			  var diag=(len(p1p3)+len(p2p4))/4.0

			  var tocenter1=scale(unit(p1p3), -diag)
			  var tocenter2=scale(unit(p2p4), -diag)

			  var center=average([p1, p2, p3, p4])	

			  var angle=angle_between(p1p3, p2p4)

			  corners=[add(center, tocenter1),
				  add(center, tocenter2),
				  add(center, scale(tocenter1, -1)),
				  add(center, scale(tocenter2, -1)),
				  add(center, tocenter1)]	
			}


		  }


		  var geometry = new THREE.Geometry();
		  geometry.vertices.push(new THREE.Vector3(corners[0].x, 1, corners[0].z));
		  for (var i=1; i<corners.length; i++){
			geometry.vertices.push(new THREE.Vector3(corners[i].x, 1, corners[i].z));
		  }
		  geometry.vertices.push(new THREE.Vector3(draw[draw.length-1].x, 1, draw[draw.length-1].z));
		  var line = new THREE.Line(geometry, material);
		  this.scene.add(line);
	}


	mousemove( event, x, y ) {
		if( this.draw_mode ){

			
			


			/*	
			console.log('minX '+minX);
			console.log('maxX '+maxX);
			console.log('minY '+minY);
			console.log('maxY '+maxY);
			console.log('clientX '+event.clientX);
			console.log('clientY '+event.clientY);
			*/
			this.mouse.set( ( x / window.innerWidth ) * 2 - 1, - ( y / window.innerHeight ) * 2 + 1 );

			this.raycaster.setFromCamera( this.mouse, this.camera );
			var intersects = this.raycaster.intersectObjects( this.scene.children );

			
			if ( intersects.length > 0 ) {

				var intersect = intersects[ 0 ];
				this.setSphereScaleFromMouseDistance(intersect.point.x,intersect.point.z);

			}
		
			

			this.render();	
		}else{
			

			this.mouse.set( ( x / window.innerWidth ) * 2 - 1, - ( y / window.innerHeight ) * 2 + 1 );

			this.raycaster.setFromCamera( this.mouse, this.camera );

			var intersects = this.raycaster.intersectObjects( this.scene.children );

			if ( intersects.length > 0 ) {

				if(this.indexPickedObject || this.indexPickedObject === 0){
					for(let i = 0,intersect_length = intersects.length;i<intersect_length;i++){
						if(intersects[i].object.name.length === 0)
							this.scene.children[this.f3d_scene[0][this.indexPickedObject]].position.copy( intersects[i].point );
					}
					
					
				}

			}
			
		}
	}
	
	onDocumentMobileMouseDown( event ){
		var x = event.targetTouches[0].pageX;
		var y = event.targetTouches[0].pageY;
		this.mousedown(event, x,y);
	}

	onDocumentMouseDown( event ) {
		var x = event.clientX;
		var y =  event.clientY;
		this.mousedown(event, x,y);
	}

	mousedown( event, x, y ) {
		
		
		maxX = minX = x;
		maxY = minY = y;
		this.mouse.set( ( x / window.innerWidth ) * 2 - 1, - ( y / window.innerHeight ) * 2 + 1 );
		this.raycaster.setFromCamera( this.mouse, this.camera );
		var intersects = this.raycaster.intersectObjects( this.scene.children, true );
		
		if ( intersects.length > 0 ) {
			intersects.map(
				function(e){
					this.info2.innerHTML += e.object.name;
				}
			);
			if(intersects[ 0 ].object.name.indexOf('f3d_sphere_') !== -1){
				for(let o = 0,scene_children_length = this.scene.children.length;o<scene_children_length;o++){
					let index_f3d_sphere = parseInt(intersects[ 0 ].object.name.split('_')[2])-1;
					if(this.scene.children[o].name === intersects[ 0 ].object.name)
						this.indexPickedObject = index_f3d_sphere;
				}
			}else if(intersects[ 0 ].object.name.indexOf('interpolation_') !== -1){
				for(let o = 0,group_children_length = this.group.children.length;o<group_children_length;o++){
					if(this.group.children[o].name === intersects[ 0 ].object.name){
						//ottendo id sfera dal gruppo
						//clono l'oggetto
						//lo inserisco nella scena
						//aggiungo un l'id alla this.f3d_scene(basta aggiungere, come ultimo elemento, l'ultimo id incrementato di uno)
						let token_objId = intersects[ 0 ].object.name.split('_')[1];
						let first = this.scene.children.slice(0,this.f3d_scene[0][token_objId]+1);
						let second = this.scene.children.slice(this.f3d_scene[0][token_objId]+1,this.scene.children.length);
						let obj = this.group.children[o].clone();
						obj.name = 'f3d_sphere_' + (parseInt(token_objId)+1);
						obj.material.color = {r:1,g:1,b:0};
						this.number_of_f3d_spheres += 1;
						//scene.add( obj );						
						let tmp = first.concat(obj);
						second.map(function(e){
							let str = e.name.split('_');
							e.name = str[0]+'_'+str[1]+'_'+(parseInt(str[2])+1);
						})
						this.scene.children.length = 0;
						this.scene.children = tmp.concat(second);
						this.f3d_scene[0].push(this.f3d_scene[0][this.f3d_scene[0].length-1]+1);
						this.indexPickedObject = (parseInt(token_objId)+1);
					}
						
				}
			}else{
				this.draw_mode = true;
				var intersect = intersects[ 0 ];
				var voxel = this.Sphere(0xffff00);
				voxel.name = 'f3d_sphere_' + this.number_of_f3d_spheres;
				this.number_of_f3d_spheres += 1;
				this.setOldCoord(intersect.point.x,intersect.point.z);
				this.setLastSphereCenter(intersect.point.x,intersect.point.z);
				voxel.position.copy( intersect.point ).add( intersect.face.normal );
				//voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
				this.scene.add( voxel );
				this.f3d_scene[0].push(this.scene.children.length-1);
			}
			
		} else {
			console.log('nothing here');
		}
		this.render();	
	}

	onDocumentMobileMouseUp( event ){
		this.mouseup(event);
	}

	onDocumentMouseUp( event ){

		this.mouseup(event);
	}

	draw_circle_link(){

		if (circle_in_scene % 3 === 0){

			var geometry = new THREE.Geometry(),
			colors = [];

			n_sub = 6;

			var position, index;

			var spline = new THREE.Spline( points );

			for ( i = 0; i < points.length * n_sub; i ++ ) {

				index = i / ( points.length * n_sub );
				position = spline.getPoint( index );

				geometry.vertices[ i ] = new THREE.Vector3( position.x, position.y, position.z );

				colors[ i ] = new THREE.Color( 0xffffff );
				colors[ i ].setHSL( 0.6, 1.0, Math.max( 0, - position.x / 200 ) + 0.5 );

			}
			geometry.colors = colors;

			// lines

			material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 1, linewidth: 3, vertexColors: THREE.VertexColors } );

			var line, p, scale = 0.3, d = 225;
			var parameters =  [
				[ material, scale*1.5, [-d,0,0],  geometry ],
			];

			for ( i = 0; i < parameters.length; ++ i ) {

				p = parameters[ i ];
				line = new THREE.Line( p[ 3 ],  p[ 0 ] );
				//line.scale.x = line.scale.y = line.scale.z =  p[ 1 ];
				//line.position.x = p[ 2 ][ 0 ];
				//line.position.y = p[ 2 ][ 1 ];
				//line.position.z = p[ 2 ][ 2 ];
				this.scene.add( line );

			}
			points = [];
		}

	}

	interpolateSpheres(){
		
		if(this.f3d_scene[0].length > 1){
			for(let i = 0,f3d_scene_length = this.f3d_scene[0].length;i<f3d_scene_length-1;i++){
				let x_diff = this.scene.children[this.f3d_scene[0][i]].position.x - this.scene.children[this.f3d_scene[0][i+1]].position.x;
				let y_diff = this.scene.children[this.f3d_scene[0][i]].position.y - this.scene.children[this.f3d_scene[0][i+1]].position.y;
				let z_diff = this.scene.children[this.f3d_scene[0][i]].position.z - this.scene.children[this.f3d_scene[0][i+1]].position.z;
				let scale_x_diff = this.scene.children[this.f3d_scene[0][i]].scale.x - this.scene.children[this.f3d_scene[0][i+1]].scale.x;
				let scale_y_diff = this.scene.children[this.f3d_scene[0][i]].scale.y - this.scene.children[this.f3d_scene[0][i+1]].scale.y;
				let scale_z_diff = this.scene.children[this.f3d_scene[0][i]].scale.z - this.scene.children[this.f3d_scene[0][i+1]].scale.z;
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
					let sphere = this.Sphere(0xff0000);
					sphere.position.x = this.scene.children[this.f3d_scene[0][i]].position.x - token_position_x*(s+1);
					sphere.position.y = this.scene.children[this.f3d_scene[0][i]].position.y - token_position_y*(s+1);
					sphere.position.z = this.scene.children[this.f3d_scene[0][i]].position.z - token_position_z*(s+1);
					sphere.scale.x = this.scene.children[this.f3d_scene[0][i]].scale.x - token_scale_x*(s+1);
					sphere.scale.y = this.scene.children[this.f3d_scene[0][i]].scale.y - token_scale_y*(s+1);
					sphere.scale.z = this.scene.children[this.f3d_scene[0][i]].scale.z - token_scale_z*(s+1);
					sphere.name = 'interpolation_'+i+'_'+s;
					this.group.add( sphere );
				}
				
					
			}
			this.render();
			//ciclo fra tutte le sfere
			//retta che connette le due sfere
			//a secoda della sua lunghezza creo n token, sia posizione che scala
			//scene.children[this.f3d_scene[0][i]].position
			//scene.children[this.f3d_scene[0][i]].scale
			//creo n sfere di posizione token e scala += token_scala
		}
		//console.log(JSON.stringify(this.scene));
	}
	
	mouseup( event ){
	        this.info2.innerHTML = '';
		this.draw_mode = false;
		if(this.indexPickedObject || this.indexPickedObject !== undefined){
			this.indexPickedObject = undefined;
			var scene = f.getScene();
			this.group.children.length = 0;
						
		}
		this.render();
		if(this.f3d_scene[0].length > 1){
			this.interpolateSpheres();
		}
		
		/*
		//var matched = r.Recognize(gest);
		//console.log(matched);
		var geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3( _3dminX, 1, _3dminZ ) );
		geometry.vertices.push( new THREE.Vector3( _3dminX, 1, _3dmaxZ ) );
		geometry.vertices.push( new THREE.Vector3( _3dminX, 1, _3dminZ ) );
		geometry.vertices.push( new THREE.Vector3( _3dmaxX, 1, _3dminZ ) );
		geometry.vertices.push( new THREE.Vector3(   _3dmaxX, 1, _3dmaxZ ) );
		geometry.vertices.push( new THREE.Vector3( _3dmaxX, 1,  _3dminZ) );
		geometry.vertices.push( new THREE.Vector3(   _3dmaxX, 1, _3dmaxZ ) );
		geometry.vertices.push( new THREE.Vector3( _3dminX, 1,  _3dmaxZ) );
		var material = new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 1, transparent: false } );
		var line = new THREE.LineSegments( geometry, material );
		this.scene.add( line );
		var width = _3dmaxX -_3dminX;
		var height = _3dmaxZ -_3dminZ;
		switch(matched.Name){
			case "rectangle":
				//console.log('width '+width+', height '+height);
				var geometry = new THREE.BoxGeometry( width, 1 , height );
				geometry.translate(_3dminX+width/2, 1, _3dminZ+height/2);
				var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
				var cube = new THREE.Mesh( geometry, material );
				this.scene.add( cube );
				break;
			case "circle":
				if(width<height){
					var radius = width/2;
				}else{
					var radius = height/2;
				}
				var circleGeometry = new THREE.SphereGeometry( radius, 32, 32 );
				circleGeometry.translate(_3dminX+width/2, 3, _3dminZ+height/2);
				points.push(
					new THREE.Vector3(_3dminX+width/2, 3, _3dminZ+height/2)
				);
				var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
				var circle = new THREE.Mesh( circleGeometry, material );
				this.scene.add( circle );
				circle_in_scene++;
				this.draw_circle_link();
				break;
			case "triangle":
			case "x":
			case "arrow":
			case "delete":
			case "star":
			case "pigtail":
				console.log('unsupported sign');
				break;
			case "v":
			case "left square bracket":
			case "right square bracket":
			case "left curly brace":
			case "right curly brace":
			case "check":
			case "caret":
			case "zig-zag":
				//this.drawPolyline();
				//this.sketch();
				this.drawTube();
			//}
			break;
			default:
				console.log(mystroke);
				var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(mystroke[0].position.x, 1, mystroke[0].position.z));
				geometry.vertices.push(new THREE.Vector3(mystroke[1].position.x, 1, mystroke[1].position.z));
				var line = new THREE.Line(geometry, material);
				this.scene.add(line);
		}
		*/
	//document.getElementById('coordinates').innerText =  '_3dmaxX '+_3dmaxX+' _3dminX '+_3dminX+' _3dmaxZ '+_3dmaxZ+' _3dminZ '+_3dminZ;	               
		gest = new Array();
		mystroke = new Array();
		draw = new Array();

		this.render();	
	}
	
	onDocumentKeyDown( event ) {
		switch( event.keyCode ) {
			case 16: this.isShiftDown = true; break;
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
