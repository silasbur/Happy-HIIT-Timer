import React from "react";
import * as serviceWorker from "./serviceWorkerRegistration";
import { createRoot } from "react-dom/client";
import { ExercisesProvider } from "./contexts/ExercisesContext";
import { WorkoutProvider } from "./contexts/WorkoutContext";
import { IntervalsProvider } from "./contexts/IntervalsContext";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <WorkoutProvider>
      <ExercisesProvider>
        <IntervalsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </IntervalsProvider>
      </ExercisesProvider>
    </WorkoutProvider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
