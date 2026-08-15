import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Download, Lightbulb, Sparkles, Target, TrendingUp } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { businessInsights } from "@/lib/sample-data";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Business Insights — DataPilot AI" },
      {
        name: "description",
        content: "AI-generated executive summary: key findings, opportunities, risks and recommended actions.",
      },
      { property: "og:title", content: "Business Insights — DataPilot AI" },
      { property: "og:description", content: "Turn model output into decisions your leadership team can act on." },
    ],
  }),
  component: BusinessInsights,
});

const sections = [
  { key: "findings", title: "Key findings", icon: Sparkles, tone: "text-primary", bg: "bg-primary/12" },
  { key: "opportunities", title: "Opportunities", icon: TrendingUp, tone: "text-success", bg: "bg-success/12" },
  { key: "risks", title: "Risks", icon: AlertTriangle, tone: "text-warning", bg: "bg-warning/12" },
  { key: "recommendations", title: "Recommendations", icon: Target, tone: "text-violet", bg: "bg-violet/12" },
] as const;

function BusinessInsights() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Executive summary"
        title="Business insights"
        description="Generated from Churn Prediction Q3 · XGBoost v4 · 182,378 rows · reviewed by Aarav Mehta."
        actions={
          <Button
            className="bg-gradient-brand rounded-xl border-0"
            onClick={() => toast.success("Executive summary exported", { description: "PDF · 4 pages · 1.2 MB" })}
          >
            <Download className="size-4" /> Export report
          </Button>
        }
      />

      <div className="surface-panel animate-rise grid gap-6 p-6 md:grid-cols-3">
        {[
          { k: "Revenue at risk", v: "$4.18M", d: "annualised, top 3 risk deciles" },
          { k: "Addressable churn", v: "34%", d: "reachable via retention offers" },
          { k: "Projected saving", v: "$1.42M", d: "if 10% convert to annual plans" },
        ].map((m) => (
          <div key={m.k}>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">{m.k}</p>
            <p className="text-gradient mt-2 font-display text-3xl font-semibold">{m.v}</p>
            <p className="mt-1 text-xs text-muted-foreground">{m.d}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((s) => (
          <Panel
            key={s.key}
            title={s.title}
            actions={
              <span className={`flex size-8 items-center justify-center rounded-lg ${s.bg} ${s.tone}`}>
                <s.icon className="size-4" />
              </span>
            }
            contentClassName="space-y-3"
          >
            {businessInsights[s.key].map((item, i) => (
              <div
                key={item}
                className="flex gap-3 rounded-xl border border-border/60 bg-surface-2/40 p-3 transition-colors hover:border-primary/40"
              >
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
              </div>
            ))}
          </Panel>
        ))}
      </div>

      <Panel
        title="Suggested 30-day plan"
        actions={<Lightbulb className="size-4 text-primary" />}
        contentClassName="grid gap-4 md:grid-cols-3"
      >
        {[
          { w: "Week 1–2", t: "Deploy and shadow", d: "Run the model in shadow mode against live traffic and validate score stability." },
          { w: "Week 3", t: "Pilot retention offer", d: "Target the top 5% risk decile with an annual-plan incentive; hold out a control group." },
          { w: "Week 4", t: "Measure and iterate", d: "Compare retained revenue against control and retrain with the new outcome labels." },
        ].map((p) => (
          <div key={p.w} className="rounded-xl border border-border/70 bg-surface-2/40 p-4">
            <p className="text-[0.7rem] tracking-wide text-primary uppercase">{p.w}</p>
            <p className="mt-2 text-sm font-semibold">{p.t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.d}</p>
          </div>
        ))}
      </Panel>
    </div>
  );
}
