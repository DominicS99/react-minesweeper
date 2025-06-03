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
