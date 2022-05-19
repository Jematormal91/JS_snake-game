// Snake game: use arrow keys to move snake around grid to eat an apple. Randomized apple location and snake grows as it eats.


var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;
var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  spaces: [],
  maxSpaces: 4
};
var apple = {
  x: 320,
  y: 320
};

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// game loop
function loop() {
  // RequestAnimationFrame method info: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  requestAnimationFrame(loop);

  // slow game loop to 15 fps instead of 60 (60/15 = 4)
  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  // move snake by it's velocity
  snake.x += snake.dx;
  snake.y += snake.dy;

  // wrap snake position horizontally on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  
  // wrap snake position vertically on edge of screen
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // keep track of where snake has been. front of the array is always the head
  snake.spaces.unshift({x: snake.x, y: snake.y});

  // remove spaces as we move away from them
  if (snake.spaces.length > snake.maxSpaces) {
    snake.spaces.pop();
  }

  // draw apple
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  // draw snake one cell at a time
  context.fillStyle = 'green';
  snake.spaces.forEach(function(cell, index) {
    
    // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
    context.fillRect(cell.x, cell.y, grid-1, grid-1);  

    // snake eats apple
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxSpaces++;


      apple.x = random(0, 25) * grid;
      apple.y = random(0, 25) * grid;
    }

    for (var i = index + 1; i < snake.spaces.length; i++) {
      

      if (cell.x === snake.spaces[i].x && cell.y === snake.spaces[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.spaces = [];
        snake.maxSpaces = 4;
        snake.dx = grid;
        snake.dy = 0;

        apple.x = random(0, 25) * grid;
        apple.y = random(0, 25) * grid;
      }
    }
  });
}

document.addEventListener('keydown', function(e) {
  
  // left arrow key
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// start the game
requestAnimationFrame(loop);