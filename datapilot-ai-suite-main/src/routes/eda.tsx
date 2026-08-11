import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Percent, Scale, Sparkles, Waves } from "lucide-react";

import { PageHeader, Panel, StatCard } from "@/components/ui-kit";
import { correlationFeatures, correlationMatrix, distribution, monthlyRuns } from "@/lib/sample-data";

export const Route = createFileRoute("/eda")({
  head: () => ({
    meta: [
      { title: "EDA Dashboard — DataPilot AI" },
      {
        name: "description",
        content: "Exploratory data analysis: distributions, correlations, feature profiles and AI observations.",
      },
      { property: "og:title", content: "EDA Dashboard — DataPilot AI" },
      { property: "og:description", content: "See how every feature behaves before you train a model." },
    ],
  }),
  component: EdaDashboard,
});

const features = [
  { name: "tenure_months", type: "Numeric", stat: "μ 32.4 · σ 24.1", note: "Right-skewed, bimodal at 1 and 72" },
  { name: "monthly_charges", type: "Numeric", stat: "μ 64.8 · σ 30.1", note: "Three pricing clusters detected" },
  { name: "contract", type: "Categorical", stat: "3 levels", note: "Strongest single predictor of churn" },
  { name: "support_calls", type: "Numeric", stat: "μ 1.6 · σ 1.9", note: "Long tail; 4% exceed 6 calls" },
];

const chartTooltip = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    fontSize: "12px",
    color: "var(--popover-foreground)",
  },
} as const;

function heatColor(v: number) {
  const a = Math.abs(v);
  return v >= 0
    ? `color-mix(in oklab, var(--primary) ${Math.round(a * 92)}%, var(--surface-2))`
    : `color-mix(in oklab, var(--violet) ${Math.round(a * 92)}%, var(--surface-2))`;
}

function EdaDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Explore"
        title="Exploratory data analysis"
        description="Automated profiling of 20 features across 182,378 cleaned rows."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Churn rate" value="26.4%" delta="Baseline positive class" icon={<Percent className="size-4" />} />
        <StatCard label="Numeric features" value="11" delta="4 highly correlated" icon={<Activity className="size-4" />} />
        <StatCard label="Class balance" value="1 : 2.8" delta="No resampling needed" icon={<Scale className="size-4" />} />
        <StatCard label="Outlier rate" value="0.9%" delta="Winsorised at p99.5" icon={<Waves className="size-4" />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Tenure distribution" description="Customer count and churn rate by tenure bucket">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={distribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="bucket" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: "var(--accent)", opacity: 0.4 }} {...chartTooltip} />
              <Bar dataKey="customers" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="churn" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Correlation heatmap" description="Pearson coefficients across key features">
          <div className="overflow-x-auto">
            <div className="min-w-[420px]">
              <div className="grid grid-cols-[7rem_repeat(6,1fr)] gap-1">
                <div />
                {correlationFeatures.map((f) => (
                  <div key={f} className="pb-1 text-center font-mono text-[0.65rem] text-muted-foreground">
                    {f}
                  </div>
                ))}
                {correlationMatrix.map((row, i) => (
                  <div key={correlationFeatures[i]} className="contents">
                    <div className="pr-2 text-right font-mono text-[0.65rem] text-muted-foreground">
                      {correlationFeatures[i]}
                    </div>
                    {row.map((v, j) => (
                      <div
                        key={j}
                        className="flex aspect-square items-center justify-center rounded-md font-mono text-[0.62rem] transition-transform hover:scale-105"
                        style={{ background: heatColor(v) }}
                        title={`${correlationFeatures[i]} × ${correlationFeatures[j]}: ${v}`}
                      >
                        {v.toFixed(2)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-end gap-2 text-[0.7rem] text-muted-foreground">
                <span>-1.0</span>
                <span
                  className="h-2 w-32 rounded-full"
                  style={{ background: "linear-gradient(90deg, var(--violet), var(--surface-2), var(--primary))" }}
                />
                <span>+1.0</span>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel className="xl:col-span-2" title="Model accuracy trend" description="Rolling average across workspace runs">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyRuns}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={[85, 96]} stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip {...chartTooltip} />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="var(--chart-1)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--chart-1)" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel
          title="AI observations"
          actions={<Sparkles className="size-4 text-primary" />}
          contentClassName="space-y-3 text-sm text-muted-foreground"
        >
          <p>Churn concentrates sharply below 12 months of tenure — 31% versus a 5% floor after five years.</p>
          <p>
            <span className="text-foreground">Watch multicollinearity:</span> tenure and contract correlate at 0.62,
            so tree models will split the credit between them.
          </p>
          <p>Support-call count is the only feature with a positive monotonic relationship to churn at every level.</p>
        </Panel>
      </div>

      <Panel title="Feature analysis" contentClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.name}
            className="rounded-xl border border-border/70 bg-surface-2/50 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40"
          >
            <p className="font-mono text-xs">{f.name}</p>
            <p className="mt-2 text-[0.7rem] tracking-wide text-primary uppercase">{f.type}</p>
            <p className="mt-1 font-mono text-sm">{f.stat}</p>
            <p className="mt-2 text-xs text-muted-foreground">{f.note}</p>
          </div>
        ))}
      </Panel>
    </div>
  );
}
