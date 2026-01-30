"use client";

export function Contact() {
  return (
    <form className="max-w-md grid gap-3">
      <input
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
        placeholder="Email"
      />
      <textarea
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-h-[120px]"
        placeholder="Сообщение"
      />
      <button className="rounded-xl bg-white/10 py-3 hover:bg-white/15 transition">
        Отправить
      </button>
    </form>
  );
}
