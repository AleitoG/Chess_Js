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
let chessNotationRows = ["8", "7", "6", "5", "4", "3", "2", "1"];
let originalColors = [];
let firstSelectedElement = null;
let firstValidateSquare = null;
let firstValidatedElementS = null;
let whitePlayer = true;
let reverseChessBoard = true;
let savedPiecesPositions = [];
let savedPieces = [];
let savedPiecesSquarePositions = [];

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

function drawBoard(chessBoardWhite, whiteBoard, reverseChessBoard) {
  let chessboard = whiteBoard
    ? chessBoardWhite.reverse()
    : reverseBoard(chessBoardWhite);
  const squareColor1 = whiteBoard ? "white" : "black";
  const squareColor2 = whiteBoard ? "black" : "white";

  if (reverseChessBoard) chessBoardWhite.reverse();

  let notationSintax = [chessNotationColumns, chessNotationRows];

  if (!whiteBoard) notationSintax[0].reverse();
  if (!whiteBoard) notationSintax[1].reverse();

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
  const W_rook_h1 = document.getElementById("e4");
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
  let B_pawns = [];

  for (let index = 0; index < 8; index++) {
    W_pawns[index] = document.getElementById(`${chessNotationColumns[index]}2`);
    pieces[`pawn-w_${index + 1}`] = W_pawns[index];

    B_pawns[index] = document.getElementById(`${chessNotationColumns[index]}7`);
    pieces[`pawn-b_${index + 1}`] = B_pawns[index];
  }

  for (let notation of Object.keys(pieces)) {
    const piece = pieces[notation];
    notation = notation.includes("_") ? notation.split("_")[0] : notation;
    piece.classList.add("occupied");
    piece.innerHTML = `<img src="pieces/${notation}.svg" alt="${notation}" id="${notation}-${piece.id}" class="${notation}" style="user-select: none;" draggable="true"/>`;

    const selectedPiece = document.getElementById(`${notation}-${piece.id}`);
    selectedPiece.addEventListener("click", () => getMovements(selectedPiece));
  }
}

function drawSavedPiecesPositions(typePiece) {
  let squaresOccupied = document.getElementsByClassName("occupied");
  let squaresPassant =
    document.getElementsByClassName(`passant-${typePiece.split("-")[1]}`)
      .length !== 0
      ? document.getElementsByClassName(`passant-${typePiece.split("-")[1]}`)[0]
          .id
      : null;
  for (let i = 0; i < squaresOccupied.length; i++) {
    savedPieces[i] =
      squaresOccupied[i].children[0].id.split("-")[0] +
      "-" +
      squaresOccupied[i].children[0].id.split("-")[1];
    savedPiecesPositions[i] = squaresOccupied[i].children[0].id.split("-")[2];
    if (squaresOccupied[i].id === "e7") {
      console.log("ocupu: ",squaresOccupied[i].children[0]);
    }
  }

  document.getElementById("main").innerHTML = "";
  chessboardDefined = drawBoard(chessboard, whitePlayer, reverseChessBoard);

  for (let i = 0; i < savedPiecesPositions.length; i++) {
    const piece = document.getElementById(savedPiecesPositions[i]);
    const passant =
      document.getElementById(squaresPassant) !== null
        ? document.getElementById(squaresPassant)
        : null;
    if (passant !== null) {
      passant.classList.add(`passant-${typePiece.split("-")[1]}`);
    }
    piece.classList.add("occupied");
    piece.innerHTML = `<img src="pieces/${savedPieces[i]}.svg" alt="${savedPieces[i]}" id="${savedPieces[i]}-${piece.id}" class="${savedPieces[i]}" style="user-select: none;" draggable="true"/>`;
  }
}

function getMovements(selectedPiece) {
  changeCellColor(selectedPiece);
  validatePieces(selectedPiece.classList[0], selectedPiece.id);
}

function drawSelectedPiece(positionPiece, typePiece, squareSelected) {
  const squareContainerSelected = document.getElementById(squareSelected);
  squareContainerSelected.innerHTML = `<img src="pieces/${typePiece}.svg" alt="${typePiece}" id="${typePiece}-${squareSelected}" class="${typePiece}"/>`;
  squareContainerSelected.classList.add("occupied");
  const newSelectedPiece = document.getElementById(
    `${typePiece}-${squareSelected}`
  );
  const pieceSelected = document.getElementById(
    `${typePiece}-${positionPiece}`
  );
  const pieceSelectedSquare = document.getElementById(`${positionPiece}`);

  if (pieceSelectedSquare.classList.contains("occupied"))
    pieceSelectedSquare.classList.remove("occupied");

  if (pieceSelected !== null) {
    pieceSelected.remove();
  }

  newSelectedPiece.addEventListener("click", () =>
    getMovements(newSelectedPiece)
  );
}

function createNewElement(
  tagName,
  attributes = {},
  children,
  imageSrc,
  imageAlt
) {
  const element = document.createElement(tagName);

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  if (children) {
    let imgElement = document.createElement("img");
    imgElement.src = imageSrc;
    imgElement.alt = imageAlt;
    imgElement.id = `${imageAlt}-${attributes.id}`;
    imgElement.className = imageAlt;

    element.appendChild(imgElement);
  }

  return element;
}

function desmarkEatableSquares() {
  chessboardDefined.forEach((row) => {
    Object.keys(row).forEach((column) => {
      const checkEatableClass = document.getElementById(column);
      const board = checkEatableClass.parentNode;

      if (checkEatableClass.classList.contains("eatable")) {
        checkEatableClass.classList.remove("eatable");
        if (checkEatableClass.children[0] !== undefined) {
          let clasElements = getElementClases(checkEatableClass);
          let typePiece = checkEatableClass.children[0].classList[0];

          board.replaceChild(
            createNewElement(
              "div",
              {
                class: `${clasElements}`,
                id: `${checkEatableClass.id}`,
              },
              true,
              `pieces/${typePiece}.svg`,
              `${typePiece}`
            ),
            checkEatableClass
          );
        }
      }
    });
  });
}

function getElementClases(piece) {
  let clasElements = "";
  for (let index = 0; index < piece.classList.length; index++) {
    clasElements = clasElements + piece.classList[index] + " ";
  }
  return clasElements;
}

function replaceUnoccupiedSquares(typePiece) {
  chessboardDefined.forEach((row) => {
    Object.keys(row).forEach((column) => {
      const squareWithEventListener = document.getElementById(column);
      if (
        squareWithEventListener.dataset.eventlisteners !== undefined &&
        !squareWithEventListener.classList.contains("occupied") &&
        !squareWithEventListener.classList.contains(
          `passant-${typePiece.split("-")[1]}`
        )
      ) {
        let clasElements = getElementClases(squareWithEventListener);

        const board = squareWithEventListener.parentNode;
        board.replaceChild(
          createNewElement(
            "div",
            {
              class: `${clasElements}`,
              id: `${squareWithEventListener.id}`,
            },
            false,
            null,
            null
          ),
          squareWithEventListener
        );
      }
    });
  });
}

function flipBoard(typePiece) {
  let colorSwitch = typePiece.split("-")[1] === "w" ? "b" : "w";
  setPlayersTurn(false, typePiece.split("-")[1]);
  drawSavedPiecesPositions(typePiece);
  setPlayersTurn(true, colorSwitch);
}

function checkCompassSquares(positionPiece) {
  const upSquare = document.getElementById(
    `${positionPiece.charAt(0)}${parseInt(positionPiece.charAt(1)) + 1}`
  );

  const rightSquare = document.getElementById(
    `${String.fromCharCode(
      positionPiece.charCodeAt(0) + 1
    )}${positionPiece.charAt(1)}`
  );

  const leftSquare = document.getElementById(
    `${String.fromCharCode(
      positionPiece.charCodeAt(0) - 1
    )}${positionPiece.charAt(1)}`
  );

  const downSquare = document.getElementById(
    `${positionPiece.charAt(0)}${parseInt(positionPiece.charAt(1)) - 1}`
  );

  const validSquares = [upSquare, rightSquare, leftSquare, downSquare];
  const icrementSquares = [1, null, null, -1];
  const charIncrementSquares = [null, 1, -1, null];
  let increment = [];
  let charIncrement = [];

  for (let index = 0; index < validSquares.length; index++) {
    increment[index] = icrementSquares[index];
    charIncrement[index] = charIncrementSquares[index];
  }

  return [validSquares, increment, charIncrement];
}

function filterUntilNull(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === null) break;
    result[i] = arr[i];
  }
  return result;
}

function checkIncrementedSquares(square, increment, charIncrement, typePiece) {
  let unOccupiedSquares = [];
  let eatableSquares = [];
  let object;
  let count = 0;

  if (increment !== null) {
    if (increment === 1) {
      for (let index = parseInt(square.id.charAt(1)); index <= 8; index++) {
        object =
          document.getElementById(`${square.id.charAt(0)}${index}`) !== null
            ? document.getElementById(`${square.id.charAt(0)}${index}`)
            : document.getElementById(
                `${square.id.charAt(0)}${square.id.charAt(1)}`
              );

        unOccupiedSquares[index - parseInt(square.id.charAt(1))] =
          object.classList.contains("occupied") ? null : object;

        if (
          object.classList.contains("occupied") &&
          object !== null &&
          count === 0
        ) {
          if (!object.childNodes[0].classList[0].includes(typePiece)) {
            eatableSquares.push(object);
          }
          count++;
        }
      }
    } else if (increment === -1) {
      let i = 0;

      for (let index = parseInt(square.id.charAt(1)); index >= 1; index--) {
        object =
          document.getElementById(`${square.id.charAt(0)}${index}`) !== null
            ? document.getElementById(`${square.id.charAt(0)}${index}`)
            : document.getElementById(
                `${square.id.charAt(0)}${square.id.charAt(1)}`
              );

        unOccupiedSquares[i] = object.classList.contains("occupied")
          ? null
          : object;
        if (
          object.classList.contains("occupied") &&
          object !== null &&
          count === 0
        ) {
          if (!object.childNodes[0].classList[0].includes(typePiece)) {
            eatableSquares.push(object);
          }
          count++;
        }
        i++;
      }
    }
  }

  if (charIncrement !== null) {
    if (charIncrement === 1) {
      let i = 0;
      for (let index = square.id.charCodeAt(0); index <= 104; index++) {
        object =
          document.getElementById(
            `${String.fromCharCode(index)}${square.id.charAt(1)}`
          ) !== null
            ? document.getElementById(
                `${String.fromCharCode(index)}${square.id.charAt(1)}`
              )
            : document.getElementById(
                `${square.id.charAt(0)}${square.id.charAt(1)}`
              );

        unOccupiedSquares[i] = object.classList.contains("occupied")
          ? null
          : object;
        if (
          object.classList.contains("occupied") &&
          object !== null &&
          count === 0
        ) {
          if (!object.childNodes[0].classList[0].includes(typePiece)) {
            eatableSquares.push(object);
          }
          count++;
        }
        i++;
      }
    } else if (charIncrement === -1) {
      let i = 0;
      for (let index = square.id.charCodeAt(0); index >= 97; index--) {
        object =
          document.getElementById(
            `${String.fromCharCode(index)}${square.id.charAt(1)}`
          ) !== null
            ? document.getElementById(
                `${String.fromCharCode(index)}${square.id.charAt(1)}`
              )
            : document.getElementById(
                `${square.id.charAt(0)}${square.id.charAt(1)}`
              );

        unOccupiedSquares[i] = object.classList.contains("occupied")
          ? null
          : object;
        if (
          object.classList.contains("occupied") &&
          object !== null &&
          count === 0
        ) {
          if (!object.childNodes[0].classList[0].includes(typePiece)) {
            eatableSquares.push(object);
            // count++; para poder saltar piezas --> para el caballo
          }
          count++;
        }
        i++;
      }
    }
  }

  return [filterUntilNull(unOccupiedSquares), eatableSquares];
}

function removeValidatedSquares() {
  if (firstValidatedElementS !== null) {
    chessboardDefined.forEach((row) => {
      Object.keys(row).forEach((column) => {
        const checkValidateClass = document.getElementById(column);
        const board = checkValidateClass.parentNode;

        if (checkValidateClass.classList.contains("validate")) {
          checkValidateClass.classList.remove("validate");
          let clasElements = getElementClases(checkValidateClass);

          board.replaceChild(
            createNewElement(
              "div",
              {
                class: `${clasElements}`,
                id: `${checkValidateClass.id}`,
              },
              false,
              null,
              null
            ),
            checkValidateClass
          );
        }
      });
    });
  }
}

function validateRookSquares(positionPiece, typePiece) {
  const compassSquares = checkCompassSquares(positionPiece);

  const availableSquares = compassSquares[0];
  const verticalSquares = compassSquares[1];
  const horizontalSquares = compassSquares[2];
  let checkIncrementedSquaresArr = 0;
  let unOccupiedSquares = [];
  let eatableSquares = [];

  for (let index = 0; index < availableSquares.length; index++) {
    const square = availableSquares[index];
    const increment = verticalSquares[index];
    const charIncrement = horizontalSquares[index];

    if (square !== null) {
      checkIncrementedSquaresArr = checkIncrementedSquares(
        square,
        increment,
        charIncrement,
        `-${typePiece.split("-")[1]}`
      );

      unOccupiedSquares.push(checkIncrementedSquaresArr[0]);
      eatableSquares.push(checkIncrementedSquaresArr[1]);
    }
  }

  if (
    document
      .getElementById(typePiece + "-" + positionPiece)
      .classList.contains("selected")
  ) {
    firstValidatedElementS = [];

    for (let index = 0; index < unOccupiedSquares.length; index++) {
      if (unOccupiedSquares[index].length !== 0) {
        unOccupiedSquares[index].forEach((square) => {
          square.classList.add("validate");
          square.innerHTML = '<div class="val-child"></div>';

          square.addEventListener("click", () => {
            if (square.classList[2].includes("passant")) {
              const passantClass = square.classList[2];
              const eatablePassantClass = square.classList[3];
              square.classList.remove(passantClass);
              square.classList.remove(eatablePassantClass);
            }
            drawSelectedPiece(positionPiece, typePiece, square.id);
            flipBoard(typePiece);
          });

          firstValidatedElementS.push(square);
        });
      }
    }

    eatableSquares.forEach((eatableSquare) => {
      if (eatableSquare.length !== 0) {
        for (let index = 0; index < eatableSquare.length; index++) {
          eatableSquare[index].classList.add("eatable");
          eatableSquare[index].addEventListener("click", () => {
            drawSelectedPiece(
              positionPiece,
              typePiece,
              eatableSquare[index].id
            );
            flipBoard(typePiece);
          });
        }
      }
    });
  }
}

function validatePawnMovement(positionPiece, typePiece) {
  replaceUnoccupiedSquares(typePiece);
  desmarkEatableSquares();
  removeValidatedSquares();

  function setEatableIndexes(square1) {
    let eatableSquares = null;
    let i = 0;

    chessNotationColumns.forEach((element) => {
      if (element === square1.id.charAt(0)) {
        eatableSquares = [
          document.getElementById(
            `${chessNotationColumns[i - 1]}${square1.id.charAt(1)}`
          ),
          document.getElementById(
            `${chessNotationColumns[i + 1]}${square1.id.charAt(1)}`
          ),
        ];
      }
      i++;
    });

    return eatableSquares;
  }

  function checkEatablePieces(
    eatableSquare1,
    eatableSquare2,
    typePiece,
    piceId
  ) {
    const valOccupiedPiecesSquare1 =
      eatableSquare1 !== null && eatableSquare1.classList.contains("occupied")
        ? true
        : false;
    const valOccupiedPiecesSquare2 =
      eatableSquare2 !== null && eatableSquare2.classList.contains("occupied")
        ? true
        : false;
    const typePieceSelectedSquare1 = valOccupiedPiecesSquare1
      ? eatableSquare1.children[0].classList[0].split("-")[1]
      : null;
    const typePieceSelectedSquare2 = valOccupiedPiecesSquare2
      ? eatableSquare2.children[0].classList[0].split("-")[1]
      : null;

    if (
      typePieceSelectedSquare1 !== typePiece.split("-")[1] &&
      typePieceSelectedSquare1 !== null
    ) {
      eatableSquare1.classList.add("eatable");

      if (
        typePieceSelectedSquare2 !== typePiece &&
        typePieceSelectedSquare2 !== null
      ) {
        eatableSquare2.classList.add("eatable");
      }
    } else if (
      typePieceSelectedSquare2 !== typePiece.split("-")[1] &&
      typePieceSelectedSquare2 !== null
    ) {
      eatableSquare2.classList.add("eatable");

      if (
        typePieceSelectedSquare1 !== typePiece &&
        typePieceSelectedSquare1 !== null
      ) {
        eatableSquare1.classList.add("eatable");
      }
    }

    const tPiece = typePiece.split("-")[1] === "w" ? "b" : "w";

    if (
      eatableSquare1 !== null &&
      eatableSquare1.classList.contains(`passant-${tPiece}`)
    ) {
      eatableSquare1.classList.add("eatable");
      eatableSquare1.classList.add(`eatablePassant-${piceId}`);
    } else if (
      eatableSquare2 !== null &&
      eatableSquare2.classList.contains(`passant-${tPiece}`)
    ) {
      eatableSquare2.classList.add("eatable");
      eatableSquare2.classList.add(`eatablePassant-${piceId}`);
    }

    if (
      eatableSquare1 !== null &&
      eatableSquare1.classList.contains(`eatablePassant-${piceId}`)
    ) {
      eatableSquare1.classList.add("eatable");
    } else if (
      eatableSquare2 !== null &&
      eatableSquare2.classList.contains(`eatablePassant-${piceId}`)
    ) {
      eatableSquare2.classList.add("eatable");
    }

    let eatable = setEatableEventListeners(typePiece);
    return eatable;
  }

  function setEatableEventListeners(typePiece) {
    let eatableElements = document.getElementsByClassName("eatable");

    for (let index = 0; index < eatableElements.length; index++) {
      eatableElements[index].addEventListener("click", () => {
        let child = eatableElements[index].hasChildNodes()
          ? eatableElements[index].childNodes[0]
          : null;
        if (child !== null) {
          eatableElements[index].replaceChild(
            createNewElement(
              "img",
              {
                class: `${typePiece}`,
                id: `${typePiece + "-" + child.id.split("-")[2]}`,
                src: `pieces/${typePiece}.svg`,
              },
              false,
              null,
              null
            ),
            child
          );

          let selectedElements = document.getElementsByClassName("selected");
          for (let index = 0; index < selectedElements.length; index++) {
            selectedElements[index].parentNode.classList.remove("occupied");
            selectedElements[index].remove();
          }
          flipBoard(typePiece);
          return true;
        } else {
          eatableElements[index].appendChild(
            createNewElement(
              "img",
              {
                class: `${typePiece}`,
                id: `${typePiece + "-" + eatableElements[index].id}`,
                src: `pieces/${typePiece}.svg`,
              },
              false,
              null,
              null
            )
          );
          eatableElements[index].classList.add("occupied");
          let passantPiece = !typePiece.includes("-w")
            ? document.getElementById(
                `${eatableElements[index].id.charAt(0)}${
                  parseInt(eatableElements[index].id.charAt(1)) + 1
                }`
              )
            : document.getElementById(
                `${eatableElements[index].id.charAt(0)}${
                  parseInt(eatableElements[index].id.charAt(1)) - 1
                }`
              );
          passantPiece.classList.remove("occupied");
          passantPiece.innerHTML = "";

          let selectedElements = document.getElementsByClassName("selected");
          for (let index = 0; index < selectedElements.length; index++) {
            selectedElements[index].parentNode.classList.remove("occupied");
            selectedElements[index].remove();
          }

          flipBoard(typePiece);
          return true;
        }
      });
    }
  }

  // if ( whitePlayer ? typePiece.includes("-b") : typePiece.includes("-w")) return;
  //
  // const pieceDrag = document.getElementById('${typePiece}-${squareSelected}');
  // const targetDrag = document.getElementById();
  //
  // pieceDrag .addEventListener('dragstart', function(event) {
  //   console.log(event)
  // })
  // targetDrag.addEventListener('dragover', function(event) {
  //   event.preventDefault()
  // })
  // targetDrag.addEventListener('drop', function(event) {
  //   dropZone.prepend(card)
  // })
  //
  const increment = typePiece.includes("-w") ? 1 : -1;
  let verticalMovementIncrement = 0;

  if (positionPiece.includes("2") && typePiece.includes("-w")) {
    verticalMovementIncrement = increment * 2;
  } else if (positionPiece.includes("7") && typePiece.includes("-b")) {
    verticalMovementIncrement = increment * 2;
  } else {
    verticalMovementIncrement = increment;
  }

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
  let square2 = nextSquareIncremented
    ? document.getElementById(`${chessBoardGridItemId[1]}`)
    : null;

  const nextSquareContent = square1.classList.contains("occupied");
  if (square2 !== null) {
    square2 = square2.classList.contains("occupied") ? null : square2;
  }

  const eatableSquares = setEatableIndexes(square1);
  const eatableSquare1 = eatableSquares[0];
  const eatableSquare2 = eatableSquares[1];

  let eatable = checkEatablePieces(
    eatableSquare1,
    eatableSquare2,
    typePiece,
    positionPiece
  );

  if (!nextSquareContent && !eatable) {
    if (square2 !== null) {
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

    function square1Selected() {
      square1.classList.remove("validate");
      square1.innerHTML = "";
      if (square2 !== null) {
        square2.removeEventListener("click", square2Selected);
        square2.classList.remove("validate");
        square2.innerHTML = "";
      }

      drawSelectedPiece(positionPiece, typePiece, square1.id);
      square1.removeEventListener("click", square1Selected);

      flipBoard(typePiece);
    }

    function square2Selected() {
      square1.removeEventListener("click", square1Selected);
      square1.classList.remove("validate");
      square1.innerHTML = "";
      square2.classList.remove("validate");
      square2.innerHTML = "";

      drawSelectedPiece(positionPiece, typePiece, square2.id);
      square2.removeEventListener("click", square2Selected);
      square1.classList.add(`passant-${typePiece.split("-")[1]}`);

      flipBoard(typePiece);
    }

    if (square1.classList.contains("validate")) {
      square1.addEventListener("click", square1Selected);
      square1.dataset.eventlisteners = "click";
      if (square2 !== null) {
        square2.addEventListener("click", square2Selected);
        square2.dataset.eventlisteners = "click";
      }
    }
  }

  chessboardDefined.forEach((row) => {
    Object.keys(row).forEach((column) => {
      const checkPassantClass = document.getElementById(column);

      if (
        checkPassantClass.classList.contains(
          `passant-${typePiece.split("-")[1]}`
        )
      )
        checkPassantClass.classList.remove(
          `passant-${typePiece.split("-")[1]}`
        );
    });
  });
}

function validateRookMovement(positionPiece, typePiece) {
  replaceUnoccupiedSquares(typePiece);
  desmarkEatableSquares();
  removeValidatedSquares();
  validateRookSquares(positionPiece, typePiece);
}

function validateKnightMovement(positionPiece, typePiece) {
  replaceUnoccupiedSquares(typePiece);
  desmarkEatableSquares();
  removeValidatedSquares();
}

function validateBishopMovement(positionPiece, typePiece) {
  replaceUnoccupiedSquares(typePiece);
  desmarkEatableSquares();
  removeValidatedSquares();
}

function validateQueenMovement(positionPiece, typePiece) {
  replaceUnoccupiedSquares(typePiece);
  desmarkEatableSquares();
  removeValidatedSquares();
  validateRookSquares(positionPiece, typePiece);
}

function validateKingMovement(positionPiece, typePiece) {
  replaceUnoccupiedSquares(typePiece);
  desmarkEatableSquares();
  removeValidatedSquares();
}

function validatePieces(typePiece, piecePosition) {
  const positionPiece = piecePosition.replace(typePiece + "-", "");
  const pieceType = typePiece.split("-")[0];

  switch (pieceType) {
    case "pawn":
      validatePawnMovement(positionPiece, typePiece);
      break;
    case "rook":
      validateRookMovement(positionPiece, typePiece);
      break;
    case "knight":
      validateKnightMovement(positionPiece, typePiece);
      break;
    case "bishop":
      validateBishopMovement(positionPiece, typePiece);
      break;
    case "queen":
      validateQueenMovement(positionPiece, typePiece);
      break;
    case "king":
      validateKingMovement(positionPiece, typePiece);
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

function setPlayersTurn(startEventListeners, pieceColorType) {
  const pieces = document.querySelectorAll("img");
  if (pieceColorType !== undefined) {
    for (let index = 0; index < pieces.length; index++) {
      let piece = pieces[index].classList[0];
      let pieceType = piece.split("-")[1];

      let squareContainer = pieces[index].parentNode;

      if (pieceColorType === "w") {
        if (pieceType === "w") {
          squareContainer.replaceChild(
            createNewElement(
              "img",
              {
                id: `${`${pieces[index].id}`}`,
                class: `${getElementClases(pieces[index])}`,
                src: `pieces/${piece}.svg`,
              },
              false,
              null,
              null
            ),
            pieces[index]
          );
          if (startEventListeners) {
            const selectedPiece = document.getElementById(
              `${pieces[index].id}`
            );
            selectedPiece.addEventListener("click", () =>
              getMovements(selectedPiece)
            );
          }
        }
      }
      if (pieceColorType === "b") {
        if (pieceType === "b") {
          squareContainer.replaceChild(
            createNewElement(
              "img",
              {
                id: `${`${pieces[index].id}`}`,
                class: `${getElementClases(pieces[index])}`,
                src: `pieces/${piece}.svg`,
              },
              false,
              null,
              null
            ),
            pieces[index]
          );
          if (startEventListeners) {
            const selectedPiece = document.getElementById(
              `${pieces[index].id}`
            );
            selectedPiece.addEventListener("click", () =>
              getMovements(selectedPiece)
            );
          }
        }
      }
    }
  }
}

let chessboardDefined = drawBoard(chessboard, whitePlayer, !reverseChessBoard);
startPiecesPositions();
setPlayersTurn(false, "b");
