export const resetGameStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};

export const readGameStorage = () => {
  const board = window.localStorage.getItem("board");
  const turn = window.localStorage.getItem("turn");

  return {
    board: board ? JSON.parse(board) : null,
    turn,
  };
};

export const saveGameToStorage = ({ board, turn }) => {
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
};
