class Snake {
  SNAKE_SIZE = 20;

  snake = [];
  head = {};
  tail = {};
  direction = null;
  velocity = 25;
  positionX = null;
  positionY = null;
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
    this.direction = "right";
    this.positionX = 260;
    this.positionY = 260;
    this.snake.push(this.head);
  }

  draw() {
    this.ctx.fillStyle = "#ccc";
    this.head.x = this.positionX;
    this.head.y = this.positionY;

    this.snake.forEach((square, index) => {
      if (index === 0) {
        this.ctx.fillRect(square.x, square.y, this.SNAKE_SIZE, this.SNAKE_SIZE);
      } else {
        this.ctx.fillRect(square.x, square.y, this.SNAKE_SIZE, this.SNAKE_SIZE);
      }
    });

    this.snakeMovement();
    this.tailMovement();
  }

  addTail() {
    this.tail = { x: this.head.x, y: this.head.y };
    this.snake.push(this.tail);
  }

  tailMovement() {
    for (let i = this.snake.length - 1; i > 0; i--) {
      this.snake[i].x = this.snake[i - 1].x;
      this.snake[i].y = this.snake[i - 1].y;
    }
  }

  snakeDirection(direction) {
    switch (direction) {
      case "right":
        if (this.direction !== "left") {
          this.direction = "right";
        }
        break;
      case "left":
        if (this.direction !== "right") {
          this.direction = "left";
        }
        break;
      case "up":
        if (this.direction !== "down") {
          this.direction = "up";
        }
        break;
      case "down":
        if (this.direction !== "up") {
          this.direction = "down";
        }
        break;
    }
  }

  snakeMovement() {
    switch (this.direction) {
      case "right":
        this.positionX += this.velocity;
        break;
      case "left":
        this.positionX -= this.velocity;
        break;
      case "up":
        this.positionY -= this.velocity;
        break;
      case "down":
        this.positionY += this.velocity;
        break;
    }
  }
}
