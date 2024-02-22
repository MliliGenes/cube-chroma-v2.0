import { useDispatch, useSelector } from "react-redux";
import "./styles/App.css";
import "./styles/fonts.css";
import Header from "./components/header/header";
import ToolBar from "./components/toolBar/toolBar";
import { useEffect, useState } from "react";
import {
  generateColorPalette,
  upDateColorPalette,
} from "./lib/slices/colorPaletteSlice";
import Loader from "./components/loader/loader";
import { getPaletteByIndex, saveTheme, saveTolocalStorage } from "./lib/utils";
import Home from "./components/template/home/home";
import { setMainColor } from "./lib/slices/mainColorSlice";
import { upDateColorScheme } from "./lib/slices/colorSchemaSlice";
import Template from "./components/template/template";
import chroma from "chroma-js";

function App() {
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  let color = useSelector((state) => state.mainColor.color);
  let palette = useSelector((state) => state.colorPalette);
  let colorScheme = useSelector((state) => state.colorScheme);
  let theme = useSelector((state) => state.theme);

  // useEffect(() => {
  //   localStorage.removeItem("cubeCombo");
  //   saveTolocalStorage(color, colorScheme);
  // }, [loading]);

  useEffect(() => {
    let text = palette[0]?.color || "#1b1414";
    let background = palette[1]?.color || "#ffffee";
    let primary = palette[2]?.color || "#ff9e33";
    let secondary = palette[3]?.color || "#d7ffb3";
    let accent = palette[4]?.color || "#fcff66";
    let textBtn1 = chroma.contrast(text, primary) > 4.5 ? text : background;
    let textBtn2 = chroma.contrast(text, secondary) > 4.5 ? text : background;
    let lightBgColor = chroma(text).alpha(0.5).hex();

    document.querySelector(":root").setAttribute(
      "style",
      `
    --text: ${text};
    --background: ${background};
    --primary: ${primary};
    --secondary: ${secondary};
    --accent: ${accent};
    --text-btn-primary: ${textBtn1};
    --text-btn-secondary: ${textBtn2};
    --light-bg-color: ${lightBgColor}
  `
    );

    color &&
      theme &&
      palette &&
      setTimeout(() => {
        setLoading(false);
      }, 2000);
  }, [dispatch, palette]);

  useEffect(() => {
    saveTolocalStorage(color, colorScheme);
  }, [dispatch, color]);

  useEffect(() => {
    saveTheme(theme);
  }, [dispatch, theme]);

  useEffect(() => {
    dispatch(
      generateColorPalette({ color: color, method: colorScheme, theme: theme })
    );
  }, [dispatch, color, colorScheme]);

  return (
    <div className="app">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Template />
          <ToolBar />
        </>
      )}
    </div>
  );
}

export default App;
