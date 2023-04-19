import confetti from 'canvas-confetti';
import { useState, useEffect } from 'react';
import { Square } from './components/Square';
import { WinnerModal } from './components/WinnerModal';
import { TURNS } from './constants';
import { checkEndGame, checkWinnerFrom } from './logic/board';
import {
	resetGameStorage,
	readGameStorage,
	saveGameToStorage,
} from './logic/storage';

function App() {
	const [board, setBoard] = useState(() => {
		const boardFromLocalStorage = readGameStorage().board;
		return boardFromLocalStorage ?? Array(9).fill(null);
	});

	const [turn, setTurn] = useState(() => {
		const turnFromLocalStorage = readGameStorage().turn;
		return turnFromLocalStorage ?? TURNS.X;
	});

	const [winner, setWinner] = useState(null); // null es que no hay ganador, false es que hay empate

	useEffect(() => {
    const winner = checkWinnerFrom(board);
    if (winner) resetGame();
	}, []);

  useEffect(() => {
		saveGameToStorage({ board, turn });
  }, [board, turn]);

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setTurn(TURNS.X);
		setWinner(null);

		resetGameStorage();
	};

	const updateBoard = (index) => {
		if (board[index] || winner) return;

		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);

		const newWinner = checkWinnerFrom(newBoard);
		if (newWinner) {
			confetti();
			setWinner(newWinner);
		} else if (checkEndGame(newBoard)) {
			setWinner(false);
		}
	};

	return (
		<main className='board'>
			<h1>Tic tac toe</h1>
			<button onClick={resetGame}>Reset del juego</button>
			<section className='game'>
				{board.map((square, index) => (
					<Square key={index} index={index} updateBoard={updateBoard}>
						{square}
					</Square>
				))}
			</section>
			<section className='turn'>
				<Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
				<Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
			</section>

			<WinnerModal winner={winner} resetGame={resetGame} />
		</main>
	);
}

export default App;
