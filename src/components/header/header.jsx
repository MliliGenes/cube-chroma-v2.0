import React from "react";
import "./header.css";
import { useSelector } from "react-redux";

export default function Header() {
  return (
    <div className="header--container">
      <div className="header--wrepper">
        <svg
          id="Layer_1"
          className="header--logo"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
        >
          <path
            className="cls-1"
            d="M342.65,117.07,209.36,194a18.69,18.69,0,0,1-18.72,0l-133.29-77a18.73,18.73,0,0,1,0-32.43L190.64,7.69a18.69,18.69,0,0,1,18.72,0l133.29,77A18.73,18.73,0,0,1,342.65,117.07Z"
          />
          <path
            className="cls-2"
            d="M189,222.17v153.9A18.73,18.73,0,0,1,161,392.29l-133.29-77a18.71,18.71,0,0,1-9.36-16.21V145.21A18.73,18.73,0,0,1,46.39,129l133.28,77A18.69,18.69,0,0,1,189,222.17Z"
          />
          <path
            className="cls-3"
            d="M381.7,145.21V299.12a18.71,18.71,0,0,1-9.36,16.21l-133.29,77A18.73,18.73,0,0,1,211,376.07V222.17A18.69,18.69,0,0,1,220.33,206l133.28-77A18.73,18.73,0,0,1,381.7,145.21Z"
          />
        </svg>
        {/* <a
          href="https://github.com/MliliGenes/cube-chroma-v2.0.git"
          target="blank"
        >
          Cube-chroma v2.0
        </a> */}
      </div>
    </div>
  );
}
