class Game {
  //constantes
  SQUARE_SIZE = 20;
  CANVAS_WIDTH = 500;
  CANVAS_HEIGHT = 500;
  DIRECTION = {
    d: "right",
    a: "left",
    w: "up",
    s: "down",
  };

  canvas = null;
  ctx = null;
  isLost = false;
  food = null;
  snake = null;
  director = null;

  constructor() {
    this.canvas = document.querySelector("canvas");
    this.canvas.width = this.CANVAS_WIDTH;
    this.canvas.height = this.CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext("2d");
    this.snake = new Snake(this.ctx);
    this.init = this.init.bind(this);
    this.init();
  }

  init() {
      this.director = setInterval(() => {
        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.snake.draw();
        this.logic();
      }, 100);
  }

  logic() {
    this.createFood();
    this.movement();
    this.detectColission();

  }

  movement() {
    document.addEventListener("keypress", (e) => {
      this.snake.snakeDirection(this.DIRECTION[e.key]);
    });
  }

  createFood() {
      if(!this.food) {
        const randomX = Math.floor(
          Math.random() * 400
        );
        const randomY = Math.floor(
          Math.random() * 400
        );
  
        this.food = { x: randomX, y: randomY };
      }

      this.ctx.fillStyle = "red";
      this.ctx.fillRect(
        this.food.x,
        this.food.y,
        this.SQUARE_SIZE,
        this.SQUARE_SIZE
      );
  }

  detectColission() {
    if (
      this.snake.positionX + this.SQUARE_SIZE >= this.food.x &&
      this.snake.positionX <= this.food.x + this.SQUARE_SIZE &&
      this.snake.positionY <= this.food.y + this.SQUARE_SIZE &&
      this.snake.positionY + this.SQUARE_SIZE >= this.food.y
    ) {
      this.food = null;
      this.snake.addTail();
    } if (this.snake.positionY < 0 || this.snake.positionX >= this.CANVAS_WIDTH || this.snake.positionY >= this.CANVAS_HEIGHT || this.snake.positionX + this.SQUARE_SIZE <= 0) {
      clearInterval(this.director);
    }

    for(let i = 0; i < this.snake.snake.length; i++) {
      for(let j = 1; j < this.snake.snake.length - 1; j++) {
        if(this.snake.snake[i] === this.snake.snake[j]) {
          clearInterval(this.director);
        }
      }
    }
  }
}

new Game();
