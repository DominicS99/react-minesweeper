import "./App.css";
import useAppState from "./useAppState";
import useLoadBoard from "./useLoadBoard";

function App() {
  const [state, dispatch] = useAppState();
  useLoadBoard(6, dispatch);

  switch (state.phase) {
    case "pre-game":
      return (
        <div className="App">
          <header className="App-header">
            <h1>React Minesweeper</h1>
            <p>Click to start the game!</p>
            <button onClick={() => dispatch({ type: "start-game" })}>
              Start Game
            </button>
          </header>
        </div>
      );
    case "in-game":
      return (
        <div className="App">
          <header className="App-header">
            <h1>React Minesweeper</h1>
            <div className="board">
              {state.board &&
                state.board.display.map((row: number[], rowIdx: number) => (
                  <div key={rowIdx} className="board-row">
                    {row.map((cell: number, colIdx: number) => (
                      <div
                        key={colIdx}
                        className={
                          "board-cell" +
                          (cell === 0 ? " revealed" : "") +
                          (cell !== -1 && cell !== 0 ? " number" : "")
                        }
                        onClick={() => {
                          if (cell === -1) {
                            dispatch({
                              type: "reveal-cell",
                              row: rowIdx,
                              col: colIdx,
                            });
                          }
                        }}
                      >
                        {cell === -1 ? "" : cell}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </header>
        </div>
      );
    case "post-game":
      return (
        <div className="App">
          <header className="App-header">
            <h1>React Minesweeper</h1>
            <p>Game Over!</p>
            <p>Final Board: {JSON.stringify(state.board, null, 2)}</p>{" "}
            {/* TODO: Display a final board here instead of JSON */}
            <button onClick={() => dispatch({ type: "start-game" })}>
              {" "}
              {/* TODO: Regenerate board */}
              Load New Board
            </button>
          </header>
        </div>
      );
  }
}

export default App;
