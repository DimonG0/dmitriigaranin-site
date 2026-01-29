import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LuxButton({ children, href, onClick, variant = "outline" }) {
  const common =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.28em] transition";
  const gold =
    "bg-[#D4AF37] text-black hover:bg-[#FFD700] shadow-[0_0_40px_rgba(212,175,55,0.22)]";
  const outline =
    "border border-[#D4AF37]/55 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]";

  const cls = `${common} ${variant === "gold" ? gold : outline}`;

  const content = (
    <motion.span
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href) return <Link className={cls} to={href}>{content}</Link>;
  return (
    <button className={cls} onClick={onClick} type="button">
      {content}
    </button>
  );
}
