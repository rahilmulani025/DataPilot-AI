import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, Lightbulb, ScanSearch } from "lucide-react";

import { PageHeader, Panel } from "@/components/ui-kit";
import { Badge } from "@/components/ui/badge";
import { featureImportance } from "@/lib/sample-data";

export const Route = createFileRoute("/explainability")({
  head: () => ({
    meta: [
      { title: "Explainability — DataPilot AI" },
      {
        name: "description",
        content: "SHAP values, feature importance and per-prediction explanations for your trained model.",
      },
      { property: "og:title", content: "Explainability — DataPilot AI" },
      { property: "og:description", content: "Understand exactly why the model made each prediction." },
    ],
  }),
  component: Explainability,
});

const predictions = [
  {
    id: "CUS-100244",
    score: 0.91,
    label: "High churn risk",
    drivers: [
      { f: "contract = Month-to-month", v: 0.28 },
      { f: "support_calls = 6", v: 0.21 },
      { f: "tenure_months = 1", v: 0.17 },
      { f: "add_on_count = 0", v: -0.04 },
    ],
  },
  {
    id: "CUS-100245",
    score: 0.06,
    label: "Low churn risk",
    drivers: [
      { f: "contract = Two year", v: -0.31 },
      { f: "tenure_months = 58", v: -0.22 },
      { f: "support_calls = 0", v: -0.11 },
      { f: "monthly_charges = 48.90", v: 0.03 },
    ],
  },
];

function Explainability() {
  const max = featureImportance[0]!.weight;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Interpretability"
        title="Model explainability"
        description="SHAP attributions for the deployed XGBoost model, computed on a 5,000-row background sample."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Global feature importance" description="Mean absolute SHAP value" contentClassName="space-y-3">
          {featureImportance.map((f) => (
            <div key={f.feature} className="group">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono">{f.feature}</span>
                <span className="font-mono text-muted-foreground">{f.weight.toFixed(2)}</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="bg-gradient-brand h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                  style={{ width: `${(f.weight / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </Panel>

        <Panel
          title="SHAP beeswarm"
          description="Feature value vs. impact on model output"
          actions={<ScanSearch className="size-4 text-muted-foreground" />}
        >
          <div className="space-y-4">
            {featureImportance.slice(0, 6).map((f, row) => (
              <div key={f.feature} className="flex items-center gap-3">
                <span className="w-32 shrink-0 truncate font-mono text-[0.68rem] text-muted-foreground">
                  {f.feature}
                </span>
                <div className="relative h-6 flex-1 rounded-md bg-surface-2/60">
                  <span className="absolute inset-y-0 left-1/2 w-px bg-border" />
                  {Array.from({ length: 22 }).map((_, i) => {
                    const spread = (f.weight / max) * 46;
                    const offset = Number((50 + Math.sin(i * 1.7 + row) * spread).toFixed(2));
                    return (
                      <span
                        key={i}
                        className="absolute size-1.5 rounded-full"
                        style={{
                          left: `${offset}%`,
                          top: `${20 + ((i * 13) % 60)}%`,
                          backgroundColor:
                            offset > 50
                              ? "color-mix(in oklab, var(--primary) 85%, transparent)"
                              : "color-mix(in oklab, var(--violet) 85%, transparent)",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between px-1 text-[0.7rem] text-muted-foreground">
              <span>← lowers churn probability</span>
              <span>raises churn probability →</span>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Prediction explanations" contentClassName="grid gap-4 lg:grid-cols-2">
        {predictions.map((p) => (
          <article key={p.id} className="rounded-xl border border-border/70 bg-surface-2/50 p-5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-sm">{p.id}</p>
              <Badge
                variant="outline"
                className={`rounded-full ${
                  p.score > 0.5
                    ? "border-destructive/40 bg-destructive/12 text-destructive"
                    : "border-success/40 bg-success/12 text-success"
                }`}
              >
                {p.label} · {(p.score * 100).toFixed(0)}%
              </Badge>
            </div>
            <div className="mt-4 space-y-2.5">
              {p.drivers.map((d) => (
                <div key={d.f} className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-mono text-muted-foreground">{d.f}</span>
                  <span className={`flex items-center gap-1 font-mono ${d.v > 0 ? "text-destructive" : "text-success"}`}>
                    {d.v > 0 ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                    {Math.abs(d.v).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </Panel>

      <Panel
        title="What the model learned"
        actions={<Lightbulb className="size-4 text-primary" />}
        contentClassName="grid gap-4 md:grid-cols-3 text-sm text-muted-foreground"
      >
        <p>
          <span className="text-foreground">Contract dominates.</span> A single split on contract type accounts for
          24% of total attribution across all predictions.
        </p>
        <p>
          <span className="text-foreground">Tenure is non-linear.</span> Risk falls sharply until month 9, then
          flattens — the model learned a knee, not a slope.
        </p>
        <p>
          <span className="text-foreground">Region barely matters.</span> At 4% attribution it can be dropped without
          measurable loss, simplifying deployment.
        </p>
      </Panel>
    </div>
  );
}
