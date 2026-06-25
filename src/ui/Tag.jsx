export default function Tag({ children }) {
  return (
    <span className="inline-flex max-w-full break-words rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] leading-4 tracking-[0.18em] uppercase text-white/70 md:tracking-[0.22em]">
      {children}
    </span>
  );
}
