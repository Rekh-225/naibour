export default function AboutPage() {
  const faq = [
    {
      q: "Why not just use Craigslist or Facebook groups?",
      a: "They are passive listing boards. You have to find a 1:1 match yourself. Naibour finds multi-party trade paths no human would discover.",
    },
    {
      q: "What if someone no-shows or fails to deliver?",
      a: "Card authorization holds create real financial accountability. Default = you lose the hold and take a trust score hit.",
    },
    {
      q: "How does the trust score work?",
      a: "Weighted score across three pillars: KYC (up to 2.0), social reputation (up to 1.5), and card auth hold (up to 4.0). Max 7.5.",
    },
    {
      q: "Can I stay anonymous at first?",
      a: "Yes. Display name only. Full identity is revealed progressively, only after both parties accept a trade.",
    },
    {
      q: "Why use an auth hold instead of escrow from day one?",
      a: "Escrow requires licensing. Auth holds reserve funds without Naibour taking custody. Same accountability, less compliance burden.",
    },
    {
      q: "Is Naibour only for individuals?",
      a: "No. Businesses participate too. A wine shop with excess stock, a consultancy with spare hours. All value is treated equally.",
    },
    {
      q: "What kinds of goods and services work best?",
      a: "Services, physical goods, professional capacity, time-based offerings. Anything with real value that someone else needs.",
    },
    {
      q: "Can Naibour use listings from other marketplaces?",
      a: "Yes, through API integrations and listing normalization. The goal is to coordinate fragmented supply and demand.",
    },
    {
      q: "How does the AI actually find matches?",
      a: "NLP parses input into structured data. A compatibility graph is built. DFS cycle detection finds trade rings of 2-4 participants, ranked by confidence and trust.",
    },
    {
      q: "What happens after the 7-day hold expires?",
      a: "The user re-authorizes. Standard limitation, clearly communicated.",
    },
    {
      q: "How might Naibour make money in the future?",
      a: "Transaction fees, premium business tiers, priority matching, enterprise integrations. Monetization follows value.",
    },
    {
      q: "Can businesses participate?",
      a: "Yes. Businesses with excess inventory, spare capacity, or service hours participate the same as individuals.",
    },
  ];

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════════
          2. THE PROBLEM
          ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">The problem</h2>
          <p className="text-lg text-[var(--fg)] max-w-2xl mx-auto font-medium">
            People waste money and time, because they can&apos;t turn unused items and services into value.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="card p-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--danger-light)] flex items-center justify-center text-lg mb-4">
              🔒
            </div>
            <h3 className="font-semibold mb-2">No direct match</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
              You offer dog walking, you need tax help. The accountant doesn&apos;t need a dog walker. Trade dead.
            </p>
          </div>
          <div className="card p-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--warm-light)] flex items-center justify-center text-lg mb-4">
              📋
            </div>
            <h3 className="font-semibold mb-2">Passive listings</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
              Facebook Marketplace and Craigslist show you what exists. They don&apos;t connect the dots across people.
            </p>
          </div>
          <div className="card p-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] flex items-center justify-center text-lg mb-4">
              🏢
            </div>
            <h3 className="font-semibold mb-2">Value sits idle</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
              Excess inventory, spare capacity, unused skills. Real value with no way to deploy it.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. HOW NAIBOUR WORKS
          ═══════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">The solution: Naibour</h2>
            <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
              AI finds multi-party trades across your entire neighbourhood. Six steps, fully automated.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { step: "01", title: "Post in plain English", desc: "Say what you need and what you offer. No forms, no categories.", color: "primary" },
              { step: "02", title: "AI parses your input", desc: "NLP extracts skills, categories, and confidence from free text.", color: "accent" },
              { step: "03", title: "Score every connection", desc: "Each offer is scored against every need: taxonomy, semantics, trust, AI refinement.", color: "warm" },
              { step: "04", title: "Build the graph", desc: "A directed weighted graph links all participants. Each edge is a viable offer-to-need match.", color: "primary" },
              { step: "05", title: "Find the rings", desc: "DFS cycle detection finds trade rings of 2-4 people where everyone gives and everyone receives.", color: "accent" },
              { step: "06", title: "Propose and execute", desc: "Top rings are proposed. All participants must accept. Decline triggers re-search.", color: "warm" },
            ].map((s) => (
              <div key={s.step} className="card p-6">
                <div className={`text-xs font-bold text-[var(--${s.color})] mb-3`}>{s.step}</div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5. INTERACTION MODES
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Three ways to trade</h2>
            <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
              Direct swaps, barter offers, or AI-discovered multi-party rings.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="card p-6">
              <div className="w-10 h-10 rounded-xl bg-[var(--success-light)] flex items-center justify-center text-lg mb-4">⚡</div>
              <h3 className="font-semibold mb-1.5">Direct swap</h3>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-3">
                See a match? Accept instantly. Both sides defined upfront.
              </p>
              <span className="pill bg-[var(--success-light)] text-[var(--success)]">Instant</span>
            </div>
            <div className="card p-6">
              <div className="w-10 h-10 rounded-xl bg-[var(--warm-light)] flex items-center justify-center text-lg mb-4">🤝</div>
              <h3 className="font-semibold mb-1.5">Barter offer</h3>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-3">
                Propose a counter-offer on any listing. They review, they decide.
              </p>
              <span className="pill bg-[var(--warm-light)] text-[var(--warm)]">Negotiable</span>
            </div>
            <div className="card ring-glow p-6 border-[var(--primary)] border-2">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] flex items-center justify-center text-lg mb-4">🔄</div>
              <h3 className="font-semibold mb-1.5">Multi-party trade ring</h3>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-3">
                Every morning at 6 AM, the AI finds cycles where everyone gives and everyone receives.
              </p>
              <span className="pill bg-[var(--primary-light)] text-[var(--primary)]">AI-discovered</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          6. MARKETPLACE PARTICIPANTS
          ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Who participates</h2>
          <p className="text-[var(--fg-secondary)] max-w-2xl mx-auto">
            Anyone with underused value. Individuals, freelancers, and businesses alike.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { icon: "👤", label: "Individuals", desc: "Skills, time, personal services" },
            { icon: "💼", label: "Freelancers", desc: "Spare capacity, project gaps" },
            { icon: "🔧", label: "Service providers", desc: "Local trades, repairs, lessons" },
            { icon: "🏪", label: "Small businesses", desc: "Excess inventory, idle capacity" },
            { icon: "📦", label: "Enterprise surplus", desc: "Overstock, unused service hours" },
          ].map((p) => (
            <div key={p.label} className="card p-5 text-center">
              <div className="text-2xl mb-2">{p.icon}</div>
              <div className="font-semibold text-sm mb-1">{p.label}</div>
              <div className="text-xs text-[var(--fg-secondary)]">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          7. BEYOND NATIVE LISTINGS
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Beyond native listings</h2>
            <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
              Aggregate fragmented supply and demand from across the web.
            </p>
          </div>
          <div className="card p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { title: "Public listing ingestion", desc: "Normalize and index relevant listings from fragmented environments where technically and operationally appropriate." },
                { title: "Marketplace aggregation", desc: "Aggregate supply and demand signals across sources like classified sites, community boards, and marketplace platforms." },
                { title: "Listing normalization", desc: "Standardize unstructured listings into Naibour's schema so they can participate in graph-based matching." },
                { title: "Partner and API integration", desc: "Where available, integrate through official APIs and partnership agreements rather than unilateral data collection." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl bg-[var(--bg-secondary)] p-4">
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-[var(--fg-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          8. TRUST ENGINE
          ═══════════════════════════════════════════════════════════ */}
      <section id="trust" className="mx-auto max-w-5xl px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Trust engine</h2>
          <p className="text-[var(--fg-secondary)] max-w-2xl mx-auto">
            A weighted confidence score, not a checklist. Three pillars, 7.5 max.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* KYC */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] flex items-center justify-center text-lg">🪪</div>
              <span className="text-sm font-bold text-[var(--accent)]">up to 2.0</span>
            </div>
            <h3 className="font-semibold mb-2">Identity verification (KYC)</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-4">
              Government ID verification. Up to 2.0 points based on completeness.
            </p>
            <div className="h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
              <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: "26.7%" }} />
            </div>
            <div className="flex justify-between text-[10px] text-[var(--muted)] mt-1">
              <span>0</span><span>2.0 / 7.5</span>
            </div>
          </div>

          {/* Social */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] flex items-center justify-center text-lg">🔗</div>
              <span className="text-sm font-bold text-[var(--primary)]">up to 1.5</span>
            </div>
            <h3 className="font-semibold mb-2">Social and digital reputation</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-4">
              Linked social accounts and professional profiles. Up to 1.5 points.
            </p>
            <div className="h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
              <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: "20%" }} />
            </div>
            <div className="flex justify-between text-[10px] text-[var(--muted)] mt-1">
              <span>0</span><span>1.5 / 7.5</span>
            </div>
          </div>

          {/* Auth Hold */}
          <div className="card ring-glow p-6 border-[var(--warm)] border-2">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--warm-light)] flex items-center justify-center text-lg">🏦</div>
              <span className="text-sm font-bold text-[var(--warm)]">up to 4.0</span>
            </div>
            <h3 className="font-semibold mb-2">Trust deposit / auth hold</h3>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-4">
              A Stripe card hold creates real financial accountability. The strongest signal. Up to 4.0 points.
            </p>
            <div className="h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
              <div className="h-full rounded-full bg-[var(--warm)]" style={{ width: "53.3%" }} />
            </div>
            <div className="flex justify-between text-[10px] text-[var(--muted)] mt-1">
              <span>0</span><span>4.0 / 7.5</span>
            </div>
          </div>
        </div>

        {/* How your trust score is used */}
        <div className="card p-6 max-w-3xl mx-auto">
          <h3 className="font-semibold text-sm mb-4">How your trust score is used</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-[var(--bg-secondary)] p-3">
              <div className="font-semibold text-xs mb-1">🤖 AI matching priority</div>
              <p className="text-xs text-[var(--fg-secondary)]">Higher trust = the AI picks you first when building trade rings.</p>
            </div>
            <div className="rounded-xl bg-[var(--bg-secondary)] p-3">
              <div className="font-semibold text-xs mb-1">👀 Visibility boost</div>
              <p className="text-xs text-[var(--fg-secondary)]">Higher trust = your listings appear more prominently.</p>
            </div>
            <div className="rounded-xl bg-[var(--bg-secondary)] p-3">
              <div className="font-semibold text-xs mb-1">🔓 Unlock trade types</div>
              <p className="text-xs text-[var(--fg-secondary)]">Some high-value trades require a minimum trust score.</p>
            </div>
            <div className="rounded-xl bg-[var(--bg-secondary)] p-3">
              <div className="font-semibold text-xs mb-1">⭐ Community standing</div>
              <p className="text-xs text-[var(--fg-secondary)]">Your score is visible everywhere. Build trust once, benefit always.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          9. PRIVACY-PRESERVING TRUST
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Privacy by design</h2>
            <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
              Progressive identity disclosure. You control what you reveal and when.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Pseudonymous by default",
                desc: "Participate with a display name only. No real name or contact info required.",
                pill: "Step 1",
                color: "primary",
              },
              {
                title: "Trust through platform signals",
                desc: "Verification, social proof, and financial commitment build credibility without revealing identity.",
                pill: "Step 2",
                color: "accent",
              },
              {
                title: "Progressive reveal when ready",
                desc: "Full identity shared only after both parties accept a trade and are ready to coordinate.",
                pill: "Step 3",
                color: "warm",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6 flex gap-5 items-start">
                <span className={`pill bg-[var(--${item.color}-light)] text-[var(--${item.color})] shrink-0 mt-0.5`}>{item.pill}</span>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          11. WHY THIS IS FINTECH
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Why this is fintech</h2>
            <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
              Financial infrastructure for non-cash value exchange.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: "🔄",
                title: "Multilateral clearing and netting",
                desc: "Trade rings net obligations across participants. Each person delivers to one and receives from another. Same structure as financial clearing.",
              },
              {
                icon: "💎",
                title: "Non-cash value exchange",
                desc: "Skills, goods, services, and capacity are tradeable value. Compatibility scores provide the pricing signal, ring consensus provides settlement.",
              },
              {
                icon: "🔓",
                title: "Liquidity for underused assets",
                desc: "Excess inventory, spare capacity, unused skills are illiquid assets. Naibour surfaces counterparties that traditional markets cannot.",
              },
              {
                icon: "🌐",
                title: "Financial inclusion",
                desc: "No money required to participate. Anyone with a skill, service, or good can trade. Economic participation beyond cash or credit.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg mb-4">{item.icon}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          13. BUSINESS MODEL AND SCALE PATH
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Business model</h2>
            <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
              Build trust and liquidity first. Monetize later.
            </p>
          </div>
          <div className="space-y-4">
            <div className="card p-6">
              <div className="pill bg-[var(--success-light)] text-[var(--success)] mb-3">Now</div>
              <h3 className="font-semibold mb-2">Free to use</h3>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                Free for all participants. Priority: prove the matching engine, build trust, achieve network density.
              </p>
            </div>
            <div className="card p-6">
              <div className="pill bg-[var(--warm-light)] text-[var(--warm)] mb-3">At scale</div>
              <h3 className="font-semibold mb-2">Strategic optionality</h3>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                At ~10K active users: transaction fees, premium business tiers, priority matching, enterprise integrations.
              </p>
            </div>
            <div className="card p-6">
              <div className="pill bg-[var(--primary-light)] text-[var(--primary)] mb-3">Long-term</div>
              <h3 className="font-semibold mb-2">Value creation at scale</h3>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                A coordination layer for underused value across individuals, businesses, and geographies. Infrastructure compounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          14. EXAMPLE TRADE RINGS
          ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Trade rings in action</h2>
          <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
            Nobody swaps directly. The AI connects a chain where everyone wins.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ring 1: Individual */}
          <div className="card ring-glow p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="pill bg-[var(--primary-light)] text-[var(--primary)]">3-way ring</span>
              <span className="text-xs text-[var(--muted)]">Individuals</span>
            </div>
            <svg viewBox="0 0 400 200" className="w-full mb-4">
              <line x1="200" y1="30" x2="330" y2="160" stroke="var(--primary)" strokeWidth="1.5" opacity="0.25" className="ring-line" />
              <line x1="330" y1="160" x2="70" y2="160" stroke="var(--primary)" strokeWidth="1.5" opacity="0.25" className="ring-line" />
              <line x1="70" y1="160" x2="200" y2="30" stroke="var(--primary)" strokeWidth="1.5" opacity="0.25" className="ring-line" />

              <circle cx="200" cy="30" r="22" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2" />
              <text x="200" y="28" textAnchor="middle" fill="var(--fg)" fontSize="10" fontWeight="600">Anna</text>
              <text x="200" y="39" textAnchor="middle" fill="var(--muted)" fontSize="7">tutors math</text>

              <circle cx="330" cy="160" r="22" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="2" />
              <text x="330" y="158" textAnchor="middle" fill="var(--fg)" fontSize="10" fontWeight="600">Bence</text>
              <text x="330" y="169" textAnchor="middle" fill="var(--muted)" fontSize="7">walks dogs</text>

              <circle cx="70" cy="160" r="22" fill="var(--warm-light)" stroke="var(--warm)" strokeWidth="2" />
              <text x="70" y="158" textAnchor="middle" fill="var(--fg)" fontSize="10" fontWeight="600">Clara</text>
              <text x="70" y="169" textAnchor="middle" fill="var(--muted)" fontSize="7">does taxes</text>

              <text x="280" y="85" textAnchor="middle" fill="var(--primary)" fontSize="8" fontWeight="500">tutors →</text>
              <text x="200" y="178" textAnchor="middle" fill="var(--accent)" fontSize="8" fontWeight="500">walks dog →</text>
              <text x="120" y="85" textAnchor="middle" fill="var(--warm)" fontSize="8" fontWeight="500">← does taxes</text>
            </svg>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl bg-[var(--bg-secondary)] p-2.5">
                <div className="font-semibold">Anna</div>
                <div className="text-[var(--fg-secondary)]">Needs tax help</div>
                <div className="text-[var(--primary)]">Offers tutoring</div>
              </div>
              <div className="rounded-xl bg-[var(--bg-secondary)] p-2.5">
                <div className="font-semibold">Bence</div>
                <div className="text-[var(--fg-secondary)]">Needs tutoring</div>
                <div className="text-[var(--accent)]">Offers dog walking</div>
              </div>
              <div className="rounded-xl bg-[var(--bg-secondary)] p-2.5">
                <div className="font-semibold">Clara</div>
                <div className="text-[var(--fg-secondary)]">Needs dog walking</div>
                <div className="text-[var(--warm)]">Offers tax help</div>
              </div>
            </div>
          </div>

          {/* Ring 2: Mixed individual + business */}
          <div className="card ring-glow p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="pill bg-[var(--accent-light)] text-[var(--accent)]">4-way ring</span>
              <span className="text-xs text-[var(--muted)]">Individuals + business</span>
            </div>
            <svg viewBox="0 0 400 200" className="w-full mb-4">
              <line x1="115" y1="30" x2="285" y2="30" stroke="var(--accent)" strokeWidth="1.5" opacity="0.25" className="ring-line" />
              <line x1="285" y1="30" x2="340" y2="160" stroke="var(--accent)" strokeWidth="1.5" opacity="0.25" className="ring-line" />
              <line x1="340" y1="160" x2="60" y2="160" stroke="var(--accent)" strokeWidth="1.5" opacity="0.25" className="ring-line" />
              <line x1="60" y1="160" x2="115" y2="30" stroke="var(--accent)" strokeWidth="1.5" opacity="0.25" className="ring-line" />

              <circle cx="115" cy="30" r="22" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2" />
              <text x="115" y="28" textAnchor="middle" fill="var(--fg)" fontSize="10" fontWeight="600">Ferenc</text>
              <text x="115" y="39" textAnchor="middle" fill="var(--muted)" fontSize="7">web design</text>

              <circle cx="285" cy="30" r="22" fill="var(--warm-light)" stroke="var(--warm)" strokeWidth="2" />
              <text x="285" y="28" textAnchor="middle" fill="var(--fg)" fontSize="10" fontWeight="600">Grapes</text>
              <text x="285" y="39" textAnchor="middle" fill="var(--muted)" fontSize="7">wine shop</text>

              <circle cx="340" cy="160" r="22" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="2" />
              <text x="340" y="158" textAnchor="middle" fill="var(--fg)" fontSize="10" fontWeight="600">Gábor</text>
              <text x="340" y="169" textAnchor="middle" fill="var(--muted)" fontSize="7">accountant</text>

              <circle cx="60" cy="160" r="22" fill="var(--success-light)" stroke="var(--success)" strokeWidth="2" />
              <text x="60" y="158" textAnchor="middle" fill="var(--fg)" fontSize="10" fontWeight="600">Hanna</text>
              <text x="60" y="169" textAnchor="middle" fill="var(--muted)" fontSize="7">dog walker</text>

              <text x="200" y="22" textAnchor="middle" fill="var(--primary)" fontSize="8" fontWeight="500">builds site →</text>
              <text x="330" y="95" textAnchor="middle" fill="var(--warm)" fontSize="8" fontWeight="500">wine →</text>
              <text x="200" y="178" textAnchor="middle" fill="var(--accent)" fontSize="8" fontWeight="500">← bookkeeping</text>
              <text x="70" y="95" textAnchor="middle" fill="var(--success)" fontSize="8" fontWeight="500">← walks dog</text>
            </svg>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="rounded-xl bg-[var(--bg-secondary)] p-2.5">
                <div className="font-semibold">Ferenc</div>
                <div className="text-[var(--fg-secondary)]">Needs wine</div>
                <div className="text-[var(--primary)]">Offers web design</div>
              </div>
              <div className="rounded-xl bg-[var(--bg-secondary)] p-2.5">
                <div className="font-semibold">Grapes Co.</div>
                <div className="text-[var(--fg-secondary)]">Needs bookkeeping</div>
                <div className="text-[var(--warm)]">Offers wine</div>
              </div>
              <div className="rounded-xl bg-[var(--bg-secondary)] p-2.5">
                <div className="font-semibold">Gábor</div>
                <div className="text-[var(--fg-secondary)]">Needs dog walking</div>
                <div className="text-[var(--accent)]">Offers accounting</div>
              </div>
              <div className="rounded-xl bg-[var(--bg-secondary)] p-2.5">
                <div className="font-semibold">Hanna</div>
                <div className="text-[var(--fg-secondary)]">Needs web design</div>
                <div className="text-[var(--success)]">Offers dog walking</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          15. NETWORK GRAPH VISUALIZATION
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">The graph at work</h2>
            <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
              Nine participants, dozens of potential connections. The algorithm finds the rings hidden inside.
            </p>
          </div>
          <div className="card p-6 sm:p-8">
            <svg viewBox="0 0 600 400" className="w-full">
              {/* Background edges (faint) */}
              {[
                [300,50,494,106], [300,50,150,200], [300,50,494,294],
                [494,106,450,344], [494,106,106,294],
                [550,200,300,350], [550,200,106,106],
                [106,106,150,200], [106,106,300,350],
                [150,200,300,350], [150,200,494,294],
                [106,294,300,350], [106,294,550,200],
                [494,294,300,50], [494,294,150,200],
                [450,344,106,106], [450,344,300,50],
              ].map(([x1,y1,x2,y2], i) => (
                <line key={`bg-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--card-border)" strokeWidth="1" opacity="0.5" />
              ))}

              {/* Ring 1 highlight: Anna(300,50) → Bence(494,106) → Dániel(494,294) → Gábor(106,294) → Anna */}
              {[
                [300,50,494,106], [494,106,494,294], [494,294,106,294], [106,294,300,50],
              ].map(([x1,y1,x2,y2], i) => (
                <line key={`r1-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--primary)" strokeWidth="2.5" opacity="0.6" className="ring-line" />
              ))}

              {/* Ring 2 highlight: Clara(550,200) → Ferenc(450,344) → Hanna(150,200) → Clara */}
              {[
                [550,200,450,344], [450,344,150,200], [150,200,550,200],
              ].map(([x1,y1,x2,y2], i) => (
                <line key={`r2-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="2.5" opacity="0.6" className="ring-line" />
              ))}

              {/* Nodes */}
              {[
                { x:300, y:50,  name:"Anna",   c:"var(--primary-light)", s:"var(--primary)" },
                { x:494, y:106, name:"Bence",   c:"var(--accent-light)",  s:"var(--accent)" },
                { x:550, y:200, name:"Clara",   c:"var(--warm-light)",    s:"var(--warm)" },
                { x:494, y:294, name:"Dániel",  c:"var(--success-light)", s:"var(--success)" },
                { x:300, y:350, name:"Eszter",  c:"#E8E4DF",             s:"var(--muted)" },
                { x:106, y:294, name:"Gábor",   c:"var(--primary-light)", s:"var(--primary)" },
                { x:150, y:200, name:"Hanna",   c:"var(--accent-light)",  s:"var(--accent)" },
                { x:106, y:106, name:"István",  c:"var(--warm-light)",    s:"var(--warm)" },
                { x:450, y:344, name:"Ferenc",  c:"var(--success-light)", s:"var(--success)" },
              ].map((n) => (
                <g key={n.name}>
                  <circle cx={n.x} cy={n.y} r="24" fill={n.c} stroke={n.s} strokeWidth="2" />
                  <text x={n.x} y={n.y + 4} textAnchor="middle" fill="var(--fg)" fontSize="10" fontWeight="600">{n.name}</text>
                </g>
              ))}
            </svg>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-[var(--primary)] rounded" />
                <span className="text-[var(--fg-secondary)]">Ring 1 (4-way)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-[var(--accent)] rounded" />
                <span className="text-[var(--fg-secondary)]">Ring 2 (3-way)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-[var(--card-border)] rounded" />
                <span className="text-[var(--fg-secondary)]">Potential connections</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          16. FAQ
          ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-3xl px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Frequently asked questions</h2>
        </div>
        <div className="space-y-3">
          {faq.map((item, i) => (
            <details key={i} className="card p-0 overflow-hidden group">
              <summary className="p-5 cursor-pointer font-semibold text-sm hover:bg-[var(--card-hover)] transition-colors flex items-center justify-between [&::-webkit-details-marker]:hidden list-none">
                {item.q}
                <span className="text-[var(--muted)] text-lg ml-4 shrink-0 transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-[var(--fg-secondary)] leading-relaxed border-t border-[var(--card-border)] pt-4">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          17. CLOSING CTA
          ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <div className="card p-10 sm:p-14 bg-gradient-to-br from-[var(--primary-light)] to-white ring-glow">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Turn what you have
            <br />
            <span className="text-[var(--primary)]">into what you need</span>
          </h2>
          <p className="text-[var(--fg-secondary)] mb-8 max-w-md mx-auto leading-relaxed">
            Everyone has something to offer. Post your skills, your goods, your capacity.
            Let the AI and your neighbours do the rest.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/onboarding" className="btn-primary text-base px-8 py-3">
              Join Naibour
            </a>
            <a href="/marketplace" className="btn-secondary text-base">
              Browse the marketplace
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
