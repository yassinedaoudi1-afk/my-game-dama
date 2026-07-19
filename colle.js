let gameMode = "pvp";

document.getElementById("pvp").onclick = () => {
    gameMode = "pvp";
    document.getElementById("menu").style.display = "none";
};

document.getElementById("ai").onclick = () => {
    gameMode = "ai";
    document.getElementById("menu").style.display = "none";
};
const moveSound = new Audio("sounds/move.mp3");
const captureSound = new Audio("sounds/capture.mp3");
const winSound = new Audio("sounds/win.mp3");
const board = document.getElementById("board");
let selectedPiece = null;
let currentPlayer = "red";

// إنشاء اللوحة
for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {

        const square = document.createElement("div");
        square.classList.add("square");

        square.dataset.row = row;
        square.dataset.col = col;

        if ((row + col) % 2 === 0) {
            square.classList.add("white");
        } else {
            square.classList.add("black");
        }

        board.appendChild(square);
    }
}

const squares = document.querySelectorAll(".square");

// إنشاء قطعة
function createPiece(color) {

    const piece = document.createElement("div");
    piece.classList.add("piece", color);
    piece.dataset.color = color;

    return piece;
}function canCapture(piece) {

    const color = piece.dataset.color;

    const row = Number(piece.parentElement.dataset.row);
    const col = Number(piece.parentElement.dataset.col);

    // إذا كانت القطعة ملكاً
    if (piece.dataset.king === "true") {

        const dirs = [
            [1,1],
            [1,-1],
            [-1,1],
            [-1,-1]
        ];

        for (const [dr, dc] of dirs) {

            let r = row + dr;
            let c = col + dc;

            let enemyFound = false;

            while (true) {

                const square = getSquare(r, c);

                if (!square) break;

                if (square.children.length === 0) {

                    if (enemyFound) {
                        return true;
                    }

                } else {

                    const p = square.firstElementChild;

                    if (p.dataset.color === color) {
                        break;
                    }

                    if (enemyFound) {
                        break;
                    }

                    enemyFound = true;
                }

                r += dr;
                c += dc;
            }
        }

        return false;
    }

    // القطعة العادية
    const directions = color === "red"
        ? [[2,-2],[2,2]]
        : [[-2,-2],[-2,2]];

    for (const [dr, dc] of directions) {

        const target = getSquare(row + dr, col + dc);
        const middle = getSquare(row + dr/2, col + dc/2);

        if (
            target &&
            middle &&
            target.children.length === 0 &&
            middle.children.length > 0 &&
            middle.firstElementChild.dataset.color !== color
        ) {
            return true;
        }
    }

    return false;
}
function playerMustCapture(color) {

    const pieces = document.querySelectorAll(".piece");

    for (const piece of pieces) {
        if (piece.dataset.color === color && canCapture(piece)) {
            return true;
        }
    }

    return false;
}

// القطع الحمراء
for (let i = 0; i < 24; i++) {
    if (squares[i].classList.contains("black")) {
        squares[i].appendChild(createPiece("red"));
    }
}

// القطع الزرقاء
for (let i = 40; i < 64; i++) {
    if (squares[i].classList.contains("black")) {
        squares[i].appendChild(createPiece("blue"));
    }
}
 updateCounts();
function getSquare(row, col) {
    return document.querySelector(
        `.square[data-row="${row}"][data-col="${col}"]`
    );
}
function clearMoves() {
    document.querySelectorAll(".square").forEach(square => {
        square.classList.remove("move");
        square.classList.remove("capture");
    });
}
// التحكم في اللعبة
board.addEventListener("click", function (e) {

    const target = e.target;

    // اختيار قطعة
    if (target.classList.contains("piece")) {

        if (target.dataset.color !== currentPlayer) return;

        document.querySelectorAll(".piece").forEach(p => {
            p.style.outline = "none";
        });

        selectedPiece = target;
        selectedPiece.style.outline = "4px solid yellow";
        selectedPiece.style.transform = "scale(1.15)";        
clearMoves();

const row = Number(selectedPiece.parentElement.dataset.row);
const col = Number(selectedPiece.parentElement.dataset.col);
if (selectedPiece.dataset.king === "true") {

    const dirs = [[1,1],[1,-1],[-1,1],[-1,-1]];

    dirs.forEach(([dr, dc]) => {

        let r = row + dr;
        let c = col + dc;
        let enemyFound = false;

        while (true) {

            const square = getSquare(r, c);

            if (!square) break;

            if (square.children.length === 0) {

                square.classList.add(enemyFound ? "capture" : "move");

            } else {

                const piece = square.firstElementChild;

                if (piece.dataset.color === currentPlayer) {
                    break;
                }

                if (enemyFound) {
                    break;
                }

                enemyFound = true;
            }

            r += dr;
            c += dc;
        }

    });

} else {

    const dirs = currentPlayer === "red"
        ? [[1,1],[1,-1]]
        : [[-1,1],[-1,-1]];

    dirs.forEach(([dr, dc]) => {

        let square = getSquare(row + dr, col + dc);

        if (square && square.children.length === 0) {
            square.classList.add("move");
        }

        let target = getSquare(row + dr * 2, col + dc * 2);
        let middle = getSquare(row + dr, col + dc);

        if (
            target &&
            middle &&
            target.children.length === 0 &&
            middle.children.length > 0 &&
            middle.firstElementChild.dataset.color !== currentPlayer
        ) {
            target.classList.add("capture");
        }

    });

}

        return;
    }

    // نقل القطعة
    if (
        target.classList.contains("square") &&
        selectedPiece &&
        target.children.length === 0 &&
        target.classList.contains("black")
    ) {

        const from = selectedPiece.parentElement;

        const fromRow = Number(from.dataset.row);
        const fromCol = Number(from.dataset.col);

        const toRow = Number(target.dataset.row);
        const toCol = Number(target.dataset.col);

        let valid = false;
        let capturedPiece = null;const isKing = selectedPiece.dataset.king === "true";
if (isKing) {

    if (Math.abs(toRow - fromRow) === Math.abs(toCol - fromCol)) {

        let dr = toRow > fromRow ? 1 : -1;
        let dc = toCol > fromCol ? 1 : -1;

        let r = fromRow + dr;
        let c = fromCol + dc;

        valid = true;
        let enemy = null;

        while (r !== toRow && c !== toCol) {

            const square = getSquare(r, c);

            if (square.children.length > 0) {

                const piece = square.firstElementChild;

                if (piece.dataset.color === currentPlayer) {
                    valid = false;
                    break;
                }

                if (enemy) {
                    valid = false;
                    break;
                }

                enemy = piece;
            }

            r += dr;
            c += dc;
        }

        if (valid && enemy) {
            capturedPiece = enemy;
        }

    }

} else if (currentPlayer === "red") {

    // حركة الأحمر
    if (
        toRow === fromRow + 1 &&
        Math.abs(toCol - fromCol) === 1
    ) {
        valid = true;
    }

    if (
        toRow === fromRow + 2 &&
        Math.abs(toCol - fromCol) === 2
    ) {

        const middle = getSquare(
            fromRow + 1,
            fromCol + (toCol > fromCol ? 1 : -1)
        );

        if (
            middle &&
            middle.firstElementChild &&
            middle.firstElementChild.dataset.color === "blue"
        ) {
            valid = true;
            capturedPiece = middle.firstElementChild;
        }
    }

} else {

    // حركة الأزرق
    if (
        toRow === fromRow - 1 &&
        Math.abs(toCol - fromCol) === 1
    ) {
        valid = true;
    }

    if (
        toRow === fromRow - 2 &&
        Math.abs(toCol - fromCol) === 2
    ) {

        const middle = getSquare(
            fromRow - 1,
            fromCol + (toCol > fromCol ? 1 : -1)
        );

        if (
            middle &&
            middle.firstElementChild &&
            middle.firstElementChild.dataset.color === "red"
        ) {
            valid = true;
            capturedPiece = middle.firstElementChild;
        }
    }
}if (!valid) return;

// إذا كان هناك أكل متاح فلا يسمح بالحركة العادية
if (playerMustCapture(currentPlayer) && !capturedPiece) {
    alert("يجب عليك الأكل.");
    return;
}
if (capturedPiece) {
    capturedPiece.remove();
     updateCounts();
    if (checkWinner()) {
        return;
    }
}
target.appendChild(selectedPiece);
if (capturedPiece) {
    captureSound.play();
} else {
    moveSound.play();
}
clearMoves();
    // ترقية إلى ملك
if (
    selectedPiece.dataset.color === "red" &&
    toRow === 7
) {
    selectedPiece.dataset.king = "true";
    selectedPiece.classList.add("king");
}

if (
    selectedPiece.dataset.color === "blue" &&
    toRow === 0
) {
    selectedPiece.dataset.king = "true";
    selectedPiece.classList.add("king");
}

    if (capturedPiece && canCapture(selectedPiece)) {

        selectedPiece.style.outline = "4px solid yellow";

    } else {
        selectedPiece.style.outline = "none";
        selectedPiece.style.transform = "scale(1)";
        selectedPiece = null;

        currentPlayer = currentPlayer === "red" ? "blue" : "red";
        updateTurn();
       if (
    gameMode === "ai" &&
    currentPlayer === "blue" &&
    selectedPiece === null
) {
    setTimeout(aiMove, 500);
}
        if (!hasMove(currentPlayer)) {
            winSound.play();
    showWinner(
        currentPlayer === "red"
            ? "🎉 اللاعب الأزرق فاز!"
            : "🎉 اللاعب الأحمر فاز!"
    );
    return;
}
    }
}
});
function checkWinner() {

    const redPieces = document.querySelectorAll(".piece.red").length;
    const bluePieces = document.querySelectorAll(".piece.blue").length;

    if (redPieces === 0) {
        winSound.play();
        showWinner("🎉 اللاعب الأزرق فاز!");
        return true;
    }

    if (bluePieces === 0) {
        winSound.play();
        showWinner("🎉 اللاعب الأحمر فاز!");
        return true;
    }

    return false;
}
document.getElementById("restart").addEventListener("click", () => {
    location.reload();
});
function updateCounts() {
    document.getElementById("redCount").textContent =
        document.querySelectorAll(".piece.red").length;

    document.getElementById("blueCount").textContent =
        document.querySelectorAll(".piece.blue").length;
}
function hasMove(color) {
    const pieces = document.querySelectorAll(`.piece.${color}`);

    for (const piece of pieces) {
        if (canCapture(piece)) return true;

        const row = Number(piece.parentElement.dataset.row);
        const col = Number(piece.parentElement.dataset.col);

        const dirs = piece.dataset.king === "true"
            ? [[1,1],[1,-1],[-1,1],[-1,-1]]
            : color === "red"
                ? [[1,1],[1,-1]]
                : [[-1,1],[-1,-1]];

        for (const [dr, dc] of dirs) {
            const square = getSquare(row + dr, col + dc);

            if (square && square.children.length === 0) {
                return true;
            }
        }
    }

    return false;
}
function aiMove() {

    const moves = getAllMoves("blue");

    if (moves.length === 0) {
        showWinner("🎉 فاز الأحمر");
        return;
    }

    const move = chooseBestMove(moves);

    makeMove(move);
}
function getBoardState() {

    let board = [];

    for (let row = 0; row < 8; row++) {

        board[row] = [];

        for (let col = 0; col < 8; col++) {

            const square = getSquare(row, col);

            if (square.children.length === 0) {

                board[row][col] = null;

            } else {

                const piece = square.firstElementChild;

                board[row][col] = {
                    color: piece.dataset.color,
                    king: piece.dataset.king === "true"
                };

            }

        }

    }

    return board;
}
function cloneBoard(board) {

    return JSON.parse(JSON.stringify(board));

}
function inside(r, c) {

    return r >= 0 &&
           r < 8 &&
           c >= 0 &&
           c < 8;

}
function opponent(color){

    return color === "blue" ? "red" : "blue";

}
function getMoves(board, color) {

    let moves = [];

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece || piece.color !== color) continue;

            let dirs = [];

            if (piece.king) {

    const dirs = [
        [1,1],[1,-1],
        [-1,1],[-1,-1]
    ];

    for (const [dr, dc] of dirs) {

        let r = row + dr;
        let c = col + dc;
        let enemyFound = false;
        let capRow = -1;
        let capCol = -1;

        while (inside(r, c)) {

            if (board[r][c] === null) {

                moves.push({
                    fromRow: row,
                    fromCol: col,
                    toRow: r,
                    toCol: c,
                    capture: enemyFound,
                    capRow,
                    capCol
                });

            } else {

                if (board[r][c].color === color) break;

                if (enemyFound) break;

                enemyFound = true;
                capRow = r;
                capCol = c;
            }

            r += dr;
            c += dc;
        }
    }

    continue;

} else {

                dirs = color === "blue"
                    ? [[-1,-1],[-1,1]]
                    : [[1,-1],[1,1]];

            }

            for (const [dr, dc] of dirs) {

                const r1 = row + dr;
                const c1 = col + dc;

                if (
                    inside(r1,c1) &&
                    board[r1][c1] === null
                ) {

                    moves.push({
                        fromRow: row,
                        fromCol: col,
                        toRow: r1,
                        toCol: c1,
                        capture: false
                    });

                }

                const r2 = row + dr * 2;
                const c2 = col + dc * 2;

                if (
                    inside(r2,c2) &&
                    board[r2][c2] === null &&
                    board[r1][c1] &&
                    board[r1][c1].color !== color
                ) {

                    moves.push({
                        fromRow: row,
                        fromCol: col,
                        toRow: r2,
                        toCol: c2,
                        capture: true,
                        capRow: r1,
                        capCol: c1
                    });

                }

            }

        }

    }
    const captures = moves.filter(m => m.capture);

if (captures.length > 0) {
    return captures;
}

return moves;
    return moves;
}
function applyMove(board, move) {

    const newBoard = cloneBoard(board);

    newBoard[move.toRow][move.toCol] =
        newBoard[move.fromRow][move.fromCol];

    newBoard[move.fromRow][move.fromCol] = null;

    if (move.capture) {
        newBoard[move.capRow][move.capCol] = null;
    }

    // ترقية إلى ملك
    if (
        newBoard[move.toRow][move.toCol].color === "blue" &&
        move.toRow === 0
    ) {
        newBoard[move.toRow][move.toCol].king = true;
    }

    if (
        newBoard[move.toRow][move.toCol].color === "red" &&
        move.toRow === 7
    ) {
        newBoard[move.toRow][move.toCol].king = true;
    }

    return newBoard;
}
function evaluate(board) {

    let score = 0;

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (!piece) continue;

            let value = piece.king ? 3 : 1;

            // مكافأة السيطرة على الوسط
            if (col >= 2 && col <= 5) {
                value += 0.2;
            }

            if (piece.color === "blue") {
                score += value;
            } else {
                score -= value;
            }

        }

    }

    return score;
}
function minimax(board, depth, alpha, beta, maximizing) {

    if (depth === 0) {
        return {
            score: evaluate(board)
        };
    }

    const color = maximizing ? "blue" : "red";
    const moves = getMoves(board, color);

    if (moves.length === 0) {
        return {
            score: maximizing ? -9999 : 9999
        };
    }

    let bestMove = null;

    if (maximizing) {

        let bestScore = -Infinity;

        for (const move of moves) {

            const newBoard = applyMove(board, move);

            const result = minimax(
                newBoard,
                depth - 1,
                alpha,
                beta,
                false
            );

            if (result.score > bestScore) {
                bestScore = result.score;
                bestMove = move;
            }

            alpha = Math.max(alpha, bestScore);

            if (beta <= alpha) break;
        }

        return {
            move: bestMove,
            score: bestScore
        };

    } else {

        let bestScore = Infinity;

        for (const move of moves) {

            const newBoard = applyMove(board, move);

            const result = minimax(
                newBoard,
                depth - 1,
                alpha,
                beta,
                true
            );

            if (result.score < bestScore) {
                bestScore = result.score;
                bestMove = move;
            }

            beta = Math.min(beta, bestScore);

            if (beta <= alpha) break;
        }

        return {
            move: bestMove,
            score: bestScore
        };

    }

}
function aiMove() {

    const boardState = getBoardState();

    const result = minimax(
        boardState,
        4,
        -Infinity,
        Infinity,
        true
    );

    if (!result.move) {
        showWinner("🎉 فاز الأحمر");
        return;
    }

    const from = getSquare(
        result.move.fromRow,
        result.move.fromCol
    );

    const to = getSquare(
        result.move.toRow,
        result.move.toCol
    );

    selectedPiece = from.firstElementChild;

   to.click();

setTimeout(() => {

    while (
        selectedPiece &&
        selectedPiece.dataset.color === "blue" &&
        canCapture(selectedPiece)
    ) {

        const boardState = getBoardState();

        const result = minimax(
            boardState,
            4,
            -Infinity,
            Infinity,
            true
        );

        if (!result.move) break;

        const from = getSquare(
            result.move.fromRow,
            result.move.fromCol
        );

        const to = getSquare(
            result.move.toRow,
            result.move.toCol
        );

        if (
            from.firstElementChild !== selectedPiece
        ) {
            break;
        }

        to.click();

    }

}, 300);
}
function updateTurn() {

    const turn = document.getElementById("turn");

    if (currentPlayer === "red") {
        turn.textContent = "🔴 دور الأحمر";
    } else {
        turn.textContent = "🔵 دور الأزرق";
    }

}
function showWinner(text){

    document.getElementById("winnerText").textContent = text;

    document.getElementById("winnerModal").style.display="flex";
}