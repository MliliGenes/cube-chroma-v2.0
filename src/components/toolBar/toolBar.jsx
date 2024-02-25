import React, { useEffect, useRef, useState } from "react";
import "./toolBar.css";
import { useDispatch, useSelector } from "react-redux";
import { generateMainColor } from "../../lib/slices/mainColorSlice";
import DropUp from "../dropUp/dropUp";
import chroma from "chroma-js";
import { toggleTheme } from "../../lib/slices/themeSlice";
import {
  upDateColorPalette,
  upDateLockState,
} from "../../lib/slices/colorPaletteSlice";
import { decrement, increment, upDateIndex } from "../../lib/slices/indexSlice";
import {
  copyUrlToClipBoard,
  getLength,
  saveTolocalStorage,
} from "../../lib/utils";
import { HexColorInput, HexColorPicker } from "react-colorful";

export default function ToolBar() {
  const [isActive, setIsActive] = useState(false);
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
      upDateColorPalette({ color: color, method: colorScheme, theme: theme })
    );
  }, [theme]);

  useEffect(() => {
    saveTolocalStorage(color, colorScheme, theme, JSON.stringify(palette));
  }, [dispatch, palette]);

  function generateHundler() {
    dispatch(generateMainColor());
  }

  let colorPalette = palette.map((p) => (
    <div
      key={p.role}
      style={{
        backgroundColor: p.color,
        color:
          chroma.contrast(p.color, palette[1].color) > 4.5
            ? "var(--background)"
            : "var(--text)",
      }}
      className="palette--item"
    >
      {p.role}
      <i
        className={p.isLocked ? "fa-solid fa-lock " : "fa-solid fa-lock-open "}
        onClick={() => dispatch(upDateLockState(p.role))}
      ></i>
      <div className="color--picker">
        {/* <HexColorPicker color={p.color} /> */}
      </div>
    </div>
  ));

  return (
    <div className="toolBar--container">
      <div className="toolbar--wrapper">
        {colorPalette}
        <button
          className="btn"
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          <i className="fa-solid fa-circle-half-stroke"></i>
        </button>

        <button className="btn" onClick={generateHundler}>
          <i className="fa-solid fa-dice-d20"></i>
        </button>

        <div className="colorScheme-container">
          {isActive && <DropUp ref={dropUpRef} />}
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
        </div>

        <button
          className={index == 0 ? "btn disabled" : "btn"}
          onClick={() => {
            dispatch(decrement());
          }}
          disabled={index == 0}
        >
          <i className="fa-solid fa-arrow-rotate-left"></i>
        </button>

        <button
          className={index == getLength() - 1 ? "btn disabled" : "btn"}
          onClick={() => {
            dispatch(increment());
          }}
          disabled={index == getLength() - 1}
        >
          <i className="fa-solid fa-arrow-rotate-right"></i>
        </button>

        <button className="btn">
          <i className="fa-solid fa-floppy-disk"></i>
        </button>

        <button className="btn" onClick={() => copyUrlToClipBoard()}>
          <i className="fa-solid fa-up-right-from-square"></i>
        </button>
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
