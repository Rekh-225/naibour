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

      {/* ── What you get ────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">What Naibour gives you</h2>
          <p className="text-[var(--fg-secondary)] max-w-lg mx-auto">
            Post what you have, post what you need. The platform does the rest.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="card p-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] flex items-center justify-center text-lg mb-4">
              🤖
            </div>
            <h3 className="font-semibold mb-1.5">AI-powered matching</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
              Every morning at 6 AM, our AI scans all posts and discovers multi-party
              trade rings where everyone gives and everyone receives.
            </p>
          </div>
          <div className="card p-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] flex items-center justify-center text-lg mb-4">
              🔄
            </div>
            <h3 className="font-semibold mb-1.5">Three ways to trade</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
              Accept a direct swap instantly, propose a barter counter-offer,
              or let the AI find a multi-party ring that connects you.
            </p>
          </div>
          <div className="card p-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--warm-light)] flex items-center justify-center text-lg mb-4">
              �️
            </div>
            <h3 className="font-semibold mb-1.5">Trust built in</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
              Every participant has a trust score based on ID verification,
              social proof, and a card authorization hold. Real accountability.
            </p>
          </div>
        </div>
      </section>

      {/* ── How a trade ring works ──────────────────────────── */}
      <section className="bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <div className="card p-8">
            <div className="text-center mb-6">
              <h3 className="font-semibold text-lg mb-1">How a trade ring works</h3>
              <p className="text-sm text-[var(--fg-secondary)]">
                Nobody swaps directly — the AI connects a chain where everyone wins.
              </p>
            </div>
            <svg viewBox="0 0 500 220" className="w-full max-w-md mx-auto mb-6">
              <line x1="120" y1="55" x2="380" y2="55" stroke="var(--primary)" strokeWidth="2" opacity="0.3" className="ring-line" />
              <line x1="380" y1="55" x2="250" y2="185" stroke="var(--primary)" strokeWidth="2" opacity="0.3" className="ring-line" />
              <line x1="250" y1="185" x2="120" y2="55" stroke="var(--primary)" strokeWidth="2" opacity="0.3" className="ring-line" />

              <circle cx="120" cy="55" r="28" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2" />
              <text x="120" y="52" textAnchor="middle" fill="var(--fg)" fontSize="11" fontWeight="600">Anna</text>
              <text x="120" y="65" textAnchor="middle" fill="var(--muted)" fontSize="8">★ 4.2</text>

              <circle cx="380" cy="55" r="28" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="2" />
              <text x="380" y="52" textAnchor="middle" fill="var(--fg)" fontSize="11" fontWeight="600">Bence</text>
              <text x="380" y="65" textAnchor="middle" fill="var(--muted)" fontSize="8">★ 4.8</text>

              <circle cx="250" cy="185" r="28" fill="var(--warm-light)" stroke="var(--warm)" strokeWidth="2" />
              <text x="250" y="182" textAnchor="middle" fill="var(--fg)" fontSize="11" fontWeight="600">Clara</text>
              <text x="250" y="195" textAnchor="middle" fill="var(--muted)" fontSize="8">★ 4.5</text>

              <text x="250" y="35" textAnchor="middle" fill="var(--primary)" fontSize="9" fontWeight="500">tutors math →</text>
              <text x="340" y="135" textAnchor="middle" fill="var(--accent)" fontSize="9" fontWeight="500">walks dog →</text>
              <text x="165" y="135" textAnchor="middle" fill="var(--warm)" fontSize="9" fontWeight="500">← does taxes</text>
            </svg>

            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-xl bg-[var(--bg-secondary)] p-3">
                <div className="font-semibold text-sm">Anna</div>
                <div className="text-[var(--fg-secondary)] text-xs mt-0.5">Needs tax help</div>
                <div className="text-[var(--primary)] text-xs">Offers math tutoring</div>
              </div>
              <div className="rounded-xl bg-[var(--bg-secondary)] p-3">
                <div className="font-semibold text-sm">Bence</div>
                <div className="text-[var(--fg-secondary)] text-xs mt-0.5">Needs math tutoring</div>
                <div className="text-[var(--accent)] text-xs">Offers dog walking</div>
              </div>
              <div className="rounded-xl bg-[var(--bg-secondary)] p-3">
                <div className="font-semibold text-sm">Clara</div>
                <div className="text-[var(--fg-secondary)] text-xs mt-0.5">Needs dog walking</div>
                <div className="text-[var(--warm)] text-xs">Offers tax help</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who it's for ────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Who is Naibour for?</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "👤", label: "Individuals", desc: "Trade skills, time, personal services" },
            { icon: "💼", label: "Freelancers", desc: "Fill project gaps with barter" },
            { icon: "🏪", label: "Small businesses", desc: "Move excess inventory and capacity" },
            { icon: "�", label: "Service providers", desc: "Find clients without cash fees" },
          ].map((p) => (
            <div key={p.label} className="card p-5 text-center">
              <div className="text-2xl mb-2">{p.icon}</div>
              <div className="font-semibold text-sm mb-1">{p.label}</div>
              <div className="text-xs text-[var(--fg-secondary)]">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Single CTA ──────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <div className="card p-12 sm:p-16 bg-gradient-to-br from-[var(--primary-light)] to-white ring-glow">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Turn what you have
            <br />
            <span className="text-[var(--primary)]">into what you need</span>
          </h2>
          <p className="text-[var(--fg-secondary)] mb-8 max-w-md mx-auto leading-relaxed">
            Everyone has something to offer. Join the community, post what you
            have, and let the AI and your neighbours do the rest.
          </p>
          <a href="/onboarding" className="btn-primary text-lg px-10 py-4 shadow-md">
            Join the community
          </a>
          <div className="mt-4">
            <a href="/about" className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
              Learn how it works →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
