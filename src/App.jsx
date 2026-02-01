import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

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
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="pt-20 flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROOT */}
        <Route path="/" element={<Navigate to="/en/home" replace />} />

        {/* LANG LAYOUT */}
        <Route path="/:lang" element={<Layout />}>
          <Route index element={<Navigate to="home" replace />} />

          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="behind" element={<Behind />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/en/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
