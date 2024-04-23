//V = 1.0.0
const chessNotationColumns = ["h", "g", "f", "e", "d", "c", "b", "a"];
const chessNotationRows = ["1", "2", "3", "4", "5", "6", "7", "8"];

window.onload = () => {
  const chessboard = document.getElementById("chessboard");
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      if ((row + col) % 2 === 0) {
        square.classList.add("white");
        square.id = chessNotationColumns[col] + chessNotationRows[row];
        if (row === 1 || row === 6) {
          square.innerHTML = '<p class="piece">♟</p>';
          const piece = square.querySelector(".piece");
          piece.addEventListener("click", function () {
            deselectAllSquares();
            piece.classList.add("selected");
          });
        }
      } else {
        square.classList.add("black");
        square.id = chessNotationColumns[col] + chessNotationRows[row];
        if (row === 1 || row === 6) {
          square.innerHTML = '<p class="piece">♟</p>';
          const piece = square.querySelector(".piece");
          piece.addEventListener("click", function () {
            deselectAllSquares();
            piece.classList.add("selected");
          });
        }
      }
      chessboard.appendChild(square);
    }
  }
};

function deselectAllSquares() {
  const pieces = document.querySelectorAll(".piece");
  pieces.forEach((piece) => {
    piece.classList.remove("selected");
  });
}
