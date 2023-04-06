export class Creator {
  constructor(element) {

    //Select main node
    this.element = element;

    //Create Container & Append
    this.container = this.createNode(this.element, "sudoku___");
    this.container.setAttribute('tabindex', -1);
    //Create Board & Append
    this.board = this.createNode(this.container, "sudoku___board");

    this.cells = [];
    this.noteGridCells = [];
    this.numberWrappers = [];

    //Create 2d array, Cells, wrapper for the number, and div for note mode + its cells && array
    for (let i = 0; i < 9; i++) {
      this.cells[i] = [];
      this.numberWrappers[i] = [];
      this.noteGridCells[i] = [];
      this.noteGridCellInnerCells = [i];

      for (let j = 0; j < 9; j++) {
        this.cells[i][j] =
          this.createNode(this.board, "sudoku___board--cell");

        this.numberWrappers[i][j] = this.createNode(this.cells[i][j]
          , "sudoku___board--number-wrapper");

        this.noteGridCells[i][j] = this.createNode(this.cells[i][j],
          "sudoku___board--note-grid");

        for (let k = 0; k < 9; k++) {
          this.noteGridCellInnerCells[k] =
            this.createNode(this.noteGridCells[i][j], "sudoku___note-grid--cell");
        }
        //Draw the inner borders 
        if (j != 0 && j == 2 || j == 5) {
          this.cells[i][j].classList.add("-border-right")
        }
        if (i != 0 && i == 2 || i == 5) {
          this.cells[i][j].classList.add("-border-bottom")
        }
        if (i == 8) {
          this.cells[i][j].classList.add("-border-bottom-right-none")
        }
      }
    }

    //Create the button panel and buttons
    this.panel = this.createNode(this.container, "sudoku___panel");
    this.newGameButton =
      this.createNode(this.panel, "sudoku___panel--button-new-game");
    this.newGameButton.innerHTML = "New Game";

    this.solutionButton =
      this.createNode(this.panel, "sudoku___panel--button-solution");
    this.solutionButton.innerHTML = "Solution";
    this.numberButtons = [];
    for (let i = 1; i <= 9; i++) {
      this.numberButton = this.createNode(this.panel, "sudoku___panel--button");
      this.numberButtons.push(this.numberButton);
      this.numberButton.innerHTML = `${i}`
    }
    this.notesButton =
      this.createNode(this.panel, "sudoku___panel--button-notes");
    this.notesButton.innerHTML = "Notes";
    this.eraseButton =
      this.createNode(this.panel, "sudoku___panel--button-erase");
    this.eraseButton.innerHTML = "Erase";
  }

  //Method for creating, appending and giving class name to new Node
  createNode(appendTo, classNameOne = "default") {
    this.currentElement = document.createElement("div");
    this.currentElement.classList.add(classNameOne);
    appendTo.appendChild(this.currentElement);
    return this.currentElement;
  }


  nodes() {
    this.nodesPackage = {
      container: this.container,
      board: this.board,
      cells: this.cells,
      noteGridCells: this.noteGridCells,
      numberWrappers: this.numberWrappers,
      noteGridCellInnerCells: this.noteGridCellInnerCells,
      numberButtons: this.numberButtons,
      eraseButton: this.eraseButton,
      notesButton: this.notesButton,
      newGameButton: this.newGameButton,
      solutionButton: this.solutionButton
    };

    return this.nodesPackage;
  }
}
