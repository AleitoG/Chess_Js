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
let originalColors = [];
let firstSelectedElement = null;
let firstValidateSquare = null;

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
  const chessboard = whiteBoard
    ? chessBoardWhite.reverse()
    : reverseBoard(chessBoardWhite);
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
  return chessboard;
}

function startPiecesPositions() {
  const W_rook_a1 = document.getElementById("a1");
  const W_rook_h1 = document.getElementById("h1");
  const B_rook_a8 = document.getElementById("a8");
  const B_rook_h8 = document.getElementById("h8");
  const W_knight_b1 = document.getElementById("b1");
  const W_knight_g1 = document.getElementById("g1");
  const B_knight_b8 = document.getElementById("b8");
  const B_knight_g8 = document.getElementById("g8");
  const W_bishop_c1 = document.getElementById("c1");
  const W_bishop_f1 = document.getElementById("f1");
  const B_bishop_c8 = document.getElementById("c8");
  const B_bishop_f8 = document.getElementById("f8");
  const W_queen_d1 = document.getElementById("d1");
  const B_queen_d8 = document.getElementById("d8");
  const W_king_e1 = document.getElementById("e1");
  const B_king_e8 = document.getElementById("e8");

  let pieces = {
    "rook-w": W_rook_a1,
    "rook-w_2": W_rook_h1,
    "rook-b": B_rook_a8,
    "rook-b_2": B_rook_h8,
    "knight-w": W_knight_b1,
    "knight-w_2": W_knight_g1,
    "knight-b": B_knight_b8,
    "knight-b_2": B_knight_g8,
    "bishop-w": W_bishop_c1,
    "bishop-w_2": W_bishop_f1,
    "bishop-b": B_bishop_c8,
    "bishop-b_2": B_bishop_f8,
    "queen-w": W_queen_d1,
    "queen-b": B_queen_d8,
    "king-w": W_king_e1,
    "king-b": B_king_e8,
  };

  let W_pawns = [];

  for (let index = 0; index < 8; index++) {
    W_pawns[index] = document.getElementById(`${chessNotationColumns[index]}2`);
    pieces[`pawn-w_${index + 1}`] = W_pawns[index];
  }

  let B_pawns = [];

  for (let index = 0; index < 8; index++) {
    B_pawns[index] = document.getElementById(`${chessNotationColumns[index]}7`);
    pieces[`pawn-b_${index + 1}`] = B_pawns[index];
  }

  return pieces;
}

function setSelectedPieces(pieces, gameChessBoard) {
  for (let notation of Object.keys(pieces)) {
    const piece = pieces[notation];
    notation = notation.includes("_") ? notation.split("_")[0] : notation;
    piece.innerHTML = `<img src="pieces/${notation}.svg" alt="${notation}" id="${notation}-${piece.id}" class="${notation}"/>`;
    const selectedPiece = document.getElementById(`${notation}-${piece.id}`);
    selectedPiece.addEventListener("click", () =>
      getMovements(selectedPiece, gameChessBoard)
    );
  }
}

function getMovements(selectedPiece, gameChessBoard) {
  changeCellColor(selectedPiece);
  validatePieces(selectedPiece.classList[0], selectedPiece.id, gameChessBoard);
}

function drawSelectedPiece(typePiece, squareSelected) {
  document.getElementById(
    squareSelected
  ).innerHTML = `<img src="pieces/${typePiece}.svg" alt="${typePiece}" id="${typePiece}-${squareSelected}" class="${typePiece}"/>`;
  const selectedPiece = document.getElementById(
    `${typePiece}-${squareSelected}`
  );
  console.log(selectedPiece)
  selectedPiece.addEventListener("click", () => {
    console.log("2")
    getMovements(selectedPiece, null)
  }
    
  );
}

function validatePawnMovement(positionPiece, gameChessBoard, typePiece) {
  const increment = typePiece.includes("-w") ? 1 : -1;
  const verticalMovementIncrement =
    positionPiece.includes("2") || positionPiece.includes("7")
      ? increment * 2
      : increment;

  const nextSquare = `${positionPiece[0]}${
    parseInt(positionPiece[1]) + increment
  }`;
  const nextSquareIncremented =
    verticalMovementIncrement === increment * 2
      ? `${positionPiece[0]}${parseInt(positionPiece[1]) + increment * 2}`
      : null;

  const chessBoardGridItemId = nextSquareIncremented
    ? [nextSquare, nextSquareIncremented]
    : [nextSquare];

  const square1 = document.getElementById(`${chessBoardGridItemId[0]}`);
  const square2 = nextSquareIncremented
    ? document.getElementById(`${chessBoardGridItemId[1]}`)
    : null;

  if (nextSquareIncremented) {
    if (
      document
        .getElementById(typePiece + "-" + positionPiece)
        .classList.contains("selected")
    ) {
      if (firstValidateSquare !== null) {
        firstValidateSquare[0].classList.remove("validate");
        firstValidateSquare[1].classList.remove("validate");
      }

      square1.classList.add("validate");
      square1.innerHTML = '<div class="val-child"></div>';

      square2.classList.add("validate");
      square2.innerHTML = '<div class="val-child"></div>';

      firstValidateSquare = [];
      firstValidateSquare = [square1, square2];
    } else {
      if (
        firstValidateSquare[0] === square1 &&
        firstValidateSquare[1] === square2
      ) {
        firstValidateSquare = null;
      }

      square1.classList.remove("validate");
      square1.innerHTML = "";
      square2.classList.remove("validate");
      square2.innerHTML = "";
    }
  } else {
    if (
      document
        .getElementById(typePiece + "-" + positionPiece)
        .classList.contains("selected")
    ) {
      if (firstValidateSquare !== null) {
        firstValidateSquare[0].classList.remove("validate");
        firstValidateSquare[1].classList.remove("validate");
      }

      square1.classList.add("validate");
      square1.innerHTML = '<div class="val-child"></div>';

      firstValidateSquare = [];
      firstValidateSquare = [square1, square1];
    } else {
      if (
        firstValidateSquare[0] === square1 &&
        firstValidateSquare[1] === square1
      ) {
        firstValidateSquare = null;
      }

      square1.classList.remove("validate");
      square1.innerHTML = "";
    }
  }

  if (square1.classList.contains("validate")) {
    square1.addEventListener("click", () => {
      square1.classList.remove("validate");
      square1.innerHTML = "";
      if (square2 !== null) {
        square2.classList.remove("validate");
        square2.innerHTML = "";
      }
      drawSelectedPiece(typePiece, square1.id);
    });
    if (square2 !== null) {
      square2.addEventListener("click", () => {
        drawSelectedPiece(typePiece, square2.id);
      });
    }
  }
}

function validateRookMovement(positionPiece, gameChessBoard, typePiece) {}

function validateKnightMovement(positionPiece, gameChessBoard, typePiece) {}

function validateBishopMovement(positionPiece, gameChessBoard, typePiece) {}

function validateQueenMovement(positionPiece, gameChessBoard, typePiece) {}

function validateKingMovement(positionPiece, gameChessBoard, typePiece) {}

function validatePieces(typePiece, piecePosition, gameChessBoard) {
  const positionPiece = piecePosition.replace(typePiece + "-", "");
  const pieceType = typePiece.split("-")[0];
  switch (pieceType) {
    case "pawn":
      validatePawnMovement(positionPiece, gameChessBoard, typePiece);
      break;
    case "rook":
      validateRookMovement(positionPiece, gameChessBoard, typePiece);
      break;
    case "knight":
      validateKnightMovement(positionPiece, gameChessBoard, typePiece);
      break;
    case "bishop":
      validateBishopMovement(positionPiece, gameChessBoard, typePiece);
      break;
    case "queen":
      validateQueenMovement(positionPiece, gameChessBoard, typePiece);
      break;
    case "king":
      validateKingMovement(positionPiece, gameChessBoard, typePiece);
      break;

    default:
      console.log("error");
      break;
  }
}

function changeCellColor(element) {
  const styleColor = window.getComputedStyle(element);
  const currentColor = styleColor.backgroundColor;
  if (!element.classList.contains("selected")) {
    if (firstSelectedElement !== null) {
      firstSelectedElement.style.backgroundColor = originalColors.pop();
      firstSelectedElement.classList.remove("selected");
    }
    firstSelectedElement = element;
    originalColors.push(currentColor);
    element.style.backgroundColor = "#f5f580";
    element.classList.add("selected");
  } else {
    element.style.backgroundColor = originalColors.pop();
    element.classList.remove("selected");
    if (firstSelectedElement === element) {
      firstSelectedElement = null;
    }
  }
}

window.onload = () => {
  const gameChessBoard = drawBoard(chessboard, true);
  const gameStartPiecesPositions = startPiecesPositions();
  setSelectedPieces(gameStartPiecesPositions, gameChessBoard);
};
