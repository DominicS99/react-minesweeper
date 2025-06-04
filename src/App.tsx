import "./App.css";
import useAppState from "./useAppState";
import useLoadBoard from "./useLoadBoard";

function App() {
  const [state, dispatch] = useAppState();

  useLoadBoard(5, dispatch);
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Minesweeper</h1>
        <p>Current Phase information: {JSON.stringify(state, null, 2)} </p>
      </header>
    </div>
  );
}

export default App;
