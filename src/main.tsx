import { StrictMode, Suspense } from "react";
import { render } from "react-dom";
import "./index.css";
import { App } from "./App";

render(
  <StrictMode>
    <Suspense fallback={<div>loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById("root")
);
