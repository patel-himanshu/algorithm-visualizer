import "./App.css";
import Legend from "./components/Legend/Legend";
import Navbar from "./components/Navbar/Navbar";
import Visualizer from "./components/Visualizer/Visualizer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Visualizer />
      <Legend />
    </div>
  );
}

export default App;
