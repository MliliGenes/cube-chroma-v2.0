import chroma from "chroma-js";

/**
 * Intelligently switches color palette between light and dark themes
 * Only adjusts text/background brightness, keeps primary/secondary/accent colors consistent
 * This provides a smooth theme transition without changing the color scheme itself
 *
 * @param {string} fromTheme - Current theme ("light" or "dark")
 * @param {string} toTheme - Target theme ("light" or "dark")
 * @param {Array} palette - Current palette [text, background, primary, secondary, accent]
 * @returns {Array} - Updated palette with adjusted text/background for new theme
 */
export function switchThemeSmartly(fromTheme, toTheme, palette) {
  if (fromTheme === toTheme) return palette;

  // Extract current colors
  const [currentText, currentBg, primary, secondary, accent] = palette;

  let newText, newBg;

  if (toTheme === "light") {
    // Switch to light theme
    // Make text darker (low lightness, medium saturation)
    newText = chroma.hsl(chroma(currentText).get("hsl.h"), 0.4, 0.05).hex();
    // Make background lighter (high lightness, low saturation)
    newBg = chroma.hsl(chroma(currentBg).get("hsl.h"), 0.25, 0.95).hex();
  } else {
    // Switch to dark theme
    // Make text lighter (high lightness, medium saturation)
    newText = chroma.hsl(chroma(currentText).get("hsl.h"), 0.6, 0.95).hex();
    // Make background darker (low lightness, low saturation)
    newBg = chroma.hsl(chroma(currentBg).get("hsl.h"), 0.1, 0.06).hex();
  }

  return [newText, newBg, primary, secondary, accent];
}

/**
 * Alternative approach: Use the base color's hue and just shift lightness
 * This keeps the color harmony even stronger across theme switches
 *
 * @param {string} baseColor - The seed color
 * @param {string} theme - Target theme ("light" or "dark")
 * @returns {object} - Text and background colors
 */
export function getThemeColorsFromBase(baseColor, theme) {
  const baseHue = chroma(baseColor).get("hsl.h");

  if (theme === "light") {
    return {
      text: chroma.hsl(baseHue, 0.4, 0.05).hex(),
      background: chroma.hsl(baseHue, 0.25, 0.95).hex(),
    };
  } else {
    return {
      text: chroma.hsl(baseHue, 0.6, 0.95).hex(),
      background: chroma.hsl(baseHue, 0.1, 0.06).hex(),
    };
  }
}
