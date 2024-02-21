import chroma from "chroma-js";

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
      colorPalette = chroma
        .scale([baseColor, baseColor.brighten(), baseColor.darken()])
        .mode("hsl")
        .colors(3);
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
          chroma(colorPalette[2]).set("hsl.s", 0.9).set("hsl.l", 0.8).hex(),
          colorPalette[1],
        ]
      : [
          colorPalette[0],
          chroma(colorPalette[1]).set("hsl.s", 0.9).set("hsl.l", 0.8).hex(),
          chroma(colorPalette[0])
            .set("hsl.h", (chroma(colorPalette[1]).get("hsl.h") + 90) % 360)
            .hex(),
        ];

  if (theme == "light") {
    return [
      chroma(selected[0]).darken(5).set("hsl.s", 0.15).hex(),
      chroma(selected[2]).mix("#fff", 0.85).hex(),
      ...selected,
    ];
  } else {
    return [
      chroma(selected[2]).mix("#fff", 0.85).hex(),
      chroma(selected[1]).darken(5).set("hsl.s", 0.15).hex(),
      ...selected,
    ];
  }
}

export function saveTolocalStorage(color, scheme) {
  let localdb = JSON.parse(localStorage.getItem("cubeCombo")) || [];
  let cubeCombo = { color: color, scheme: scheme };

  localdb.push(cubeCombo);
  localStorage.setItem("cubeCombo", JSON.stringify(localdb));
  localStorage.setItem("oneCubeCombo", JSON.stringify(cubeCombo));
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
