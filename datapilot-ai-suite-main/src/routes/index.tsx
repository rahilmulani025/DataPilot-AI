import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  Check,
  Cpu,
  Database,
  Gauge,
  Layers,
  Loader2,
  MessagesSquare,
  Sparkles,
  UploadCloud,
} from "lucide-react";

import { AiAssistantPanel } from "@/components/ai-assistant-panel";
import { KpiTile } from "@/components/kpi-tile";
import { Panel } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  aiSummaryCards,
  activity,
  kpis,
  modelPerformance,
  pipelineStages,
  processingActivity,
  uploads,
} from "@/lib/sample-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Workspace Overview — DataPilot AI" },
      {
        name: "description",
        content:
          "Live pipeline status, dataset processing activity, model performance and AI-generated recommendations in one command center.",
      },
      { property: "og:title", content: "Workspace Overview — DataPilot AI" },
      {
        property: "og:description",
        content: "Track datasets, models and AI insights across your data science workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const kpiIcons = [
  <Layers className="size-3.5" key="a" />,
  <Database className="size-3.5" key="b" />,
  <Cpu className="size-3.5" key="c" />,
  <Gauge className="size-3.5" key="d" />,
];

const chartTooltip = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    fontSize: "12px",
    color: "var(--popover-foreground)",
  },
  labelStyle: { color: "var(--muted-foreground)" },
} as const;

const dotStyles = {
  success: "bg-success",
  info: "bg-primary",
  warning: "bg-warning",
};

function Hero() {
  return (
    <section className="glass-panel hairline-top bg-aurora animate-rise relative overflow-hidden px-6 py-7 md:px-8 md:py-9">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-[0.18]" />
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[0.68rem] font-medium tracking-[0.14em] text-primary uppercase">
            <span className="pulse-dot size-1.5 rounded-full bg-success" />
            Pipeline live
          </span>
          <h1 className="font-display text-3xl leading-[1.1] font-semibold tracking-tight md:text-[2.6rem]">
            Good morning, Aarav.
            <br />
            <span className="text-gradient">Churn Prediction Q3</span> is ready for your call.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
            The copilot cleaned 182,378 rows overnight, ran 24 training trials and lifted validation AUC
            to 0.946. Two cleaning actions still need your approval before the champion can ship.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button asChild className="bg-gradient-brand rounded-xl border-0">
              <Link to="/upload">
                <UploadCloud className="size-4" /> New dataset
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl bg-surface/40">
              <Link to="/chat">
                <MessagesSquare className="size-4" /> Chat with data
              </Link>
            </Button>
            <Button asChild variant="ghost" className="rounded-xl text-muted-foreground">
              <Link to="/insights">
                View insights <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-3 lg:w-[26rem]">
          {aiSummaryCards.map((c) => (
            <div
              key={c.label}
              className="rounded-xl border border-border/60 bg-surface/50 p-3.5 backdrop-blur-sm transition-colors hover:border-primary/40"
            >
              <p className="text-[0.62rem] tracking-[0.12em] text-muted-foreground uppercase">
                {c.label}
              </p>
              <p className="font-display mt-1.5 text-xl font-semibold tracking-tight">{c.value}</p>
              <p className="mt-1.5 text-[0.7rem] leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-8 border-t border-border/60 pt-5">
        <div className="flex items-center justify-between gap-3 pb-3">
          <p className="text-[0.68rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Pipeline status · telecom_customers_v3
          </p>
          <span className="font-mono text-[0.7rem] text-muted-foreground">4 / 7 stages complete</span>
        </div>
        <ol className="grid gap-2 sm:grid-cols-4 xl:grid-cols-7">
          {pipelineStages.map((s) => (
            <li
              key={s.name}
              className={`rounded-lg border px-3 py-2.5 transition-colors ${
                s.state === "active"
                  ? "border-primary/50 bg-primary/10"
                  : s.state === "done"
                    ? "border-border/60 bg-surface-2/40"
                    : "border-dashed border-border/60 bg-transparent"
              }`}
            >
              <div className="flex items-center gap-1.5">
                {s.state === "done" && <Check className="size-3 text-success" />}
                {s.state === "active" && <Loader2 className="size-3 animate-spin text-primary" />}
                {s.state === "queued" && <span className="size-1.5 rounded-full bg-muted-foreground/50" />}
                <span
                  className={`text-xs font-medium ${s.state === "queued" ? "text-muted-foreground" : ""}`}
                >
                  {s.name}
                </span>
              </div>
              <p className="mt-1 truncate font-mono text-[0.62rem] text-muted-foreground">{s.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <div className="space-y-5">
      <Hero />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k, i) => (
          <KpiTile key={k.label} {...k} icon={kpiIcons[i]} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <div className="grid gap-5 lg:grid-cols-2">
            <Panel
              title="Processing activity"
              description="Rows ingested per day (thousands)"
              contentClassName="pt-2"
            >
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={processingActivity} margin={{ left: -22, right: 4, top: 6 }}>
                  <defs>
                    <linearGradient id="rowsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ stroke: "var(--primary)", strokeOpacity: 0.3 }} {...chartTooltip} />
                  <Area
                    type="monotone"
                    dataKey="rows"
                    stroke="var(--chart-1)"
                    strokeWidth={2.2}
                    fill="url(#rowsFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Panel>

            <Panel
              title="Model performance"
              description="Champion XGBoost v4 vs. baseline"
              contentClassName="pt-2"
              actions={
                <Badge variant="outline" className="rounded-full border-success/30 bg-success/15 text-success">
                  +7.3 pts
                </Badge>
              }
            >
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={modelPerformance} margin={{ left: -22, right: 4, top: 6 }} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="metric"
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[70, 100]}
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip cursor={{ fill: "var(--accent)", opacity: 0.35 }} {...chartTooltip} />
                  <Bar dataKey="baseline" fill="var(--surface-2)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="champion" radius={[4, 4, 0, 0]}>
                    {modelPerformance.map((m) => (
                      <Cell key={m.metric} fill="var(--chart-1)" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Panel>
          </div>

          <Panel
            title="Recent datasets"
            description="Latest ingests across the workspace"
            contentClassName="p-0"
            actions={
              <Button asChild variant="ghost" size="sm" className="rounded-lg text-muted-foreground">
                <Link to="/dataset">
                  Browse all <ArrowUpRight className="size-3.5" />
                </Link>
              </Button>
            }
          >
            <ul className="divide-y divide-border/60">
              {uploads.map((u) => (
                <li
                  key={u.name}
                  className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-accent/30"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-2/70 text-primary transition-colors group-hover:bg-primary/15">
                    <Database className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-sm">{u.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {u.rows} rows · {u.size} · {u.when}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`rounded-full ${
                      u.status === "Ready"
                        ? "border-success/30 bg-success/15 text-success"
                        : "border-warning/30 bg-warning/15 text-warning"
                    }`}
                  >
                    {u.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="space-y-5">
          <AiAssistantPanel />

          <Panel
            title="Activity"
            description="Last 48 hours"
            actions={<Sparkles className="size-4 text-primary" />}
          >
            <ol className="relative space-y-5 border-l border-border/60 pl-5">
              {activity.map((item) => (
                <li key={item.title} className="relative">
                  <span
                    className={`absolute top-1.5 -left-[1.55rem] size-2 rounded-full ring-4 ring-background ${dotStyles[item.kind]}`}
                  />
                  <p className="text-sm leading-snug font-medium">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
                  <p className="mt-1 font-mono text-[0.65rem] text-muted-foreground/70">{item.time}</p>
                </li>
              ))}
            </ol>
          </Panel>
        </div>
      </div>
    </div>
  );
}
