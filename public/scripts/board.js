const Node = require("./node");

function Board(height, width) {
  this.width = width;
  this.height = height;
  this.boardArray = [];
  this.nodes = {};
  this.buttonsOn = true;
  this.mouseDown = false;
  this.pressedNodeState = false;
  this.speed = "fast";
  this.run = false;
}

Board.prototype.init = function() {
  this.createBoard();
  this.addEventListeners();
  this.toggleButtons();
};

Board.prototype.createBoard = function() {
  let tableHTML = "";
  for (let r = 0; r < this.height; r++) {
    let currentRow = [];
    let currentHTMLRow = `<tr id="row ${r}">`;
    for (let c = 0; c < this.width; c++) {
      let state = initiateActive(r, c);
      let newNodeId = `${r}-${c}`;
      let newNode = new Node(newNodeId, state);
      currentRow.push(newNode);
      currentHTMLRow += `<td id="${newNodeId}" class="${classNameFromState(state)}"></td>`;
      this.nodes[`${newNodeId}`] = newNode;
    }
    this.boardArray.push(currentRow);
    tableHTML += `${currentHTMLRow}</tr>`;
  }
  let board = document.getElementById("board");
  board.innerHTML = tableHTML;
};

Board.prototype.addEventListeners = function() {
  let board = this;
  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      let currentId = `${r}-${c}`;
      let currentNode = board.getNode(currentId);
      let currentElement = document.getElementById(currentId);
      currentElement.onmousedown = (e) => {
        e.preventDefault();
        if (this.buttonsOn) {
          board.mouseDown = true;
          board.pressedNodeState = !currentNode.state;
          board.changeNode(currentNode, this.pressedNodeState);
        }
      }
      currentElement.onmouseup = () => {
        if (this.buttonsOn) {
          board.mouseDown = false;
        }
      }
      currentElement.onmouseenter = () => {
        if (this.buttonsOn && this.mouseDown) {
          board.changeNode(currentNode, this.pressedNodeState);
        }
      }
    }
  }
};

Board.prototype.getNode = function(id) {
  let coordinates = id.split("-");
  let r = parseInt(coordinates[0]);
  let c = parseInt(coordinates[1]);
  return this.boardArray[r][c];
};

Board.prototype.changeNode = function(currentNode, state) {
  currentNode.state = state;
  let element = document.getElementById(currentNode.id);
  element.className = classNameFromState(currentNode.state);
};

Board.prototype.updateStateFromNewState = function() {
  for (let r = 0; r < this.height; r++) {
    for (let c = 0; c < this.width; c++) {
      this.boardArray[r][c].updateStateFromNewState();
    }
  }
};

function startGeneration(board) {
  function generation(num) {
    if(!board.run) return;
    let speed = board.speed === "fast" ?
      0 : board.speed === "average" ?
        50 : 150;

    setTimeout(function () {
      for (let r = 0; r < board.height; r++) {
        for (let c = 0; c < board.width; c++) {
          let cell = board.boardArray[r][c];

          let count = countNeighbours(board, r, c);
          if(cell.state) {
            if(count <= 1 || count >= 4) cell.newState = false;
            else cell.newState = true;
          } else {
            if(count == 3) cell.newState = true;
            else cell.newState = false;
          }
        }
      }

      for (let r = 0; r < board.height; r++) {
        for (let c = 0; c < board.width; c++) {
          let cell = board.boardArray[r][c];
          board.changeNode(cell, cell.newState);
        }
      }

      generation(num+1);
    }, speed);
  }

  generation(1);
};

function countNeighbours(board, row, col) {
  var count = 0;

  let dirs = [0,1,0,-1,0];
  for (let i = 1; i < dirs.length; i++) {
    let currRow = row + dirs[i-1];
    let currCol = col + dirs[i];
    if(currRow < 0 || currCol < 0 || currRow >= board.height || currCol >= board.width) continue;
    count += board.boardArray[currRow][currCol].state;
  }

  let diags = [-1,-1,1,1,-1];
  for (let i = 1; i < diags.length; i++) {
    let currRow = row + diags[i-1];
    let currCol = col + diags[i];
    if(currRow < 0 || currCol < 0 || currRow >= board.height || currCol >= board.width) continue;
    count += board.boardArray[currRow][currCol].state;
  }

  return count;
};

Board.prototype.toggleButtons = function() {
  document.getElementById("adjustFast").onclick = () => {
    this.speed = "fast";
    document.getElementById("adjustSpeed").innerHTML = 'Speed: Fast<span class="caret"></span>';
  }

  document.getElementById("adjustAverage").onclick = () => {
    this.speed = "average";
    document.getElementById("adjustSpeed").innerHTML = 'Speed: Average<span class="caret"></span>';
  }

  document.getElementById("adjustSlow").onclick = () => {
    this.speed = "slow";
    document.getElementById("adjustSpeed").innerHTML = 'Speed: Slow<span class="caret"></span>';
  }

  document.getElementById("randomizeButton").onclick = () => {
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        this.changeNode(this.boardArray[r][c], randomizeState());
      }
    }
  }

  document.getElementById("clearButton").onclick = () => {
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        this.changeNode(this.boardArray[r][c], false);
      }
    }
  }

  document.getElementById("startButton").onclick = () => {
    if (this.run) {
      this.run = false;
      this.buttonsOn = true;

      document.getElementById("randomizeButton").removeAttribute("disabled", "");
      document.getElementById("clearButton").removeAttribute("disabled", "");
      document.getElementById("startButton").innerHTML = "Start";

    } else {
      this.run = true;
      this.buttonsOn = false;

      document.getElementById("randomizeButton").setAttribute("disabled", "");
      document.getElementById("clearButton").setAttribute("disabled", "");
      document.getElementById("startButton").innerHTML = "Stop";

      startGeneration(this);
    }
  }
};

function initiateActive(row, col) {
  var rows = [1, 2, 3, 3, 3];
  var cols = [3, 4, 2, 3, 4];

  for (var i = 0; i < rows.length; i++) {
    if(row == rows[i] && col == cols[i]) return true;
  }

  return false;
}

function classNameFromState(state) {
  return state ? `alive` : `dead`;
}

function randomizeState() {
  return (Math.random() < 0.5);
}

let navHeight = $("#navbarDiv").height();
let buttonsHeight = $("#buttonDiv").height();
let height = Math.floor(($(document).height() - navHeight - buttonsHeight) / 28);
let width = Math.floor($(document).width() / 25);
let newBoard = new Board(height, width);
newBoard.init();
