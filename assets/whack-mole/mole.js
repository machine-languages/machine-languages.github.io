export class WhackAMole {
  constructor() {
    class Board {

      constructor() {
        this.draw();
        this.moles = [];
        this.holes = [];
        this.score = 0;
        this.roundNumber = 0;
        this.gameOver = false;
        this.currentMoleCount = 0;
        for (let i = 0; i < 6; i++) {
          this.holes.push(new Hole(i));
          this.moles.push(new Mole(i));
        }
      }

      rollMoles() {
        this.moles.forEach((mole) => {
          mole.show();

        })
      }

      draw() {
        createDiv("board", "board", ".main");
        // createDiv("score-view", "score-view", "body");
        this.scoreView = document.querySelector(".score-view");
      }

      updateScore() {
        this.scoreView = document.querySelector(".score-view");
        this.score++;
        this.scoreView.innerHTML = this.score;
      }
    }


    class Hole {

      constructor(holeNumber) {
        this.draw(holeNumber);
        this.isHoleOpen = false;
        this.holeElement = document.querySelector(`.board--hole-${holeNumber}`)
        this.unshow();
      }

      draw(holeNumber) {
        createDiv("board--hole", `board--hole-${holeNumber}`, ".board");
      }

      show() {
        this.holeElement.classList.remove("-hidden");
        this.isHoleOpen = !this.isHoleOpen;
      }
      unshow() {
        this.holeElement.classList.add("-hidden");
        this.isHoleOpen = !this.isHoleOpen;
      }

    }

    class Mole {

      constructor(moleNumber) {
        this.id = moleNumber;
        this.draw(moleNumber);
        this.moleElement = document.querySelector(`.hole--mole-${moleNumber}`)
        this.moleElement.addEventListener("click", () => {
          this.moleHit(moleNumber);
        });
      }

      flipCoin() {
        return Math.floor(Math.random() * 2) === 1;
      }
      draw(moleNumber) {
        createDiv("hole--mole", `hole--mole-${moleNumber}`, `.board--hole-${moleNumber}`);
      }
      moleHit(moleNumber) {
        board.holes[moleNumber].unshow();
        board.updateScore();
        this.unshow();
      }
      show() {
        this.moleElement.innerHTML = '';
        board.holes[this.id].unshow();
        if (this.flipCoin()) {
          this.moleElement.innerHTML =
            '<img src="/portfolio/assets/whack-mole/mole.png" class="board--mole-image" draggable="false">';

          console.log(board.holes[this.id])
          board.holes[this.id].show();
        }
      }
      unshow() {

        this.moleElement.innerHTML = '';
      }
    }

    const board = new Board();

    function createDiv(classNameOne, classNameTwo, appendTo) {
      let currentElement = document.createElement("div");
      let currentParentElement = document.querySelector(appendTo);
      currentElement.classList.add(classNameOne);
      currentElement.classList.add(classNameTwo);
      currentParentElement.appendChild(currentElement);
    }
    board.rollMoles();
    setInterval(() => { board.rollMoles() }, Math.floor(Math.random() * 3000) + 2000);
  }
}
