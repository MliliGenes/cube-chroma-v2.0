import chroma from "chroma-js";
import { useDispatch } from "react-redux";

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
        baseColor.set("hsl.h", (baseColor.get("hsl.h") - 30) % 360).hex(),
        baseColor.hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 30) % 360).hex(),
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
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 180) % 360).hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 270) % 360).hex(),
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
  return switchPalettetheme(theme, selected);
}

export function switchPalettetheme(theme, palette) {
  if (theme == "light") {
    let textHex = chroma(palette[0]).get("hsl.h");
    let text = chroma.hsl(textHex, 0.6, 0.05).hex();
    let backgroundHex = chroma(palette[1]).get("hsl.h");
    let background = chroma.hsl(backgroundHex, 0.6, 0.95).hex();

    let readyPalette = [
      text,
      background,
      chroma(palette[2]).set("hsl.s", 0.8).set("hsl.l", 0.5).hex(),
      chroma(palette[3]).set("hsl.s", 0.4).set("hsl.l", 0.8).hex(),
      chroma(palette[4]).set("hsl.s", 0.6).set("hsl.l", 0.6).hex(),
    ];
    return readyPalette;
  } else {
    let textHex = chroma(palette[0]).get("hsl.h");
    let text = chroma.hsl(textHex, 0.6, 0.95).hex();
    let backgroundHex = chroma(palette[1]).get("hsl.h");
    let background = chroma.hsl(backgroundHex, 0.2, 0.05).hex();
    let readyPalette = [
      text,
      background,
      chroma(palette[2]).set("hsl.s", 0.8).set("hsl.l", 0.6).hex(),
      chroma(palette[3]).set("hsl.s", 0.4).set("hsl.l", 0.7).hex(),
      chroma(palette[4]).set("hsl.s", 0.6).set("hsl.l", 0.5).hex(),
    ];
    return readyPalette;
  }
}

export function saveTolocalStorage(color, scheme) {
  let localdb = JSON.parse(localStorage.getItem("cubeCombo")) || [];
  let cubeCombo = { color: color, scheme: scheme };

  let lastItem = localdb[localdb.length - 1];
  let combinationExists =
    lastItem && lastItem.color === color && lastItem.scheme === scheme;

  if (!combinationExists) {
    localdb.push(cubeCombo);
    localStorage.setItem("cubeCombo", JSON.stringify(localdb));
    localStorage.setItem("oneCubeCombo", JSON.stringify(cubeCombo));
  }
}

export function saveTheme(theme) {
  localStorage.setItem("cubeTheme", theme);
}

export function getLastTheme() {
  return localStorage.getItem("cubeTheme") || "light";
}

export function getLastColor() {
  return JSON.parse(localStorage.getItem("oneCubeCombo"))?.color || "#fbff42";
}

export function getLastScheme() {
  return (
    JSON.parse(localStorage.getItem("oneCubeCombo"))?.scheme || "analogous"
  );
}

export function getIndex() {
  if (JSON.parse(localStorage.getItem("cubeCombo"))) {
    let index = JSON.parse(localStorage.getItem("cubeCombo")).length - 1;
    return index;
  }
}

export function getLength() {
  if (JSON.parse(localStorage.getItem("cubeCombo"))) {
    return JSON.parse(localStorage.getItem("cubeCombo")).length;
  }
}

export function getPaletteByIndex(index) {
  if (getLength() > 0) {
    return JSON.parse(localStorage.getItem("cubeCombo"))[index];
  }
}
