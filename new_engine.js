var context = document.getElementById('canvas1').getContext("2d");
	
var img = new Image();
img.onload = function () {
    context.drawImage(img, 0, 0);
}
img.src = "images/watermelon-duck.png";
