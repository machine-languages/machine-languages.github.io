import { Creator } from "./create-elements.js"
import { Interface } from "./interface.js"

class Data {
  constructor(element, nodes) {
    this.nodes = nodes;
    this.gridRow = [];
    this.sectionZero = [];
    this.sectionOne = [];
    this.sectionTwo = [];
    this.sectionThree = [];
    this.sectionFour = [];
    this.sectionFive = [];
    this.sectionSix = [];
    this.sectionSeven = [];
    this.sectionEight = [];
    this.colZero = [];
    this.colOne = [];
    this.colTwo = [];
    this.colThree = [];
    this.colFour = [];
    this.colFive = [];
    this.colSix = [];
    this.colSeven = [];
    this.colEight = [];
    this.smallest = { val: "00000000000" };
    this.breaker = 0;
    this.firstTry = true;
    this.createGrid();
    this.computeBoxesGridsAndColumns();
    this.reRoll();
    this.findPerfect();
    this.addOneToEverySquare(); // I worked from 0 - 8 so this makes it 1 to 9
    this.refreshUI();
    this.newGameButton = this.nodes.newGameButton;

    this.newGameButton.addEventListener("click", () => {
      this.reRoll();
      this.findPerfect();
      this.addOneToEverySquare();
      this.refreshUI();
    })
  }
  resetGrid() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.gridRow[i][j].locked = true;
        this.nodes.numberWrappers[i][j].innerHTML = "";
        this.nodes.numberWrappers[i][j].classList.remove("-colored")
        this.gridRow[i][j].fin = null;
        this.gridRow[i][j].val = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      }
    }
  }

  reRoll() {

    if (!this.firstTry) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          this.currentNumberWrapper =
            this.numberWrapper = this.nodes.numberWrappers[i][j];

          this.currentNumberWrapper.classList.remove("-hidden");
        }
      }
    }
    this.firstTry = false;
    this.resetGrid();
    this.computeValidSudoku();
  }

  createGrid() {
    for (let i = 0; i < 9; i++) {
      this.gridRow[i] = [];

      for (let j = 0; j < 9; j++) {
        this.gridRow[i][j] = {
          id: i.toString() + j.toString(),
          val: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          section: null,
          col: null,
          row: i,
          fin: null,
          locked: true
        }
      }
    }
  }

  findSquareWithLeastOptions() {
    const smallestArray = [];

    //Find the smallest val.length
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.gridRow[i][j].val != undefined
          && this.gridRow[i][j].val.length < this.smallest.val.length) {
          this.smallest = this.gridRow[i][j];
        }

      }
    }
    //Put all the arrays with that length inside an array

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.gridRow[i][j].val.length === this.smallest.val.length) {
          smallestArray.push(this.gridRow[i][j]);
        }


      }
    }
    //Randomly pick one of those array objects
    this.smallest = smallestArray[Math.floor(Math.random() * smallestArray.length)];
    //Return it. Congrats we have picked a random object with the lowest value.
    return this.smallest;
  }

  // Basically run the algo 81x
  computeValidSudoku() {
    this.pickCellValue(this.gridRow[4][4]);
    this.pickCellValue(this.gridRow[0][4]);
    this.pickCellValue(this.gridRow[1][4]);

    for (let i = 0; i < 78; i++) {
      this.findSquareWithLeastOptions()
      this.pickCellValue(this.smallest);
    }

  }

  pickCellValue(square) {

    let { val, row, col, section } = square;
    let number;
    this.breaker = 0;

    //do while loop contains a breaker that checks to see if im stuck in recursion - concept could be improved upon, Im sure, 
    //I just dont know what that would entail.
    do {
      number = Math.floor(Math.random() * 9);
      if (this.breaker == 190) {
        return
      } ++this.breaker
    }
    while (!val.includes(number) && this.breaker < 200)

    square.fin = number;
    let tempArray = [];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.gridRow[i][j].col === col) {
          tempArray.push(this.gridRow[i][j]);
        }
        if (this.gridRow[i][j].row === row && !tempArray.includes(this.gridRow[i][j])) {
          tempArray.push(this.gridRow[i][j]);
        }
        if (this.gridRow[i][j].section === section && !tempArray.includes(this.gridRow[i][j])) {
          tempArray.push(this.gridRow[i][j]);
        }
      }
    }

    for (let item of tempArray) {
      if (item.val != undefined && item.val.includes(number)) {
        item.val.splice(item.val.indexOf(number), 1);
      }

    }

    //dots are for the val.length because we use it somewhere else, but this is basically just removing 
    //it from the flow of the program.
    square.val = ".............";
    return
  }

  findPerfect() {
    if (!this.firstTry) {
      this.resetGrid();
      this.reRoll();

    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {

        if (this.gridRow[i][j].fin === null) {
          this.firstTry = !this.firstTry;
          return this.findPerfect();
        }
      }
    }
  }
  computeBoxesGridsAndColumns() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        //Sections
        if (i <= 2 && j <= 2) {
          this.sectionZero.push(this.gridRow[i][j]);
          this.gridRow[i][j].section = 0;
        }
        if (i <= 2 && j >= 3 && j <= 5) {
          this.sectionOne.push(this.gridRow[i][j]);
          this.gridRow[i][j].section = 1;
        }
        if (i <= 2 && j >= 6 && j <= 8) {
          this.sectionTwo.push(this.gridRow[i][j]);
          this.gridRow[i][j].section = 2;
        }
        if (i >= 3 && i <= 5 && j <= 2) {
          this.sectionThree.push(this.gridRow[i][j]);
          this.gridRow[i][j].section = 3;
        }
        if (i >= 3 && i <= 5 && j >= 3 && j <= 5) {
          this.sectionFour.push(this.gridRow[i][j]);
          this.gridRow[i][j].section = 4;
        }
        if (i >= 3 && i <= 5 && j >= 6 && j <= 8) {
          this.sectionFive.push(this.gridRow[i][j]);
          this.gridRow[i][j].section = 5;
        }
        if (i >= 6 && i <= 8 && j <= 2) {
          this.sectionSix.push(this.gridRow[i][j]);
          this.gridRow[i][j].section = 6;
        }
        if (i >= 6 && i <= 8 && j >= 3 && j <= 5) {
          this.sectionSeven.push(this.gridRow[i][j]);
          this.gridRow[i][j].section = 7;
        }
        if (i >= 6 && i <= 8 && j >= 6 && j <= 8) {
          this.sectionEight.push(this.gridRow[i][j]);
          this.gridRow[i][j].section = 8;
        }

        //Columns
        if (j === 0) {
          this.colZero.push(this.gridRow[i][j]);
          this.gridRow[i][j].col = 0;
        }
        if (j === 1) {
          this.colOne.push(this.gridRow[i][j]);
          this.gridRow[i][j].col = 1;
        }
        if (j === 2) {
          this.colTwo.push(this.gridRow[i][j]);
          this.gridRow[i][j].col = 2;
        }
        if (j === 3) {
          this.colThree.push(this.gridRow[i][j]);
          this.gridRow[i][j].col = 3;
        }
        if (j === 4) {
          this.colFour.push(this.gridRow[i][j]);
          this.gridRow[i][j].col = 4;
        }
        if (j === 5) {
          this.colFive.push(this.gridRow[i][j]);
          this.gridRow[i][j].col = 5;
        }
        if (j === 6) {
          this.colSix.push(this.gridRow[i][j]);
          this.gridRow[i][j].col = 6;
        }
        if (j === 7) {
          this.colSeven.push(this.gridRow[i][j]);
          this.gridRow[i][j].col = 7;
        }
        if (j === 8) {
          this.colEight.push(this.gridRow[i][j]);
          this.gridRow[i][j].col = 8;
        }

      }
    }
  }
  chooseEmptySquares(number) {
    this.lockedSquaresCounter = 0;
    do {
      this.x = Math.floor(Math.random() * 9);
      this.y = Math.floor(Math.random() * 9);
      this.square = this.gridRow[this.x][this.y];

      if (this.square.locked == false) continue;
      this.square.locked = false;
      this.lockedSquaresCounter++;
    } while (this.lockedSquaresCounter < number);

  }
  refreshUI() {
    this.chooseEmptySquares(52);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.numberWrapper = this.nodes.numberWrappers[i][j];
        if (this.numberWrapper != null) {
          if (this.gridRow[i][j].locked == true) {
            this.numberWrapper.innerHTML = this.gridRow[i][j].fin;
          }
        }
        //Children of noteGridCell
        this.noteGridCellChildNodes = this.nodes.noteGridCells[i][j].childNodes;
        for (let k = 0; k < 9; k++) {
          this.noteGridCellChildNodes[k].innerHTML = "";
        }
      }
    }
  }
  addOneToEverySquare() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.gridRow[i][j].fin++
      }
    }
  }
}

//Controller
export class Sudoku {
  constructor(element) {
    this.creator = new Creator(element);
    this.nodes = this.creator.nodes();
    this.data = new Data(element, this.nodes)
    this.interface = new Interface(this.nodes, this.data);
  }
}
