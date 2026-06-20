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
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* RADIALS */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(1200px 700px at 18% 12%, rgba(212,175,55,0.14), transparent 60%), radial-gradient(1000px 650px at 86% 24%, rgba(200,200,200,0.10), transparent 58%), radial-gradient(1200px 800px at 50% 92%, rgba(255,215,0,0.08), transparent 62%)",
        }}
      />

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
    </div>
  );
}
