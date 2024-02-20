import { useDispatch, useSelector } from "react-redux";
import "./styles/App.css";
import "./styles/fonts.css";
import Header from "./components/header/header";
import ToolBar from "./components/toolBar/toolBar";
import { useEffect, useState } from "react";
import {
  colorPalette,
  generateColorPalette,
} from "./lib/slices/colorPaletteSlice";
import chroma from "chroma-js";
import Loader from "./components/loader/loader";

function App() {
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  let color = useSelector((state) => state.mainColor.color);
  let palette = useSelector((state) => state.colorPalette);
  let colorScheme = useSelector((state) => state.colorScheme);

  useEffect(() => {
    palette && localStorage.removeItem("cubePalettes");
    palette && setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    dispatch(generateColorPalette({ color: color, method: colorScheme }));
  }, [dispatch, color]);

  useEffect(() => {
    let localdb = JSON.parse(localStorage.getItem("cubePalettes"));
    let cubePalettes = palette.map((c) => c.color);
    localdb.push(cubePalettes);
    localStorage.setItem("cubePalettes", JSON.stringify(localdb));
  }, [palette]);

  return (
    <>
      {loading ? (
        <Loader bgColor={chroma(color).brighten(1.5).hex} c={color} />
      ) : (
        <div
          className="app"
          style={{
            "--text": palette[0].color,
            "--background": palette[1].color,
            "--primary": palette[2].color,
            "--accent": palette[3].color,
            "--secondary": palette[4].color,
          }}
        >
          <Header bgColor={chroma(palette[2].color).set("hsl.l", 0.95).hex()} />
          <ToolBar bgColor={chroma(palette[2].color).set("hsl.l", 0.9).hex()} />
        </div>
      )}
    </>
  );
}

export default App;
