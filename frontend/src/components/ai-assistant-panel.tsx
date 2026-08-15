import { Link } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, MessagesSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { aiSuggestedActions, suggestedPrompts } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export function AiAssistantPanel({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "glass-panel hairline-top animate-rise relative flex flex-col overflow-hidden",
        className,
      )}
    >
      <header className="flex items-center gap-3 border-b border-border/60 px-5 py-4">
        <span className="bg-gradient-brand flex size-9 items-center justify-center rounded-xl text-primary-foreground shadow-[var(--shadow-glow)]">
          <BrainCircuit className="size-4.5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold">Copilot</p>
          <p className="flex items-center gap-1.5 text-[0.7rem] text-muted-foreground">
            <span className="pulse-dot size-1.5 rounded-full bg-success" />
            Watching 12 pipelines
          </p>
        </div>
      </header>

      <div className="space-y-3 p-4">
        <p className="px-1 text-[0.68rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Recommended next
        </p>
        {aiSuggestedActions.map((a) => (
          <Link
            key={a.title}
            to={a.to}
            className="group block rounded-xl border border-border/60 bg-surface-2/40 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-surface-2/70"
          >
            <p className="text-sm leading-snug font-medium">{a.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{a.detail}</p>
            <span className="mt-2.5 inline-flex items-center gap-1 text-[0.7rem] font-medium text-primary">
              {a.cta}
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-auto space-y-2.5 border-t border-border/60 p-4">
        <p className="px-1 text-[0.68rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Ask the copilot
        </p>
        <div className="flex flex-wrap gap-1.5">
          {suggestedPrompts.slice(0, 3).map((p) => (
            <Link
              key={p}
              to="/chat"
              className="rounded-full border border-border/60 bg-surface-2/40 px-2.5 py-1 text-[0.7rem] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              {p}
            </Link>
          ))}
        </div>
        <Button asChild size="sm" className="bg-gradient-brand mt-1 w-full rounded-xl border-0">
          <Link to="/chat">
            <MessagesSquare className="size-4" /> Open chat with data
          </Link>
        </Button>
      </div>
    </aside>
  );
}
