import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </Provider>
);
