import { WINNER_COMBOS } from '../../constants';

export const checkWinnerFrom = (boardToCheck) => {
	for (const combo of WINNER_COMBOS) {
		const [a, b, c] = combo;
		if (
			boardToCheck[a] &&
			boardToCheck[a] === boardToCheck[b] &&
			boardToCheck[a] === boardToCheck[c]
		) {
			return boardToCheck[a]; // Devuelve el ganador
		}
	}
	return null; // Devuelve null si no hay ganador
};

export const checkEndGame = (boardToCheck) => {
	return boardToCheck.every((square) => square !== null);
};
