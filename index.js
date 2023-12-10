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
    this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.snake.draw();
    this.logic();
    requestAnimationFrame(this.init);
  }

  logic() {
    this.movement();
    this.createFood();
    this.detectColission();
  }

  movement() {
    document.addEventListener("keypress", (e) => {
      this.snake.snakeDirection(this.DIRECTION[e.key]);
    });
  }

  createFood() {
    if (this.food === null) {
      const randomX = Math.floor(
        Math.random() * this.CANVAS_WIDTH - this.SQUARE_SIZE
      );
      const randomY = Math.floor(
        Math.random() * this.CANVAS_HEIGHT - this.SQUARE_SIZE
      );

      this.food = { x: randomX, y: randomY };
    }

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.food.x, this.food.y, this.SQUARE_SIZE, this.SQUARE_SIZE);
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
    }
  }
}

new Game();

// const canvas = document.querySelector("canvas");
// canvas.width = 500;
// canvas.height = 500;
// const ctx = canvas.getContext("2d");
// ctx.fillStyle = "black";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// let food = null;

// const snake = new Snake(ctx);
// const direction = {
//   d: "right",
//   a: "left",
//   w: "up",
//   s: "down",
// };

// document.addEventListener("keypress", (e) => {
//   snake.snakeDirection(direction[e.key]);
// });

// const init = () => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = "black";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   snake.draw();
//   if (!food) {
//     createFood();
//   }
//   if(snake.positionX < food.x+10 && snake.positionX+10 > food.x &&
//     snake.positionY < food.y+10 && snake.positionY+10 > food.y) {
//     createFood();
//   }
//   ctx.fillStyle = "red";
//   ctx.fillRect(food.x, food.y, 10, 10);

//   requestAnimationFrame(init);
// };

// const createFood = () => {
//   const randomX = Math.floor(Math.random() * canvas.width-10);
//   const randomY = Math.floor(Math.random() * canvas.height-10);

//   food = { x: randomX, y: randomY };
// };

// init();
