"use client";

import { useState } from "react";

interface OfferingInput {
  skill: string;
  category: string;
  description: string;
}

const CATEGORIES = [
  "home services",
  "finance",
  "education",
  "technology",
  "creative services",
  "food services",
  "pet care",
  "elder care",
  "fitness",
  "language services",
  "maintenance",
  "consulting",
  "legal",
  "goods",
  "errands",
  "other",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [bio, setBio] = useState("");
  const [offerings, setOfferings] = useState<OfferingInput[]>([
    { skill: "", category: "other", description: "" },
  ]);
  const [openToNegotiation, setOpenToNegotiation] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);

  const addOffering = () => {
    setOfferings([...offerings, { skill: "", category: "other", description: "" }]);
  };

  const removeOffering = (index: number) => {
    if (offerings.length > 1) {
      setOfferings(offerings.filter((_, i) => i !== index));
    }
  };

  const updateOffering = (index: number, field: keyof OfferingInput, value: string) => {
    const updated = [...offerings];
    updated[index] = { ...updated[index], [field]: value };
    setOfferings(updated);
  };

  const validOfferings = offerings.filter((o) => o.skill.trim());

  const handleSubmit = async () => {
    if (!userName.trim() || validOfferings.length === 0) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userName.trim(),
          neighborhood: neighborhood.trim() || "Budapest",
          bio: bio.trim() || undefined,
          offerings: validOfferings.map((o) => ({
            skill: o.skill.trim(),
            category: o.category,
            description: o.description.trim() || undefined,
          })),
          openToNegotiation,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setProfileId(data.profile.id);
        setDone(true);
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold mb-3">Welcome to Naibour, {userName}!</h1>
        <p className="text-[var(--fg-secondary)] mb-2">
          Your profile is set up with {validOfferings.length} offering{validOfferings.length > 1 ? "s" : ""}.
        </p>
        <p className="text-sm text-[var(--muted)] mb-8">
          Now you can post what you need, and your neighbours will see what you have to offer.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`/post?profile=${profileId}`} className="btn-primary text-base px-8 py-3">
            Post what you need
          </a>
          <a href="/marketplace" className="btn-secondary text-base">
            Browse marketplace
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1">
            <div
              className={`h-1.5 rounded-full transition-all ${
                s <= step ? "bg-[var(--primary)]" : "bg-[var(--card-border)]"
              }`}
            />
            <div className={`text-[10px] mt-1 ${s <= step ? "text-[var(--primary)] font-medium" : "text-[var(--muted)]"}`}>
              {s === 1 ? "About you" : s === 2 ? "Your offerings" : "Review"}
            </div>
          </div>
        ))}
      </div>

      {/* Step 1: About You */}
      {step === 1 && (
        <div>
          <h1 className="text-2xl font-bold mb-2">Tell us about yourself</h1>
          <p className="text-[var(--fg-secondary)] mb-6">
            First, let your neighbours know who you are.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--fg-secondary)] mb-1.5">Your name *</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Anna K."
                className="w-full rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] px-3 py-2.5 text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--fg-secondary)] mb-1.5">Neighbourhood</label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="e.g. District VII, Budapest"
                className="w-full rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] px-3 py-2.5 text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--fg-secondary)] mb-1.5">Short bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell people a bit about yourself — what you do, what you're into..."
                rows={3}
                className="w-full rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] px-3 py-2.5 text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => userName.trim() && setStep(2)}
              disabled={!userName.trim()}
              className="btn-primary"
            >
              Next: Your offerings →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Offerings */}
      {step === 2 && (
        <div>
          <h1 className="text-2xl font-bold mb-2">What can you offer?</h1>
          <p className="text-[var(--fg-secondary)] mb-6">
            List everything you can offer to your neighbours — skills, services, goods.
            The more you add, the more trade opportunities you unlock.
          </p>

          <div className="space-y-4">
            {offerings.map((offering, i) => (
              <div key={i} className="card p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[var(--muted)] uppercase">
                    Offering #{i + 1}
                  </span>
                  {offerings.length > 1 && (
                    <button
                      onClick={() => removeOffering(i)}
                      className="text-xs text-[var(--danger)] hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={offering.skill}
                      onChange={(e) => updateOffering(i, "skill", e.target.value)}
                      placeholder="What can you do? e.g. 'Dog walking', 'Tax filing', 'Web development'"
                      className="w-full rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] px-3 py-2.5 text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={offering.category}
                      onChange={(e) => updateOffering(i, "category", e.target.value)}
                      className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] px-3 py-2.5 text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={offering.description}
                      onChange={(e) => updateOffering(i, "description", e.target.value)}
                      placeholder="Details (optional)"
                      className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] px-3 py-2.5 text-sm text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addOffering}
            className="mt-4 w-full btn-secondary text-sm py-3"
          >
            + Add another offering
          </button>

          {/* Open to negotiation toggle */}
          <div className="card p-4 mt-4 flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Open to other requests?</div>
              <div className="text-xs text-[var(--fg-secondary)]">
                Let people know you&apos;re flexible beyond your listed offerings
              </div>
            </div>
            <button
              onClick={() => setOpenToNegotiation(!openToNegotiation)}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                openToNegotiation ? "bg-[var(--primary)]" : "bg-[var(--card-border)]"
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${
                  openToNegotiation ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(1)} className="btn-secondary">
              ← Back
            </button>
            <button
              onClick={() => validOfferings.length > 0 && setStep(3)}
              disabled={validOfferings.length === 0}
              className="btn-primary"
            >
              Next: Review →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div>
          <h1 className="text-2xl font-bold mb-2">Review your profile</h1>
          <p className="text-[var(--fg-secondary)] mb-6">
            Make sure everything looks good before joining the community.
          </p>

          <div className="card p-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-lg font-bold">
                {userName.charAt(0)}
              </div>
              <div>
                <div className="font-semibold">{userName}</div>
                <div className="text-xs text-[var(--muted)]">{neighborhood || "Budapest"}</div>
              </div>
            </div>
            {bio && (
              <p className="text-sm text-[var(--fg-secondary)] mb-4 italic">&quot;{bio}&quot;</p>
            )}
            <div className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
              {validOfferings.length} offering{validOfferings.length > 1 ? "s" : ""}
            </div>
            <div className="flex flex-wrap gap-2">
              {validOfferings.map((o, i) => (
                <span key={i} className="pill bg-[var(--accent-light)] text-[var(--accent)]">
                  {o.skill}
                </span>
              ))}
            </div>
            {openToNegotiation && (
              <div className="mt-3 pill bg-[var(--warm-light)] text-[var(--warm)]">
                Open to other requests
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="btn-secondary">
              ← Edit offerings
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary"
            >
              {submitting ? "Creating profile..." : "Join Naibour 🎉"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
