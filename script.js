const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Adjust size and color of text on the cells
cells.forEach(cell => {
    cell.style.fontSize = '2.5rem';
    cell.style.color = '#2e8b57'; // SeaGreen
});

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');

    if (board[clickedCellIndex] !== '' || !gameActive) return;

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkResult();
};

const checkResult = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageElement.textContent = `Player ${currentPlayer} has won!`;
        messageElement.style.color = '#ff4500'; // OrangeRed
        messageElement.style.fontSize = '1.8rem';
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        messageElement.textContent = 'Game ended in a draw!';
        messageElement.style.color = '#8b0000'; // DarkRed
        messageElement.style.fontSize = '1.8rem';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
    messageElement.style.color = '#000080'; // Navy
    messageElement.style.fontSize = '1.5rem';
};

const resetGame = () => {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
    messageElement.style.color = '#000080'; // Navy
    messageElement.style.fontSize = '1.5rem';
    cells.forEach(cell => (cell.textContent = ''));
};

resetBtn.style.backgroundColor = '#6495ed'; // CornflowerBlue
resetBtn.style.color = '#ffffff'; // White
resetBtn.style.fontSize = '1.2rem';
resetBtn.style.padding = '12px 24px';
resetBtn.style.borderRadius = '8px';

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
