import "./App.css";
import useAppState from "./useAppState";

function App() {
  const [state, dispatch] = useAppState();

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
