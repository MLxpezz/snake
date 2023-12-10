class Snake {
  SNAKE_SIZE = 20;

  snake = [];
  head = {};
  tail = {};
  direction = null;
  velocity = 2;
  positionX = null;
  positionY = null;
  old_positionX = null;
  old_positionY = null;
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

    this.snake.map((square, index, snake_) => {
        if(index === 0) {
          this.ctx.fillRect(square.x, square.y, this.SNAKE_SIZE, this.SNAKE_SIZE);
        } else {
          this.ctx.fillRect(snake_[index].x, snake_[index].y, this.SNAKE_SIZE, this.SNAKE_SIZE);
        }
    });

    

    this.snakeMovement();
    this.tailMovement();
  }

  addTail() {
    this.old_positionX = this.positionX;
    this.old_positionY = this.positionY;
    this.tail = { x: this.old_positionX, y: this.old_positionY };
    this.snake.push(this.tail);
  }

  tailMovement() {
    this.snake.map((square, index) => {
      if(index !== 0) {
        square.x = this.head.x - this.SNAKE_SIZE;
        square.y = this.head.y - this.SNAKE_SIZE;
      }
    })
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
