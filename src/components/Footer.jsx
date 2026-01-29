export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-xs tracking-[0.28em] text-white/60">
            © {new Date().getFullYear()} DMITRII GARANIN — ALL RIGHTS RESERVED
          </div>
          <div className="text-xs tracking-[0.28em]">
            <a className="text-[#D4AF37] hover:text-[#FFD700]" href="mailto:hello@dmitriigaranin.com">
              HELLO@DMITRIIGARANIN.COM
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
