import { motion } from "framer-motion";
import GoldScene from "../../../components/GoldScene";
import LuxButton from "../../../components/LuxButton";

export default function EnHome() {
  return (
    <div className="relative overflow-hidden">
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_20%,rgba(212,175,55,0.12),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(255,215,0,0.08),transparent_60%),radial-gradient(1100px_circle_at_50%_110%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.92))]" />
        <div className="absolute -top-40 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
      </div>

      {/* 3D gold */}
      <div className="absolute inset-x-0 top-0 h-[520px] opacity-70">
        <GoldScene />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-16">
        <section className="relative grid min-h-[78vh] items-end pb-14 md:pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[11px] tracking-[0.35em] text-white/70 uppercase">
                International Portfolio • Luxury Presentation
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.12, ease: "easeOut" }}
              className="mt-6 font-[serif] text-4xl leading-[1.08] tracking-tight md:text-6xl"
            >
              <span className="text-white">Dmitrii</span>{" "}
              <span className="text-[#D4AF37] drop-shadow-[0_0_25px_rgba(212,175,55,0.25)]">Garanin</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.22, ease: "easeOut" }}
              className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg"
            >
              Actor • Creative • IT. A clean, cinematic, black-gold identity designed for international casting,
              premium brands and high-end collaborations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.32, ease: "easeOut" }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <LuxButton href="/en/portfolio" variant="gold">
                View Portfolio
              </LuxButton>
              <LuxButton href="/en/about" variant="outline">
                About Me
              </LuxButton>
              <LuxButton href="/en/contact" variant="outline">
                Contact
              </LuxButton>
            </motion.div>

            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {[
                { k: "Languages", v: "EN / RU / FR / HY" },
                { k: "Style", v: "Luxury • Noir • Gold" },
                { k: "Focus", v: "Showreel • Brands • Tech" },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur"
                >
                  <div className="text-[11px] tracking-[0.35em] text-white/50 uppercase">{x.k}</div>
                  <div className="mt-2 text-sm tracking-wide text-white/85">{x.v}</div>
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

