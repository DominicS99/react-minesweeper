import { useEffect, Dispatch } from "react";
import { Board } from "./Board";
import { Action } from "./useAppState";

const MINE_FREQ = 0.2; // Frequency of mines in the board

// Function to create a new board with mines and display cells
function createBoard(size: number): Board {
  const totCells = size * size;
  const totMines = Math.floor(totCells * MINE_FREQ);
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

  return {
    mines: boardHidden,
    display: boardDisplay,
  };
}

export default function useLoadBoard(size: number, dispatch: Dispatch<Action>) {
  useEffect(() => {
    dispatch({
      type: "load-board",
      board: createBoard(size),
    });
  }, [dispatch]);
}
