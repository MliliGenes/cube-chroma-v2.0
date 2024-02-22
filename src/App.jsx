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
import { saveTheme, saveTolocalStorage } from "./lib/utils";

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
    color && theme && palette && setTimeout(() => setLoading(false), 1800);
  }, [dispatch, palette]);

  useEffect(() => {
    dispatch(
      generateColorPalette({ color: color, method: colorScheme, theme: theme })
    );
  }, [dispatch, color, colorScheme]);

  useEffect(() => {
    dispatch(
      upDateColorPalette({ color: color, method: colorScheme, theme: theme })
    );
  }, [dispatch, theme]);

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
        "--secondary": palette[3]?.color || "#eafa9e",
        "--accent": palette[4]?.color || "#ff08d3",
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <svg
            id="Layer_1"
            className="artwork"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
          >
            <path
              className="primary"
              d="M0,0H250a0,0,0,0,1,0,0V250a0,0,0,0,1,0,0h0A250,250,0,0,1,0,0V0A0,0,0,0,1,0,0Z"
            />
            <path
              className="secondary"
              d="M500,0h0a0,0,0,0,1,0,0V250a0,0,0,0,1,0,0H250a0,0,0,0,1,0,0v0A250,250,0,0,1,500,0Z"
            />
            <path
              className="accent"
              d="M500,0H750a0,0,0,0,1,0,0V250a0,0,0,0,1,0,0h0A250,250,0,0,1,500,0V0A0,0,0,0,1,500,0Z"
            />
            <rect className="text" x="750" width="250" height="250" rx="125" />
            <path
              className="secondary"
              d="M250,250h0a0,0,0,0,1,0,0V500a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0v0A250,250,0,0,1,250,250Z"
            />
            <rect
              className="accent"
              x="250"
              y="250"
              width="250"
              height="250"
              rx="125"
            />
            <path
              className="primary--primary rotation--one"
              d="M750,250h0c-138.07,0-250,111.93-250,250h500c0-138.07-111.93-250-250-250Z"
            />
            <rect
              className="primary--primary"
              y="500"
              width="250"
              height="250"
              rx="125"
            />
            <path
              className="text"
              d="M250,500H500a0,0,0,0,1,0,0v0A250,250,0,0,1,250,750h0a0,0,0,0,1,0,0V500A0,0,0,0,1,250,500Z"
            />
            <path
              className="secondary"
              d="M500,500H750a0,0,0,0,1,0,0v0A250,250,0,0,1,500,750h0a0,0,0,0,1,0,0V500A0,0,0,0,1,500,500Z"
            />
            <path
              className="accent"
              d="M1000,500h0a0,0,0,0,1,0,0V750a0,0,0,0,1,0,0H750a0,0,0,0,1,0,0v0a250,250,0,0,1,250-250Z"
              transform="translate(1750 1250) rotate(-180)"
            />
            <path
              className="secondary"
              d="M0,750H250a0,0,0,0,1,0,0v250a0,0,0,0,1,0,0h0A250,250,0,0,1,0,750v0A0,0,0,0,1,0,750Z"
            />
            <path
              className="accent"
              d="M250,750H500a0,0,0,0,1,0,0v0a250,250,0,0,1-250,250h0a0,0,0,0,1,0,0V750A0,0,0,0,1,250,750Z"
            />
            <rect
              className="primary"
              x="500"
              y="750"
              width="250"
              height="250"
              rx="125"
            />
            <path
              className="text"
              d="M1000,750h0a0,0,0,0,1,0,0v250a0,0,0,0,1,0,0H750a0,0,0,0,1,0,0v0A250,250,0,0,1,1000,750Z"
              transform="translate(1750 1750) rotate(-180)"
            />
          </svg>
          <ToolBar />
        </>
      )}
    </div>
  );
}

export default App;
