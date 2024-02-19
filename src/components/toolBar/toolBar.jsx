import React from "react";
import { Button } from "@mui/material";
import "./toolBar.css";
import { useSelector } from "react-redux";
import chroma from "chroma-js";

export default function ToolBar() {
  let state = useSelector((state) => state.mainColor);

  let palette = useSelector((state) => state.colorPalette);
  console.log(palette);
  let colorPalette = palette.map((p) => (
    <div key={p.color} style={{ backgroundColor: p.color }}></div>
  ));
  return (
    <div className="toolBar--container">
      <div className="toolbar--wrapper">
        <div className="toolBar--palette">{colorPalette}</div>
      </div>
    </div>
  );
}
