import { useDispatch, useSelector } from "react-redux";
import "./styles/App.css";
import "./styles/fonts.css";
import { generateMainColor } from "./lib/slices/mainColorSlice";
import Header from "./components/header/header";
import ToolBar from "./components/toolBar/toolBar";

function App() {
  return (
    <div className="app">
      <Header />
      <ToolBar />
    </div>
  );
}

export default App;
