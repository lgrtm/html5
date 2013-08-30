// Define variables for effect.
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;
var canvas;
var context;
var centerx = 320;
var centery = 240;
var seno = 0;
var contador = 0;
var angulo = 0;
var newposx = 0;
var newposy = 0;

// Callback to start
init();

function init() {

	canvas = document.getElementById( 'canvas' );

	if (canvas && canvas.getContext)
	{
		context = canvas.getContext('2d');
		trace = document.getElementById("debug");

		document.addEventListener('mousemove', documentMouseMoveHandler, false);
		window.addEventListener('resize', windowResizeHandler, false);

		windowResizeHandler();

		setInterval( loop, 1000 / 50 );

	}
}


// Position of mouse
function documentMouseMoveHandler(event) {
	mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * .5;
	mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * .5;
}



// Resize windows
function windowResizeHandler() {
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT;
	canvas.style.position = 'absolute';
	canvas.style.left = (window.innerWidth - SCREEN_WIDTH) * .5 + 'px';
	canvas.style.top = (window.innerHeight - SCREEN_HEIGHT) * .5 + 'px';
}


// Loop for frame
function loop() {
	// Mouse coordinates.
	mx = mouseX;
	my = mouseY;
	// Calculates degrees from position mouse.
	angulo = Math.atan2(my-centery, mx-centerx);

	// Clear the frame
	context.strokeStyle = "#000";
	context.lineWidth = 1;
	context.fillStyle = 'rgba(200,200,200,1)';
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	// Ref. to html5 http://www.w3schools.com/tags/ref_canvas.asp
	// One circle with a line
	context.beginPath();
	context.save();
	context.translate(centerx,centery);
	context.rotate(angulo);
	context.moveTo(0,0);
	context.lineTo(50,0);
	context.stroke();
	context.closePath();

	// Another circle fill
	context.beginPath();
	context.fillStyle = "#008000";
	context.arc(0,0,8,0,Math.PI*2,true);
	context.fill();
	context.stroke();
	context.closePath();

	context.restore();
	context.closePath();
	// debugging
	trace.innerHTML =

	"mouseX :" + mx +"<br />"+
	"mouseY :" + my +"<br />"+
	"degrees PI:" + angulo +"<br />";
}
