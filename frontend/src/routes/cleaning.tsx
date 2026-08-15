import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ListChecks, ShieldCheck, TrendingUp, X } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cleaningActions } from "@/lib/sample-data";

export const Route = createFileRoute("/cleaning")({
  head: () => ({
    meta: [
      { title: "Cleaning Approval — DataPilot AI" },
      {
        name: "description",
        content: "Review, approve or reject each AI-proposed data cleaning action with impact estimates.",
      },
      { property: "og:title", content: "Cleaning Approval — DataPilot AI" },
      { property: "og:description", content: "A reviewable, auditable cleaning workflow for your dataset." },
    ],
  }),
  component: CleaningApproval,
});

const severityStyles: Record<string, string> = {
  high: "border-destructive/30 bg-destructive/12 text-destructive",
  medium: "border-warning/30 bg-warning/12 text-warning",
  low: "border-border bg-muted text-muted-foreground",
};

type Decision = "pending" | "approved" | "rejected";

function CleaningApproval() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>(
    Object.fromEntries(cleaningActions.map((a) => [a.id, "pending" as Decision])),
  );

  const approved = Object.values(decisions).filter((d) => d === "approved").length;
  const rejected = Object.values(decisions).filter((d) => d === "rejected").length;
  const pending = cleaningActions.length - approved - rejected;

  const setAll = (d: Decision) =>
    setDecisions(Object.fromEntries(cleaningActions.map((a) => [a.id, d])) as Record<string, Decision>);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Review"
        title="Cleaning approval"
        description="Every transformation is reversible and logged. Approve the ones you want applied to telecom_customers.csv."
        actions={
          <>
            <Button variant="outline" className="rounded-xl" onClick={() => setAll("pending")}>
              Reset
            </Button>
            <Button
              className="bg-gradient-brand rounded-xl border-0"
              onClick={() => {
                setAll("approved");
                toast.success("All recommendations approved", {
                  description: "Cleaning job queued — estimated 90 seconds.",
                });
              }}
            >
              <Check className="size-4" /> Approve all
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Approved", value: approved, icon: Check, tone: "text-success" },
          { label: "Rejected", value: rejected, icon: X, tone: "text-destructive" },
          { label: "Awaiting review", value: pending, icon: ListChecks, tone: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="surface-panel animate-rise flex items-center gap-4 p-4">
            <span className={`flex size-10 items-center justify-center rounded-xl bg-surface-2 ${s.tone}`}>
              <s.icon className="size-4" />
            </span>
            <div>
              <p className="font-display text-2xl font-semibold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          {cleaningActions.map((action) => {
            const decision = decisions[action.id];
            return (
              <article
                key={action.id}
                className={`surface-panel animate-rise p-5 transition-all duration-300 ${
                  decision === "approved"
                    ? "border-success/40"
                    : decision === "rejected"
                      ? "border-destructive/40 opacity-70"
                      : "hover:-translate-y-0.5 hover:border-primary/40"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold">{action.title}</h3>
                      <Badge variant="outline" className={`rounded-full text-[0.68rem] ${severityStyles[action.severity]}`}>
                        {action.severity} priority
                      </Badge>
                    </div>
                    <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">{action.detail}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {action.columns.map((c) => (
                        <span key={c} className="rounded-md bg-muted px-2 py-0.5 font-mono text-[0.7rem]">
                          {c}
                        </span>
                      ))}
                      <span className="flex items-center gap-1 text-xs text-success">
                        <TrendingUp className="size-3.5" /> {action.impact}
                      </span>
                    </div>
                  </div>

                  {decision === "pending" ? (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                        onClick={() => setDecisions((d) => ({ ...d, [action.id]: "rejected" }))}
                      >
                        <X className="size-3.5" /> Reject
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-brand rounded-xl border-0"
                        onClick={() => setDecisions((d) => ({ ...d, [action.id]: "approved" }))}
                      >
                        <Check className="size-3.5" /> Approve
                      </Button>
                    </div>
                  ) : (
                    <Badge
                      variant="outline"
                      className={`rounded-full ${
                        decision === "approved"
                          ? "border-success/40 bg-success/15 text-success"
                          : "border-destructive/40 bg-destructive/15 text-destructive"
                      }`}
                    >
                      {decision === "approved" ? "Approved" : "Rejected"}
                    </Badge>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="space-y-6">
          <Panel title="Estimated impact" contentClassName="space-y-4">
            {[
              { label: "Rows retained", value: "182,378", note: "99.0% of original" },
              { label: "Completeness", value: "99.4%", note: "up from 96.9%" },
              { label: "Feature count", value: "20", note: "1 column dropped" },
              { label: "Est. accuracy lift", value: "+2.4 pts", note: "on baseline model" },
            ].map((m) => (
              <div key={m.label} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm">{m.label}</p>
                  <p className="text-xs text-muted-foreground">{m.note}</p>
                </div>
                <p className="font-mono text-sm font-medium">{m.value}</p>
              </div>
            ))}
          </Panel>

          <Panel title="Governance" contentClassName="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
              <p>Every applied transformation is versioned. Roll back to any snapshot within 90 days.</p>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
              <p>Approvals are attributed and exported with the audit trail in your technical report.</p>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
