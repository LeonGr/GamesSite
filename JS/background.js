var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var particles = [], frames = 60, x = 2000

for (var i = 0; i < x; i++) {
	particles.push({
		x: Math.random() * canvas.width,
	    y: Math.random() * canvas.height,
	    radius: Math.random(),
	    vx: Math.floor(Math.random() * 10) - 5,
	    vy: Math.floor(Math.random() * 10) - 5
	});
}

function drawBackground() {
	context.clearRect(0,0, canvas.width, canvas.height);

	for (var i = 0, x = particles.length; i < x; i++) {
		var s = particles[i];

		context.fillStyle = "#202020";
	    context.beginPath();
	    context.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
	    context.fill();
	}
}

function updateBackground(){
	for (var i = 0, x = particles.length; i < x; i++) {
	    var s = particles[i];
	  
	    s.x += s.vx / frames;
	    s.y += s.vy / frames;

	    if (s.x + s.radius > canvas.width){
	      s.vx = -s.vx
	    }
	    
	    if (s.x - s.radius < 0){
	      s.vx = -s.vx
	    }
	    
	    if (s.y + s.radius > canvas.height){
	      s.vy = -s.vy
	    }
	    
	    if (s.y - s.radius < 0){
	      s.vy = -s.vy
	    }
	}
}

function tickBackground(){
	drawBackground();
	updateBackground();
}

setInterval(tickBackground, 1000 / frames);