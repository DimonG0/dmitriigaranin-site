"use client";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-zinc-950/70">
      <div className="mx-auto max-w-6xl px-4 py-3 flex justify-between items-center">
        <a href="#home" className="font-medium">DG</a>
        <nav className="flex gap-6 text-sm text-zinc-300">
          <a href="#home" className="hover:text-white">Главная</a>
          <a href="#portfolio" className="hover:text-white">Портфолио</a>
          <a href="#contact" className="hover:text-white">Контакты</a>
        </nav>
      </div>
    </header>
  );
}
