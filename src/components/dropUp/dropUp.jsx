import React from "react";
import "./dropUp.css";
import { useDispatch, useSelector } from "react-redux";
import { upDateColorScheme } from "../../lib/slices/colorSchemaSlice";
import chroma from "chroma-js";

const DropUp = React.forwardRef(({ bgColor }, ref) => {
  let dispatch = useDispatch();
  let colorScheme = useSelector((state) => state.colorScheme);

  return (
    <div ref={ref} className="dropup--container">
      <div className="dropup--wrapper" style={{ backgroundColor: bgColor }}>
        <ul>
          <li
            className={colorScheme == "analogous" ? "active" : ""}
            onClick={() => dispatch(upDateColorScheme("analogous"))}
          >
            analogous
          </li>
          <li
            className={colorScheme == "complementary" ? "active" : ""}
            onClick={() => dispatch(upDateColorScheme("complementary"))}
          >
            complementary
          </li>
          <li
            className={colorScheme == "monochromatic" ? "active" : ""}
            onClick={() => dispatch(upDateColorScheme("monochromatic"))}
          >
            monochromatic
          </li>
          <li
            className={colorScheme == "split Complementary" ? "active" : ""}
            onClick={() => dispatch(upDateColorScheme("split Complementary"))}
          >
            split Complementary
          </li>
          <li
            className={colorScheme == "square" ? "active" : ""}
            onClick={() => dispatch(upDateColorScheme("square"))}
          >
            square
          </li>
          <li
            className={colorScheme == "triadic" ? "active" : ""}
            onClick={() => dispatch(upDateColorScheme("triadic"))}
          >
            triadic
          </li>
        </ul>
      </div>
    </div>
  );
});

export default DropUp;
