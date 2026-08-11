import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Cpu, Play, Square, Terminal } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trainingLogs } from "@/lib/sample-data";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Model Training — DataPilot AI" },
      {
        name: "description",
        content: "Select algorithms, configure training and watch live logs as models fit your dataset.",
      },
      { property: "og:title", content: "Model Training — DataPilot AI" },
      { property: "og:description", content: "Configure and launch automated model training runs." },
    ],
  }),
  component: ModelTraining,
});

const models = [
  { name: "XGBoost", detail: "Gradient boosted trees, best all-round accuracy", eta: "~4 min", tag: "Recommended" },
  { name: "LightGBM", detail: "Fastest on wide tabular data", eta: "~3 min", tag: "Fast" },
  { name: "Random Forest", detail: "Robust baseline, low tuning sensitivity", eta: "~6 min", tag: "" },
  { name: "CatBoost", detail: "Handles high-cardinality categories natively", eta: "~5 min", tag: "" },
  { name: "Logistic Regression", detail: "Interpretable linear baseline", eta: "~20 sec", tag: "Baseline" },
  { name: "Neural Network", detail: "2-layer MLP with dropout regularisation", eta: "~9 min", tag: "" },
];

function ModelTraining() {
  const [selected, setSelected] = useState<string[]>(["XGBoost", "LightGBM"]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logLines, setLogLines] = useState<string[]>(trainingLogs.slice(0, 3));

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 4;
        if (next >= 100) {
          setRunning(false);
          toast.success("Training complete", { description: "XGBoost reached 94.2% test accuracy." });
          return 100;
        }
        return next;
      });
      setLogLines((l) => (l.length < trainingLogs.length ? trainingLogs.slice(0, l.length + 1) : l));
    }, 700);
    return () => clearInterval(id);
  }, [running]);

  const toggle = (name: string) =>
    setSelected((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Modeling"
        title="Model training"
        description="Pick the algorithms to benchmark. DataPilot tunes hyperparameters and validates each run for you."
        actions={
          running ? (
            <Button variant="outline" className="rounded-xl" onClick={() => setRunning(false)}>
              <Square className="size-4" /> Stop run
            </Button>
          ) : (
            <Button
              className="bg-gradient-brand rounded-xl border-0"
              disabled={selected.length === 0}
              onClick={() => {
                setProgress(0);
                setLogLines(trainingLogs.slice(0, 3));
                setRunning(true);
              }}
            >
              <Play className="size-4" /> Start training
            </Button>
          )
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Model selection"
          description={`${selected.length} algorithms selected`}
          contentClassName="grid gap-4 sm:grid-cols-2"
        >
          {models.map((m) => {
            const active = selected.includes(m.name);
            return (
              <button
                key={m.name}
                type="button"
                onClick={() => toggle(m.name)}
                className={`rounded-xl border p-4 text-left transition-all duration-300 ${
                  active
                    ? "border-primary/60 bg-primary/8 glow-ring"
                    : "border-border/70 bg-surface-2/40 hover:-translate-y-0.5 hover:border-primary/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-surface text-primary">
                    <Cpu className="size-4" />
                  </span>
                  {active ? (
                    <span className="bg-gradient-brand flex size-5 items-center justify-center rounded-full text-primary-foreground">
                      <Check className="size-3" />
                    </span>
                  ) : (
                    m.tag && (
                      <Badge variant="secondary" className="rounded-full text-[0.65rem]">
                        {m.tag}
                      </Badge>
                    )
                  )}
                </div>
                <p className="mt-3 text-sm font-semibold">{m.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.detail}</p>
                <p className="mt-2 font-mono text-[0.7rem] text-muted-foreground/80">{m.eta}</p>
              </button>
            );
          })}
        </Panel>

        <Panel title="Training configuration" contentClassName="space-y-5">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Target column</Label>
            <Select defaultValue="churned">
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="churned">churned</SelectItem>
                <SelectItem value="ltv_bucket">ltv_bucket</SelectItem>
                <SelectItem value="upsell_flag">upsell_flag</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Optimisation metric</Label>
            <Select defaultValue="f1">
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="f1">F1 score</SelectItem>
                <SelectItem value="auc">ROC AUC</SelectItem>
                <SelectItem value="accuracy">Accuracy</SelectItem>
                <SelectItem value="recall">Recall</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Train / test split</Label>
              <span className="font-mono text-xs">80 / 20</span>
            </div>
            <Slider defaultValue={[80]} min={50} max={95} step={5} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Tuning trials</Label>
              <span className="font-mono text-xs">24</span>
            </div>
            <Slider defaultValue={[24]} min={5} max={100} step={1} />
          </div>

          {[
            { label: "Cross-validation (5-fold)", def: true },
            { label: "Class weight balancing", def: true },
            { label: "Early stopping", def: true },
            { label: "Auto feature selection", def: false },
          ].map((o) => (
            <div key={o.label} className="flex items-center justify-between border-t border-border/60 pt-3">
              <Label className="text-sm font-normal">{o.label}</Label>
              <Switch defaultChecked={o.def} />
            </div>
          ))}
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Training status" contentClassName="space-y-4">
          <div className="flex items-center gap-3">
            <span
              className={`size-2.5 rounded-full ${running ? "animate-pulse bg-primary" : progress === 100 ? "bg-success" : "bg-muted-foreground"}`}
            />
            <p className="text-sm font-medium">
              {running ? "Training in progress" : progress === 100 ? "Run complete" : "Idle — ready to start"}
            </p>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { k: "Elapsed", v: running ? "01:24" : progress === 100 ? "04:51" : "—" },
              { k: "Best AUC", v: progress > 40 ? "0.9461" : "—" },
              { k: "Trials done", v: `${Math.round((progress / 100) * 24)} / 24` },
              { k: "Compute", v: "8 vCPU · 32 GB" },
            ].map((m) => (
              <div key={m.k} className="rounded-lg border border-border/70 p-3">
                <p className="text-muted-foreground">{m.k}</p>
                <p className="mt-1 font-mono text-sm text-foreground">{m.v}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          className="xl:col-span-2"
          title="Training logs"
          actions={<Terminal className="size-4 text-muted-foreground" />}
          contentClassName="p-0"
        >
          <pre className="max-h-72 overflow-auto bg-background/60 p-5 font-mono text-xs leading-relaxed text-muted-foreground">
            {logLines.map((line) => (
              <div key={line} className="animate-rise">
                <span className="text-primary">›</span> {line}
              </div>
            ))}
            {running && <div className="mt-1 animate-pulse text-primary">▍</div>}
          </pre>
        </Panel>
      </div>
    </div>
  );
}
