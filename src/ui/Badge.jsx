export default function Badge({ children, subtle = false }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] tracking-[0.24em] uppercase backdrop-blur",
        subtle
          ? "border-white/10 bg-white/5 text-white/70"
          : "border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#FFD700]",
      ].join(" ")}
      style={
        subtle
          ? undefined
          : { boxShadow: "0 0 22px rgba(212,175,55,.10)" }
      }
    >
      {children}
    </span>
  );
}
