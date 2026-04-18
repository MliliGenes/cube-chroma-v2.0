import React from "react";
import Home from "./home/home";
import "./template.css";
import Why from "./why/why";
import Stats from "./stats/stats";
import Footer from "./footer/footer";
import Features from "./features/features";
import HowToUse from "./howtouse/howtouse";

export default function Template() {
  return (
    <div className="template--container">
      <Home />
      <Why />
      <Features />
      <HowToUse />
      <Stats />
      <Footer />
    </div>
  );
}
