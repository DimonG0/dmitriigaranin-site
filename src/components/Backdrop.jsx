// src/components/Backdrop.jsx
import { motion } from "framer-motion";

const glowPulse = {
  initial: { opacity: 0.35 },
  animate: { opacity: [0.22, 0.55, 0.22], transition: { duration: 7, repeat: Infinity, ease: "easeInOut" } },
};

export default function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(1200px 700px at 20% 10%, rgba(212,175,55,0.12), transparent 60%), radial-gradient(1000px 650px at 85% 25%, rgba(200,200,200,0.08), transparent 58%)",
        }}
      />
      <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[#D4AF37]/10 blur-[90px]" />
      <div className="absolute -right-44 top-20 h-[520px] w-[520px] rounded-full bg-[#FFD700]/10 blur-[90px]" />
      <motion.div
        className="absolute left-1/2 top-0 h-[2px] w-[1200px] -translate-x-1/2"
        variants={glowPulse}
        initial="initial"
        animate="animate"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,.8), rgba(255,215,0,.95), rgba(212,175,55,.8), transparent)",
          boxShadow: "0 0 30px rgba(212,175,55,.35)",
        }}
      />
    </div>
  );
}