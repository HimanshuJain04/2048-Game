let board;
let score = 0;
const row = 4;
const col = 4;

window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let tile = document.createElement("div");
      tile.id = i.toString() + "-" + j.toString();

      let num = board[i][j];

      updateTile(tile, num);

      document.getElementById("board").append(tile);
    }
  }

  setTwo();
  setTwo();
}

function hasWinner() {
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (board[r][c] === 2048) {
        return true;
      }
    }
  }

  return false;
}

function hasEmptyBoard() {
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (board[r][c] === 0) {
        return false;
      }
    }
  }
  return true;
}

function setTwo() {
  if (hasWinner()) {
    alert("You Win!");
    return;
  }

  if (hasEmptyBoard()) {
    alert("You Loose");
    return;
  }

  let found = false;

  while (!found) {
    let r = Math.floor(Math.random() * row);
    let c = Math.floor(Math.random() * col);

    if (board[r][c] === 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");

  if (num > 0) {
    tile.innerText = num;

    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code === "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code === "ArrowUp") {
    slideUp();
    setTwo();
  } else if (e.code === "ArrowDown") {
    slideDown();
    setTwo();
  }
});

function slideRight() {
  for (let r = 0; r < row; r++) {
    let rowArray = board[r];
    rowArray.reverse();
    rowArray = slide(rowArray);
    rowArray.reverse();
    board[r] = rowArray;

    for (let c = 0; c < col; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideLeft() {
  for (let r = 0; r < row; r++) {
    let rowArray = board[r];
    rowArray = slide(rowArray);
    board[r] = rowArray;

    for (let c = 0; c < col; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < col; c++) {
    let rowArray = [board[0][c], board[1][c], board[2][c], board[3][c]];
    rowArray.reverse();
    rowArray = slide(rowArray);
    rowArray.reverse();
    for (let r = 0; r < row; r++) {
      board[r][c] = rowArray[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < col; c++) {
    let rowArray = [board[0][c], board[1][c], board[2][c], board[3][c]];
    rowArray = slide(rowArray);

    for (let r = 0; r < row; r++) {
      board[r][c] = rowArray[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function filterZero(rowArray) {
  return rowArray.filter((e) => e !== 0);
}

function slide(rowArray) {
  // row Array => [0,2,2,2]

  rowArray = filterZero(rowArray);

  // rowArray => [2,2,2];

  for (let i = 0; i < rowArray.length - 1; i++) {
    if (rowArray[i] === rowArray[i + 1]) {
      rowArray[i] = rowArray[i] * 2;
      rowArray[i + 1] = 0;
      score += rowArray[i];
      document.getElementById('score').innerText = score;
    }
  }

  //   rowArray => [4,0,2]

  rowArray = filterZero(rowArray);

  //   rowArray => [4,2]

  while (rowArray.length < col) {
    rowArray.push(0);
  }

  //   rowArray => [4,2,0,0]
  return rowArray;
}
