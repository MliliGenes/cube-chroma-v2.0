import React from "react";
import "./loader.css";

export default function Loader({ bgColor, c }) {
  return (
    <div className="takeOver" style={{ "--bgColor": bgColor, "--c": c }}>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
