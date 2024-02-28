import React, { useEffect, useRef, useState } from "react";
import "./toolBar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  generateMainColor,
  setMainColor,
} from "../../lib/slices/mainColorSlice";
import DropUp from "../dropUp/dropUp";
import { setTheme, toggleTheme } from "../../lib/slices/themeSlice";
import {
  upDateColorPalette,
  upDateColorPaletteFromLocalStorage,
  upDateLockState,
} from "../../lib/slices/colorPaletteSlice";
import { decrement, increment, upDateIndex } from "../../lib/slices/indexSlice";
import {
  SCHEMES,
  copyUrlToClipBoard,
  getComboByIndex,
  getLength,
  saveTolocalStorage,
} from "../../lib/utils";

import { upDateColorScheme } from "../../lib/slices/colorSchemaSlice";
import { Tooltip, Typography, debounce } from "@mui/material";

export default function ToolBar() {
  const [isActive, setIsActive] = useState(false);
  let [isHistoryActive, setIsHistoryActive] = useState(false);
  let [schemeIndex, setSchemeIndex] = useState(0);
  let [isToolsActive, setIsToolsActive] = useState(false);

  const dropUpRef = useRef(null);
  const btnRef = useRef(null);

  let dispatch = useDispatch();

  let index = useSelector((state) => state.index);
  let color = useSelector((state) => state.mainColor.color);
  let palette = useSelector((state) => state.colorPalette);
  let colorScheme = useSelector((state) => state.colorScheme);
  let theme = useSelector((state) => state.theme);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropUpRef.current &&
        !dropUpRef.current.contains(event.target) &&
        !btnRef.current.contains(event.target)
      ) {
        setIsActive(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropUpRef]);

  useEffect(() => {
    dispatch(
      upDateColorPalette({
        color: color,
        method: colorScheme,
        theme: theme,
        baseColor: color,
      })
    );
  }, [theme]);

  useEffect(() => {
    if (!isHistoryActive) {
      saveTolocalStorage(color, colorScheme, theme, JSON.stringify(palette));
      dispatch(upDateIndex());
    }
  }, [color, colorScheme]);

  useEffect(() => {
    setSchemeIndex(SCHEMES.indexOf(colorScheme));
  }, [colorScheme]);

  useEffect(() => {
    dispatch(upDateColorScheme(SCHEMES[schemeIndex]));
  }, [schemeIndex]);

  useEffect(() => {
    if (index < getLength() - 1) {
      setIsHistoryActive(true);
    } else {
      setIsHistoryActive(false);
    }
  }, [index]);

  useEffect(() => {
    if (isHistoryActive) {
      let historyState = getComboByIndex(index);
      dispatch(
        upDateColorPaletteFromLocalStorage(JSON.parse(historyState.palette))
      );
      dispatch(setMainColor(historyState.color));
      dispatch(upDateColorScheme(historyState.scheme));
      dispatch(setTheme(historyState.theme));
    }
  }, [index, isHistoryActive]);

  useEffect(() => {
    const handleKeyDown = debounce((event) => {
      if (event.ctrlKey && event.key === "x") {
        toggleThemeHandler();
        event.preventDefault();
      } else if (event.code === "Space") {
        generateHandler();
        event.preventDefault();
      } else if (event.code === "ArrowLeft") {
        undo();
        event.preventDefault();
      } else if (event.code === "ArrowRight") {
        redo();
        event.preventDefault();
      } else if (event.code === "ArrowUp") {
        setSchemeIndex((prev) => (prev - 1 < 0 ? 5 : prev - 1));
        event.preventDefault();
      } else if (event.code === "ArrowDown") {
        setSchemeIndex((prev) => (prev + 1 < 6 ? prev + 1 : 0));
        event.preventDefault();
      } else if (event.ctrlKey && event.key === "e") {
        exportHandler();
        event.preventDefault();
      } else if (event.ctrlKey && event.key === "s") {
        shareLink();
        event.preventDefault();
      }
    }, 100);

    function handlingDefaults(e) {
      if (
        e.code === "Space" ||
        (e.ctrlKey && e.key === "s") ||
        e.code === "ArrowUp" ||
        e.code === "ArrowDown"
      ) {
        e.preventDefault();
      }
    }

    document.addEventListener("keydown", handlingDefaults);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handlingDefaults);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  function generateHandler() {
    if (isHistoryActive) {
      let newLocalStorage = localStorage.getItem("cubeCombo");
      if (newLocalStorage) {
        let newArray = JSON.parse(newLocalStorage).slice(0, index);
        localStorage.setItem("cubeCombo", JSON.stringify(newArray));
      }
    }
    dispatch(upDateIndex());
    setIsHistoryActive(false);
    dispatch(generateMainColor());
  }

  function toggleThemeHandler() {
    dispatch(toggleTheme());
  }

  function undo() {
    dispatch(decrement());
  }

  function redo() {
    dispatch(increment());
  }

  function shareLink() {
    let url = new URL(window.location.href);
    copyUrlToClipBoard(url);
  }

  let colorPalette = palette.map((p) => {
    let textColor;
    if (p.role == "text") {
      textColor = "var(--background)";
    } else if (p.role == "background") {
      textColor = "var(--text)";
    } else {
      textColor = `var(--text-btn-${p.role})`;
    }
    return (
      <Tooltip
        placement="top"
        title={
          <React.Fragment>
            <Typography
              variant="caption"
              style={{ textTransform: "capitalize" }}
            >
              {p.role}{" "}
              <span
                style={{
                  textTransform: "uppercase",
                }}
              >
                {p.color}
              </span>
            </Typography>
          </React.Fragment>
        }
        arrow
        key={p.role}
      >
        <div
          style={{
            backgroundColor: p.color,
            color: textColor,
          }}
          className="palette--item"
        >
          {p.role}
          <i
            className={
              p.isLocked ? "fa-solid fa-lock " : "fa-solid fa-lock-open "
            }
            onClick={() => dispatch(upDateLockState(p.role))}
          ></i>
        </div>
      </Tooltip>
    );
  });

  return (
    <div className="toolBar--container">
      <div className="toolbar--wrapper">
        {isToolsActive && (
          <>
            {colorPalette}
            <Tooltip
              placement="top"
              title={
                <React.Fragment>
                  <Typography variant="caption">
                    Theme Toggle ( Ctrl + X )
                  </Typography>
                </React.Fragment>
              }
              arrow
            >
              <button className="btn" onClick={toggleThemeHandler}>
                <i className="fa-solid fa-circle-half-stroke"></i>
              </button>
            </Tooltip>
            <Tooltip
              placement="top"
              title={
                <React.Fragment>
                  <Typography variant="caption">
                    Generate ( Space Bar )
                  </Typography>
                </React.Fragment>
              }
              arrow
            >
              <button className="btn" onClick={generateHandler}>
                <i className="fa-solid fa-dice-d20"></i>
              </button>
            </Tooltip>
            <div className="colorScheme-container">
              {isActive && <DropUp ref={dropUpRef} />}
              <Tooltip
                placement="top"
                title={
                  <React.Fragment>
                    <Typography variant="caption">
                      Color Scheme ( Up Arrow & Down Arrow)
                    </Typography>
                  </React.Fragment>
                }
                arrow
              >
                <button
                  className="btn xlarge"
                  ref={btnRef}
                  onClick={() => setIsActive((state) => !state)}
                >
                  {colorScheme}
                  <i
                    className={
                      isActive
                        ? "fa-solid fa-chevron-up flip"
                        : "fa-solid fa-chevron-up "
                    }
                  ></i>
                </button>
              </Tooltip>
            </div>
            <Tooltip
              placement="top"
              title={
                <React.Fragment>
                  <Typography variant="caption">Undo ( Left Arrow )</Typography>
                </React.Fragment>
              }
              arrow
            >
              <span>
                <button
                  className={index == 0 ? "btn disabled" : "btn"}
                  onClick={undo}
                >
                  <i className="fa-solid fa-arrow-rotate-left"></i>
                </button>
              </span>
            </Tooltip>
            <Tooltip
              placement="top"
              title={
                <React.Fragment>
                  <Typography variant="caption">
                    Redo ( Right Arrow )
                  </Typography>
                </React.Fragment>
              }
              arrow
            >
              <span>
                <button
                  className={index == getLength() - 1 ? "btn disabled" : "btn"}
                  onClick={redo}
                >
                  <i className="fa-solid fa-arrow-rotate-right"></i>
                </button>
              </span>
            </Tooltip>
            <Tooltip
              placement="top"
              title={
                <React.Fragment>
                  <Typography variant="caption">Export ( Ctrl + E )</Typography>
                </React.Fragment>
              }
              arrow
            >
              <button className="btn">
                <i className="fa-solid fa-floppy-disk"></i>
              </button>
            </Tooltip>
            <Tooltip
              placement="top"
              title={
                <React.Fragment>
                  <Typography variant="caption">
                    Copy Link ( Ctrl + S )
                  </Typography>
                </React.Fragment>
              }
              arrow
            >
              <button className="btn" onClick={shareLink}>
                <i className="fa-solid fa-up-right-from-square"></i>
              </button>
            </Tooltip>
          </>
        )}
        <Tooltip
          placement="top"
          title={
            <React.Fragment>
              <Typography variant="caption">Open & Close Toolbar</Typography>
            </React.Fragment>
          }
          arrow
        >
          <div
            className="btn startBtn"
            onClick={() => setIsToolsActive((state) => !state)}
          >
            <i
              className={
                isToolsActive ? "fa-solid fa-xmark" : "fa-solid fa-bars"
              }
            ></i>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
{
  /* {p.role == "primary" || p.role == "secondary" ? (
        chroma.contrast(p.color, palette[0].color) < 4.5 ? (
          <i className="fa-solid fa-circle-xmark right"></i>
        ) : chroma.contrast(p.color, palette[0].color) < 7 ? (
          <i className="fa-solid fa-circle-minus right"></i>
        ) : (
          <i className="fa-solid fa-circle-check right"></i>
        )
      ) : p.role == "accent" ? (
        chroma.contrast(p.color, palette[1].color) < 4.5 ? (
          <i className="fa-solid fa-circle-xmark right"></i>
        ) : chroma.contrast(p.color, palette[1].color) < 7 ? (
          <i className="fa-solid fa-circle-minus right"></i>
        ) : (
          <i className="fa-solid fa-circle-check right"></i>
        )
      ) : p.role == "background" ? (
        chroma.contrast(p.color, palette[0].color) < 4.5 ? (
          <i className="fa-solid fa-circle-xmark right"></i>
        ) : chroma.contrast(p.color, palette[0].color) < 7 ? (
          <i className="fa-solid fa-circle-minus right"></i>
        ) : (
          <i className="fa-solid fa-circle-check right"></i>
        )
      ) : p.role == "text" ? (
        chroma.contrast(p.color, palette[1].color) < 4.5 ? (
          <i className="fa-solid fa-circle-xmark right"></i>
        ) : chroma.contrast(p.color, palette[1].color) < 7 ? (
          <i className="fa-solid fa-circle-minus right"></i>
        ) : (
          <i className="fa-solid fa-circle-check right"></i>
        )
      ) : (
        ""
      )} */
}
