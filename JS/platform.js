var canvas = document.getElementById('platform'), ctx = canvas.getContext('2d');

function setScreen(){
	canvas.width = 800;
	canvas.height = 600;
}

setScreen();

window.onresize = function() {
	setScreen();
};

var terrain = [], player, jumping = true, keys = [], lastBlock = 400;

function init() {
	generate();

	lava = {
		x: 0,
		y: 540,
		w: 800,
		h: 60
	};

	player = {
		x: 210,
		y: 300,
		w: 40,
		h: 40,
		vx: 5,
		vy: 4
	};

	draw();
	setTimeout(tick, 3000);
}

function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for (var i = 0, x = terrain.length; i < x; i++){
		var t = terrain[i];
		ctx.fillStyle = '#2c2e2d';
		ctx.fillRect(t.x, t.y, t.w, t.h);
	}

	ctx.fillStyle = '#2d8da5';
	ctx.fillRect(player.x, player.y, player.w, player.h);

	ctx.fillStyle = '#e93626';
	ctx.fillRect(lava.x, lava.y, lava.w, lava.h);
}

function update() {
	if (keys[38] || keys[87]){
	    if (!jumping){
			jumping = true;
			player.vy = -12;
		}
	}

	if (keys[37] || keys[65]){
		player.x -= player.vx;
	}

	if (keys[39] || keys[68]){
		player.x += player.vx;
	}

	player.y += player.vy;

	player.vy += 0.4;

	if (player.y > canvas.height){
		player.x = 210;
		player.y = 300;
		player.vy = 0;
		jumping = false;
	}

	if (player.x + player.w > canvas.width){
		player.x = canvas.width - player.w;
	}

	if (player.x < 0){
		player.x = 0;
		console.log('game over');
	}

	for (var j = 1, y = terrain.length; j < y; j++) {
		terrain[j].x -= 5;
		if (terrain[j].x < 0){
			// terrain.splice(j, 1);
		}
	}

	for (var i = 0, x = terrain.length; i < x; i++) {
		var t = terrain[i];

		// Terrain collision

		// Left

		if (player.x + player.w > t.x &&
			player.x < t.x &&
			player.y + 5 < t.y + t.h &&
			player.y + player.h - 5 > t.y){
			player.x = t.x - player.w;
		}

		// Right

		if (player.x < t.x + t.w &&
			player.x + player.w > t.x &&
			player.y + 10 < t.y + t.h &&
			player.y + player.h - 10 > t.y){
			player.x = t.x + t.w;
		}

		// Bottom

		if (player.x < t.x + t.w &&
			player.x + player.w > t.x &&
			player.y < t.y + t.h &&
			player.y + player.h > t.y + t.h){
			player.y = t.y + t.h;
			player.vy = 8;
		}

		// Top

		if (player.x < t.x + t.w &&
			player.x + player.w > t.x &&
			player.y < t.y + t.h &&
			player.y + player.h > t.y){
				jumping = false;
				player.y = t.y - player.h;
				player.vy = 0;
		}
	}
}

document.body.addEventListener("keydown", function(e) {
	e.preventDefault();
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

init();

function tick() {
    draw();
    update();
	requestAnimationFrame(tick);
}
