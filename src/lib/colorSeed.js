/**
 * Color Seed Module
 * Unified interface for generating theme colors from a base color
 * Acts as the single source of truth for color generation logic
 */

import chroma from "chroma-js";
import generateRandomPalette, { switchPalettetheme } from "./utils";

/**
 * Generate an entire theme from a single seed color
 * This is the primary function to use for color generation
 *
 * @param {string} baseColor - Hex color to use as seed (e.g., "#6453dc")
 * @param {string} scheme - Color harmony scheme (analogous, complementary, triadic, etc.)
 * @param {string} theme - Theme variant (light or dark)
 * @returns {Array} - Array of 5 color objects: [text, background, primary, secondary, accent]
 */
export function generateThemeFromSeed(baseColor, scheme, theme) {
  // Validate inputs
  if (!chroma.valid(baseColor)) {
    throw new Error(`Invalid base color: ${baseColor}`);
  }

  const validSchemes = [
    "analogous",
    "complementary",
    "monochromatic",
    "split Complementary",
    "square",
    "triadic",
  ];

  if (!validSchemes.includes(scheme)) {
    throw new Error(
      `Invalid scheme: ${scheme}. Must be one of: ${validSchemes.join(", ")}`
    );
  }

  if (theme !== "light" && theme !== "dark") {
    throw new Error(`Invalid theme: ${theme}. Must be 'light' or 'dark'`);
  }

  // Generate palette using the algorithm
  const paletteColors = generateRandomPalette(baseColor, scheme, theme);

  // Convert to palette objects with metadata
  const colorRoles = ["text", "background", "primary", "secondary", "accent"];
  return paletteColors.map((color, index) => ({
    color: color,
    isLocked: false,
    role: colorRoles[index],
  }));
}

/**
 * Switch a palette between light and dark themes
 * Keeps the primary/secondary/accent colors unchanged, only adjusts text/background
 *
 * @param {Array} palette - Current palette objects with color and role
 * @param {string} toTheme - Target theme (light or dark)
 * @returns {Array} - Updated palette with theme-adjusted text and background
 */
export function switchPaletteTheme(palette, toTheme) {
  if (toTheme !== "light" && toTheme !== "dark") {
    throw new Error(`Invalid theme: ${toTheme}. Must be 'light' or 'dark'`);
  }

  // Extract just the color hex values
  const colorValues = palette.map((p) => p.color);

  // Use the existing switchPalettetheme function
  const updatedColors = switchPalettetheme(toTheme, colorValues);

  // Map back to palette objects, preserving lock states
  const colorRoles = ["text", "background", "primary", "secondary", "accent"];
  return updatedColors.map((color, index) => ({
    color: color,
    isLocked: palette[index]?.isLocked ?? false,
    role: colorRoles[index],
  }));
}

/**
 * Get color shades for a specific role
 * Useful for generating tints and shades of a palette color
 *
 * @param {string} color - Hex color
 * @returns {object} - Color with dark/light shades and transparent variants
 */
export function getColorVariants(color) {
  const validColor = chroma(color);

  const darkShades = chroma
    .scale([validColor, "#000"])
    .colors(5);
  const lightShades = chroma
    .scale([validColor, "#fff"])
    .colors(5);

  return {
    color: validColor.hex(),
    dark1: darkShades[1],
    dark2: darkShades[2],
    dark3: darkShades[3],
    light1: lightShades[1],
    light2: lightShades[2],
    light3: lightShades[3],
    transparent1: chroma(validColor).alpha(0.4).hex(),
    transparent2: chroma(validColor).alpha(0.3).hex(),
    transparent3: chroma(validColor).alpha(0.2).hex(),
  };
}

/**
 * Calculate optimal text color for a background
 * Uses WCAG contrast ratio to determine if text should be light or dark
 *
 * @param {string} textColor - Proposed text color
 * @param {string} backgroundColor - Background color
 * @param {string} lightColor - Alternative light color for text
 * @returns {string} - Text color that provides better contrast
 */
export function getOptimalTextColor(textColor, backgroundColor, lightColor) {
  const contrast = chroma.contrast(textColor, backgroundColor);

  // WCAG AA standard is 4.5:1
  if (contrast > 4.5) {
    return textColor;
  } else {
    return lightColor;
  }
}

/**
 * Export all palette information as a structured object
 * Useful for exporting to design tokens or other formats
 *
 * @param {Array} palette - Palette array
 * @returns {object} - Structured palette object with all roles
 */
export function getPaletteStructure(palette) {
  return {
    text: palette[0],
    background: palette[1],
    primary: palette[2],
    secondary: palette[3],
    accent: palette[4],
  };
}
