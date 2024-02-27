import React, { useEffect, useState } from "react";
import "./stats.css";

export default function Stats() {
  return (
    <div className="stats--container">
      <div className="stats--grid">
        <div className="secondary--item">
          <h2>100% Free</h2>
          <p>forever</p>
        </div>
        <div className="primary--item">
          <h2>1 User</h2>
          <p>that me!</p>
        </div>
        <div className="background-transparent--item"></div>
        <div className="background--item">
          <i className="fa-brands fa-github"></i>
          <div className="mini--container">
            <h2>the project is open source </h2>
            <a href="https://github.com/MliliGenes/cube-chroma-v2.0">
              Cube Chroma v2.0
            </a>
          </div>
        </div>
        <div className="accent--item">
          {/* <i className="fa-brands fa-product-hunt"></i> */}
        </div>
      </div>
    </div>
  );
}
