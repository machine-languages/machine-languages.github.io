class CreateElements {
  constructor(root) {
    this.root = root;
    this.root.classList.add("snake---root");
    this.gridElement = document.createElement("div");
    this.gridElement.classList.add("snake---grid");
    this.newGameButton = document.createElement("div");
    this.newGameButton.classList.add("snake---new-game");
    this.newGameButton.innerText = "NEW GAME";
    this.root.appendChild(this.newGameButton);
    this.root.appendChild(this.gridElement);
    this.grid = [];
    for (let i = 0; i < 20; i++) {
      this.grid[i] = [];
      for (let j = 0; j < 20; j++) {
        this.square = document.createElement("div");
        this.square.classList.add(`snake---square${i}.${j}`);
        this.square.classList.add(`snake---square`);
        this.gridElement.appendChild(this.square);
        if (i == 0 || i == 19 || j == 0 || j == 19) {
          this.square.classList.add("snake---border");
        }
        this.grid[i][j] = {
          htmlElement: this.square,
          hasSnakeOnSquare: false,
          hasSnakeBody: false,
          hasApple: false
        };
      }
    }
  }
}
class Board {
  constructor(grid, snakeList) {
    //  This is the 2d board array
    this.snakeList = snakeList;
    this.grid = grid;
  }
  show() {
    let current = this.snakeList.tail;
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        // Clear the board first
        this.grid[i][j].htmlElement.classList.remove("snake---square-on");
        this.grid[i][j].htmlElement.classList.remove("snake---has-apple");
        this.grid[i][j].hasSnakeOnSquare = false;
        this.grid[i][j].hasSnakeBody = false;
        // Show apple
        if (this.grid[i][j].hasApple) {
          this.grid[i][j].htmlElement.classList.add("snake---has-apple");
        }
      }
    }
    // Show snake
    do {
      let x = current.x;
      let y = current.y;
      if (current.next != null) {
        this.grid[y][x].hasSnakeBody = true;
      }
      this.grid[y][x].htmlElement.classList.add("snake---square-on");
      this.grid[y][x].hasSnakeOnSquare = true;
      current = current.next;
    } while (current);
  }
}
// Define a snake node
class SnakeNode {
  constructor(next, y, x) {
    this.next = next;
    this.x = x;
    this.y = y;
  }
}
// Define linked list
class SnakeList {
  constructor() {
    this.tail;
    this.head;
    this.body;
  }
  reset() {
  }
}
class GameFlow {
  constructor(snakeList, root, board, grid, newGameButton, initializeSnake) {
    this.initializeSnake = initializeSnake;
    this.root = root;
    this.grid = grid;
    this.board = board;
    this.newGameButton = newGameButton;
    this.direction = "right";
    this.lastDirection = "";
    this.eventListeners();
    this.snakeList = snakeList;
    this.generateApple();
  }
  moveHead() {
    switch (this.direction) {
      case "left":
        this.snakeList.head.x -= 1;
        break;
      case "right":
        this.snakeList.head.x += 1;
        break;
      case "up":
        this.snakeList.head.y -= 1;
        break;
      case "down":
        this.snakeList.head.y += 1;
        break;
    }
  }
  moveBody() {
    let current = this.snakeList.tail;
    do {
      current.x = current.next.x;
      current.y = current.next.y;
      current = current.next;
    } while (current.next);
  }
  eatApple() {
    if (this.grid[this.snakeList.head.y][this.snakeList.head.x].hasApple) {
      this.addSnakeNode();
      this.grid[this.snakeList.head.y][this.snakeList.head.x].hasApple = false;
      console.log("WE RAN OVER AN APPLE");
      this.generateApple();
    }
  }
  randomNumber() {
    return Math.floor(Math.random() * 17) + 1;
  }
  generateApple() {
    let y = this.randomNumber();
    let x = this.randomNumber();
    if (!this.grid[y][x].hasSnakeOnSquare) {
      this.grid[y][x].hasApple = true;
    }
    else {
      this.generateApple();
    }
  }
  addSnakeNode() {
    this.snakeList.head.next = new SnakeNode(null, this.snakeList.head.y, this.snakeList.head.x);
    this.snakeList.head = this.snakeList.head.next;
  }
  checkForGameOver() {
    let x = this.snakeList.head.x;
    let y = this.snakeList.head.y;
    if (this.grid[y][x].hasSnakeBody || x > 18 || x < 1 || y > 18 || y < 1) {
      console.log("GAME OVER");
      clearInterval(this.turn);
      this.newGameButton.classList.remove("snake---hidden");
    }
  }
  changeTurn() {
    return this.turn = setInterval(() => {
      this.lastDirection = this.direction;
      this.moveBody();
      this.moveHead();
      this.board.show();
      this.eatApple();
      this.checkForGameOver();
    }, 100);
  }
  eventListeners() {
    this.newGameButton.addEventListener("click", () => {
      this.initializeSnake();
      this.direction = "right";
      this.changeTurn();
      this.newGameButton.classList.add("snake---hidden");
    });
    document.addEventListener("keydown", (event) => {
      if (event.repeat)
        return;
      if (event.keyCode == 37 && this.lastDirection != "right") {
        this.direction = "left";
      }
      if (event.keyCode == 39 && this.lastDirection != "left") {
        this.direction = "right";
      }
      if (event.keyCode == 40 && this.lastDirection != "up") {
        this.direction = "down";
      }
      if (event.keyCode == 38 && this.lastDirection != "down") {
        this.direction = "up";
      }
      console.log(this.direction);
    });
  }
}
export class Controller {
  constructor(root) {
    this.snakeList = new SnakeList();
    this.initializeSnake();
    this.createElements = new CreateElements(root);
    this.grid = this.createElements.grid;
    this.board = new Board(this.grid, this.snakeList);
    this.gameFlow = new GameFlow(this.snakeList, root, this.board, this.grid, this.createElements.newGameButton, this.initializeSnake);
  }
  initializeSnake() {
    this.snakeList.head = new SnakeNode(null, 4, 4);
    this.snakeList.body = new SnakeNode(this.snakeList.head, 4, 3);
    this.snakeList.tail = new SnakeNode(this.snakeList.body, 4, 2);
  }
}
const ROOT = document.getElementById("snake");
// const SNAKE = new Controller(ROOT);
