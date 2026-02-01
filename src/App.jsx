import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/home";
import About from "./pages/about";
import Portfolio from "./pages/portfolio";
import Reviews from "./pages/reviews";
import Behind from "./pages/behind";
import Contact from "./pages/contact";

function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="pt-20 flex-grow" key={location.pathname}>
        <Routes>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="behind" element={<Behind />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/en/home" replace />} />
        <Route path="/:lang/*" element={<Layout />} />
        <Route path="*" element={<Navigate to="/en/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
