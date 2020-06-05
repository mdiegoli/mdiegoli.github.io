function Point3DToScreen2D(point3D){
            var screenX = 0;
            var screenY = 0;
            var inputX = point3D.x - camera.position.x;
            var inputY = point3D.y - camera.position.y;
            var inputZ = point3D.z - camera.position.z;
            var aspectRatio = renderer.domElement.width / renderer.domElement.height;
            screenX = inputX / (-inputZ * Math.tan(camera.fov/2));
            screenY = (inputY * aspectRatio) / (-inputZ * Math.tan(camera.fov / 2));
            screenX = screenX * renderer.domElement.width;
            screenY = renderer.domElement.height * (1-screenY);
            return {x: screenX, y: screenY};
        }
