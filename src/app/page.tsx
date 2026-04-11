export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-light)] to-transparent pointer-events-none" />
        <div className="mx-auto max-w-3xl px-5 pt-20 pb-16 text-center relative">
          <div className="pill bg-[var(--primary-light)] text-[var(--primary)] mb-6 mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] heartbeat-pulse inline-block" />
            Budapest community exchange
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5 text-[var(--fg)]">
            Turn what you have
            <br />
            <span className="text-[var(--primary)]">into what you need</span>
          </h1>
          <p className="text-lg text-[var(--fg-secondary)] max-w-xl mx-auto mb-8 leading-relaxed">
            A Budapest community exchange where neighbours trade skills, not cash.
            Trade directly, make barter offers, or let our AI discover multi-party
            trade rings every morning at 6 AM.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/onboarding" className="btn-primary text-base px-8 py-3">
              Join &amp; share what you offer
            </a>
            <a href="/marketplace" className="btn-secondary text-base">
              Browse marketplace
            </a>
          </div>
        </div>
      </section>

      {/* 3 Trade Modes */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="text-2xl font-bold text-center mb-3">Three ways to trade</h2>
        <p className="text-[var(--fg-secondary)] text-center mb-10 max-w-lg mx-auto">
          From instant swaps to AI-discovered multi-party rings — pick what works for you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="card p-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--success-light)] flex items-center justify-center text-lg mb-4">
              ⚡
            </div>
            <h3 className="font-semibold mb-1.5">Direct swap</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-3">
              See an offer that matches your need? Accept it instantly — no negotiation needed.
            </p>
            <span className="pill bg-[var(--success-light)] text-[var(--success)]">Instant</span>
          </div>
          <div className="card p-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--warm-light)] flex items-center justify-center text-lg mb-4">
              🤝
            </div>
            <h3 className="font-semibold mb-1.5">Barter offer</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-3">
              Propose a counter-offer on any listing. The other person can accept or decline.
            </p>
            <span className="pill bg-[var(--warm-light)] text-[var(--warm)]">Negotiable</span>
          </div>
          <div className="card p-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] flex items-center justify-center text-lg mb-4">
              🔄
            </div>
            <h3 className="font-semibold mb-1.5">Multi-party ring</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-3">
              Every morning at 6 AM, our AI scans all posts and finds trade rings where everyone gets what they need.
            </p>
            <span className="pill bg-[var(--primary-light)] text-[var(--primary)]">6 AM heartbeat</span>
          </div>
        </div>
      </section>

      {/* Example Ring */}
      <section className="mx-auto max-w-3xl px-5 py-16">
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

            <text x="250" y="35" textAnchor="middle" fill="var(--primary)" fontSize="9" fontWeight="500">walks dog →</text>
            <text x="340" y="135" textAnchor="middle" fill="var(--accent)" fontSize="9" fontWeight="500">does taxes →</text>
            <text x="165" y="135" textAnchor="middle" fill="var(--warm)" fontSize="9" fontWeight="500">← tutors</text>
          </svg>

          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-xl bg-[var(--bg-secondary)] p-3">
              <div className="font-semibold text-sm">Anna</div>
              <div className="text-[var(--fg-secondary)] text-xs mt-0.5">Needs tax help</div>
              <div className="text-[var(--primary)] text-xs">Offers dog walking</div>
            </div>
            <div className="rounded-xl bg-[var(--bg-secondary)] p-3">
              <div className="font-semibold text-sm">Bence</div>
              <div className="text-[var(--fg-secondary)] text-xs mt-0.5">Needs dog walking</div>
              <div className="text-[var(--accent)] text-xs">Offers tax help</div>
            </div>
            <div className="rounded-xl bg-[var(--bg-secondary)] p-3">
              <div className="font-semibold text-sm">Clara</div>
              <div className="text-[var(--fg-secondary)] text-xs mt-0.5">Needs cleaning</div>
              <div className="text-[var(--warm)] text-xs">Offers tutoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Score */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-3">Built on trust</h2>
          <p className="text-[var(--fg-secondary)] max-w-lg mx-auto">
            Every neighbour has a trust score. The higher your score, the more
            trade opportunities you unlock. Three ways to build it.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center text-xl mx-auto mb-4">
              🪪
            </div>
            <h3 className="font-semibold mb-1.5">Identity verification</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-3">
              Complete a quick KYC flow to prove who you are. Verified
              neighbours get a badge and a trust boost.
            </p>
            <span className="pill bg-[var(--accent-light)] text-[var(--accent)]">+2.0 trust</span>
          </div>
          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[var(--primary-light)] flex items-center justify-center text-xl mx-auto mb-4">
              🔗
            </div>
            <h3 className="font-semibold mb-1.5">Social verification</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-3">
              Link your LinkedIn or other social accounts to prove your online
              history and professional reputation.
            </p>
            <span className="pill bg-[var(--primary-light)] text-[var(--primary)]">+1.5 trust</span>
          </div>
          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[var(--warm-light)] flex items-center justify-center text-xl mx-auto mb-4">
              🏦
            </div>
            <h3 className="font-semibold mb-1.5">Trust deposit</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-3">
              Place a refundable deposit as collateral. It guarantees you follow
              through — and you get it back after successful trades.
            </p>
            <span className="pill bg-[var(--warm-light)] text-[var(--warm)]">+2.5 trust</span>
          </div>
        </div>
        <div className="text-center mt-6">
          <a href="/trust" className="text-sm text-[var(--primary)] hover:underline font-medium">
            Learn more about how trust works →
          </a>
        </div>
      </section>

      {/* Community Stats */}
      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "15", label: "Active neighbours", icon: "👥" },
            { value: "23", label: "Skills shared", icon: "🎯" },
            { value: "06:00", label: "Next heartbeat", icon: "💓" },
            { value: "Budapest", label: "Our city", icon: "🏛️" },
          ].map((s) => (
            <div key={s.label} className="card p-5 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-[var(--fg-secondary)] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <div className="card p-10 bg-gradient-to-br from-[var(--primary-light)] to-white">
          <h2 className="text-2xl font-bold mb-2">Turn what you have into what you need</h2>
          <p className="text-[var(--fg-secondary)] mb-6 max-w-md mx-auto">
            Everyone has something to offer. Post your skills and let your neighbours — and our AI — do the rest.
          </p>
          <a href="/post" className="btn-primary text-base px-8 py-3">
            Create your first post
          </a>
        </div>
      </section>
    </div>
  );
}
