import { useDispatch, useSelector } from "react-redux";
import "./styles/App.css";
import "./styles/fonts.css";
import Header from "./components/header/header";
import ToolBar from "./components/toolBar/toolBar";
import { useEffect, useState } from "react";
import { generateColorPalette } from "./lib/slices/colorPaletteSlice";
import chroma from "chroma-js";
import Loader from "./components/loader/loader";

function App() {
  let dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  let color = useSelector((state) => state.mainColor.color);
  let bgColor = chroma(color).mix("#ffffff", 0.65).hex();
  let palette = useSelector((state) => state.colorPalette);
  let colorScheme = useSelector((state) => state.colorScheme);

  useEffect(() => {
    palette && setTimeout(() => setLoading(false), 1000);
  });

  useEffect(() => {
    dispatch(generateColorPalette({ color: color, method: colorScheme }));
  }, [dispatch, color]);

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
          <Header bgColor={bgColor} />
          <ToolBar bgColor={bgColor} />
        </div>
      )}
    </>
  );
}

export default App;
