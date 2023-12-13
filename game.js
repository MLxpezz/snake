class Game {
  //constantes
  SQUARE_SIZE = 30;
  CANVAS_WIDTH = 600;
  CANVAS_HEIGHT = 600;
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
  score = 0;

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
      this.ctx.fillStyle = "#011140";
      this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
      this.snake.draw();
      this.logic();
    }, 100);
  }

  logic() {
    this.createFood();
    this.movement();
    this.detectColission();
    this.drawScore();
  }

  movement() {
    document.addEventListener("keypress", (e) => {
      this.snake.snakeDirection(this.DIRECTION[e.key]);
    });
  }

  createFood() {
    if (!this.food) {
      const randomX = Math.floor(Math.random() * (this.CANVAS_WIDTH - this.SQUARE_SIZE));
      const randomY = Math.floor(Math.random() * (this.CANVAS_HEIGHT - this.SQUARE_SIZE));

      this.food = { x: randomX, y: randomY };
    }

    this.ctx.fillStyle = "#0420BF";
    this.ctx.fillRect(
      this.food.x,
      this.food.y,
      this.SQUARE_SIZE,
      this.SQUARE_SIZE
    );
  }

  detectColission() {
    //checar si la serpiente esta en la misma posicion qe la comida
    if (
      this.snake.positionX + this.SQUARE_SIZE >= this.food.x &&
      this.snake.positionX <= this.food.x + this.SQUARE_SIZE &&
      this.snake.positionY <= this.food.y + this.SQUARE_SIZE &&
      this.snake.positionY + this.SQUARE_SIZE >= this.food.y
    ) {
      this.food = null;
      this.snake.addTail();
      this.score++;
    }//checar si la serpiente sale de la pantalla
    if (
      this.snake.positionY + this.SQUARE_SIZE <= 0 ||
      this.snake.positionX >= this.CANVAS_WIDTH ||
      this.snake.positionY >= this.CANVAS_HEIGHT ||
      this.snake.positionX + this.SQUARE_SIZE <= 0
    ) {
      clearInterval(this.director);
      this.gameOver();
    }

    //checar si la cabeza de la serpiente choca con su cuerpo
    for (let i = 1; i < this.snake.snake.length; i++) {
      if (
        this.snake.positionX === this.snake.snake[i].x &&
        this.snake.positionY === this.snake.snake[i].y
      ) {
        clearInterval(this.director);
        this.gameOver();
      }
    }
  }

  drawScore() {
    document.querySelector('.score').textContent = `Score: ${this.score}`;
  }

  gameOver() {
    document.querySelector('.modal').style.display = 'flex';
    document.querySelector('.scoreShow').textContent = `Puntaje: ${this.score}`;
  }
};