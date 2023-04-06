import { Controller } from "../../assets/snake/snake.js"

up.compiler('#snake', function(element) {
  let snake = new Controller(element);
});
