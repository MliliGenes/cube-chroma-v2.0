import React from "react";
import "./home.css";

export default function Home() {
  return (
    <div className="home--container">
      <div className="left">
        <h1>
          <svg
            className="circle"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 400"
          ></svg>
          <span>Visualize</span> Your <br />
          <span className="gredient--1">Color Palettes</span> in Real Time with
          <br />
          <span className="gredient--2">Cube Chroma</span>
        </h1>
        <p>
          Need help selecting colors for your website?
          <br /> Utilize the toolbar provided below to bring your selections to
          life.
        </p>
        <div className="btns">
          <button className="btn special">Get Started</button>
          <button className="btn">Learn More</button>
        </div>
        <p className="flex">
          <svg
            width="23"
            height="33"
            viewBox="0 0 23 33"
            fill="none"
            className="mouse"
            data-astro-cid-j7pv25f6=""
          >
            <rect
              x="0.767442"
              y="0.767442"
              width="20.7209"
              height="31.4651"
              rx="10.3605"
              stroke="var(--text)"
              stroke-width="1.53488"
              data-astro-cid-j7pv25f6=""
            ></rect>
            <rect
              x="9"
              y="8"
              width="4"
              height="8"
              rx="2"
              fill="var(--text)"
              data-astro-cid-j7pv25f6=""
            ></rect>
          </svg>
          Scroll to see more sections
        </p>
      </div>
      <div className="right">
        <svg
          id="Layer_1"
          className="artwork"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
        >
          <path
            class="cls-1"
            d="M379.24,213.29V315.4l-88.42,51-41.21,23.79A31.47,31.47,0,0,1,202.41,363V213.29l88.41-51V264.33Z"
          />
          <path
            class="cls-2"
            d="M111.61,56.52,200,5.51l88.42,51,41.19,23.79a31.46,31.46,0,0,1,0,54.5l-41.19,23.79-88.42,51-88.39-51,88.39-51Z"
          />
          <path
            class="cls-3"
            d="M109.18,162.25h0l88.39,51V315.4l-88.41-51V366.44l-88.42-51V165.71A31.47,31.47,0,0,1,68,138.46Z"
          />
        </svg>
      </div>
    </div>
  );
}
