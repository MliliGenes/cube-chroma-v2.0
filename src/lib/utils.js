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
  // Generate colors that are naturally appealing
  // Avoid extreme saturation (too pure) and extreme lightness (too bright/dark)
  
  const hue = Math.random() * 360;
  
  // Saturation: between 45-85% for vibrant but not oversaturated colors
  const saturation = (45 + Math.random() * 40) / 100;
  
  // Lightness: between 45-65% for balanced colors (not too dark, not too light)
  // This range ensures the color looks good as a primary color
  const lightness = (45 + Math.random() * 20) / 100;
  
  // Use LCH color space for more perceptually uniform colors
  // Then convert to hex for compatibility
  const color = chroma.hsl(hue, saturation, lightness);
  
  // Ensure the color has reasonable contrast properties
  // If it's too close to white or black, adjust it
  const lum = color.get("hsl.l");
  if (lum < 0.3 || lum > 0.8) {
    return chroma.hsl(hue, saturation, 0.5).hex();
  }
  
  return color.hex();
}

export default function generateRandomPalette(baseColor, algorithm, theme) {
  baseColor = chroma(baseColor);
  const baseHue = baseColor.get("hsl.h");
  const baseSat = baseColor.get("hsl.s");
  const baseLum = baseColor.get("hsl.l");

  let primaryColor, secondaryColor, accentColor;

  // Generate harmony colors based on algorithm with saturation/lightness adjustments
  switch (algorithm) {
    case "complementary":
      primaryColor = baseColor.hex();
      // Complementary with reduced saturation for balance
      secondaryColor = chroma.hsl((baseHue + 180) % 360, Math.max(0.3, baseSat * 0.8), baseLum).hex();
      // Accent between primary and secondary
      accentColor = chroma.hsl((baseHue + 90) % 360, baseSat * 0.9, baseLum).hex();
      break;

    case "analogous":
      primaryColor = baseColor.hex();
      // Left analogous with saturation reduction
      secondaryColor = chroma.hsl((baseHue + 30) % 360, baseSat * 0.7, baseLum).hex();
      // Right analogous with slight lightness increase
      accentColor = chroma.hsl((baseHue - 30 + 360) % 360, baseSat * 0.85, Math.min(1, baseLum * 1.05)).hex();
      break;

    case "triadic":
      primaryColor = baseColor.hex();
      // Triadic colors with saturation adjustments for visual hierarchy
      secondaryColor = chroma.hsl((baseHue + 120) % 360, baseSat * 0.8, baseLum).hex();
      accentColor = chroma.hsl((baseHue + 240) % 360, baseSat * 0.75, baseLum).hex();
      break;

    case "split Complementary":
      primaryColor = baseColor.hex();
      // Split complementary with saturation balance
      secondaryColor = chroma.hsl((baseHue + 150) % 360, baseSat * 0.75, baseLum).hex();
      accentColor = chroma.hsl((baseHue + 210) % 360, baseSat * 0.8, Math.max(0.2, baseLum * 0.95)).hex();
      break;

    case "monochromatic":
      // Monochromatic uses same hue with different saturation and brightness
      primaryColor = baseColor.hex();
      // Lighter, less saturated version
      secondaryColor = chroma.hsl(baseHue, Math.max(0.1, baseSat * 0.5), Math.min(1, baseLum * 1.2)).hex();
      // Darker, more saturated accent
      accentColor = chroma.hsl(baseHue, baseSat * 0.7, Math.max(0.2, baseLum * 0.8)).hex();
      break;

    case "square":
      primaryColor = baseColor.hex();
      // Square tetrad with saturation adjustments
      secondaryColor = chroma.hsl((baseHue + 90) % 360, baseSat * 0.8, baseLum).hex();
      accentColor = chroma.hsl((baseHue + 270) % 360, baseSat * 0.85, baseLum).hex();
      break;

    default:
      throw new Error(`Unexpected algorithm: ${algorithm}`);
  }

  // Create the final palette with color roles
  const selected = [primaryColor, primaryColor, primaryColor, secondaryColor, accentColor];

  return switchPalettetheme(theme, selected);
}

export function switchPalettetheme(theme, palette) {
  const primaryHue = chroma(palette[2]).get("hsl.h");
  const primarySat = chroma(palette[2]).get("hsl.s");
  let text, background;

  if (theme === "light") {
    // Light theme: dark text, light background
    // Use primary hue but with low saturation and darker lightness for text
    // Reduced lightness to 0.22 for darker appearance
    text = chroma.hsl(primaryHue, Math.min(0.3, primarySat * 0.3), 0.22).hex();
    
    // Background: very desaturated, very light version
    background = chroma.hsl(primaryHue, Math.max(0.05, primarySat * 0.15), 0.96).hex();
  } else {
    // Dark theme: light text, dark background
    // Text: highly desaturated, very light
    text = chroma.hsl(primaryHue, Math.max(0.05, primarySat * 0.2), 0.93).hex();
    
    // Background: desaturated, very dark
    background = chroma.hsl(primaryHue, Math.max(0.05, primarySat * 0.15), 0.08).hex();
  }

  // Ensure minimum contrast between text and background
  // WCAG AA standard requires 4.5:1 for normal text
  const contrast = chroma.contrast(text, background);
  if (contrast < 4.5) {
    if (theme === "light") {
      text = chroma.hsl(primaryHue, 0.2, 0.22).hex();
    } else {
      text = chroma.hsl(primaryHue, 0.15, 0.95).hex();
    }
  }

  let themeColors = [
    text,
    background,
    palette[2],
    palette[3],
    palette[4],
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
    try {
      localdb.push(cubeCombo);
      localStorage.setItem("cubeCombo", JSON.stringify(localdb));
    } catch (e) {
      // Handle localStorage quota exceeded
      console.warn("localStorage quota exceeded", e);
    }
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

export function initCombo(color, scheme, theme) {
  let url = new URL(window.location.href);
  url.searchParams.set("q", [color, scheme, theme].join("-"));
  window.history.replaceState({}, "", url);
}

export function getInitCombo() {
  let url = new URL(window.location.href);
  let q = url.searchParams.get("q");
  let param = q ? q.split("-") : null;

  let color, scheme, theme, palette;

  // Support both new minimal format (3 params) and legacy format (4 params with JSON palette)
  if (param) {
    if (param.length === 3) {
      // New minimal format: color-scheme-theme
      color = param[0];
      scheme = param[1];
      theme = param[2];
      // Palette will be regenerated from color, scheme, theme
      palette = undefined;
    } else if (param.length === 4 && param[3].startsWith("[")) {
      // Legacy format: color-scheme-theme-paletteJSON
      // This is kept for backward compatibility
      try {
        color = param[0];
        scheme = param[1];
        theme = param[2];
        palette = JSON.parse(param[3]);
      } catch (e) {
        // If parsing fails, fall back to defaults
        color = undefined;
        scheme = undefined;
        theme = undefined;
        palette = undefined;
      }
    }
  }

  let initcolor = color || getLastCombo().color || defaultcolor;
  let initscheme = scheme || getLastCombo().scheme || defaultscheme;
  let inittheme = theme || getLastCombo().theme || defaulttheme;
  let initpalette =
    palette || JSON.parse(getLastCombo().palette) || JSON.parse(defaultpalette);

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
