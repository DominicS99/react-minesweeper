import { useEffect, Dispatch } from "react";
import { Board } from "./Board";
import { Action } from "./useAppState";

// Function to create a new board with mines and display cells
// Total mines are 20% of the total cells
function createBoard(size: number): Board {
  const totCells = size * size;
  const totMines = Math.floor(totCells * 0.2);
  const boardHidden: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false),
  );
  const boardDisplay: number[][] = Array.from({ length: size }, () =>
    Array(size).fill(-1),
  );

  // Initialize the board with mines
  const minePositions = new Set<number>();
  while (minePositions.size < totMines) {
    const pos = Math.floor(Math.random() * totCells);
    minePositions.add(pos);
  }

  // Create the board structure
  minePositions.forEach((pos) => {
    const row = Math.floor(pos / size);
    const col = pos % size;
    boardHidden[row][col] = true;
  });

  const res: Board = {
    mines: boardHidden,
    display: boardDisplay,
  };

  return res;
}

export default function useLoadBoard(size: number, dispatch: Dispatch<Action>) {
  useEffect(() => {
    dispatch({
      type: "load-board",
      board: createBoard(size),
    });
  }, [size, dispatch]);
}
