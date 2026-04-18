import React, { useState } from "react";
import "./howtouse.css";

export default function HowToUse() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "1",
      title: "Pick Your Base Color",
      description:
        "Start by selecting a base color that defines your brand or design direction. You can use the color picker or enter a hex value.",
      shortcut: "Click the color picker or enter hex code",
    },
    {
      number: "2",
      title: "Choose Color Harmony",
      description:
        "Select a harmony scheme (Analogous, Complementary, Triadic, etc.) to generate related colors that work well together.",
      shortcut: "Use UP/DOWN arrow keys to cycle through schemes",
    },
    {
      number: "3",
      title: "Toggle Light/Dark Mode",
      description:
        "Switch between light and dark themes to see how your palette adapts. Perfect for designing with both themes in mind.",
      shortcut: "Press Ctrl + X to toggle theme instantly",
    },
    {
      number: "4",
      title: "Lock & Regenerate",
      description:
        "Lock colors you like and regenerate others. Generate random palettes with SPACEBAR until you find the perfect combination.",
      shortcut: "Click lock icon or press SPACEBAR to generate",
    },
    {
      number: "5",
      title: "Export Your Palette",
      description:
        "Export your palette in multiple formats: CSS Variables, SCSS, Tailwind CSS, and more. Copy-paste ready code!",
      shortcut: "Press Ctrl + E or click export button",
    },
    {
      number: "6",
      title: "Share Your Design",
      description:
        "Generate a shareable link with your palette configuration. Send to teammates or save for later. Press Ctrl + S to copy link.",
      shortcut: "Press Ctrl + S to copy shareable link",
    },
  ];

  return (
    <div className="howtouse--container">
      <h2 className="howtouse--title">
        How to Use <span className="gredient--2">Cube Chroma</span>
      </h2>

      <div className="howtouse--wrapper">
        <div className="steps--list">
          {steps.map((step, index) => (
            <button
              key={index}
              className={`step--button ${activeStep === index ? "active" : ""}`}
              onClick={() => setActiveStep(index)}
            >
              <div className="step--number">{step.number}</div>
              <div className="step--label">{step.title}</div>
            </button>
          ))}
        </div>

        <div className="step--details">
          <div className="step--content">
            <h3>{steps[activeStep].title}</h3>
            <p>{steps[activeStep].description}</p>
            <div className="shortcut--badge">
              <i className="fa-solid fa-keyboard"></i>
              <span>{steps[activeStep].shortcut}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tips--container">
        <h3>💡 Pro Tips</h3>
        <div className="tips--grid">
          <div className="tip">
            <strong>Tip 1:</strong> Use Split Complementary scheme for subtle,
            sophisticated palettes
          </div>
          <div className="tip">
            <strong>Tip 2:</strong> Always check contrast ratios for
            accessibility
          </div>
          <div className="tip">
            <strong>Tip 3:</strong> Lock your primary color and experiment with
            accent combinations
          </div>
          <div className="tip">
            <strong>Tip 4:</strong> Use Arrow keys for keyboard-only workflow
          </div>
        </div>
      </div>
    </div>
  );
}
