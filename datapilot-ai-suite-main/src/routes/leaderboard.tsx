import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Download, Rocket } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { leaderboard } from "@/lib/sample-data";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Model Leaderboard — DataPilot AI" },
      {
        name: "description",
        content: "Compare trained models by accuracy, precision, recall and F1 score, then promote the winner.",
      },
      { property: "og:title", content: "Model Leaderboard — DataPilot AI" },
      { property: "og:description", content: "Rank every trained model and deploy the best one." },
    ],
  }),
  component: Leaderboard,
});

function Leaderboard() {
  const best = leaderboard[0]!;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Benchmark"
        title="Model leaderboard"
        description="Six algorithms evaluated on a held-out 18,238-row test set with identical preprocessing."
        actions={
          <Button variant="outline" className="rounded-xl" onClick={() => toast.success("Metrics exported as CSV")}>
            <Download className="size-4" /> Export metrics
          </Button>
        }
      />

      <div className="surface-panel animate-rise glow-ring grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <Badge variant="outline" className="rounded-full border-primary/40 bg-primary/12 text-primary">
            <Crown className="size-3.5" /> Best model
          </Badge>
          <h2 className="mt-3 font-display text-2xl font-semibold">{best.model}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Trained in {best.time} · 24 tuning trials · 5-fold cross-validated
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { k: "Accuracy", v: best.accuracy },
              { k: "Precision", v: best.precision },
              { k: "Recall", v: best.recall },
              { k: "F1 score", v: best.f1 },
            ].map((m) => (
              <div key={m.k}>
                <p className="text-xs text-muted-foreground">{m.k}</p>
                <p className="text-gradient font-display text-2xl font-semibold">{m.v}%</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            className="bg-gradient-brand rounded-xl border-0"
            onClick={() => toast.success("XGBoost promoted to production endpoint")}
          >
            <Rocket className="size-4" /> Deploy model
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/explainability">View explainability</Link>
          </Button>
        </div>
      </div>

      <Panel title="All runs" description="Sorted by F1 score" contentClassName="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-14">#</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead className="hidden sm:table-cell">Precision</TableHead>
                <TableHead className="hidden sm:table-cell">Recall</TableHead>
                <TableHead>F1</TableHead>
                <TableHead className="hidden text-right md:table-cell">Train time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((m) => (
                <TableRow
                  key={m.model}
                  className={`transition-colors hover:bg-accent/40 ${m.rank === 1 ? "bg-primary/6" : ""}`}
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">{m.rank}</TableCell>
                  <TableCell className="font-medium">
                    <span className="flex items-center gap-2">
                      {m.model}
                      {m.rank === 1 && <Crown className="size-3.5 text-primary" />}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-muted sm:block">
                        <div className="bg-gradient-brand h-full rounded-full" style={{ width: `${m.accuracy}%` }} />
                      </div>
                      <span className="font-mono text-sm">{m.accuracy}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden font-mono text-sm sm:table-cell">{m.precision}%</TableCell>
                  <TableCell className="hidden font-mono text-sm sm:table-cell">{m.recall}%</TableCell>
                  <TableCell className="font-mono text-sm">{m.f1}%</TableCell>
                  <TableCell className="hidden text-right font-mono text-xs text-muted-foreground md:table-cell">
                    {m.time}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Panel>
    </div>
  );
}
