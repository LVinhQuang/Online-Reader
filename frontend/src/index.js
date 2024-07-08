import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./components/GlobalStyles";
import './config/firebase-config'
import { ErrorBoundary } from "./utils/ErrorBoundary";

// First: When u want to change or set css for all pages in React App
// Please set css in GlobalStyles.scss, following this path: ./components/GlobalStyles/GlobalStyles.scss
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GlobalStyles>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </GlobalStyles>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
