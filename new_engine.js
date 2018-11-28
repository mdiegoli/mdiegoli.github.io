var context = document.getElementById('canvas1').getContext("2d");
	
var img = new Image();
img.onload = function () {
    context.drawImage(img, 0, 0);
}
img.src = "images/watermelon-duck.png";

/*alien:
draw multi sprite
sprites
audio
animation
health
bullet
move()
hit()
sound()
fire()
*/
