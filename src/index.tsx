import "antd/dist/antd.css";

import { Spin } from "antd";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import styles from "./styles.module.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// TODO extract suspense and Loader component
root.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className={styles.layout}>
          <Spin size="large" />
        </div>
      }
    >
      <App />
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
