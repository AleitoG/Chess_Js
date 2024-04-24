const chessboard = [
  { a1: 1, b1: 2, c1: 1, d1: 2, e1: 1, f1: 2, g1: 1, h1: 2 },
  { a2: 2, b2: 1, c2: 2, d2: 1, e2: 2, f2: 1, g2: 2, h2: 1 },
  { a3: 1, b3: 2, c3: 1, d3: 2, e3: 1, f3: 2, g3: 1, h3: 2 },
  { a4: 2, b4: 1, c4: 2, d4: 1, e4: 2, f4: 1, g4: 2, h4: 1 },
  { a5: 1, b5: 2, c5: 1, d5: 2, e5: 1, f5: 2, g5: 1, h5: 2 },
  { a6: 2, b6: 1, c6: 2, d6: 1, e6: 2, f6: 1, g6: 2, h6: 1 },
  { a7: 1, b7: 2, c7: 1, d7: 2, e7: 1, f7: 2, g7: 1, h7: 2 },
  { a8: 2, b8: 1, c8: 2, d8: 1, e8: 2, f8: 1, g8: 2, h8: 1 },
];

const mainContainer = document.getElementById("main");

let chessNotationColumns = ["a", "b", "c", "d", "e", "f", "g", "h"];
let chessNotationRows = ["1", "2", "3", "4", "5", "6", "7", "8"];

function reverseObject(object) {
  const keys = Object.keys(object);
  const reverseObject = {};
  for (let i = keys.length - 1; i >= 0; i--) {
    reverseObject[keys[i]] = object[keys[i]] % 2 === 0 ? 1 : 2;
  }
  return reverseObject;
}

function reverseBoard(chessBoard) {
  const board = chessBoard;
  
  for (const key in board) {
    if (Object.hasOwnProperty.call(board, key)) {
      board[key] = reverseObject(board[key]);
    }
  }
  return board;
}

function createColumns(num) {
  const colContainer = document.createElement("div");
  colContainer.classList.add(
    num !== undefined ? `colContainer${num}` : `colContainer`
  );
  colContainer.id = `colContainer${num !== undefined ? num : ""}`;

  chessNotationColumns.forEach((column) => {
    const col = document.createElement("div");
    col.id = column;
    col.innerHTML = column;
    colContainer.appendChild(col);
  });
  mainContainer.appendChild(colContainer);
}

function createRows(num) {
  const rowContainer = document.createElement("div");
  rowContainer.classList.add(
    num !== undefined ? `rowContainer${num}` : `rowContainer`
  );
  rowContainer.id = `rowContainer${num !== undefined ? num : ""}`;

  chessNotationRows.forEach((row) => {
    const newRow = document.createElement("div");
    newRow.id = row;
    newRow.innerHTML = row;
    rowContainer.appendChild(newRow);
  });
  mainContainer.appendChild(rowContainer);
}

function createChessBoard() {
  const board = document.createElement("div");
  board.classList.add("board");
  board.id = "chessboard";
  mainContainer.appendChild(board);

  return board;
}

function drawBoard(chessBoardWhite, whiteBoard) {
  const chessboard = whiteBoard ? chessBoardWhite.reverse() : reverseBoard(chessBoardWhite);
  const squareColor1 = whiteBoard ? "white" : "black";
  const squareColor2 = whiteBoard ? "black" : "white";

  if (!whiteBoard) chessNotationColumns.reverse();
  if (whiteBoard) chessNotationRows.reverse();

  createColumns(2);
  createRows(2);
  const board = createChessBoard(whiteBoard);
  createRows();
  createColumns();

  chessboard.forEach((row) => {
    Object.keys(row).forEach((column) => {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add(
        row[column] % 2 === 0 ? `${squareColor1}` : `${squareColor2}`
      );
      square.id = column;
      board.appendChild(square);
    });
  });
}

window.onload = () => {
  drawBoard(chessboard, true);
};
