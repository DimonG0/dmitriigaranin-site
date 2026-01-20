import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: {
    default: "DG project — Dmitrii Garanin",
    template: "%s — DG project",
  },
  description:
    "International portfolio: showreel, acting & creative work, IT projects, CV and contacts.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
