import { motion } from "framer-motion";

export default function Section({ title, subtitle, children }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mb-6">
          {title && (
            <h1 className="text-3xl md:text-5xl font-light text-goldBright tracking-[0.06em]">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-3 max-w-2xl text-zinc-300 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        <div className="luxe-line mb-10" />
        {children}
      </motion.div>
    </section>
  );
}