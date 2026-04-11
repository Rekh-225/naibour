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
          1. HERO
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-light)] to-transparent pointer-events-none" />
        <div className="mx-auto max-w-3xl px-5 pt-24 pb-20 text-center relative">
          <div className="pill bg-[var(--primary-light)] text-[var(--primary)] mb-6 mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] heartbeat-pulse inline-block" />
            AI-powered value exchange
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-[var(--fg)]">
            Turn what you have
            <br />
            <span className="text-[var(--primary)]">into what you need</span>
          </h1>
          <p className="text-lg text-[var(--fg-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Post what you have. Post what you need. An AI agent finds multi-party trades
            you would never discover on your own.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/marketplace" className="btn-primary text-base px-8 py-3">
              Enter the marketplace
            </a>
            <a href="#how-it-works" className="btn-secondary text-base">
              See how it works
            </a>
          </div>
        </div>
      </section>

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
          4. SYSTEM ARCHITECTURE
          ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">System architecture</h2>
          <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
            Four layers, a trust engine, and a privacy gate.
          </p>
        </div>

        <div className="card p-6 sm:p-8 overflow-x-auto">
          <svg viewBox="0 0 820 440" className="w-full" style={{ minWidth: "600px" }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--muted)" />
              </marker>
              <marker id="arrow-p" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--primary)" />
              </marker>
            </defs>

            {/* Layer backgrounds */}
            <rect x="55" y="4" width="530" height="82" rx="12" fill="var(--primary-light)" opacity="0.5" />
            <rect x="55" y="98" width="530" height="82" rx="12" fill="var(--accent-light)" opacity="0.5" />
            <rect x="55" y="192" width="530" height="82" rx="12" fill="var(--warm-light)" opacity="0.5" />
            <rect x="55" y="286" width="530" height="82" rx="12" fill="var(--success-light)" opacity="0.5" />

            {/* Layer labels */}
            <text x="68" y="20" fill="var(--primary)" fontSize="9" fontWeight="700" letterSpacing="1">INPUT</text>
            <text x="68" y="114" fill="var(--accent)" fontSize="9" fontWeight="700" letterSpacing="1">AI LAYER</text>
            <text x="68" y="208" fill="var(--warm)" fontSize="9" fontWeight="700" letterSpacing="1">GRAPH</text>
            <text x="68" y="302" fill="var(--success)" fontSize="9" fontWeight="700" letterSpacing="1">OUTPUT</text>

            {/* ── INPUT NODES ── */}
            <rect x="100" y="30" width="140" height="40" rx="10" fill="white" stroke="var(--primary)" strokeWidth="1.5" />
            <text x="170" y="55" textAnchor="middle" fill="var(--fg)" fontSize="11" fontWeight="600">User Posts</text>

            <rect x="290" y="30" width="140" height="40" rx="10" fill="white" stroke="var(--primary)" strokeWidth="1.5" />
            <text x="360" y="55" textAnchor="middle" fill="var(--fg)" fontSize="11" fontWeight="600">External Data</text>

            {/* ── AI NODES ── */}
            <rect x="75" y="122" width="130" height="40" rx="10" fill="white" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="140" y="147" textAnchor="middle" fill="var(--fg)" fontSize="11" fontWeight="600">NLP Parser</text>

            <rect x="245" y="122" width="145" height="40" rx="10" fill="white" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="317" y="147" textAnchor="middle" fill="var(--fg)" fontSize="11" fontWeight="600">Schema Validator</text>

            <rect x="430" y="122" width="140" height="40" rx="10" fill="white" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="500" y="147" textAnchor="middle" fill="var(--fg)" fontSize="11" fontWeight="600">Scoring Engine</text>

            {/* ── GRAPH NODES ── */}
            <rect x="130" y="216" width="155" height="40" rx="10" fill="white" stroke="var(--warm)" strokeWidth="1.5" />
            <text x="207" y="241" textAnchor="middle" fill="var(--fg)" fontSize="11" fontWeight="600">Directed Graph</text>

            <rect x="345" y="216" width="155" height="40" rx="10" fill="white" stroke="var(--warm)" strokeWidth="1.5" />
            <text x="422" y="241" textAnchor="middle" fill="var(--fg)" fontSize="11" fontWeight="600">Cycle Detection</text>

            {/* ── OUTPUT NODES ── */}
            <rect x="75" y="310" width="130" height="40" rx="10" fill="white" stroke="var(--success)" strokeWidth="1.5" />
            <text x="140" y="335" textAnchor="middle" fill="var(--fg)" fontSize="11" fontWeight="600">Ring Ranker</text>

            <rect x="245" y="310" width="145" height="40" rx="10" fill="white" stroke="var(--success)" strokeWidth="1.5" />
            <text x="317" y="335" textAnchor="middle" fill="var(--fg)" fontSize="11" fontWeight="600">Proposal Engine</text>

            <rect x="430" y="310" width="140" height="40" rx="10" fill="white" stroke="var(--success)" strokeWidth="1.5" />
            <text x="500" y="335" textAnchor="middle" fill="var(--fg)" fontSize="11" fontWeight="600">Consensus</text>

            {/* ── SIDEBAR: Trust + Privacy ── */}
            <rect x="620" y="108" width="180" height="168" rx="14" fill="white" stroke="var(--card-border)" strokeWidth="1.5" strokeDasharray="6 3" />
            <text x="710" y="130" textAnchor="middle" fill="var(--muted)" fontSize="9" fontWeight="700" letterSpacing="1">CROSS-CUTTING</text>

            <rect x="640" y="142" width="140" height="36" rx="8" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="1.5" />
            <text x="710" y="165" textAnchor="middle" fill="var(--primary)" fontSize="10" fontWeight="600">Trust Engine</text>

            <rect x="640" y="192" width="140" height="36" rx="8" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="710" y="215" textAnchor="middle" fill="var(--accent)" fontSize="10" fontWeight="600">Privacy Gate</text>

            <rect x="640" y="228" width="140" height="36" rx="8" fill="var(--warm-light)" stroke="var(--warm)" strokeWidth="1.5" />
            <text x="710" y="251" textAnchor="middle" fill="var(--warm)" fontSize="10" fontWeight="600">Feedback Loop</text>

            {/* ── PRIMARY FLOW ARROWS ── */}
            {/* Input → AI */}
            <line x1="170" y1="70" x2="140" y2="122" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <line x1="360" y1="70" x2="317" y2="122" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            {/* AI horizontal */}
            <line x1="205" y1="142" x2="245" y2="142" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <line x1="390" y1="142" x2="430" y2="142" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            {/* AI → Graph */}
            <line x1="317" y1="162" x2="250" y2="216" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            {/* Graph horizontal */}
            <line x1="285" y1="236" x2="345" y2="236" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            {/* Graph → Output */}
            <line x1="345" y1="256" x2="180" y2="310" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            {/* Output horizontal */}
            <line x1="205" y1="330" x2="245" y2="330" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <line x1="390" y1="330" x2="430" y2="330" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />

            {/* ── SIDEBAR CONNECTORS ── */}
            <line x1="640" y1="160" x2="570" y2="145" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arrow-p)" opacity="0.6" />
            <line x1="640" y1="246" x2="570" y2="330" stroke="var(--warm)" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />

            {/* ── FEEDBACK ARC ── */}
            <path d="M 570 330 Q 600 250 570 160" fill="none" stroke="var(--primary)" strokeWidth="1.2" strokeDasharray="4 3" markerEnd="url(#arrow-p)" opacity="0.5" />

            {/* ── LEGEND ── */}
            <text x="70" y="395" fill="var(--muted)" fontSize="8">Solid = primary data flow</text>
            <text x="70" y="410" fill="var(--muted)" fontSize="8">Dashed = cross-cutting concerns &amp; feedback</text>

            {/* Live badge */}
            <rect x="630" y="385" width="170" height="36" rx="10" fill="var(--primary-light)" />
            <circle cx="648" cy="403" r="4" fill="var(--primary)">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="660" y="407" fill="var(--primary)" fontSize="10" fontWeight="600">Heartbeat: daily 06:00 CET</text>
          </svg>
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

        {/* Score breakdown example */}
        <div className="card p-6 mb-8 max-w-2xl mx-auto">
          <h3 className="font-semibold text-lg mb-4">Example trust score</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-[var(--warm-light)] flex items-center justify-center">
              <span className="text-2xl font-bold text-[var(--warm)]">5.0</span>
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex-1 h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                  <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: "100%" }} />
                </div>
                <span className="text-xs text-[var(--fg-secondary)] w-24">KYC verified</span>
                <span className="text-xs font-semibold w-8 text-right">+2.0</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex-1 h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                  <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: "67%" }} />
                </div>
                <span className="text-xs text-[var(--fg-secondary)] w-24">Social linked</span>
                <span className="text-xs font-semibold w-8 text-right">+1.0</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex-1 h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                  <div className="h-full rounded-full bg-[var(--warm)]" style={{ width: "50%" }} />
                </div>
                <span className="text-xs text-[var(--fg-secondary)] w-24">Card auth hold</span>
                <span className="text-xs font-semibold w-8 text-right">+2.0</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-[var(--muted)]">
            Max score is 7.5. Higher scores unlock better matches and priority in the AI&apos;s trade ring algorithm.
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
          10. PAYMENTS AND COMPLIANCE
          ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-3xl px-5 py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Payments and compliance</h2>
          <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
            Practical now, scalable later. No compliance shortcuts.
          </p>
        </div>
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--primary-light)] flex items-center justify-center text-base">💳</div>
              <h3 className="font-semibold">Stripe authorization hold (MVP)</h3>
            </div>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
              Reserves funds on the user&apos;s card without Naibour taking custody. Real accountability, minimal compliance burden.
            </p>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--warm-light)] flex items-center justify-center text-base">⏱️</div>
              <h3 className="font-semibold">7-day authorization window</h3>
            </div>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
              Standard hold lasts ~7 days. Users re-authorize if a trade is still pending. Known limitation, clearly communicated.
            </p>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent-light)] flex items-center justify-center text-base">🏛️</div>
              <h3 className="font-semibold">Regulated partner path</h3>
            </div>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
              At scale, Naibour can partner with regulated escrow providers or pursue its own licensing.
            </p>
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
          12. TECHNICAL DEPTH
          ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Under the hood</h2>
          <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
            Not a prompt wrapper. Real system, real code, running now.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "NLP extraction", desc: "Free-text input is parsed into structured skill objects with categories, availability, and confidence via Gemini 2.0 Flash." },
            { label: "Schema validation", desc: "All parsed output is validated against a strict TypeScript schema. Malformed responses trigger a retry with stricter prompting." },
            { label: "Compatibility scoring", desc: "Multi-signal scoring: 30% taxonomy match, 35% semantic similarity, 10% trust, 5% freshness, 20% combined boost. Then refined by AI." },
            { label: "Directed weighted graph", desc: "Every viable offer-to-need connection becomes a weighted edge. Top 3 edges per user pair are retained and sent to AI for refinement." },
            { label: "DFS cycle detection", desc: "Depth-first search enumerates all cycles of length 2 to 4. Cycles are deduplicated by full edge signature, not just user IDs." },
            { label: "Ring ranking", desc: "Rings are scored: 35% minimum edge (bottleneck), 25% average edge, 15% completion probability, 10% trust, 5% freshness, 5% fairness." },
            { label: "Greedy disjoint selection", desc: "Top-ranked rings are selected greedily so no user, offer, or need appears in multiple primary rings. Alternates are kept as backups." },
            { label: "Trust weighting", desc: "Trust scores from KYC, social signals, and auth holds are normalized and fed into both edge scoring and ring ranking." },
            { label: "Feedback loop", desc: "Accept/decline decisions feed back into the system. Declined rings trigger re-search. Acceptance patterns improve future scoring." },
            { label: "External normalization", desc: "External listings can be ingested, parsed through the same NLP pipeline, and incorporated into the graph as additional supply/demand nodes." },
            { label: "Privacy gating", desc: "Identity details are withheld until consensus. The graph operates on pseudonymous IDs. Progressive reveal happens at trade execution." },
            { label: "Synonym resolution", desc: "A curated synonym map normalizes skill descriptions before scoring. 'Dog walking', 'walk dog', and 'pet walking' all resolve to the same skill group." },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-[var(--bg-secondary)] p-4">
              <h4 className="font-semibold text-sm mb-1">{item.label}</h4>
              <p className="text-xs text-[var(--fg-secondary)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
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
