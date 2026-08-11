import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Database, Send, Sparkles, User } from "lucide-react";

import { PageHeader, Panel } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { suggestedPrompts } from "@/lib/sample-data";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat With Data — DataPilot AI" },
      {
        name: "description",
        content: "Ask questions in plain English and get answers, tables and charts grounded in your dataset.",
      },
      { property: "og:title", content: "Chat With Data — DataPilot AI" },
      { property: "og:description", content: "Conversational analytics over your connected datasets." },
    ],
  }),
  component: ChatWithData,
});

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  sql?: string;
  table?: { headers: string[]; rows: string[][] };
};

const initialMessages: Message[] = [
  {
    id: 1,
    role: "user",
    content: "Which customer segment has the highest churn risk?",
  },
  {
    id: 2,
    role: "assistant",
    content:
      "Month-to-month customers in their first year carry the highest risk: 38.6% churn against a 26.4% dataset baseline. They represent 19% of the base but 41% of all churn events.",
    sql: "SELECT contract, tenure_bucket, AVG(churned) AS churn_rate\nFROM telecom_customers_v3\nGROUP BY 1, 2\nORDER BY churn_rate DESC\nLIMIT 4;",
    table: {
      headers: ["contract", "tenure", "customers", "churn rate"],
      rows: [
        ["Month-to-month", "0–12 mo", "34,981", "38.6%"],
        ["Month-to-month", "13–24 mo", "18,204", "27.1%"],
        ["One year", "0–12 mo", "12,660", "14.9%"],
        ["Two year", "0–12 mo", "9,412", "6.2%"],
      ],
    },
  },
];

const cannedReply: Message = {
  id: 0,
  role: "assistant",
  content:
    "Across contract types, annual and two-year plans retain 93.8% of revenue year over year, while month-to-month retains 71.2%. The gap widens for customers paying above $80 per month, where month-to-month retention drops to 64.5%.",
  sql: "SELECT contract, SUM(retained_revenue) / SUM(prior_revenue) AS retention\nFROM revenue_snapshots\nGROUP BY 1;",
};

function ChatWithData() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const counter = useRef(3);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || thinking) return;
    setMessages((m) => [...m, { id: counter.current++, role: "user", content: value }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { ...cannedReply, id: counter.current++ }]);
      setThinking(false);
    }, 1300);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Copilot"
        title="Chat with your data"
        description="Answers are generated from the cleaned dataset and always show the query behind them."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Panel className="glass-panel hairline-top relative" contentClassName="flex h-[36rem] flex-col p-0">
          <div className="flex-1 space-y-7 overflow-y-auto px-5 py-6">
            {messages.map((m) => (
              <div key={m.id} className="animate-rise flex gap-3.5">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                    m.role === "assistant"
                      ? "bg-gradient-brand text-primary-foreground shadow-[var(--shadow-glow)]"
                      : "border border-border/60 bg-surface-2 text-muted-foreground"
                  }`}
                >
                  {m.role === "assistant" ? <Sparkles className="size-4" /> : <User className="size-4" />}
                </span>
                <div className="min-w-0 flex-1 space-y-2.5">
                  <p className="text-[0.7rem] font-medium tracking-[0.1em] text-muted-foreground uppercase">
                    {m.role === "assistant" ? "DataPilot" : "You"}
                  </p>
                  {m.role === "user" ? (
                    <p className="inline-block rounded-xl rounded-tl-sm bg-primary px-3.5 py-2 text-sm leading-relaxed text-primary-foreground">
                      {m.content}
                    </p>
                  ) : (
                    <p className="text-sm leading-relaxed">{m.content}</p>
                  )}
                  {m.sql && (
                    <details className="group rounded-xl border border-border/60 bg-background/50">
                      <summary className="cursor-pointer list-none px-3 py-2 text-[0.7rem] font-medium tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:text-foreground">
                        SQL used
                      </summary>
                      <pre className="overflow-x-auto border-t border-border/60 px-3 py-2.5 font-mono text-[0.7rem] leading-relaxed text-muted-foreground">
                        {m.sql}
                      </pre>
                    </details>
                  )}
                  {m.table && (
                    <div className="overflow-x-auto rounded-xl border border-border/60">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-surface-2/60">
                          <tr>
                            {m.table.headers.map((h) => (
                              <th key={h} className="px-3 py-2 font-mono font-medium text-muted-foreground">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {m.table.rows.map((r) => (
                            <tr key={r.join("-")} className="transition-colors hover:bg-accent/30">
                              {r.map((c, i) => (
                                <td key={i} className="px-3 py-2 font-mono">
                                  {c}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {thinking && (
              <div className="flex gap-3.5">
                <span className="bg-gradient-brand flex size-8 shrink-0 items-center justify-center rounded-lg text-primary-foreground">
                  <Sparkles className="size-4 animate-pulse" />
                </span>
                <div className="flex-1 space-y-2">
                  <p className="text-[0.7rem] tracking-[0.1em] text-muted-foreground uppercase">
                    Querying dataset…
                  </p>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border/60 bg-surface/40 p-4 backdrop-blur-sm">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="rounded-full border border-border/60 bg-surface-2/40 px-3 py-1.5 text-xs text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
                >
                  {p}
                </button>
              ))}
            </div>
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about telecom_customers.csv…"
                aria-label="Message"
                className="h-11 flex-1 rounded-xl border border-border bg-background/60 px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-ring/30"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gradient-brand size-11 shrink-0 rounded-xl border-0"
                aria-label="Send"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </Panel>


        <div className="space-y-6">
          <Panel title="Dataset context" contentClassName="space-y-4">
            <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/8 p-3">
              <Database className="size-4 text-primary" />
              <div className="min-w-0">
                <p className="truncate font-mono text-xs">telecom_customers_v3</p>
                <p className="text-[0.7rem] text-muted-foreground">182,378 rows · 20 columns</p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              {[
                ["Cleaned", "Today, 09:44"],
                ["Model", "XGBoost v4"],
                ["Row-level access", "Enabled"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border/50 pb-2 last:border-0">
                  <span>{k}</span>
                  <span className="text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Available columns" contentClassName="flex flex-wrap gap-2">
            {[
              "customer_id",
              "tenure_months",
              "contract",
              "monthly_charges",
              "total_charges",
              "support_calls",
              "payment_method",
              "add_on_count",
              "region",
              "churned",
            ].map((c) => (
              <Badge key={c} variant="secondary" className="rounded-full font-mono text-[0.68rem]">
                {c}
              </Badge>
            ))}
          </Panel>
        </div>
      </div>
    </div>
  );
}
