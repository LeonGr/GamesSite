function generate() {
    terrain.push({
        x: 0,
        y: 0,
        w: 800,
        h: 60
    });

    // terrain.push({
    // 	x: 0,
    // 	y: 540,
    // 	w: 800,
    // 	h: 60
    // });

    // Define moving blocks here

    terrain.push({
        x: 400,
        y: 480,
        w: 60,
        h: 60
    });

    setInterval(function(){
        lastBlock += 80;
        terrain.push({
            x: lastBlock,
            y: Math.floor(Math.random() * 280) + 200,
            w: 60,
            h: 60
        });
    }, 1000);
}
