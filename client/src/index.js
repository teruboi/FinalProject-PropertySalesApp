import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router";

function render(content, id) {
  const root = createRoot(document.getElementById(id));
  root.render(content);
}

render(<Router />, "root");
