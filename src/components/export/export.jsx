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

const Export = ({ onClose }) => {
  let [section, setSection] = useState("CSS");

  let [syntax, setSyntax] = useState("");
  let palette = useSelector((state) => state.colorPalette);
  let theme = useSelector((state) => state.theme);

  // Handle Escape key to close export
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose && onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Generate color gradients for each main color
  const generateColorGradients = () => {
    const primary = palette[2]?.color;
    const secondary = palette[3]?.color;
    const accent = palette[4]?.color;

    if (!primary || !secondary || !accent) return null;

    const primaryGradients = chroma
      .scale(["white", primary, "black"])
      .mode("lch")
      .colors(7);
    const secondaryGradients = chroma
      .scale(["white", secondary, "black"])
      .mode("lch")
      .colors(7);
    const accentGradients = chroma
      .scale(["white", accent, "black"])
      .mode("lch")
      .colors(7);

    return { primaryGradients, secondaryGradients, accentGradients };
  };

  useEffect(() => {
    let code;
    const gradients = generateColorGradients();

    if (section == "CSS") {
      code =
        "/* base colors */\n:root {\n" +
        palette.map((c) => `\t--${c.role} : ${c.color};`).join("\n") +
        "\n}\n\n" +
        "/* rgb values */\n:root {\n" +
        palette
          .map((c) => `\t ${c.role} : rgb(${chroma(c.color).rgb()});`)
          .join("\n") +
        "\n}" +
        (gradients
          ? `\n\n/* primary gradients - tints & shades */\n:root {\n${gradients.primaryGradients
              .map((color, idx) => `\t--primary-${idx * 100} : ${color};`)
              .join(
                "\n"
              )}\n}\n\n/* secondary gradients - tints & shades */\n:root {\n${gradients.secondaryGradients
              .map((color, idx) => `\t--secondary-${idx * 100} : ${color};`)
              .join(
                "\n"
              )}\n}\n\n/* accent gradients - tints & shades */\n:root {\n${gradients.accentGradients
              .map((color, idx) => `\t--accent-${idx * 100} : ${color};`)
              .join("\n")}\n}`
          : "");
    } else if (section == "SCSS") {
      code =
        "/* base colors */\n" +
        palette.map((c) => `$${c.role} : ${c.color};`).join("\n") +
        "\n\n" +
        "/* rgb values */\n" +
        palette
          .map((c) => `$${c.role} : rgb(${chroma(c.color).rgb()});`)
          .join("\n") +
        (gradients
          ? `\n\n/* primary gradients */\n${gradients.primaryGradients
              .map((color, idx) => `$primary-${idx * 100} : ${color};`)
              .join("\n")}\n\n/* secondary gradients */\n${gradients.secondaryGradients
              .map((color, idx) => `$secondary-${idx * 100} : ${color};`)
              .join("\n")}\n\n/* accent gradients */\n${gradients.accentGradients
              .map((color, idx) => `$accent-${idx * 100} : ${color};`)
              .join("\n")}`
          : "");
    } else if (section == "TailWind") {
      const colors = {
        text: palette[0].color,
        background: palette[1].color,
        primary: palette[2].color,
        secondary: palette[3].color,
        accent: palette[4].color,
      };
      code = `colors: {
\ttext: '${colors.text}',
\tbackground: '${colors.background}',
\tprimary: '${colors.primary}',
\tsecondary: '${colors.secondary}',
\taccent: '${colors.accent}',
}`;

      if (gradients) {
        code += `\n\n/* primary gradients */\nprimary: {
${gradients.primaryGradients
  .map((color, idx) => `\t\t${idx * 100}: '${color}',`)
  .join("\n")}
\t},`;
        code += `\n\n/* secondary gradients */\nsecondary: {
${gradients.secondaryGradients
  .map((color, idx) => `\t\t${idx * 100}: '${color}',`)
  .join("\n")}
\t},`;
        code += `\n\n/* accent gradients */\naccent: {
${gradients.accentGradients
  .map((color, idx) => `\t\t${idx * 100}: '${color}',`)
  .join("\n")}
\t},`;
      }
    } else if (section == "Colors") {
      code = "PRIMARY COLOR GRADIENTS (white → color → black):\n\n";
      if (gradients) {
        code += gradients.primaryGradients
          .map((color, idx) => `${idx * 100}: ${color}`)
          .join("\n") + "\n\nSECONDARY COLOR GRADIENTS:\n\n";
        code += gradients.secondaryGradients
          .map((color, idx) => `${idx * 100}: ${color}`)
          .join("\n") + "\n\nACCENT COLOR GRADIENTS:\n\n";
        code += gradients.accentGradients
          .map((color, idx) => `${idx * 100}: ${color}`)
          .join("\n");
      }
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
            className={section == "SCSS" ? "active" : ""}
            onClick={() => setSection("SCSS")}
          >
            SCSS
          </li>
          <li
            className={section == "TailWind" ? "active" : ""}
            onClick={() => setSection("TailWind")}
          >
            Tailwind CSS
          </li>
          <li
            className={section == "Colors" ? "active" : ""}
            onClick={() => setSection("Colors")}
          >
            Colors
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
