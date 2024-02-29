import chroma from "chroma-js";
import clipboardCopy from "clipboard-copy";

export let defaultcolor = "#6453dc",
  defaultscheme = "analogous",
  defaulttheme = "light",
  defaultpalette = JSON.stringify([
    { color: "#070514", isLocked: false, role: "text" },
    { color: "#f1f0f4", isLocked: false, role: "background" },
    { color: "#7768e0", isLocked: false, role: "primary" },
    { color: "#debdf2", isLocked: false, role: "secondary" },
    { color: "#93b3e9", isLocked: false, role: "accent" },
  ]);

export const SCHEMES = [
  "analogous",
  "complementary",
  "monochromatic",
  "split Complementary",
  "square",
  "triadic",
];

export function generateGoodLookingColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(50 + Math.random() * 30) / 100;
  const lightness = Math.floor(60 + Math.random() * 10) / 100;
  return chroma.hsl(hue, saturation, lightness).hex();
}

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
      colorPalette = chroma
        .scale([baseColor, baseColor.brighten(0.8), baseColor.darken(0.5)])
        .mode("hsl")
        .colors(3);
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
  return switchPalettetheme(theme, selected);
}

export function switchPalettetheme(theme, palette) {
  let text, background;

  if (theme === "light") {
    text = chroma.hsl(chroma(palette[0]).get("hsl.h"), 0.4, 0.05).hex();
    background = chroma.hsl(chroma(palette[1]).get("hsl.h"), 0.25, 0.95).hex();
  } else {
    text = chroma.hsl(chroma(palette[0]).get("hsl.h"), 0.6, 0.95).hex();
    background = chroma.hsl(chroma(palette[1]).get("hsl.h"), 0.1, 0.06).hex();
  }

  let themeColors = [
    text,
    background,
    palette[2],
    chroma(palette[3]).hex(),
    chroma(palette[4]).hex(),
  ];

  return themeColors;
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
    color: defaultcolor,
    scheme: defaultscheme,
    theme: defaulttheme,
    palette: defaultpalette,
  };
}

export function initCombo(color, scheme, theme, palette) {
  let url = new URL(window.location.href);
  url.searchParams.set("q", [color, scheme, theme, palette].join("-"));
  window.history.replaceState({}, "", url);
}

export function getInitCombo() {
  let url = new URL(window.location.href);
  let q = url.searchParams.get("q");
  let param = q ? q.split("-") : null;

  if (param && param.length === 4) {
    var color = param[0];
    var scheme = param[1];
    var theme = param[2];
    var palette = JSON.parse(param[3]);
  }

  let initcolor = color || getLastCombo().color || defaultcolor;
  let initscheme = scheme || getLastCombo().scheme || defaultscheme;
  let inittheme = theme || getLastCombo().theme || defaulttheme;
  let initpalette =
    palette || JSON.parse(getLastCombo().palette) || defaultpalette;

  return {
    color: initcolor,
    scheme: initscheme,
    theme: inittheme,
    palette: initpalette,
  };
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

export function copyUrlToClipBoard(value) {
  clipboardCopy(value);
}
