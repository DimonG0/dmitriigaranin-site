"use client";

export function Contact() {
  return (
    <section className="relative mx-auto max-w-xl px-6 py-16 text-white">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="text-xs tracking-[0.35em] uppercase text-white/50">
          Contact
        </div>
        <h1 className="mt-4 text-[28px] font-semibold tracking-[-0.02em]">
          Private inquiries
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/65">
          For professional inquiries, castings, collaborations and international projects.
        </p>
      </div>

      {/* Form */}
      <!-- modify this form HTML and place wherever you want your form -->
      <form
      action="https://formspree.io/f/xlgldkbd"
      method="POST">
        <label>
          Your email:
          <input type="email" name="email">
        </label>
        <label>
          Your message:
            <textarea name="message"></textarea>
        </label>
      <!-- your other form fields go here -->
          <button type="submit">Send</button>
      </form>

        <textarea
          placeholder="Your message"
          className="
            w-full min-h-[140px] rounded-2xl
            bg-white/[0.04]
            border border-white/10
            px-5 py-4
            text-sm text-white
            placeholder:text-white/40
            focus:outline-none
            focus:border-[#D4AF37]/60
            focus:ring-1 focus:ring-[#D4AF37]/40
            transition"/>
        

    <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300 }}
      <button
          type="submit"
          className="
            mt-4 inline-flex items-center justify-center
            rounded-full
            border border-[#D4AF37]/40
            bg-[#D4AF37]/10
            px-8 py-4
            text-xs font-semibold
            tracking-[0.3em] uppercase
            text-[#f7e7b2]
            hover:bg-[#D4AF37]/15
            hover:border-[#FFD700]/70
            transition">
          Send request
      </button>
      </motion.button>
    </form>

      {/* Footer note */}
      <div className="mt-8 text-center text-[11px] tracking-[0.22em] uppercase text-white/40">
        EU / International
      </div>
    </section>
  );
}
