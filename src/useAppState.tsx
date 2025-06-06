import { useReducer, Dispatch } from "react";
import { Board } from "./Board";

export type State =
  | {
      phase: "pre-game";
      board: Board | null;
    }
  | {
      phase: "in-game";
      board: Board;
    }
  | {
      phase: "post-game";
      board: Board;
    };

export type Action =
  | {
      type: "start-game";
    }
  | {
      type: "load-board";
      board: Board;
    }
  | {
      type: "reveal-cell";
      row: number;
      col: number;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "start-game":
      if (state.board === null) return state;
      return {
        ...state,
        phase: "in-game",
        board: state.board,
      };
    case "load-board":
      return {
        ...state,
        board: action.board,
      };
    case "reveal-cell":
      if (state.phase !== "in-game" || !state.board) return state; // Confirm phase and board exists
      const { row, col } = action;
      if (state.board.display[row][col] !== -1) return state; // Do nothing if already checked

      if (state.board.mines[row][col]) {
        // Game over
        return {
          ...state,
          phase: "post-game",
          board: state.board,
        };
      }

      const mineCount = state.board.mines.reduce(
        (count, r, rIdx) =>
          count +
          r.reduce(
            (cCount, cell, cIdx) =>
              cCount +
              (cell && Math.abs(rIdx - row) <= 1 && Math.abs(cIdx - col) <= 1
                ? 1
                : 0),
            0,
          ),
        0,
      );

      const newDisplay = state.board.display.map((r, rIdx) =>
        rIdx === row
          ? r.map((cell, cIdx) => (cIdx === col ? mineCount : cell))
          : r.slice(),
      );
      return {
        ...state,
        board: {
          ...state.board,
          display: newDisplay,
        },
      };

    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

function getInitialState(): State {
  return {
    phase: "pre-game",
    board: null,
  };
}

export default function useAppState(): [State, Dispatch<Action>] {
  return useReducer(reducer, undefined, getInitialState);
}
