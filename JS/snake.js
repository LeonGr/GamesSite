window.onload = function(){

var canvas = document.getElementById('snake');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.8;

var snake = [], direction = 'right', snakeWidth = 10, food, nx, ny, score = 0, tail;

function start(){
	food = {
		x: 10*Math.floor(Math.random() * (canvas.width / 10)), 
		y: 10*Math.floor(Math.random() * (canvas.height / 10))
	};

	snake = [];
	direction = 'right';
	nx = 0;
	ny = 0;
	score = 0;

	for (var i = 5; i > -1; i--) {
		snake.push({
			x: i,
			y: 0
		});
	}
}

function draw(){
	ctx.clearRect(0,0,canvas.width, canvas.height);

	for (var i = 0, x = snake.length; i < x; i++) {
		var s = snake[i];

		ctx.filStyle = 'black';
		ctx.fillRect(s.x * snakeWidth, s.y * snakeWidth, snakeWidth, snakeWidth);
		ctx.strokeStyle = 'white';
		ctx.strokeRect(s.x * snakeWidth, s.y * snakeWidth, snakeWidth, snakeWidth);
	}

	ctx.filStyle = '#4d4d4d';
	ctx.fillRect(food.x, food.y, snakeWidth, snakeWidth);
	ctx.strokeStyle = 'white';
	ctx.strokeRect(food.x, food.y, snakeWidth, snakeWidth);

	ctx.fillText('Score: ' + score, 5, canvas.height - 5);
}

function update(){

	nx = snake[0].x;
	ny = snake[0].y;

	for (var i = 6, x = snake.length; i < x; i++) {
		if (nx == snake[i].x && ny == snake[i].y){
			start();
		}
	}

	if (nx < -1){
		start();
	}

	if (nx * 10 > canvas.width){
		start();
	}

	if (ny < -1){
		start();
	}

	if (ny * 10 > canvas.height){
		start();
	}

	if(direction == 'right') { nx++; }
	if(direction == 'left') { nx--; }
	if(direction == 'up') { ny--; }
	if(direction == 'down') { ny++; }

	if (nx * 10 == food.x && ny * 10 == food.y){
		tail = { x: nx, y: ny};
		food = {
			x: 10*Math.floor(Math.random() * (canvas.width / 10)), 
			y: 10*Math.floor(Math.random() * (canvas.height / 10))
		};

		score++;
	}
	else {
		tail = snake.pop();
		tail.x = nx; tail.y = ny;
	}
	
	snake.unshift(tail);
}

function tick(){
	draw();
	update();
}

	document.addEventListener('keydown', function(e) {
		e.preventDefault();
		var key = e.keyCode;
	    if (key == 38  && direction != 'down' || key == 87 && direction != 'down'){
	        direction = 'up';
	    }
	    else if (key == 40  && direction != 'up' || key == 83 && direction != 'up'){
	        direction = 'down';
	    }
	    else if (key == 37 && direction != 'right' || key == 65 && direction != 'right'){
	        direction = 'left';
	    }
	    else if (key == 39 && direction != 'left' || key == 68 && direction != 'left'){
	        direction = 'right';
	    }
	  });

setInterval(tick, 50);

start();
};