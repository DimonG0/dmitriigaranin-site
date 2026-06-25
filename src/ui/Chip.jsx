export default function Chip({ children, dot = true }) {
  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] leading-4 tracking-[0.18em] uppercase text-white/70 backdrop-blur md:tracking-[0.22em]">
      {dot && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: "#D4AF37", boxShadow: "0 0 14px rgba(212,175,55,.55)" }}
        />
      )}
      {children}
    </span>
  );
}
