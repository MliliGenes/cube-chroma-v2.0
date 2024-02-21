import { useDispatch, useSelector } from "react-redux";
import "./styles/App.css";
import "./styles/fonts.css";
import Header from "./components/header/header";
import ToolBar from "./components/toolBar/toolBar";
import { useEffect, useState } from "react";
import { generateColorPalette } from "./lib/slices/colorPaletteSlice";
import chroma from "chroma-js";
import Loader from "./components/loader/loader";
import { saveTolocalStorage } from "./lib/utils";

function App() {
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  let color = useSelector((state) => state.mainColor.color);
  let palette = useSelector((state) => state.colorPalette);
  let colorScheme = useSelector((state) => state.colorScheme);

  useEffect(() => {
    localStorage.removeItem("cubeCombo");
    saveTolocalStorage(color, colorScheme);
  }, [loading]);

  useEffect(() => {
    palette && setTimeout(() => setLoading(false), 1800);
  }, [dispatch, palette]);

  useEffect(() => {
    dispatch(generateColorPalette({ color: color, method: colorScheme }));
  }, [dispatch, color]);

  useEffect(() => {
    saveTolocalStorage(color, colorScheme);
  }, [dispatch, color]);

  return (
    <div
      className="app"
      style={{
        "--text": palette[0]?.color || "",
        "--background": palette[1]?.color || "",
        "--primary": palette[2]?.color || "",
        "--accent": palette[3]?.color || "",
        "--secondary": palette[4]?.color || "",
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <ToolBar />
        </>
      )}
    </div>
  );
}

export default App;
