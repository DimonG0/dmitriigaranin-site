import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// EN
import EnHome from "./pages/en/home";
import EnAbout from "./pages/en/about";
import EnPortfolio from "./pages/en/portfolio";
import EnReviews from "./pages/en/reviews";
import EnBehind from "./pages/en/behind";
import EnContact from "./pages/en/contact";

// RU
import RuHome from "./pages/ru/home";
import RuAbout from "./pages/ru/about";
import RuPortfolio from "./pages/ru/portfolio";
import RuReviews from "./pages/ru/reviews";
import RuBehind from "./pages/ru/behind";
import RuContact from "./pages/ru/contact";

// FR
import FrHome from "./pages/fr/home";
import FrAbout from "./pages/fr/about";
import FrPortfolio from "./pages/fr/portfolio";
import FrReviews from "./pages/fr/reviews";
import FrBehind from "./pages/fr/behind";
import FrContact from "./pages/fr/contact";

// HY
import HyHome from "./pages/hy/home";
import HyAbout from "./pages/hy/about";
import HyPortfolio from "./pages/hy/portfolio";
import HyReviews from "./pages/hy/reviews";
import HyBehind from "./pages/hy/behind";
import HyContact from "./pages/hy/contact";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <main className="pt-20">
          <Routes>
            {/* root -> /en/home */}
            <Route path="/" element={<Navigate to="/en/home" replace />} />

            {/* EN */}
            <Route path="/en/home" element={<EnHome />} />
            <Route path="/en/about" element={<EnAbout />} />
            <Route path="/en/portfolio" element={<EnPortfolio />} />
            <Route path="/en/reviews" element={<EnReviews />} />
            <Route path="/en/behind" element={<EnBehind />} />
            <Route path="/en/contact" element={<EnContact />} />

            {/* RU */}
            <Route path="/ru/home" element={<RuHome />} />
            <Route path="/ru/about" element={<RuAbout />} />
            <Route path="/ru/portfolio" element={<RuPortfolio />} />
            <Route path="/ru/reviews" element={<RuReviews />} />
            <Route path="/ru/behind" element={<RuBehind />} />
            <Route path="/ru/contact" element={<RuContact />} />

            {/* FR */}
            <Route path="/fr/home" element={<FrHome />} />
            <Route path="/fr/about" element={<FrAbout />} />
            <Route path="/fr/portfolio" element={<FrPortfolio />} />
            <Route path="/fr/reviews" element={<FrReviews />} />
            <Route path="/fr/behind" element={<FrBehind />} />
            <Route path="/fr/contact" element={<FrContact />} />

            {/* HY */}
            <Route path="/hy/home" element={<HyHome />} />
            <Route path="/hy/about" element={<HyAbout />} />
            <Route path="/hy/portfolio" element={<HyPortfolio />} />
            <Route path="/hy/reviews" element={<HyReviews />} />
            <Route path="/hy/behind" element={<HyBehind />} />
            <Route path="/hy/contact" element={<HyContact />} />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/en/home" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
