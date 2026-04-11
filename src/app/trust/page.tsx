export default function TrustPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="pill bg-[var(--warm-light)] text-[var(--warm)] mb-4 mx-auto w-fit">
          ★ Trust system
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          How trust works on Naibour
        </h1>
        <p className="text-lg text-[var(--fg-secondary)] max-w-xl mx-auto leading-relaxed">
          When you trade skills instead of cash, trust is everything. Your trust
          score tells neighbours how reliable you are — and unlocks better
          trade opportunities.
        </p>
      </div>

      {/* Score Breakdown */}
      <div className="card p-6 mb-8">
        <h2 className="font-semibold text-lg mb-4">Your trust score at a glance</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-[var(--warm-light)] flex items-center justify-center">
            <span className="text-3xl font-bold text-[var(--warm)]">4.7</span>
          </div>
          <div className="flex-1">
            <div className="text-sm text-[var(--fg-secondary)] mb-2">Example score breakdown</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex-1 h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                  <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: "100%" }} />
                </div>
                <span className="text-xs text-[var(--fg-secondary)] w-24">KYC verified</span>
                <span className="text-xs font-semibold w-8 text-right">+2.0</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex-1 h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                  <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: "75%" }} />
                </div>
                <span className="text-xs text-[var(--fg-secondary)] w-24">LinkedIn linked</span>
                <span className="text-xs font-semibold w-8 text-right">+1.5</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex-1 h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                  <div className="h-full rounded-full bg-[var(--warm)]" style={{ width: "50%" }} />
                </div>
                <span className="text-xs text-[var(--fg-secondary)] w-24">Trade history</span>
                <span className="text-xs font-semibold w-8 text-right">+1.2</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-[var(--muted)]">
          Scores range from 0.0 to 5.0. Higher scores mean more people want to trade with you,
          and the AI prioritises high-trust neighbours when building trade rings.
        </p>
      </div>

      {/* Three methods */}
      <h2 className="font-semibold text-lg mb-5">Three ways to build trust</h2>

      {/* 1. KYC */}
      <div className="card p-6 mb-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center text-xl shrink-0">
            🪪
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">1. Identity verification (KYC)</h3>
              <span className="pill bg-[var(--accent-light)] text-[var(--accent)]">+2.0 trust</span>
            </div>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-3">
              Prove who you are with a quick identity check. We verify your
              government-issued ID to confirm you are a real person. This is the
              strongest trust signal — it tells your neighbours they are dealing
              with a verified individual.
            </p>
            <div className="rounded-xl bg-[var(--bg-secondary)] p-4 text-sm space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-0.5">✓</span>
                <span className="text-[var(--fg-secondary)]">Upload a photo of your ID or passport</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-0.5">✓</span>
                <span className="text-[var(--fg-secondary)]">Quick selfie verification to match your face</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-0.5">✓</span>
                <span className="text-[var(--fg-secondary)]">Verified badge appears on your profile and listings</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--muted)] mt-0.5">🔒</span>
                <span className="text-[var(--fg-secondary)]">Your data is encrypted and never shared with other users</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Social */}
      <div className="card p-6 mb-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--primary-light)] flex items-center justify-center text-xl shrink-0">
            🔗
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">2. Social verification</h3>
              <span className="pill bg-[var(--primary-light)] text-[var(--primary)]">+1.5 trust</span>
            </div>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-3">
              Link your professional and social media accounts to demonstrate
              your online history. A long-standing LinkedIn profile or active
              social presence tells neighbours you are an established,
              accountable person.
            </p>
            <div className="rounded-xl bg-[var(--bg-secondary)] p-4 text-sm space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[var(--primary)] mt-0.5">✓</span>
                <span className="text-[var(--fg-secondary)]">Connect your LinkedIn to verify professional history</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--primary)] mt-0.5">✓</span>
                <span className="text-[var(--fg-secondary)]">Link other social accounts (Facebook, Instagram, etc.)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--primary)] mt-0.5">✓</span>
                <span className="text-[var(--fg-secondary)]">Longer account history and more connections = higher boost</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--muted)] mt-0.5">🔒</span>
                <span className="text-[var(--fg-secondary)]">We only verify account ownership — we never post on your behalf</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Trust Deposit */}
      <div className="card p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--warm-light)] flex items-center justify-center text-xl shrink-0">
            🏦
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">3. Trust deposit</h3>
              <span className="pill bg-[var(--warm-light)] text-[var(--warm)]">+2.5 trust</span>
            </div>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-3">
              Put your money where your word is. A trust deposit acts as
              collateral — it signals to your neighbours that you are committed
              to following through on your trades. Think of it as a security
              deposit for trust.
            </p>
            <div className="rounded-xl bg-[var(--bg-secondary)] p-4 text-sm space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[var(--warm)] mt-0.5">✓</span>
                <span className="text-[var(--fg-secondary)]">Deposit any amount you are comfortable with</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--warm)] mt-0.5">✓</span>
                <span className="text-[var(--fg-secondary)]">Higher deposits unlock higher trust tiers and priority matching</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--warm)] mt-0.5">✓</span>
                <span className="text-[var(--fg-secondary)]">Fully refundable — withdraw anytime after completing trades</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--warm)] mt-0.5">✓</span>
                <span className="text-[var(--fg-secondary)]">If a trade goes wrong, the deposit protects the other party</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[var(--warm)]/20 bg-[var(--warm-light)] p-4">
              <div className="flex items-start gap-2">
                <span className="text-lg">💡</span>
                <div className="text-sm">
                  <span className="font-semibold text-[var(--fg)]">How it works: </span>
                  <span className="text-[var(--fg-secondary)]">
                    Your deposit is held securely and acts as a guarantee. When you
                    successfully complete trades, your trust score grows and you can
                    withdraw your deposit. If you fail to deliver on a trade, the
                    affected neighbour can claim from the deposit — keeping the
                    community fair for everyone.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How score is used */}
      <div className="card p-6 mb-8">
        <h2 className="font-semibold text-lg mb-4">How your trust score is used</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl bg-[var(--bg-secondary)] p-4">
            <div className="font-semibold mb-1">🤖 AI matching priority</div>
            <p className="text-[var(--fg-secondary)]">
              The heartbeat algorithm prioritises high-trust neighbours when
              building trade rings, giving you access to better matches.
            </p>
          </div>
          <div className="rounded-xl bg-[var(--bg-secondary)] p-4">
            <div className="font-semibold mb-1">👀 Visibility boost</div>
            <p className="text-[var(--fg-secondary)]">
              Higher trust scores make your listings appear more prominently
              in the marketplace, attracting more trade opportunities.
            </p>
          </div>
          <div className="rounded-xl bg-[var(--bg-secondary)] p-4">
            <div className="font-semibold mb-1">🔓 Unlock trade types</div>
            <p className="text-[var(--fg-secondary)]">
              Some high-value trades require a minimum trust score to
              participate, protecting all parties involved.
            </p>
          </div>
          <div className="rounded-xl bg-[var(--bg-secondary)] p-4">
            <div className="font-semibold mb-1">⭐ Community standing</div>
            <p className="text-[var(--fg-secondary)]">
              Your score is visible on your profile and every listing.
              Build trust once, benefit everywhere.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="card p-8 text-center bg-gradient-to-br from-[var(--warm-light)] to-white">
        <h2 className="text-xl font-bold mb-2">Start building your trust score</h2>
        <p className="text-sm text-[var(--fg-secondary)] mb-5 max-w-md mx-auto">
          The more trust you build, the more your neighbours want to trade with
          you. Begin with identity verification — it takes less than two minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/post" className="btn-primary">
            Create your first post
          </a>
          <a href="/marketplace" className="btn-secondary">
            Browse marketplace
          </a>
        </div>
      </div>
    </div>
  );
}
