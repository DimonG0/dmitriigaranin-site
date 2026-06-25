export default function SectionTitle({ over, title, desc }) {
  return (
    <div>
      {over && (
        <div className="break-words text-[11px] leading-5 tracking-[0.22em] uppercase text-white/55 md:tracking-[0.35em]">
          {over}
        </div>
      )}

      <h2 className="mt-2 break-words text-[22px] font-[900] leading-tight md:text-[28px]">
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #ffffff 0%, #f6e6a7 22%, #D4AF37 55%, #ffffff 100%)",
          }}
        >
          {title}
        </span>
      </h2>

      {desc && (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
          {desc}
        </p>
      )}
    </div>
  );
}
