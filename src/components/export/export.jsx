import React, { useEffect, useState } from "react";
import "highlight.js/styles/default.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import "./export.css";
import { useSelector } from "react-redux";
import chroma from "chroma-js";
import { copyUrlToClipBoard } from "../../lib/utils";

const Export = () => {
  let [section, setSection] = useState("CSS");

  let [syntax, setSyntax] = useState("");
  let palette = useSelector((state) => state.colorPalette);
  let theme = useSelector((state) => state.theme);

  useEffect(() => {
    let code;
    if (section == "CSS") {
      code =
        "/* hex values */\n:root {\n" +
        palette.map((c) => `\t--${c.role} : ${c.color};`).join("\n") +
        "\n}\n\n" +
        "/* rgb values */\n:root {\n" +
        palette
          .map((c) => `\t ${c.role} : rgb(${chroma(c.color).rgb()});`)
          .join("\n") +
        "\n}";
    } else if (section == "SCSS") {
      code =
        "/* hex values */\n" +
        palette.map((c) => `$${c.role} : ${c.color};`).join("\n") +
        "\n\n" +
        "/* rgb values */\n" +
        palette
          .map((c) => `$${c.role} : rgb(${chroma(c.color).rgb()});`)
          .join("\n");
    } else if (section == "TailWind") {
      const colors = {
        text: palette[0].color,
        background: palette[1].color,
        primary: palette[2].color,
        secondary: palette[3].color,
        accent: palette[4].color,
      };
      code = `/* hex values */\ncolors: {
\ttext: '${colors.text}',
\tbackground: '${colors.background}',
\tprimary: '${colors.primary}',
\tsecondary: '${colors.secondary}',
\taccent: '${colors.accent}',
}\n\n/* rgb values */\ncolors: {
\ttext: '${colors.text}',
\tbackground: '${colors.background}',
\tprimary: '${colors.primary}',
\tsecondary: '${colors.secondary}',
\taccent: '${colors.accent}',
}`;
    }
    setSyntax(code);
  }, [section, palette]);

  return (
    <div className="export--conatiner">
      <div className="export--wrapper">
        <ul>
          <li
            className={section == "CSS" ? "active" : ""}
            onClick={() => setSection("CSS")}
          >
            CSS
          </li>
          <li
            className={section == "TailWind" ? "active" : ""}
            onClick={() => setSection("TailWind")}
          >
            Tailwind CSS
          </li>
          <li
            className={section == "SCSS" ? "active" : ""}
            onClick={() => setSection("SCSS")}
          >
            SCSS
          </li>
        </ul>
        <div className="export--display">
          <SyntaxHighlighter
            language="css"
            style={theme ? (theme == "light" ? oneLight : oneDark) : oneLight}
            showLineNumbers={true}
            className="highligter"
          >
            {syntax}
          </SyntaxHighlighter>
          <button
            className="copyBtn"
            onClick={() => copyUrlToClipBoard(syntax)}
          >
            copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Export;
