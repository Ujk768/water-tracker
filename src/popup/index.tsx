import React from "react";
import { createRoot } from "react-dom/client";
import PopUp from "./PopUp";

function init() {
    const appContainer = document.createElement('div')
    document.body.appendChild(appContainer)
    if (!appContainer) {
        throw new Error("Can not find AppContainer");
    }
    const root = createRoot(appContainer)
    root.render(<PopUp />);
}

init();