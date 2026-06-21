import { motion as Motion } from "framer-motion";

const shimmer = {
  initial: { opacity: 0.18 },
  animate: {
    opacity: [0.12, 0.42, 0.12],
    transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030303]">
      {/* NOIR SURFACE */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.035), transparent 18%, rgba(212,175,55,0.035) 52%, transparent 88%), linear-gradient(118deg, transparent 0%, transparent 30%, rgba(212,175,55,0.09) 44%, transparent 58%, transparent 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 128px)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 96px)",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/80 to-transparent" />

      {/* TOP GOLD LINE */}
      <Motion.div
        className="absolute left-1/2 top-0 h-[2px] w-[1200px] -translate-x-1/2"
        variants={shimmer}
        initial="initial"
        animate="animate"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,.85), rgba(255,215,0,.95), rgba(212,175,55,.85), transparent)",
          boxShadow: "0 0 30px rgba(212,175,55,.35)",
        }}
      />

      <Motion.div
        className="absolute bottom-[18%] left-1/2 h-px w-[80vw] -translate-x-1/2"
        variants={shimmer}
        initial="initial"
        animate="animate"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,.18), rgba(212,175,55,.42), rgba(255,255,255,.18), transparent)",
        }}
      />
    </div>
  );
}
