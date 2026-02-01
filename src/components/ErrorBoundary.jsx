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
    // 🧪 DEV: логируем
    if (import.meta.env.DEV) {
      console.error("🔥 UI CRASH CAUGHT:", error);
      console.error("ℹ️ Component stack:", info);
    }

    // 🔐 PROD: можно отправлять в Sentry / LogRocket
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
          <div className="max-w-xl text-center">
            <div className="text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] mb-4">
              System safeguard
            </div>

            <h1 className="text-[32px] font-[800] mb-4">
              Something went wrong
            </h1>

            <p className="text-white/60 text-sm mb-8">
              The interface recovered safely.  
              Please refresh the page or continue browsing.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-7 py-3 text-[12px] font-[700] tracking-[0.22em] uppercase text-[#f7e7b2] hover:border-[#FFD700]/80"
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
