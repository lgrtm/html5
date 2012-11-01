var SCREEN_WIDTH = 512;
var SCREEN_HEIGHT = 512;
	
var canvas;
var context;
	
var cantidad = 8;
var mouseX = (window.innerWidth - SCREEN_WIDTH);
var mouseY = (window.innerHeight - SCREEN_HEIGHT);
var newposx = 0;
var newposy = 0;

var posx,posy,mx,my,vx,vy = 0;

var seno = 0;
var contador = 0;
var angulo = 0;
var matrix= []; 


init();

function init() {

		canvas = document.getElementById( 'world' );
		
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


function documentMouseMoveHandler(event) {
		mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * .5;
		mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * .5;
	}
	
function windowResizeHandler() {
		canvas.width = SCREEN_WIDTH;
		canvas.height = SCREEN_HEIGHT;
		canvas.style.position = 'absolute';
		canvas.style.left = (window.innerWidth - SCREEN_WIDTH) * .5 + 'px';
		canvas.style.top = (window.innerHeight - SCREEN_HEIGHT) * .5 + 'px';
	}




function loop() {
	
		
		posx = 32*2;
		posy = 32*2;
		vx = vy = 64*2;
		
		mx = mouseX;
		my = mouseY;

		context.strokeStyle = "#fff";
		context.lineWidth = 1;
		context.fillStyle = 'rgba(0,0,0,.25)';
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);

		

		for (var i = 0 ; i < 8/2 ; i++)
		{
			for (var j = 0 ; j < 8/2; j++)
			{
			contador += .0001;
			seno = Math.sin(contador)*2;
			angulo = Math.atan2(my-posy, mx-posx);
			context.beginPath();
			context.save();
			context.translate(posx,posy);
			context.rotate(angulo);
			context.scale(seno,seno);
			context.moveTo(0,0);


			context.arc(0,0,16,0,Math.PI*2,true);  
			context.stroke();
			context.closePath();

			context.beginPath();
			context.fillStyle = "#080";
			context.arc(0,0,8,0,Math.PI*2,true);  
			context.fill();
			context.closePath();

			context.restore();

			posx += vx;

			}
			posy += vy;
			posx = 32*2;

		}

			context.closePath();


		trace.innerHTML =

		"mouseX:" + mx +"<br />"+
		"mouseY:" + my +"<br />"+
		"vectorX:" + vx +"<br />"+
		"vectorY:" + vy +"<br />"+
		"angulo:" + angulo +"<br />";
		
}
	
	