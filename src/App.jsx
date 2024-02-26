import { useDispatch, useSelector } from "react-redux";
import "./styles/App.css";
import "./styles/fonts.css";
import Header from "./components/header/header";
import ToolBar from "./components/toolBar/toolBar";
import { useEffect, useState } from "react";
import Loader from "./components/loader/loader";
import Template from "./components/template/template";
import chroma from "chroma-js";
import { generateColorPalette } from "./lib/slices/colorPaletteSlice";
import { initCombo } from "./lib/utils";
import { upDateIndex } from "./lib/slices/indexSlice";

function App() {
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  let color = useSelector((state) => state.mainColor.color);
  let scheme = useSelector((state) => state.colorScheme);
  let palette = useSelector((state) => state.colorPalette);
  let theme = useSelector((state) => state.theme);

  useEffect(() => {
    function getColorOrDefault(palette, index) {
      return palette[index]?.color;
    }

    function getChromaColor(color) {
      let darkShades = chroma.scale([color, "#000"]).colors(5);
      let lightShades = chroma.scale([color, "#fff"]).colors(5);
      return {
        color,
        dark1: darkShades[1],
        dark2: darkShades[2],
        dark3: darkShades[3],
        light1: lightShades[1],
        light2: lightShades[2],
        light3: lightShades[3],
        transparent1: chroma(color).alpha(0.4),
        transparent2: chroma(color).alpha(0.3),
        transparent3: chroma(color).alpha(0.2),
      };
    }

    const text = getColorOrDefault(palette, 0);
    const background = getColorOrDefault(palette, 1);
    const primary = getChromaColor(getColorOrDefault(palette, 2));
    const secondary = getChromaColor(getColorOrDefault(palette, 3));
    const accent = getChromaColor(getColorOrDefault(palette, 4));

    const textBtn1 =
      chroma.contrast(text, primary.color) > 4.5 ? text : background;
    const textBtn2 =
      chroma.contrast(text, secondary.color) > 4.5 ? text : background;
    const textBtn3 =
      chroma.contrast(text, accent.color) > 4.5 ? text : background;

    const lightBgColor = chroma(text).alpha(0.1).hex();
    const lightBgColor1 = chroma(text).alpha(0.2).hex();

    const textLight = chroma(text).brighten();

    document.querySelector(":root").setAttribute(
      "style",
      `
    --text: ${text};
    --text-light: ${textLight};
    --background: ${background};
    --background-transparent: ${lightBgColor};
    --background-transparent-1: ${lightBgColor1};
    --primary: ${primary.color};
    --primary-light: ${primary.light1};
    --primary-light-1: ${primary.light2};
    --primary-light-2: ${primary.light3};
    --primary-dark: ${primary.dark1};
    --primary-dark-1: ${primary.dark2};
    --primary-dark-2: ${primary.dark3};
    --primary-transparent: ${primary.transparent1};
    --primary-transparent-1: ${primary.transparent2};
    --primary-transparent-2: ${primary.transparent3};
    --secondary: ${secondary.color};
    --secondary-light: ${secondary.light1};
    --secondary-light-1: ${secondary.light2};
    --secondary-light-2: ${secondary.light3};
    --secondary-dark: ${secondary.dark1};
    --secondary-dark-1: ${secondary.dark2};
    --secondary-dark-2: ${secondary.dark3};
    --secondary-transparent: ${secondary.transparent1};
    --secondary-transparent-1: ${secondary.transparent2};
    --secondary-transparent-2: ${secondary.transparent3};
    --accent: ${accent.color};
    --accent-light: ${accent.light1};
    --accent-light-1: ${accent.light2};
    --accent-light-2: ${accent.light3};
    --accent-dark: ${accent.dark1};
    --accent-dark-1: ${accent.dark2};
    --accent-dark-2: ${accent.dark3};
    --accent-transparent: ${accent.transparent1};
    --accent-transparent-1: ${accent.transparent2};
    --accent-transparent-2: ${accent.transparent3};
    --text-btn-primary: ${textBtn1};
    --text-btn-secondary: ${textBtn2};
    --text-btn-accent: ${textBtn3};
    `
    );
    palette &&
      setTimeout(() => {
        setLoading(false);
      }, 0);
  }, [dispatch, palette]);

  useEffect(() => {
    initCombo(color, scheme, theme, JSON.stringify(palette));
  }, [palette]);

  useEffect(() => {
    dispatch(
      generateColorPalette({ color: color, method: scheme, theme: theme })
    );
  }, [dispatch, color, scheme, theme]);

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
