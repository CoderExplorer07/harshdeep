// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;

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

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < 8; i++) {
            const winCondition = winningConditions[i];
            const a = gameBoard[winCondition[0]];
            const b = gameBoard[winCondition[1]];
            const c = gameBoard[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.innerText = `${currentPlayer} has won!`;
            isGameActive = false;
            return;
        }

        if (!gameBoard.includes('')) {
            statusText.innerText = 'Game is a draw!';
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerText = `It's ${currentPlayer}'s turn`;
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameBoard[clickedCellIndex] !== '' || !isGameActive) {
            return;
        }

        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.innerText = currentPlayer;

        handleResultValidation();
    };

    const handleRestartGame = () => {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        statusText.innerText = `It's ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.innerText = '');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);

    statusText.innerText = `It's ${currentPlayer}'s turn`;
});
