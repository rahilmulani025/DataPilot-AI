import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Download, FileText, Inbox, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { EmptyState, PageHeader, Panel } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { exportHistory, reportTemplates } from "@/lib/sample-data";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — DataPilot AI" },
      {
        name: "description",
        content: "Generate executive summaries, technical reports, model cards and data quality audits as PDF.",
      },
      { property: "og:title", content: "Reports — DataPilot AI" },
      { property: "og:description", content: "Export polished, shareable reports from any project." },
    ],
  }),
  component: Reports,
});

function Reports() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [scheduled] = useState<string[]>([]);

  const generate = (name: string) => {
    setGenerating(name);
    setTimeout(() => {
      setGenerating(null);
      toast.success(`${name} ready`, { description: "Download started automatically." });
    }, 1600);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Deliverables"
        title="Reports"
        description="Every report is generated from the current project state, with charts, tables and the full audit trail."
      />

      <Panel title="Report templates" contentClassName="grid gap-4 sm:grid-cols-2">
        {reportTemplates.map((t) => (
          <article
            key={t.name}
            className="group flex flex-col rounded-xl border border-border/70 bg-surface-2/40 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50"
          >
            <div className="flex items-start justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <FileText className="size-4" />
              </span>
              <Badge variant="secondary" className="rounded-full text-[0.68rem]">
                {t.format} · {t.pages} pages
              </Badge>
            </div>
            <p className="mt-4 text-sm font-semibold">{t.name}</p>
            <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">{t.detail}</p>
            <Button
              size="sm"
              className="bg-gradient-brand mt-4 w-full rounded-xl border-0"
              disabled={generating === t.name}
              onClick={() => generate(t.name)}
            >
              {generating === t.name ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Download className="size-4" /> Generate {t.format}
                </>
              )}
            </Button>
          </article>
        ))}
      </Panel>

      {generating && (
        <Panel title="Rendering preview" contentClassName="space-y-3">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </Panel>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel className="xl:col-span-2" title="Export history" contentClassName="p-0">
          <ul className="divide-y divide-border/70">
            {exportHistory.map((e) => (
              <li key={e.name} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-accent/30">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-primary">
                  <FileText className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{e.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {e.by} · {e.when} · {e.size}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label={`Download ${e.name}`}
                  onClick={() => toast.success("Download started")}
                >
                  <Download className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Scheduled reports" contentClassName="p-4">
          {scheduled.length === 0 ? (
            <EmptyState
              icon={<Inbox className="size-6" />}
              title="No scheduled reports"
              description="Set a recurring export and DataPilot will email the latest version to your stakeholders."
              action={
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => toast.info("Scheduling opens in workspace settings")}
                >
                  <Clock className="size-4" /> Schedule a report
                </Button>
              }
            />
          ) : null}
        </Panel>
      </div>
    </div>
  );
}
