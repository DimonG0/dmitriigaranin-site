import { useParams } from "react-router-dom";
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

function LangPage({ en, ru, fr, hy }) {
  const { lang } = useParams();
  return { en, ru, fr, hy }[lang] ?? en;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <main className="pt-20">
          <Routes>
            {/* ROOT */}
            <Route path="/" element={<Navigate to="/en/home" replace />} />

            {/* 🌍 LANG ROUTES */}
            <Route path="/:lang">
              {/* /en -> /en/home */}
              <Route index element={<Navigate to="home" replace />} />

              {/* EN */}
              <Route path="home" element={<EnHome />} />
              <Route path="about" element={<EnAbout />} />
              <Route path="portfolio" element={<EnPortfolio />} />
              <Route path="reviews" element={<EnReviews />} />
              <Route path="behind" element={<EnBehind />} />
              <Route path="contact" element={<EnContact />} />

              {/* RU */}
              <Route path="home" element={<RuHome />} />
              <Route path="about" element={<RuAbout />} />
              <Route path="portfolio" element={<RuPortfolio />} />
              <Route path="reviews" element={<RuReviews />} />
              <Route path="behind" element={<RuBehind />} />
              <Route path="contact" element={<RuContact />} />

              {/* FR */}
              <Route path="home" element={<FrHome />} />
              <Route path="about" element={<FrAbout />} />
              <Route path="portfolio" element={<FrPortfolio />} />
              <Route path="reviews" element={<FrReviews />} />
              <Route path="behind" element={<FrBehind />} />
              <Route path="contact" element={<FrContact />} />

              {/* HY */}
              <Route path="home" element={<HyHome />} />
              <Route path="about" element={<HyAbout />} />
              <Route path="portfolio" element={<HyPortfolio />} />
              <Route path="reviews" element={<HyReviews />} />
              <Route path="behind" element={<HyBehind />} />
              <Route path="contact" element={<HyContact />} />
            </Route>

            {/* fallback */}
            <Route path="*" element={<Navigate to="/en/home" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
