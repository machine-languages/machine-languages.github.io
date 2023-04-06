export class Calculator {
  constructor() {
    var numberButtons = document.querySelectorAll("[data-number]");
    var operationButtons = document.querySelectorAll("[data-operation]");
    var equalsButton = document.querySelector("[data-equals]");
    var deleteButton = document.querySelector("[data-delete]");
    var allClearButton = document.querySelector("[data-all-clear]");
    var previousOperandTextElement = document.querySelector("[data-previous-operand]");
    var currentOperandTextElement = document.querySelector("[data-current-operand]");
    var Calculator = /** @class */ (function() {
      function Calculator(currentOperandTextElement, previousOperandTextElement) {
        this.previousOperand = "";
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperand = "";
      }
      Calculator.prototype.appendNumber = function(number) {
        if (number == "." && this.currentOperand.includes("."))
          return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
      };
      Calculator.prototype.appendOperator = function(operator) {
        if (this.currentOperand === "")
          return;
        if (this.previousOperand !== "") {
          this.compute();
        }
        this.currentOperand += operator;
        this.previousOperand = this.currentOperand;
        this.operation = operator;
        this.currentOperand = "";
      };
      Calculator.prototype.compute = function() {
        var computation;
        var prev = parseFloat(this.previousOperand);
        var current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current))
          return;
        switch (this.operation) {
          case '+':
            computation = prev + current;
            break;
          case '-':
            computation = prev - current;
            break;
          case '*':
            computation = prev * current;
            break;
          case '÷':
            computation = prev / current;
            break;
          default:
            return;
        }
        this.currentOperand = computation;
        this.previousOperand = "";
      };
      Calculator.prototype.display = function() {
        this.currentOperandTextElement.innerHTML = this.currentOperand;
        this.previousOperandTextElement.innerHTML = this.previousOperand;
      };
      Calculator.prototype.clear = function() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.currentOperandTextElement.innerHTML = "";
        this.previousOperandTextElement.innerHTML = "";
      };
      Calculator.prototype["delete"] = function() {
        this.currentOperand = this.currentOperand.slice(0, -1);
      };
      return Calculator;
    }());
    var calculator = new Calculator(currentOperandTextElement, previousOperandTextElement);
    numberButtons === null || numberButtons === void 0 ? void 0 : numberButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        calculator.appendNumber(button.innerHTML);
        calculator.display();
      });
    });
    operationButtons === null || operationButtons === void 0 ? void 0 : operationButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        calculator.appendOperator(button.innerHTML);
        calculator.display();
      });
    });
    allClearButton === null || allClearButton === void 0 ? void 0 : allClearButton.addEventListener("click", function() {
      calculator.clear();
      calculator.display();
    });
    equalsButton === null || equalsButton === void 0 ? void 0 : equalsButton.addEventListener("click", function() {
      calculator.compute();
      calculator.display();
    });
    deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", function() {
      calculator["delete"]();
      calculator.display();
    });
  }
}
