import { Header } from "@/components/Header";
import { FadeIn } from "@/components/Motion";
import { Showreel } from "@/components/Showreel";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";

export default function Page() {
  return (
    <main className="min-h-dvh bg-zinc-950 text-zinc-100">
      <Header />

      <section id="home" className="mx-auto max-w-6xl px-4 pt-16">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Dmitrii Garanin
          </h1>
          <p className="mt-4 text-zinc-300 max-w-xl">
            Ultra-media сайт: шоу-рил, портфолио, резюме и контакт — без лишнего.
          </p>
        </FadeIn>
      </section>

      <section id="showreel" className="mx-auto max-w-6xl px-4 py-20">
        <FadeIn>
          <div className="flex items-end justify-between gap-4">
          <div>
          <h2 className="text-xl font-semibold">Шоурил</h2>
            <p className="mt-2 text-zinc-300">
              Видео + субтитры. Управление без лишнего.
            </p>
          </div>
          <a className="text-sm text-zinc-300 hover:text-white" href="/showreel.mp4">
            Скачать MP4
          </a>
          </div>
        <Showreel />
        </FadeIn>
      </section>

      <section id="portfolio" className="mx-auto max-w-6xl px-4 py-20">
        <FadeIn>
          <h2 className="text-xl font-semibold mb-6">Портфолио</h2>
          <Portfolio />
        </FadeIn>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 pb-24">
        <FadeIn>
          <h2 className="text-xl font-semibold mb-4">Контакты</h2>
          <Contact />
        </FadeIn>
      </section>
    </main>
  );
}
