import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./Pages/Auth/AutOperations/Auth.css";
import "./Css/Components/alerts.css";
import "./Css/Components/google.css";
import "./Css/Components/button.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";

import "./custom.css";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import MenuContext from "./context/MenuContext";
import WindowContext from "./context/WindowContext";
import CartChangerContext from "./context/CartChangerContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <CartChangerContext>
          <Router>
            <App />
          </Router>
        </CartChangerContext>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);
