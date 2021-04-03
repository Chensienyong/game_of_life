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
}

Board.prototype.init = function() {
  this.createBoard();
  this.addEventListeners();
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
          board.changeNode(currentNode);
        }
      }
      currentElement.onmouseup = () => {
        if (this.buttonsOn) {
          board.mouseDown = false;
        }
      }
      currentElement.onmouseenter = () => {
        if (this.buttonsOn && this.mouseDown) {
          board.changeNode(currentNode);
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

Board.prototype.changeNode = function(currentNode) {
  console.log(currentNode.id);
  currentNode.state = this.pressedNodeState;
  let element = document.getElementById(currentNode.id);
  element.className = classNameFromState(currentNode.state);
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

console.log($(document).width());
let height = Math.floor($(document).height() / 28);
let width = Math.floor($(document).width() / 25);
let newBoard = new Board(height, width);
newBoard.init();
console.log("success");
