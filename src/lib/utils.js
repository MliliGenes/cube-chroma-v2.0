import chroma from "chroma-js";
import clipboardCopy from "clipboard-copy";
import { get } from "mongoose";

export default function generateRandomPalette(baseColor, algorithm, theme) {
  baseColor = chroma(baseColor);
  let colorPalette = [];

  switch (algorithm) {
    case "complementary":
      colorPalette = [
        baseColor.hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 180) % 360).hex(),
      ];
      break;
    case "analogous":
      colorPalette = [
        baseColor.hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 30) % 360).hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") - 30) % 360).hex(),
      ];
      break;
    case "triadic":
      colorPalette = [
        baseColor.hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 120) % 360).hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 240) % 360).hex(),
      ];
      break;
    case "split Complementary":
      colorPalette = [
        baseColor.hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 150) % 360).hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 210) % 360).hex(),
      ];
      break;
    case "monochromatic":
      colorPalette = [baseColor, baseColor, baseColor];
      break;
    case "square":
      colorPalette = [
        baseColor.hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 90) % 360).hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 270) % 360).hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 180) % 360).hex(),
      ];
      break;
    default:
      throw new Error(`Unexpected algorithm: ${algorithm}`);
  }

  let selected =
    colorPalette.length >= 3
      ? [
          colorPalette[0],
          colorPalette[0],
          colorPalette[0],
          colorPalette[1],
          colorPalette[2],
        ]
      : [
          colorPalette[0],
          colorPalette[0],
          colorPalette[0],
          chroma(colorPalette[1]),
          chroma(colorPalette[0])
            .set("hsl.h", (chroma(colorPalette[1]).get("hsl.h") + 45) % 360)
            .hex(),
        ];
  return switchPalettetheme(theme, selected, baseColor);
}

export function switchPalettetheme(theme, palette, baseColor) {
  let lightnessPrimary = chroma(baseColor).get("hsl.l");

  if (theme == "light") {
    let textHex = chroma(palette[0]).get("hsl.h");
    let text = chroma.hsl(textHex, 0.6, 0.025).hex();
    let backgroundHex = chroma(palette[1]).get("hsl.h");
    let background = chroma.hsl(backgroundHex, 0.2, 0.95).hex();

    let lightTheme = [
      text,
      background,
      chroma(palette[2]).set("hsl.l", lightnessPrimary).hex(),
      chroma(palette[3])
        .set("hsl.l", lightnessPrimary + 0.25)
        .hex(),
      chroma(palette[4])
        .set("hsl.l", lightnessPrimary + 0.1)
        .hex(),
    ];
    return lightTheme;
  } else {
    let textHex = chroma(palette[0]).get("hsl.h");
    let text = chroma.hsl(textHex, 0.6, 0.95).hex();
    let backgroundHex = chroma(palette[1]).get("hsl.h");
    let background = chroma.hsl(backgroundHex, 0.15, 0.05).hex();

    let darkTheme = [
      text,
      background,
      chroma(palette[2])
        .set("hsl.l", lightnessPrimary + 0.1)
        .hex(),
      chroma(palette[3])
        .set("hsl.l", lightnessPrimary + 0.35)
        .hex(),
      chroma(palette[4])
        .set("hsl.l", lightnessPrimary + 0.2)
        .hex(),
    ];
    return darkTheme;
  }
}

export function saveTolocalStorage(color, scheme, theme, palette) {
  let localdb = JSON.parse(localStorage.getItem("cubeCombo")) || [];
  let cubeCombo = {
    color: color,
    scheme: scheme,
    theme: theme,
    palette: palette,
  };

  let lastItem = localdb[localdb.length - 1];
  let combinationExists =
    lastItem &&
    lastItem.color === color &&
    lastItem.scheme === scheme &&
    lastItem.theme === theme &&
    lastItem.palette === palette;

  if (!combinationExists) {
    localdb.push(cubeCombo);
    localStorage.setItem("cubeCombo", JSON.stringify(localdb));
  }
}
export function getLastCombo() {
  const cubeCombo = localStorage.getItem("cubeCombo");
  if (cubeCombo) {
    const comboArray = JSON.parse(cubeCombo);
    if (Array.isArray(comboArray) && comboArray.length > 0) {
      return comboArray[comboArray.length - 1];
    }
  }
  return {
    color: "#f0a60f",
    scheme: "analogous",
    theme: "light",
    palette: JSON.stringify([
      { color: "#050a03", isLocked: false, role: "text" },
      { color: "#f1f5f0", isLocked: false, role: "background" },
      { color: "#63ef2e", isLocked: false, role: "primary" },
      { color: "#a4f8b7", isLocked: false, role: "secondary" },
      { color: "#d1f35d", isLocked: false, role: "accent" },
    ]),
  };
}

export function initCombo(color, scheme, theme, palette) {
  let url = new URL(window.location.href);
  url.searchParams.set("q", [color, scheme, theme, palette].join(";;"));
  window.history.replaceState({}, "", url);
}

export function getInitCombo() {
  let url = new URL(window.location.href);
  let q = url.searchParams.get("q");
  let param = q
    ? q.split(";;")
    : [
        "#6453dc",
        "analogous",
        "light",
        JSON.stringify([
          { color: "#070514", isLocked: false, role: "text" },
          { color: "#f1f0f4", isLocked: false, role: "background" },
          { color: "#7768e0", isLocked: false, role: "primary" },
          { color: "#debdf2", isLocked: false, role: "secondary" },
          { color: "#93b3e9", isLocked: false, role: "accent" },
        ]),
      ];

  let color = param[0] || getLastCombo().color;
  let scheme = param[1] || getLastCombo().scheme;
  let theme = param[2] || getLastCombo().theme;
  let palette = JSON.parse(param[3]) || JSON.parse(getLastCombo().palette);
  return { color, scheme, theme, palette };
}

export function getLength() {
  const cubeCombo = localStorage.getItem("cubeCombo");
  if (cubeCombo) {
    const comboArray = JSON.parse(cubeCombo);
    if (Array.isArray(comboArray) && comboArray.length > 0) {
      return comboArray.length;
    }
  }
  return 0;
}

export function getComboByIndex(index) {
  const cubeCombo = localStorage.getItem("cubeCombo");
  if (cubeCombo) {
    const comboArray = JSON.parse(cubeCombo);
    if (Array.isArray(comboArray) && comboArray.length > 0) {
      return JSON.parse(cubeCombo)[index];
    }
  }
  return getLastCombo();
}

export function copyUrlToClipBoard() {
  let url = new URL(window.location.href);
  clipboardCopy(url);
}
