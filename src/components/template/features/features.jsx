import React from "react";
import "./features.css";

export default function Features() {
  const features = [
    {
      icon: "fa-eye",
      title: "Live Preview",
      description:
        "See your color palette applied in real-time to a full website layout",
    },
    {
      icon: "fa-sliders",
      title: "Color Harmony",
      description:
        "Generate perfectly harmonious palettes using proven color theory algorithms",
    },
    {
      icon: "fa-download",
      title: "Multiple Formats",
      description:
        "Export as CSS, SCSS, Tailwind CSS, JSON, and more for any tech stack",
    },
    {
      icon: "fa-keyboard",
      title: "Keyboard Shortcuts",
      description:
        "Work faster with intuitive keyboard shortcuts for all major actions",
    },
    {
      icon: "fa-history",
      title: "Full History",
      description:
        "Navigate through your color explorations with undo/redo functionality",
    },
    {
      icon: "fa-lock",
      title: "Lock Colors",
      description:
        "Lock individual colors while regenerating others for fine-tuned control",
    },
  ];

  return (
    <div className="features--container">
      <h2 className="features--title">
        Powerful <span className="gredient--1">Features</span>
      </h2>
      <div className="features--grid">
        {features.map((feature, index) => (
          <div key={index} className="feature--card">
            <div className="feature--icon-wrapper">
              <i className={`fa-solid ${feature.icon}`}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
