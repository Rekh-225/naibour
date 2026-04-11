export default function HomePage() {
  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-light)] to-transparent pointer-events-none" />
        <div className="mx-auto max-w-3xl px-5 pt-24 pb-20 text-center relative">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5 text-[var(--fg)]">
            Turn what you have
            <br />
            <span className="text-[var(--primary)]">into what you need</span>
          </h1>
          <p className="text-lg text-[var(--fg-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Naibour is a community exchange where neighbours trade skills,
            goods, and services — no cash needed. An AI agent finds trades
            across the entire network that no one would discover alone.
          </p>
          <a href="/onboarding" className="btn-primary text-lg px-10 py-4 shadow-md">
            Join the community
          </a>
        </div>
      </section>

    </div>
  );
}
