import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("🔥 ErrorBoundary caught:", error);
      console.error(info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
          <div className="max-w-xl text-center">
            <div className="text-[11px] tracking-[0.35em] uppercase text-[#D4AF37]/80">
              System safeguard
            </div>

            <h1 className="mt-4 text-[32px] font-[800]">
              Something went wrong
            </h1>

            <p className="mt-4 text-white/65 text-sm">
              A rendering error occurred. The interface is protected from crash.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-8 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-3 text-[12px] tracking-[0.22em] uppercase text-[#f7e7b2] hover:bg-[#D4AF37]/20"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
