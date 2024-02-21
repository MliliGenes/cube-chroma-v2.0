import React, { useEffect, useRef, useState } from "react";
import "./toolBar.css";
import { useDispatch, useSelector } from "react-redux";
import { generateMainColor } from "../../lib/slices/mainColorSlice";
import DropUp from "../dropUp/dropUp";
import chroma from "chroma-js";
import { toggleTheme } from "../../lib/slices/colorPaletteSlice";

export default function ToolBar() {
  const [isActive, setIsActive] = useState(false);
  const dropUpRef = useRef(null);
  const btnRef = useRef(null);

  let dispatch = useDispatch();

  let palette = useSelector((state) => state.colorPalette);
  let colorScheme = useSelector((state) => state.colorScheme);

  // let colorPalette = palette.map((p) => (
  //   <div
  //     key={p.color}
  //     style={{
  //       backgroundColor: p.color,
  //       color:
  //         chroma.contrast(palette[1].color, p.color) >= 3
  //           ? "var(--background)"
  //           : "var(--text)",
  //     }}
  //   >
  //     {p.role}
  //   </div>
  // ));

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
        <div className="toolBar--palette">
          <div
            style={{
              backgroundColor: palette[0].color,
              color:
                chroma.contrast(palette[1].color, palette[0].color) >= 3
                  ? "var(--background)"
                  : "var(--text)",
            }}
          >
            {palette[0].role}
          </div>
          <div
            style={{
              backgroundColor: palette[1].color,
              color:
                chroma.contrast(palette[1].color, palette[1].color) >= 3
                  ? "var(--background)"
                  : "var(--text)",
            }}
          >
            {palette[1].role}
          </div>
          <div
            style={{
              backgroundColor: palette[2].color,
              color:
                chroma.contrast(palette[1].color, palette[2].color) >= 3
                  ? "var(--background)"
                  : "var(--text)",
            }}
          >
            {palette[2].role}
          </div>
          <div
            style={{
              backgroundColor: palette[3].color,
              color:
                chroma.contrast(palette[1].color, palette[3].color) >= 3
                  ? "var(--background)"
                  : "var(--text)",
            }}
          >
            {palette[3].role}
          </div>
          <div
            style={{
              backgroundColor: palette[4].color,
              color:
                chroma.contrast(palette[1].color, palette[4].color) >= 3
                  ? "var(--background)"
                  : "var(--text)",
            }}
          >
            {palette[4].role}
          </div>
        </div>
        {/* <button className="btn" onClick={() => dispatch(toggleTheme())}>
          <i className="fa-solid fa-circle-half-stroke"></i>
        </button> */}

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
          <i class="fa-solid fa-arrow-rotate-right"></i>
        </button>

        <button className="btn">
          <i className="fa-solid   fa-floppy-disk"></i>
        </button>
      </div>
    </div>
  );
}
