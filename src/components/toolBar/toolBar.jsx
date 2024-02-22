import React, { useEffect, useRef, useState } from "react";
import "./toolBar.css";
import { useDispatch, useSelector } from "react-redux";
import { generateMainColor } from "../../lib/slices/mainColorSlice";
import DropUp from "../dropUp/dropUp";
import chroma from "chroma-js";
import { toggleTheme } from "../../lib/slices/themeSlice";
import { upDateLockState } from "../../lib/slices/colorPaletteSlice";

export default function ToolBar() {
  const [isActive, setIsActive] = useState(false);
  const dropUpRef = useRef(null);
  const btnRef = useRef(null);

  let dispatch = useDispatch();

  let palette = useSelector((state) => state.colorPalette);
  let colorScheme = useSelector((state) => state.colorScheme);

  let colorPalette = palette.map((p) => (
    <div
      key={p.color}
      style={{
        backgroundColor: p.color,
        color:
          chroma.contrast(palette[1].color, p.color) >= 3
            ? "var(--background)"
            : "var(--text)",
      }}
    >
      {p.role}
      <i
        className={
          p.isLocked ? "fa-solid fa-lock left" : "fa-solid fa-lock-open left"
        }
        onClick={() => dispatch(upDateLockState(p.role))}
      ></i>
      {/* {p.role == "primary" || p.role == "secondary" ? (
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
      )} */}
    </div>
  ));

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

  return (
    <div className="toolBar--container">
      <div className="toolbar--wrapper">
        <div className="toolBar--palette">{colorPalette}</div>
        <button className="btn" onClick={() => dispatch(toggleTheme())}>
          <i className="fa-solid fa-circle-half-stroke"></i>
        </button>

        <button className="btn" onClick={() => dispatch(generateMainColor())}>
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

        <button className="btn ">
          <i className="fa-solid fa-arrow-rotate-left"></i>
        </button>

        <button className="btn ">
          <i className="fa-solid fa-arrow-rotate-right"></i>
        </button>

        <button className="btn">
          <i className="fa-solid   fa-floppy-disk"></i>
        </button>
      </div>
    </div>
  );
}
