import chroma from "chroma-js";
import clipboardCopy from "clipboard-copy";

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
    let text = chroma.hsl(textHex, 0.6, 0.025).hex();
    let backgroundHex = chroma(palette[1]).get("hsl.h");
    let background = chroma.hsl(backgroundHex, 0.2, 0.95).hex();

    let lightTheme = [
      text,
      background,
      chroma(palette[2]).set("hsl.s", 0.9).set("hsl.l", 0.6).hex(),
      chroma(palette[3]).set("hsl.s", 0.8).set("hsl.l", 0.8).hex(),
      chroma(palette[4]).set("hsl.s", 0.8).set("hsl.l", 0.7).hex(),
    ];
    return lightTheme;
  } else {
    let textHex = chroma(palette[0]).get("hsl.h");
    let text = chroma.hsl(textHex, 0.6, 0.95).hex();
    let backgroundHex = chroma(palette[1]).get("hsl.h");
    let background = chroma.hsl(backgroundHex, 0.2, 0.025).hex();
    let darkTheme = [
      text,
      background,
      chroma(palette[2]).set("hsl.s", 0.9).set("hsl.l", 0.5).hex(),
      chroma(palette[3]).set("hsl.s", 0.8).set("hsl.l", 0.7).hex(),
      chroma(palette[4]).set("hsl.s", 0.8).set("hsl.l", 0.6).hex(),
    ];
    return darkTheme;
  }
}

export function saveTolocalStorage(color, scheme, theme, index) {
  // if (index < getLength() - 1) {
  //   return null;
  // }
  let localdb = JSON.parse(localStorage.getItem("cubeCombo")) || [];
  let cubeCombo = { color: color, scheme: scheme, theme: theme };

  let lastItem = localdb[localdb.length - 1];
  let combinationExists =
    lastItem &&
    lastItem.color === color &&
    lastItem.scheme === scheme &&
    lastItem.theme === theme;

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
    color: "#fff03d",
    scheme: "analogous",
    theme: "light",
  };
}

export function initCombo(color, scheme, theme) {
  let url = new URL(window.location.href);
  url.searchParams.set("color", color);
  url.searchParams.set("scheme", scheme);
  url.searchParams.set("theme", theme);
  window.history.replaceState({}, "", url);
}

export function getInitCombo() {
  let url = new URL(window.location.href);
  let color =
    url.searchParams.get("color") || getLastCombo().color || "#fff03d";
  let scheme =
    url.searchParams.get("scheme") || getLastCombo().scheme || "analogous";
  let theme = url.searchParams.get("theme") || getLastCombo().theme || "light";
  return { color, scheme, theme };
}

export function getLength() {
  const cubeCombo = localStorage.getItem("cubeCombo");
  if (cubeCombo) {
    const comboArray = JSON.parse(cubeCombo);
    if (Array.isArray(comboArray) && comboArray.length > 0) {
      return comboArray.length;
    }
  }
}

export function getComboByIndex(index) {
  return JSON.parse(localStorage.getItem("cubeCombo"))[index];
}

export function copyUrlToClipBoard() {
  let url = new URL(window.location.href);
  clipboardCopy(url);
}
