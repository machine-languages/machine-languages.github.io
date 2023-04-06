export class Interface {
  constructor(nodes, data) {
    this.container = nodes.container;
    this.board = nodes.board;
    this.cells = nodes.cells;
    this.notesButton = nodes.notesButton;
    this.eraseButton = nodes.eraseButton;
    this.numberButtons = nodes.numberButtons;
    this.numberWrappers = nodes.numberWrappers;
    this.solutionButton = nodes.solutionButton;
    this.noteGridCellInnerCells = nodes.noteGridCellInnerCells;
    this.noteGridCells = nodes.noteGridCells;
    this.notesActive = false;
    //This represents the coordinates of the cell that is currently clicked;
    this.currentCell = [4, 4];
    this.highlight(4, 4);


    this.data = data;
    console.log(this.data.gridRow)
    console.log(this.numberWrappers[0][0])
    //Call event listeners
    this.eventListeners();
  }
  highlight(x, y) {

    //Reset previous highlighted cells 
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.cells[i][j].classList.remove("-center-highlight");
        this.cells[i][j].classList.remove("-highlight");
      }
    }
    //Highlight clicked cell
    this.cells[x][y].classList.add("-center-highlight");
    //Highlight rows and cols 
    for (let i = 0; i < 9; i++) {
      this.cells[x][i].classList.add("-highlight");
      this.cells[i][y].classList.add("-highlight");

    }

    //Highlight sections 
    let x0 = Math.floor((x / 3)) * 3;
    let y0 = Math.floor((y / 3)) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.cells[x0 + i][y0 + j].classList.add("-highlight");

      }
    }

  }
  //Erase all content of cell 
  erase() {
    if (this.squareIsLocked()) return;
    this.currentNumberWrapper =
      this.numberWrappers[this.currentCell[0]][this.currentCell[1]];

    this.currentNoteGridCell =
      this.noteGridCells[this.currentCell[0]][this.currentCell[1]];

    this.currentNoteGridCellInnerCells = this.currentNoteGridCell.childNodes;

    this.currentNumberWrapper.classList.add("-hidden");
    this.currentNoteGridCell.classList.add("-hidden");
    for (let i = 0; i < this.currentNoteGridCellInnerCells.length; i++) {
      this.currentNoteGridCellInnerCells[i].innerHTML = "";
    }
  }
  // Fetch gridRow data from Data and display it. 
  showSolution() {

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.noteGridCells[i][j].classList.add("-hidden");
        this.numberWrappers[i][j].classList.remove("-hidden");
        this.numberWrappers[i][j].innerHTML = this.data.gridRow[i][j].fin;
      }
    }
  }

  eventListeners() {

    //Notes button
    this.notesButton.addEventListener("click", () => {
      this.notesActive = !this.notesActive;
      this.notesButton.classList.toggle("-highlight")
    });

    //Keypress
    this.container.addEventListener("keydown", (event) => {
      if (event.keyCode == 37) {
        this.currentCell = [this.currentCell[0], this.currentCell[1] - 1];
        this.keypressWrapAround();
        this.highlight(this.currentCell[0], this.currentCell[1]);

      }
      if (event.keyCode == 39) {
        console.log(this.test)
        this.currentCell = [this.currentCell[0], this.currentCell[1] + 1];
        this.keypressWrapAround();
        this.highlight(this.currentCell[0], this.currentCell[1]);
      }
      if (event.keyCode == 40) {
        this.currentCell = [this.currentCell[0] + 1, this.currentCell[1]];
        this.keypressWrapAround();
        this.highlight(this.currentCell[0], this.currentCell[1]);
      }
      if (event.keyCode == 38) {
        this.currentCell = [this.currentCell[0] - 1, this.currentCell[1]];
        this.keypressWrapAround();
        this.highlight(this.currentCell[0], this.currentCell[1]);
      }
    });

    for (let i = 0; i < this.numberButtons.length; i++) {
      this.numberButtons[i].addEventListener("click", () => {

        if (this.squareIsLocked()) return;

        this.currentNumberWrapper =
          this.numberWrappers[this.currentCell[0]][this.currentCell[1]];

        this.currentNoteGridCell =
          this.noteGridCells[this.currentCell[0]][this.currentCell[1]];

        this.currentNoteGridCellChild =
          this.currentNoteGridCell
            .querySelector(`:nth-child(${this.numberButtons[i].innerHTML})`);

        //Put button number into current cell number wrapper and show the wrapper
        if (!this.notesActive) {
          this.currentNumberWrapper.classList.remove("-hidden");
          this.currentNoteGridCell.classList.add("-hidden");
          this.currentNumberWrapper.classList.add("-colored");
          this.currentNumberWrapper.innerHTML = this.numberButtons[i].innerHTML
        }

        //Put the number into the note grid cell child and show the note grid
        //If there is already a number, remove the number
        if (this.notesActive && this.currentNoteGridCellChild.innerHTML == "") {
          this.currentNoteGridCell.classList.remove("-hidden");
          this.currentNumberWrapper.classList.add("-hidden");
          this.currentNoteGridCellChild.innerHTML = this.numberButtons[i].innerHTML;
        } else {
          this.currentNoteGridCellChild.innerHTML = "";
        }


      })
    }
    this.eraseButton.addEventListener("click", () => {
      this.erase();
    })
    this.solutionButton.addEventListener("click", () => {
      this.showSolution();
    })
    this.notesButton.addEventListener("click", () => {
    })
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.cells[i][j].addEventListener("click", () => {
          this.highlight(i, j);
          this.currentCell = [i, j];
        })
      }
    }
  }

  //Wrap for the arrow keys
  keypressWrapAround() {
    if (this.currentCell[1] === -1) {
      this.currentCell[1] = 8;
    }
    if (this.currentCell[1] === 9) {
      this.currentCell[1] = 0;
    }
    if (this.currentCell[0] === 9) {
      this.currentCell[0] = 0;
    }
    if (this.currentCell[0] === -1) {
      this.currentCell[0] = 8;
    }
  }

  squareIsLocked() {
    return this.data.gridRow[this.currentCell[0]][this.currentCell[1]].locked ? true : false
  }

}
