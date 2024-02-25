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
  let lightnessPrimary = chroma(palette[2]).get("hsl.l");

  if (theme == "light") {
    let textHex = chroma(palette[0]).get("hsl.h");
    let text = chroma.hsl(textHex, 0.6, 0.05).hex();
    let backgroundHex = chroma(palette[1]).get("hsl.h");
    let background = chroma.hsl(backgroundHex, 0.15, 0.95).hex();

    let lightTheme = [
      text,
      background,
      chroma(palette[2]).hex(),
      chroma(palette[3])
        .set("hsl.l", lightnessPrimary + 0.2)
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
        .set("hsl.l", lightnessPrimary + 0.3)
        .hex(),
      chroma(palette[4]).set("hsl.l", lightnessPrimary).hex(),
    ];
    return darkTheme;
  }
}

export function saveTolocalStorage(color, scheme, theme, palette) {
  // if (index < getLength() - 1) {
  //   return null;
  // }
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
    color: "#fff03d",
    scheme: "analogous",
    theme: "light",
    palette: JSON.stringify([
      {
        color: "#0a0603",
        name: "Asphalt",
        isLocked: false,
        isPickerActive: false,
        role: "text",
      },
      {
        color: "#f5f2f0",
        name: "Pampas",
        isLocked: false,
        isPickerActive: false,
        role: "background",
      },
      {
        color: "#f26e0d",
        name: "Christine",
        isLocked: false,
        isPickerActive: false,
        role: "primary",
      },
      {
        color: "#f5efa3",
        name: "Sandwisp",
        isLocked: false,
        isPickerActive: false,
        role: "secondary",
      },
      {
        color: "#a6eb47",
        name: "Conifer",
        isLocked: false,
        isPickerActive: false,
        role: "accent",
      },
    ]),
  };
}

export function initCombo(color, scheme, theme, palette) {
  let url = new URL(window.location.href);
  url.searchParams.set("color", color);
  url.searchParams.set("scheme", scheme);
  url.searchParams.set("theme", theme);
  url.searchParams.set("palette", palette);
  window.history.replaceState({}, "", url);
}

export function getInitCombo() {
  let url = new URL(window.location.href);
  let color =
    url.searchParams.get("color") || getLastCombo()?.color || "#fff03d";
  let scheme =
    url.searchParams.get("scheme") || getLastCombo()?.scheme || "analogous";
  let theme = url.searchParams.get("theme") || getLastCombo()?.theme || "light";
  let palette = JSON.parse(url.searchParams.get("palette")) ||
    JSON.parse(getLastCombo()?.palette) || [
      {
        color: "#0a0603",
        name: "Asphalt",
        isLocked: false,
        isPickerActive: false,
        role: "text",
      },
      {
        color: "#f5f2f0",
        name: "Pampas",
        isLocked: false,
        isPickerActive: false,
        role: "background",
      },
      {
        color: "#f26e0d",
        name: "Christine",
        isLocked: false,
        isPickerActive: false,
        role: "primary",
      },
      {
        color: "#f5efa3",
        name: "Sandwisp",
        isLocked: false,
        isPickerActive: false,
        role: "secondary",
      },
      {
        color: "#a6eb47",
        name: "Conifer",
        isLocked: false,
        isPickerActive: false,
        role: "accent",
      },
    ];
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
}

export function getComboByIndex(index) {
  return JSON.parse(localStorage.getItem("cubeCombo"))[index];
}

export function copyUrlToClipBoard() {
  let url = new URL(window.location.href);
  clipboardCopy(url);
}
