import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ErrorBoundary } from "./app/ErrorBoundary";

/* ============================
   Browser & Environment Guards
   ============================ */

function checkBrowserCompatibility() {
  if (typeof window === "undefined") {
    console.error("[BOOT] Not a browser environment");
    return;
  }

  if (!("IntersectionObserver" in window)) {
    console.warn(
      "[BOOT] IntersectionObserver not supported. Animations may degrade."
    );
  }

  if (!("ResizeObserver" in window)) {
    console.warn(
      "[BOOT] ResizeObserver not supported. Layout may degrade."
    );
  }
}

function performanceCheck() {
  if (!import.meta.env.PROD) return;

  const hasAcceleration =
    "getGamepads" in navigator ||
    "accelerometer" in window ||
    "gyroscope" in window;

  if (!hasAcceleration) {
    console.info(
      "[BOOT] Hardware acceleration disabled. Visual experience may degrade."
    );
  }
}

/* ============================
   Bootstrap
   ============================ */

function bootstrap() {
  try {
    checkBrowserCompatibility();
    performanceCheck();

    const rootElement = document.getElementById("root");

    if (!rootElement) {
      throw new Error("Root element #root not found");
    }

    if (!document.querySelector('meta[name="viewport"]')) {
      console.warn(
        "[BOOT] Missing viewport meta tag. Responsive layout may break."
      );
    }

    const root = ReactDOM.createRoot(rootElement);

    root.render(
      <React.StrictMode>
        <ErrorBoundary
          fallback={
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "#0a0a0a",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                textAlign: "center",
                zIndex: 9999,
                fontFamily:
                  "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              <div>
                <h1
                  style={{
                    color: "#D4AF37",
                    marginBottom: "1rem",
                    fontSize: "1.75rem",
                  }}
                >
                  Critical Error
                </h1>
                <p style={{ opacity: 0.8 }}>
                  The application failed to load.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  style={{
                    marginTop: "2rem",
                    padding: "0.75rem 1.5rem",
                    background: "#D4AF37",
                    color: "#0a0a0a",
                    border: "none",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Reload
                </button>
              </div>
            </div>
          }
        >
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );

    console.log(
      "%c Dmitrii Garanin Portfolio ",
      "background:#0a0a0a;color:#D4AF37;padding:6px 10px;border:1px solid #D4AF37;font-weight:700"
    );
    console.log("%c App initialized successfully", "color:#4CAF50");

    /* Resource load errors */
    window.addEventListener(
      "error",
      (e) => {
        const t = e.target;
        if (
          t &&
          (t.tagName === "IMG" ||
            t.tagName === "SCRIPT" ||
            t.tagName === "LINK")
        ) {
          console.warn("[RESOURCE FAILED]", t.src || t.href);
        }
      },
      true
    );

    window.addEventListener("offline", () =>
      console.warn("[NETWORK] Offline")
    );
    window.addEventListener("online", () =>
      console.info("[NETWORK] Online")
    );
  } catch (err) {
    console.error("[BOOT] Fatal error", err);

    document.body.innerHTML = `
      <div style="
        position:fixed;
        inset:0;
        background:#0a0a0a;
        color:#fff;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:system-ui;
        text-align:center;
        padding:2rem;
      ">
        <div>
          <h1 style="color:#D4AF37;margin-bottom:1rem">Application Error</h1>
          <p style="opacity:.8">${err.message}</p>
          <button onclick="location.reload()" style="
            margin-top:2rem;
            padding:.75rem 1.5rem;
            background:#D4AF37;
            color:#0a0a0a;
            border:none;
            border-radius:9999px;
            font-weight:700;
            letter-spacing:.12em;
            text-transform:uppercase;
            cursor:pointer;
          ">
            Reload
          </button>
        </div>
      </div>
    `;
  }
}

/* ============================
   Start
   ============================ */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}

if (import.meta.env.DEV) {
  window.__APP_READY__ = true;
  window.__APP_ENV__ = "development";
}
