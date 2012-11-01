var SCREEN_WIDTH = 512;
var SCREEN_HEIGHT = 512;
	
var canvas;
var context;
	


var newposx = 0;
var newposy = 0;
	
		
var posx = 256;
var posy = 256;
var vx = vy = 512;


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



		// Cogemos coordenadas del raton
		mx = mouseX;
		my = mouseY;
		angulo = Math.atan2(my-posy, mx-posx);



		// Trabajamos en el canvas
		// limpiando por cada frame todo
		context.strokeStyle = "#000";
		context.lineWidth = 1;
		context.fillStyle = 'rgba(255,255,255,1)';
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);



		// Aquí ya trabajamos con funciones de la api.
		// Con angulo obtenemos los grados para girar el canvas sobre la perpenticular del raton
		// con la funcion atan2. Lo que hacemos con context (que es el canvas), es decirle con save
		// que nos grabe su posicion (la esquina superior izquierda es la posicion 0,0)
		// asi que despues le decimos que queremos mover su posicion 0,0 a nuestro centro del canvas,
		// donde tenemos asignado el canvas, ahora el 0,0 del canvas es en realidad 256,256 del canvas.
		// Desde este centro podremos hacer las rotaciones correctamete, le decimos que empieze a pintar
		// con beginPath, al usar la funcion moveTo vamos a pintar en el centro actual, así que nos disponemos 
		// a dibujar un arco de 46 pixeles de radio,	como el context empezará a dibujar desde la posicion 0,0 
		// los dibujará la linea y después empezara	con el círculo, con stroke le decimos que pinte sin rellenar
		// y cerramos el path.
		context.beginPath();

		context.save();
		context.translate(posx,posy);
		context.rotate(angulo);		
		context.moveTo(0,0);
		context.arc(0,0,46,0,Math.PI*2,true);
		context.stroke();
		context.closePath();



		// Aquí pintamos el circulo verde en el centro de circulo anterior en verde,
		// debemos indicarle nuevamente que inicie otro path para dibujar otro circulo
		// con fill, le decimos que nos rellene el circulo
		context.beginPath();
		context.fillStyle = "#008000";
		context.arc(0,0,18,0,Math.PI*2,true);  
		context.fill();
		context.closePath();

		context.restore();



		context.closePath();


		// recuperamos datos para debuggear el código
		trace.innerHTML =

		"mouseX :" + mx +"<br />"+
		"mouseY :" + my +"<br />"+
		"vectorX :" + vx +"<br />"+
		"vectorY :" + vy +"<br />"+
		"angulo en PI:" + angulo +"<br />";
		
}
	
	