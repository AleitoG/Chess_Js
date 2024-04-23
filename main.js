//V = 1.0.0
// const chessNotationColumns = ["h", "g", "f", "e", "d", "c", "b", "a"];
// const chessNotationRows = ["1", "2", "3", "4", "5", "6", "7", "8"];

// window.onload = () => {
//   const chessboard = document.getElementById("chessboard");
//   for (let row = 0; row < 8; row++) {
//     for (let col = 0; col < 8; col++) {
//       const square = document.createElement("div");
//       square.classList.add("square");
//       if ((row + col) % 2 === 0) {
//         square.classList.add("white");
//         square.id = chessNotationColumns[col] + chessNotationRows[row];
//         if (row === 1 || row === 6) {
//           square.innerHTML = '<p class="piece">♟</p>';
//           const piece = square.querySelector(".piece");
//           piece.addEventListener("click", function () {
//             deselectAllSquares();
//             piece.classList.add("selected");
//           });
//         }
//       } else {
//         square.classList.add("black");
//         square.id = chessNotationColumns[col] + chessNotationRows[row];
//         if (row === 1 || row === 6) {
//           square.innerHTML = '<p class="piece">♟</p>';
//           const piece = square.querySelector(".piece");
//           piece.addEventListener("click", function () {
//             deselectAllSquares();
//             piece.classList.add("selected");
//           });
//         }
//       }
//       chessboard.appendChild(square);
//     }
//   }
// };

// function deselectAllSquares() {
//   const pieces = document.querySelectorAll(".piece");
//   pieces.forEach((piece) => {
//     piece.classList.remove("selected");
//   });
// }

//v = 1.0.1
const chessNotationColumns = ["a", "b", "c", "d", "e", "f", "g", "h"];
const chessNotationRows = ["1", "2", "3", "4", "5", "6", "7", "8"];

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

chessboard.reverse();

chessboard.forEach((row) => {
  Object.keys(row).forEach((column) => {
    const square = document.createElement("div");
    square.classList.add("square");
    if ((row[column]) % 2 === 0) {
      square.classList.add("white");
      square.id = column;
    } else {
      square.classList.add("black");
      square.id = column;
    }
    document.getElementById("chessboard").appendChild(square);
  });
})
