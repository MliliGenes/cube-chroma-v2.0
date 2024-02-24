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

function App() {
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  let color = useSelector((state) => state.mainColor.color);
  let scheme = useSelector((state) => state.colorScheme);
  let palette = useSelector((state) => state.colorPalette);
  let theme = useSelector((state) => state.theme);

  // useEffect(() => {
  //   initCombo("#ff9e33", "analogous", "light");
  // }, []);

  useEffect(() => {
    function getColorOrDefault(palette, index, defaultColor) {
      return palette[index]?.color || defaultColor;
    }

    function getChromaColor(color) {
      return {
        color,
        dark: chroma(color).darken(),
        light: chroma(color).brighten(),
        transparent: chroma(color).alpha(0.4),
      };
    }

    const text = getColorOrDefault(palette, 0, "#1b1414");
    const background = getColorOrDefault(palette, 1, "#ffffee");
    const primary = getChromaColor(getColorOrDefault(palette, 2, "#ff9e33"));
    const secondary = getChromaColor(getColorOrDefault(palette, 3, "#d7ffb3"));
    const accent = getChromaColor(getColorOrDefault(palette, 4, "#fcff66"));

    const textBtn1 =
      chroma.contrast(text, primary.color) > 4.5 ? text : background;
    const textBtn2 =
      chroma.contrast(text, secondary.color) > 4.5 ? text : background;
    const textBtn3 =
      chroma.contrast(text, accent.color) > 4.5 ? text : background;

    const lightBgColor = chroma(text).alpha(0.075).hex();
    const lightBgColor1 = chroma(text).alpha(0.4).hex();

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
    --primary-light: ${primary.light};
    --primary-dark: ${primary.dark};
    --primary-transparent: ${primary.transparent};
    --secondary: ${secondary.color};
    --secondary-light: ${secondary.light};
    --secondary-dark: ${secondary.dark};
    --secondary-transparent: ${secondary.transparent};
    --accent: ${accent.color};
    --accent-light: ${accent.light};
    --accent-dark: ${accent.dark};
    --accent-transparent: ${accent.transparent};
    --text-btn-primary: ${textBtn1};
    --text-btn-secondary: ${textBtn2};
    --text-btn-accent: ${textBtn3};
    `
    );
    palette &&
      setTimeout(() => {
        setLoading(false);
      }, 2000);
  }, [dispatch, palette]);

  useEffect(() => {
    initCombo(color, scheme, theme, JSON.stringify(palette));
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
