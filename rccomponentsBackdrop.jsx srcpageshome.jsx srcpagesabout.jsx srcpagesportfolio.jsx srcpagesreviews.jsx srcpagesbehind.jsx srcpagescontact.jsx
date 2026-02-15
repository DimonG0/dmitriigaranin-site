[1mdiff --git a/src/App.jsx b/src/App.jsx[m
[1mindex 52b56b6..8c33f33 100644[m
[1m--- a/src/App.jsx[m
[1m+++ b/src/App.jsx[m
[36m@@ -1,10 +1,10 @@[m
 // src/App.jsx[m
 import React from "react";[m
[31m-import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";[m
[32m+[m[32mimport { Routes, Route, Navigate, Outlet } from "react-router-dom";[m
 import Backdrop from "./components/Backdrop";[m
[31m-import ErrorBoundary from "./components/ErrorBoundary";[m
 import Navbar from "./components/Navbar";[m
 import Footer from "./components/Footer";[m
[32m+[m
 import Home from "./pages/home";[m
 import About from "./pages/about";[m
 import Portfolio from "./pages/portfolio";[m
[36m@@ -29,26 +29,23 @@[m [mfunction Layout() {[m
 [m
 export default function App() {[m
   return ([m
[31m-    <React.StrictMode>[m
[31m-      <ErrorBoundary>[m
[31m-        <BrowserRouter>[m
[31m-          <Routes>[m
[31m-            <Route path="/" element={<Navigate to="/en/home" replace />} />[m
[32m+[m[32m    <Routes>[m
[32m+[m[32m      {/* ROOT REDIRECT */}[m
[32m+[m[32m      <Route path="/" element={<Navigate to="/en/home" replace />} />[m
 [m
[31m-            <Route path="/:lang" element={<Layout />}>[m
[31m-              <Route index element={<Navigate to="home" replace />} />[m
[31m-              <Route path="home" element={<Home />} />[m
[31m-              <Route path="about" element={<About />} />[m
[31m-              <Route path="portfolio" element={<Portfolio />} />[m
[31m-              <Route path="reviews" element={<Reviews />} />[m
[31m-              <Route path="behind" element={<Behind />} />[m
[31m-              <Route path="contact" element={<Contact />} />[m
[31m-            </Route>[m
[32m+[m[32m      {/* LANGUAGE PREFIX ROUTES */}[m
[32m+[m[32m      <Route path="/:lang" element={<Layout />}>[m
[32m+[m[32m        <Route index element={<Navigate to="home" replace />} />[m
[32m+[m[32m        <Route path="home" element={<Home />} />[m
[32m+[m[32m        <Route path="about" element={<About />} />[m
[32m+[m[32m        <Route path="portfolio" element={<Portfolio />} />[m
[32m+[m[32m        <Route path="reviews" element={<Reviews />} />[m
[32m+[m[32m        <Route path="behind" element={<Behind />} />[m
[32m+[m[32m        <Route path="contact" element={<Contact />} />[m
[32m+[m[32m      </Route>[m
 [m
[31m-            <Route path="*" element={<Navigate to="/en/home" replace />} />[m
[31m-          </Routes>[m
[31m-        </BrowserRouter>[m
[31m-      </ErrorBoundary>[m
[31m-    </React.StrictMode>[m
[32m+[m[32m      {/* CATCH ALL */}[m
[32m+[m[32m      <Route path="*" element={<Navigate to="/en/home" replace />} />[m
[32m+[m[32m    </Routes>[m
   );[m
 }[m
[1mdiff --git a/src/components/Backdrop.jsx b/src/components/Backdrop.jsx[m
[1mindex 8e0acc3..7b41c2b 100644[m
[1m--- a/src/components/Backdrop.jsx[m
[1m+++ b/src/components/Backdrop.jsx[m
[36m@@ -1,34 +1,37 @@[m
[31m-// src/components/Backdrop.jsx[m
 import { motion } from "framer-motion";[m
 [m
[31m-const glowPulse = {[m
[31m-  initial: { opacity: 0.35 },[m
[31m-  animate: { opacity: [0.22, 0.55, 0.22], transition: { duration: 7, repeat: Infinity, ease: "easeInOut" } },[m
[32m+[m[32mconst shimmer = {[m
[32m+[m[32m  initial: { opacity: 0.18 },[m
[32m+[m[32m  animate: {[m
[32m+[m[32m    opacity: [0.12, 0.42, 0.12],[m
[32m+[m[32m    transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },[m
[32m+[m[32m  },[m
 };[m
 [m
 export default function Backdrop() {[m
   return ([m
[31m-    <div className="pointer-events-none absolute inset-0 overflow-hidden">[m
[32m+[m[32m    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">[m
[32m+[m[32m      {/* RADIALS */}[m
       <div[m
         className="absolute inset-0 opacity-[0.14]"[m
         style={{[m
           backgroundImage:[m
[31m-            "radial-gradient(1200px 700px at 20% 10%, rgba(212,175,55,0.12), transparent 60%), radial-gradient(1000px 650px at 85% 25%, rgba(200,200,200,0.08), transparent 58%)",[m
[32m+[m[32m            "radial-gradient(1200px 700px at 18% 12%, rgba(212,175,55,0.14), transparent 60%), radial-gradient(1000px 650px at 86% 24%, rgba(200,200,200,0.10), transparent 58%), radial-gradient(1200px 800px at 50% 92%, rgba(255,215,0,0.08), transparent 62%)",[m
         }}[m
       />[m
[31m-      <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[#D4AF37]/10 blur-[90px]" />[m
[31m-      <div className="absolute -right-44 top-20 h-[520px] w-[520px] rounded-full bg-[#FFD700]/10 blur-[90px]" />[m
[32m+[m
[32m+[m[32m      {/* TOP GOLD LINE */}[m
       <motion.div[m
         className="absolute left-1/2 top-0 h-[2px] w-[1200px] -translate-x-1/2"[m
[31m-        variants={glowPulse}[m
[32m+[m[32m        variants={shimmer}[m
         initial="initial"[m
         animate="animate"[m
         style={{[m
           background:[m
[31m-            "linear-gradient(90deg, transparent, rgba(212,175,55,.8), rgba(255,215,0,.95), rgba(212,175,55,.8), transparent)",[m
[32m+[m[32m            "linear-gradient(90deg, transparent, rgba(212,175,55,.85), rgba(255,215,0,.95), rgba(212,175,55,.85), transparent)",[m
           boxShadow: "0 0 30px rgba(212,175,55,.35)",[m
         }}[m
       />[m
     </div>[m
   );[m
[31m-}[m
\ No newline at end of file[m
[32m+[m[32m}[m
[1mdiff --git a/src/components/LanguageSwitcher.jsx b/src/components/LanguageSwitcher.jsx[m
[1mindex daacb09..715eab4 100644[m
[1m--- a/src/components/LanguageSwitcher.jsx[m
[1m+++ b/src/components/LanguageSwitcher.jsx[m
[36m@@ -1,27 +1,27 @@[m
[31m-// src/components/LanguageSwitcher.jsx[m
 import { NavLink, useLocation, useParams } from "react-router-dom";[m
 import { LANGS } from "../lib/routes";[m
 [m
 export default function LanguageSwitcher() {[m
   const { lang } = useParams();[m
[31m-  const { pathname, search, hash } = useLocation();[m
[32m+[m[32m  const location = useLocation();[m
[32m+[m
   const current = LANGS.includes(lang) ? lang : "en";[m
 [m
[31m-  const buildTo = (nextLang) => {[m
[31m-    const safe = LANGS.includes(nextLang) ? nextLang : "en";[m
[31m-    const nextPath = pathname.replace(/^\/(en|ru|fr|am)(?=\/|$)/, `/${safe}`);[m
[31m-    return `${nextPath}${search}${hash}`;[m
[31m-  };[m
[32m+[m[32m  // /en/behind -> ["", "en", "behind"][m
[32m+[m[32m  const parts = location.pathname.split("/");[m
[32m+[m[32m  const rest = parts.slice(2).join("/"); // "behind" | "portfolio" | etc.[m
 [m
   return ([m
     <div className="flex items-center gap-3">[m
       {LANGS.map((l) => ([m
         <NavLink[m
           key={l}[m
[31m-          to={buildTo(l)}[m
[32m+[m[32m          to={`/${l}/${rest || "home"}`}[m
           className={[[m
             "text-[11px] tracking-[0.28em] uppercase transition",[m
[31m-            l === current ? "text-[#D4AF37]" : "text-white/40 hover:text-white/70",[m
[32m+[m[32m            l === current[m
[32m+[m[32m              ? "text-[#D4AF37]"[m
[32m+[m[32m              : "text-white/40 hover:text-white/70",[m
           ].join(" ")}[m
         >[m
           {l}[m
[1mdiff --git a/src/main.jsx b/src/main.jsx[m
[1mindex cd6dc62..a9bcc49 100644[m
[1m--- a/src/main.jsx[m
[1m+++ b/src/main.jsx[m
[36m@@ -1,5 +1,6 @@[m
 import React from "react";[m
 import ReactDOM from "react-dom/client";[m
[32m+[m[32mimport { BrowserRouter } from "react-router-dom";[m
 import App from "./App";[m
 import "./index.css";[m
 import ErrorBoundary from "./components/ErrorBoundary";[m
[36m@@ -15,15 +16,11 @@[m [mfunction checkBrowserCompatibility() {[m
   }[m
 [m
   if (!("IntersectionObserver" in window)) {[m
[31m-    console.warn([m
[31m-      "[BOOT] IntersectionObserver not supported. Animations may degrade."[m
[31m-    );[m
[32m+[m[32m    console.warn("[BOOT] IntersectionObserver not supported. Animations may degrade.");[m
   }[m
 [m
   if 