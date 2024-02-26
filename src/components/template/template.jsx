import React from "react";
import Home from "./home/home";
import "./template.css";
import Why from "./why/why";
import Stats from "./stats/stats";

export default function Template() {
  return (
    <div className="template--container">
      <Home />
      <Why />
      <Stats />
    </div>
  );
}