import React, { useEffect, useRef, useState } from "react";
import "./toolBar.css";
import { useDispatch, useSelector } from "react-redux";
import { generateMainColor } from "../../lib/slices/mainColorSlice";
import DropUp from "../dropUp/dropUp";
import chroma from "chroma-js";

export default function ToolBar({ bgColor }) {
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
        color: chroma.contrast("#fff", p.color) >= 3 ? "#fff" : "#000",
      }}
    >
      {p.role}
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
      <div className="toolbar--wrapper" style={{ backgroundColor: bgColor }}>
        <div className="toolBar--palette">{colorPalette}</div>
        <div className="colorScheme-container">
          {isActive && <DropUp ref={dropUpRef} bgColor={bgColor} />}
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
          className="btn large"
          onClick={() => dispatch(generateMainColor())}
        >
          Generate
        </button>
        <button className="btn ">
          <i className="fa-solid fa-rotate-left"></i>
        </button>
        <button className="btn ">
          <i className="fa-solid fa-rotate-right"></i>
        </button>

        <button className="btn">
          <i className="fa-solid fa-file-arrow-down"></i>
        </button>
      </div>
    </div>
  );
}
