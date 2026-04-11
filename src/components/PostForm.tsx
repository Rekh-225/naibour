"use client";

import { useState } from "react";

export default function PostForm() {
  const [userName, setUserName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [rawNeed, setRawNeed] = useState("");
  const [rawOffer, setRawOffer] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    confidence?: number;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, neighborhood, rawNeed, rawOffer }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult({
          success: true,
          message: `Post created! AI parsed your needs and offers with ${Math.round(data.parseConfidence * 100)}% confidence.`,
          confidence: data.parseConfidence,
        });
        setUserName("");
        setNeighborhood("");
        setRawNeed("");
        setRawOffer("");
      } else {
        setResult({ success: false, message: data.error || "Failed to create post" });
      }
    } catch {
      setResult({ success: false, message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--fg-secondary)] mb-1.5">
            Your Name
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. Anna K."
            required
            className="w-full rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] px-3 py-2.5 text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--fg-secondary)] mb-1.5">
            Neighborhood
          </label>
          <input
            type="text"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            placeholder="e.g. District VII, Budapest"
            className="w-full rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] px-3 py-2.5 text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--fg-secondary)] mb-1.5">
          What do you need?
        </label>
        <textarea
          value={rawNeed}
          onChange={(e) => setRawNeed(e.target.value)}
          placeholder="Describe what you need in plain language. e.g. 'I need help filing my personal taxes this month'"
          required
          rows={3}
          className="w-full rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] px-3 py-2.5 text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--fg-secondary)] mb-1.5">
          What can you offer?
        </label>
        <textarea
          value={rawOffer}
          onChange={(e) => setRawOffer(e.target.value)}
          placeholder="Describe what you can offer in return. e.g. 'I can walk your dog or pet-sit for a week'"
          required
          rows={3}
          className="w-full rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] px-3 py-2.5 text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary py-3"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            AI is parsing your post...
          </span>
        ) : (
          "Submit Post"
        )}
      </button>

      {result && (
        <div
          className={`rounded-xl p-4 text-sm ${
            result.success
              ? "bg-[var(--success-light)] border border-[var(--success)]/20 text-[var(--success)]"
              : "bg-[var(--danger-light)] border border-[var(--danger)]/20 text-[var(--danger)]"
          }`}
        >
          {result.message}
        </div>
      )}
    </form>
  );
}
