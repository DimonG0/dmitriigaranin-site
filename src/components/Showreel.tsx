"use client";

export function Showreel() {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-black">
      <video
        className="w-full"
        controls
        playsInline
        preload="metadata"
        poster="/showreel-poster.jpg"
      >
        <source src="/showreel.mp4" type="video/mp4" />
        <track
          kind="subtitles"
          srcLang="ru"
          src="/showreel-ru.vtt"
          label="Русские субтитры"
          default
        />
      </video>
    </div>
  );
}
