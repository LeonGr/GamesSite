window.onload = function(){

	var pong = document.getElementById("pong"), ctx = pong.getContext("2d");

	function setScreen(){
		pong.width = window.innerWidth * 0.7;
		pong.height = window.innerHeight * 0.8;
	}

	setScreen();

	window.onresize = function(){
		setScreen();
	}

	var FPS = 60, score1 = 0, score2 = 0, timer = null, hits = 0, ball = [];

	var upPressed, downPressed, wPressed, sPressed;

	for (var i = 0; i < 1; i++){
	  ball.push({
	    x: pong.width * 0.5,
	    y: pong.height * 0.5,
	    ax: 0,
	    ay: 0,
	    vx: 0,
	    vy: 0,
	    radius: 8,
	    color: "black"
	  });
	}

	var objs = [];

	objs.push({
	  x: 0,
	  y: pong.height * 0.5 - 50,
	  l: 10,
	  h: 100,
	  color: "black"
	});

	objs.push({
	  x: pong.width - 10,
	  y: pong.height * 0.5 - 50,
	  l: 10,
	  h: 100,
	  color: "black"
	});

	    ctx.font = "bold 40px Helvetica";
	    ctx.fillText("[Click to start game]", pong.width * 0.5 - 180, 260);

	function start() {
		pong.removeEventListener("mousedown", start, true);

	    timer = setInterval(tick, 1000 / FPS);
	  
	    var player1 = objs[0];
	    var player2 = objs[1];
	    
	    player1.y = pong.height * 0.5 - 100;
	    player2.y = pong.height * 0.5 - 100;
	    
	  
	    var p = ball[0];
	  
	    var numbers = [-400,400];
	  
	    p.vx = numbers[Math.floor(Math.random()*2)];
	    p.vy = numbers[Math.floor(Math.random()*2)];
	  
	    p.x = pong.width * 0.5;
	    p.y = pong.height * 0.5;
	  
	    draw();
	}

	function draw() {
	   ctx.clearRect(0,0,pong.width,pong.height);
	  
	   ctx.beginPath();
	   ctx.strokeStyle = "black";
	   ctx.setLineDash([2,3]);
	   ctx.moveTo(pong.width * 0.5, 0);
	   ctx.lineTo(pong.width * 0.5, pong.height);      
	   ctx.stroke();

	   ctx.fillStyle = "black";
	   ctx.font = "bold 25px Helvetica";
	   ctx.fillText(hits, 40, 40);
	  
	   ctx.fillStyle = "black";
	   ctx.font = "bold 25px Helvetica";
	   ctx.fillText(score1, pong.width * 0.5 - 45, 40);
	  
	   ctx.fillStyle = "black";
	   ctx.font = "bold 25px Helvetica";
	   ctx.fillText(score2, pong.width * 0.5 + 35, 40);
	  
	  for (var i = 0; i < ball.length; i++){
	    var p = ball[i];
	    ctx.beginPath();
	    ctx.arc( p.x, p.y, p.radius, 0, 2 * Math.PI );
	    ctx.fillStyle = p.color;
	    ctx.fill();
	  }
	  
	  for (var i = 0; i < objs.length; i++){
	    var o = objs[i];
	    ctx.strokeStyle = o.color;
	    ctx.fillRect(o.x,o.y,o.l,o.h);
	  }
	}


	function update() {
	  for (var i = 0; i < ball.length; i++){
	    var p = ball[i];
	    
	    p.vx += p.ax / FPS;
	    p.vy += p.ay / FPS;
	    p.x += p.vx / FPS;
	    p.y += p.vy / FPS;
	    
	    if ( ( p.x - p.radius ) < 0 ) {
	      p.vx = 0;
	      p.vy = 0;
	    
	      game_over(2);
	     }
	    if ( ( p.x + p.radius ) > pong.width ) {
	      p.vx = 0;
	      p.vy = 0;

	      game_over(1);
	     }
	    if ( ( p.y - p.radius ) < 0 ) {
	      p.y = p.radius;
	      p.vy = -p.vy;
	     }
	    if ( ( p.y + p.radius ) > pong.height ) {
	      p.y = pong.height - p.radius;
	      p.vy = -p.vy;
	    }
	    
	    // collision
	    for (var i = 0; i < objs.length; i++){
	    
	      var o = objs[i];

	      if ( (p.x - p.radius ) < o.l && (p.y - p.radius) < o.h + o.y && (p.y + p.radius) > o.y) {
	        p.x = o.l + p.radius;
	        p.vx = -p.vx;
	        
	        p.vx *= 1.05;
	        p.vy *= 1.05;

	        hits += 1;
	      }
	      
	      if ( (p.x + p.radius)  > (pong.width - o.l) && (p.y - p.radius) < o.h + o.y && (p.y + p.radius) > o.y) {
	        p.x = pong.width - p.radius - o.l;
	        p.vx = -p.vx;
	        
	        p.vx *= 1.05;
	        p.vy *= 1.05;

	        hits += 1;
	      }
	      
	      
	      // out of screen
	      
	      if (o.y < 0){
	        o.y = 0;
	      }
	      
	      if (o.y + o.h > pong.height){
	        o.y = pong.height - o.h;
	      }
	    }
	    
	  }
	  
	  var player1 = objs[0];
	  var player2 = objs[1];
	  
	  if (upPressed){
	    player2.y -= 10;
	  }
	  
	  if (downPressed){
	    player2.y += 10;
	  }
	  
	  if (wPressed){
	    player1.y -= 10;
	  }
	  
	  if (sPressed){
	    player1.y += 10;
	  }
	}

	function game_over(player) {
		pong.addEventListener("mousedown", start, true);

		hits = 0;
	  
	      if (player == 1){
	        score1 += 1;
	      }
	      else if (player == 2){
	        score2 += 1;
	      }

	      var p = ball[0];

	      p.x = pong.width * 0.5;
	      p.y = pong.height * 0.5;
	  
	      ctx.fillStyle = "black";
	      ctx.font = "bold 100px Helvetica";
	      ctx.fillText("Game Over", pong.width * 0.5 - 270, 200);
	  
	      ctx.fillStyle = "black";
	      ctx.font = "bold 40px Helvetica";
	      ctx.fillText("Click to start again", pong.width * 0.5 - 180, 260);
	  
	      pong.addEventListener("mousedown", start, true);
	  
	      clearInterval(timer);
	}

	function tick() {
	  draw();
	  update();
	}

	  document.addEventListener("keydown", function(e) {
	      e.preventDefault();
	      if (e.keyCode == 38)
	          upPressed = true;
	      if (e.keyCode == 40)
	          downPressed = true;
	  });

	  document.addEventListener("keyup", function(e) {
	      if (e.keyCode == 38)
	          upPressed = false;
	      if (e.keyCode == 40)
	          downPressed = false;
	  });

	  document.addEventListener("keydown", function(e) {
	      if (e.keyCode == 87)
	          wPressed = true;
	      if (e.keyCode == 83)
	          sPressed = true;
	  });

	  document.addEventListener("keyup", function(e) {
	      if (e.keyCode == 87)
	          wPressed = false;
	      if (e.keyCode == 83)
	          sPressed = false;
	  });

	pong.addEventListener("mousedown", start, true);
};