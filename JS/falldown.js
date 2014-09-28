window.onload = function() {

  // Set up canvas

  var falldown = document.getElementById('falldown'),
      ctx = falldown.getContext('2d');

  function setScreen(){
      falldown.width = window.innerWidth * 0.7;
      falldown.height = window.innerHeight * 0.8;
    }

    setScreen();

    window.onresize = function(){
      setScreen();
    };

  function clickToStart(){
    falldown.addEventListener('mousedown', start, true);

    ctx.fillStyle = 'white';
    ctx.font = 'Bold 50px Arial';
    ctx.fillText('[CLICK TO START]', falldown.width * 0.5, falldown.height * 0.5);
  }

  // Declare variables

  var FPS = 60,
  player = {
    x: falldown.width * 0.5 - 25,
    y: falldown.height - 50,
    vx: 10,
    h: 50,
    w: 50,
    color: '#4DA3FF'
  },
  objects = [],
  colors = ['#CF2B2B', '#FF0000', '#DE5900', '#FF7700', '#B30000'],
  keys = [],
  score = 0,
  stars = [],
  powerUps = [],    
  highScore = 0,
  fallSpeed = 400;    

  function start(){
    setInterval(function(){
      draw();
      update();
    }, 1000 / FPS);

    falldown.removeEventListener('mousedown', start, true);
  }

  // Generate object

  function generate(){
    objects.push({
      x: Math.floor(Math.random() * (falldown.width - 50)),
      y: Math.floor(Math.random() * 1) - 100,
      h: 50,
      w: 50,
      vy: fallSpeed,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function powerUp(){
    powerUps.push({
      x: Math.floor(Math.random() * (falldown.width - 50)),
      y: Math.floor(Math.random() * 1) - 100,
      radius: 25,
      color: '00f2c8',
      vy: fallSpeed * 0.8
    });
  }

  for (var i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * falldown.width,
      y: Math.random() * falldown.height,
      radius: Math.random(),
      vx: Math.floor(Math.random() * 10) - 5,
      vy: Math.floor(Math.random() * 10) - 5
    });
  }

  function game_over(){
    for (var i = 0, x = objects.length; i < x; i++) {
      var o = objects[i];
      
      o.vy = 0;
      
      falldown.addEventListener('mousedown', restart, true);
    }
    
    for (var i = 0, x = powerUps.length; i < x; i++) {
      var p = powerUps[i];
      
      p.vy = 0;
    }
    
    player.vx = 0;
    
    ctx.fillStyle = 'white';
    ctx.font = 'Bold 100px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', falldown.width * 0.5, falldown.height * 0.5 - 80);
    
    ctx.fillStyle = 'white';
    ctx.font = 'Bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('[CLICK TO RESTART]', falldown.width * 0.5, falldown.height * 0.5 + -20);
    
    ctx.fillStyle = 'white';
    ctx.font = 'Bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('FINAL SCORE: ' + score, falldown.width * 0.5, falldown.height * 0.5 + 80);
    
    if (score > highScore){
      ctx.fillStyle = 'white';
      ctx.font = 'Bold 30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('NEW HIGHSCORE!', falldown.width * 0.5, falldown.height * 0.5 + 150);
      
      highScore = score;
    }
  }

  function restart(){
    player.vx = 10;
    objects = [];
    powerUps = [];
    fallSpeed = 400;
    score = 0;
    generate();

    falldown.removeEventListener('mousedown', restart, true);
  }

  // Draw the scene and all objects

  function draw(){
    ctx.clearRect(0,0,falldown.width,falldown.height);
    
    for (var i = 0, x = stars.length; i < x; i++) {
      var s = stars[i];
    
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x,player.y,player.w,player.h);
    
    for (var i = 0, x = objects.length; i < x; i++) {
      var o = objects[i];
      
      ctx.fillStyle = o.color;
      ctx.fillRect(o.x,o.y,o.w,o.h);
    }
    
    for (var i = 0, x = powerUps.length; i < x; i++) {
      var p = powerUps[i];
      
      ctx.fillStyle = '#00f2c8';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 30px Helvetica';
    ctx.textAlign = 'center';
    ctx.fillText(score, falldown.width * 0.5, 30);
  }

  // Update object and player location + check for collisions

  function update(){
    for (var i = 0, x = stars.length; i < x; i++) {
      var s = stars[i];
    
      s.x += s.vx / FPS;
      s.y += s.vy / FPS;
      
      if (s.x + s.radius > falldown.width){
        s.vx = -s.vx
      }
      
      if (s.x - s.radius < 0){
        s.vx = -s.vx
      }
      
      if (s.y + s.radius > falldown.height){
        s.vy = -s.vy
      }
      
      if (s.y - s.radius < 0){
        s.vy = -s.vy
      }
    }
     // Check for movement by player
      
    if(keys['65'] || keys['37']){
      player.x -= player.vx;
    }
    
    if(keys['68'] || keys['39']){
      player.x += player.vx;
      }
    
    if(player.x < 0){
      player.x = 0;
    }
    
    if (player.x + player.w > falldown.width){
      player.x = falldown.width - player.w;
    }
    
    for (var i = 0, x = objects.length; i < x; i++) {
      var o = objects[i];
      
      // Move object down
      o.y += o.vy / FPS;
      
      // Check if object is out of view and generate new one
      
      if (o.y > falldown.height){
        objects.splice(i,1);
        score += 1;
        generate();
      }
      
      if (o.y + o.h > player.y && o.x + o.w > player.x && o.x < player.x + player.w){
        game_over();
      }
    }
    
    for (var i = 0, x = powerUps.length; i < x; i++) {
      var p = powerUps[i];
      
      p.y += p.vy / FPS;
      
      if (p.y - p.radius > falldown.height){
        powerUps.splice(i,1);
      }
      
      if (p.y + p.radius > player.y && p.x + p.radius > player.x && p.x < player.x + player.w){
        powerUps.splice(i,1);
        
        fallSpeed = fallSpeed * 0.5;
        
        setTimeout(function(){
          fallSpeed = fallSpeed * 2;
        },5000);
      }
    }  
  }

  document.body.addEventListener('keydown', function (e) {
      keys[e.keyCode] = true;
  });

  document.body.addEventListener('keyup', function (e) {
      keys[e.keyCode] = false;
  });

  setInterval(generate, Math.floor(Math.random() * 2000) + 1000);

  setInterval(powerUp, Math.floor(Math.random() * 40000) + 20000);

  setInterval(function(){
    fallSpeed += 10;
  }, Math.floor(Math.random() * 2000) + 1000);

  generate();

  draw();

  clickToStart();
}