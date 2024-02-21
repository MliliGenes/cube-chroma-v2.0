import { useDispatch, useSelector } from "react-redux";
import "./styles/App.css";
import "./styles/fonts.css";
import Header from "./components/header/header";
import ToolBar from "./components/toolBar/toolBar";
import { useEffect, useState } from "react";
import { generateColorPalette } from "./lib/slices/colorPaletteSlice";
import chroma from "chroma-js";
import Loader from "./components/loader/loader";
import { saveTheme, saveTolocalStorage } from "./lib/utils";

function App() {
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  let color = useSelector((state) => state.mainColor.color);
  let palette = useSelector((state) => state.colorPalette);
  let colorScheme = useSelector((state) => state.colorScheme);
  let theme = useSelector((state) => state.theme);

  useEffect(() => {
    localStorage.removeItem("cubeCombo");
    saveTolocalStorage(color, colorScheme);
  }, [loading]);

  useEffect(() => {
    color && theme && palette && setTimeout(() => setLoading(false), 1800);
  }, [dispatch, palette]);

  useEffect(() => {
    dispatch(
      generateColorPalette({ color: color, method: colorScheme, theme: theme })
    );
  }, [dispatch, color, theme]);

  useEffect(() => {
    saveTolocalStorage(color, colorScheme);
  }, [dispatch, color]);

  useEffect(() => {
    saveTheme(theme);
  }, [dispatch, theme]);

  return (
    <div
      className="app"
      style={{
        "--text": palette[0]?.color || "#12151b",
        "--background": palette[1]?.color || "#ffebf9",
        "--primary": palette[2]?.color || "#08d3ff",
        "--accent": palette[3]?.color || "#eafa9e",
        "--secondary": palette[4]?.color || "#ff08d3",
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
