"use client";
import { useMemo, useState } from "react";

type Tag = "Кино" | "Театр" | "Коммерция" | "Портрет";
type Item = { id: string; title: string; tag: Tag; src: string; alt: string };

const items: Item[] = [
  { id: "1", title: "Кино — кадр 01", tag: "Кино", src: "/p/film-01.jpg", alt: "Кинопортрет" },
  { id: "2", title: "Театр — кадр 01", tag: "Театр", src: "/p/theatre-01.jpg", alt: "Театральный образ" },
  { id: "3", title: "Коммерция — кадр 01", tag: "Коммерция", src: "/p/commercial-01.jpg", alt: "Коммерческий портрет" },
  { id: "4", title: "Портрет — кадр 01", tag: "Портрет", src: "/p/portrait-01.jpg", alt: "Портрет" },
];

const filters: (Tag | "Все")[] = ["Все", "Кино", "Театр", "Коммерция", "Портрет"];

export function Portfolio() {
  const [f, setF] = useState<(typeof filters)[number]>("Все");
  const shown = useMemo(() => (f === "Все" ? items : items.filter((i) => i.tag === f)), [f]);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((x) => (
          <button
            key={x}
            onClick={() => setF(x)}
            className={[
              "rounded-2xl px-3 py-2 text-sm border transition",
              x === f
                ? "border-white/20 bg-white/10 text-white"
                : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10",
            ].join(" ")}
            aria-pressed={x === f}
          >
            {x}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {shown.map((i) => (
          <figure
            key={i.id}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <img
              src={i.src}
              alt={i.alt}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <figcaption className="p-3">
              <p className="text-sm text-zinc-200">{i.title}</p>
              <p className="text-xs text-zinc-500">{i.tag}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        Файлы фото положи в <code className="rounded bg-white/10 px-1">public/p/</code>
      </p>
    </div>
  );
}
