import { useDispatch, useSelector } from "react-redux";
import "./styles/App.css";
import "./styles/fonts.css";
import Header from "./components/header/header";
import ToolBar from "./components/toolBar/toolBar";
import { useEffect } from "react";
import { generateColorPalette } from "./lib/slices/colorPaletteSlice";
import { generateMainColor } from "./lib/slices/mainColorSlice";
import { Button } from "@mui/material";

function App() {
  let color = useSelector((state) => state.mainColor.color);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(generateColorPalette({ color: color, method: "analogous" }));
  }, [dispatch, color]);

  return (
    <div className="app">
      <Header />
      <ToolBar />
      <Button variant="contained" onClick={() => dispatch(generateMainColor())}>
        Contained
      </Button>
    </div>
  );
}

export default App;
