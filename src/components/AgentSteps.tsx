"use client";

import { AgentStep } from "@/lib/types";

const phaseConfig: Record<AgentStep["phase"], { icon: string; color: string; bg: string }> = {
  perceive: { icon: "👁️", color: "text-[#6B8F71]", bg: "bg-[var(--accent-light)]" },
  reason: { icon: "🧠", color: "text-[#8B6BB0]", bg: "bg-[#F3EEFA]" },
  plan: { icon: "📋", color: "text-[var(--warm)]", bg: "bg-[var(--warm-light)]" },
  execute: { icon: "⚡", color: "text-[var(--primary)]", bg: "bg-[var(--primary-light)]" },
  adapt: { icon: "🔄", color: "text-[var(--success)]", bg: "bg-[var(--success-light)]" },
};

export default function AgentSteps({ steps }: { steps: AgentStep[] }) {
  if (steps.length === 0) return null;

  return (
    <div className="card p-4">
      <h3 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">
        Agent activity log
      </h3>
      <div className="space-y-1.5">
        {steps.map((step, i) => {
          const cfg = phaseConfig[step.phase];
          return (
            <div
              key={i}
              className="agent-step flex items-start gap-2.5 text-sm"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className={`text-sm mt-0.5 w-6 h-6 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}>
                {cfg.icon}
              </span>
              <div className="flex-1 min-w-0">
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${cfg.color}`}>
                  {step.phase}
                </span>
                <p className="text-[var(--fg-secondary)] text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
