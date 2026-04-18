import React from "react";
import "./keyboardShortcuts.css";

export default function KeyboardShortcuts({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    {
      key: "Spacebar",
      action: "Generate new random palette",
      category: "Generation",
    },
    {
      key: "Ctrl + X",
      action: "Toggle between light and dark theme",
      category: "Theme",
    },
    {
      key: "Arrow Up",
      action: "Previous color scheme",
      category: "Navigation",
    },
    {
      key: "Arrow Down",
      action: "Next color scheme",
      category: "Navigation",
    },
    {
      key: "Arrow Left",
      action: "Undo / Go to previous palette",
      category: "History",
    },
    {
      key: "Arrow Right",
      action: "Redo / Go to next palette",
      category: "History",
    },
    {
      key: "Ctrl + E",
      action: "Open/close export panel",
      category: "Export",
    },
    {
      key: "Ctrl + S",
      action: "Copy shareable link to clipboard",
      category: "Share",
    },
    { key: "?", action: "Show this help modal", category: "Help" },
  ];

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {});

  return (
    <>
      <div className="keyboard-shortcuts--overlay" onClick={onClose}></div>
      <div className="keyboard-shortcuts--modal">
        <div className="modal--header">
          <h2>Keyboard Shortcuts</h2>
          <button className="close--button" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="modal--content">
          {Object.entries(groupedShortcuts).map(([category, shortcuts]) => (
            <div key={category} className="shortcuts--group">
              <h3 className="group--title">{category}</h3>
              <div className="shortcuts--list">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="shortcut--item">
                    <kbd className="shortcut--key">{shortcut.key}</kbd>
                    <span className="shortcut--action">{shortcut.action}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="modal--footer">
          <p>
            💡 Tip: Use keyboard shortcuts for a faster workflow while creating
            your perfect palette!
          </p>
        </div>
      </div>
    </>
  );
}
