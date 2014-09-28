window.onload = function() {
    var
        turn = 0,
        blocks = document.getElementsByClassName('block'),
        WINNING_MOVES = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ],
        gameRunning = true,
        playerOneColor = 'rgb(119, 128, 241)',
        playerTwoColor = 'rgb(69, 74, 138)',
        reset = document.getElementById('reset'),
        gameOver = document.getElementById('gameOverText'),
        resetButton = document.getElementById('resetButton');
        checkBlock = 0;

    for (var i = 0, x = blocks.length; i < x; i++) {
        blocks[i].onclick = function() {
            if (gameRunning) {
                setBlock(turn, this);
            }
        };
    }

    function setBlock(player, block) {
        if (player === 0 && block.style.backgroundColor != playerTwoColor) {
            block.style.backgroundColor = playerOneColor;
            turn = 1;
            block.taken = 0;
        } else if (player === 1 && block.style.backgroundColor != playerOneColor) {
            block.style.backgroundColor = playerTwoColor;
            turn = 0;
            block.taken = 1;
        }
        
        checkForVictory(player);
        checkBlock++;
        checkTie();
    }

    function checkForVictory(playerToCheck) {
        for (var i = WINNING_MOVES.length - 1; i >= 0; i--) {
            if (blocks[WINNING_MOVES[i][0]].taken == playerToCheck &&
                blocks[WINNING_MOVES[i][1]].taken == playerToCheck &&
                blocks[WINNING_MOVES[i][2]].taken == playerToCheck) {
                gameRunning = false;
                blocks[WINNING_MOVES[i][0]].style.backgroundColor = '#5d914c';
                blocks[WINNING_MOVES[i][1]].style.backgroundColor = '#5d914c';
                blocks[WINNING_MOVES[i][2]].style.backgroundColor = '#5d914c';

                reset.style.backgroundColor = 'rgba(100, 100, 100, 0.7)';
                gameOver.innerHTML = 'Player ' + (playerToCheck + 1) + ' is the winner!';
                resetButton.style.display = 'block';
            }
        }
        return false;
    }

    function checkTie() {
    	if (checkBlock === 9) {
    		gameRunning = false;
    		reset.style.backgroundColor = 'rgba(100, 100, 100, 0.7)';
            gameOver.innerHTML = 'It\'s a tie!';
            resetButton.style.display = 'block';
    	}
    }

    resetButton.onclick = function(){
  		for (var i = 0, x = blocks.length; i < x; i++) {
  			blocks[i].style.backgroundColor = 'white';
  			blocks[i].taken = null;
  		}
  		reset.style.backgroundColor = 'rgba(100, 100, 100, 0.0)';
  		gameOver.innerHTML = '';
		resetButton.style.display = 'none';
    	turn = 0;
    	gameRunning = true;
    	checkBlock = 0;
    }
};