import React from "react";
import "./header.css";

export default function Header() {
  return (
    <div className="header--container">
      <div className="header--wrepper">
        <a href="">
          <svg
            id="Layer_1"
            className="header--logo"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 400"
          >
            <path
              class="cls-2"
              d="M379.24,213.29V315.4l-88.42,51-41.21,23.79A31.47,31.47,0,0,1,202.41,363V213.29l88.41-51V264.33Z"
            />
            <path
              class="cls-3"
              d="M111.61,56.52,200,5.51l88.42,51,41.19,23.79a31.46,31.46,0,0,1,0,54.5l-41.19,23.79-88.42,51-88.39-51,88.39-51Z"
            />
            <path
              class="cls-1"
              d="M109.18,162.25h0l88.39,51V315.4l-88.41-51V366.44l-88.42-51V165.71A31.47,31.47,0,0,1,68,138.46Z"
            />
          </svg>
          <h1>Cube Chroma</h1>
        </a>

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
