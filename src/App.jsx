// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Backdrop from "./components/Backdrop";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home";
import About from "./pages/about";
import Portfolio from "./pages/portfolio";
import Reviews from "./pages/reviews";
import Behind from "./pages/behind";
import Contact from "./pages/contact";

function Layout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white flex flex-col">
      <Backdrop />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/en/home" replace />} />

            <Route path="/:lang" element={<Layout />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="behind" element={<Behind />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            <Route path="*" element={<Navigate to="/en/home" replace />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
