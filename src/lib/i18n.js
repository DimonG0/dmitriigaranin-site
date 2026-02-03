import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.group("🛑 UI Crash Prevented");
      console.error(error);
      console.info(info?.componentStack);
      console.groupEnd();
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            background: "#0a0a0a",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 520 }}>
            <h1
              style={{
                color: "#D4AF37",
                fontSize: "2rem",
                marginBottom: "1rem",
                letterSpacing: "0.08em",
              }}
            >
              Interface Protected
            </h1>

            <p style={{ opacity: 0.75, marginBottom: "2rem" }}>
              A rendering error was intercepted.  
              The system is stable.
            </p>

            <button
              onClick={this.handleReload}
              style={{
                padding: "0.75rem 1.75rem",
                background: "#D4AF37",
                color: "#0a0a0a",
                border: "none",
                borderRadius: 999,
                fontWeight: 700,
                letterSpacing: "0.15em",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              Reload
            </button>

            {import.meta.env.DEV && this.state.error && (
              <pre
                style={{
                  marginTop: "2rem",
                  textAlign: "left",
                  fontSize: "0.75rem",
                  opacity: 0.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {String(this.state.error)}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
