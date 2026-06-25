import { GOLD, GOLD_GLOW } from "../ui/tokens";

export default function Badge({ children, subtle = false }) {
  return (
    <span
      className={[
        "inline-flex max-w-full items-center break-words rounded-full px-3 py-1",
        "text-[11px] leading-4 tracking-[0.18em] uppercase md:tracking-[0.24em]",
        "border backdrop-blur",
        subtle
          ? "border-white/10 bg-white/5 text-white/70"
          : "border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#FFD700]",
      ].join(" ")}
      style={
        subtle ? undefined : { boxShadow: `0 0 22px ${GOLD_GLOW}` }
      }
    >
      {children}
    </span>
  );
}
