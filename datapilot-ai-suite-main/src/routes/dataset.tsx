import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Copy, Columns3, Rows3, Sparkles } from "lucide-react";

import { PageHeader, Panel, StatCard } from "@/components/ui-kit";
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
import { previewColumns, previewRows } from "@/lib/sample-data";

export const Route = createFileRoute("/dataset")({
  head: () => ({
    meta: [
      { title: "Dataset Summary — DataPilot AI" },
      {
        name: "description",
        content: "Profile of telecom_customers.csv: rows, columns, missing values, duplicates and preview.",
      },
      { property: "og:title", content: "Dataset Summary — DataPilot AI" },
      { property: "og:description", content: "Understand your dataset structure and quality at a glance." },
    ],
  }),
  component: DatasetSummary,
});

const columnProfile = [
  { name: "customer_id", type: "string", unique: "184,220", missing: "0%", quality: 100 },
  { name: "tenure_months", type: "integer", unique: "72", missing: "0%", quality: 100 },
  { name: "contract", type: "category", unique: "7", missing: "0.2%", quality: 92 },
  { name: "monthly_charges", type: "float", unique: "1,584", missing: "1.0%", quality: 88 },
  { name: "support_calls", type: "integer", unique: "14", missing: "0%", quality: 97 },
  { name: "internal_notes", type: "text", unique: "6,402", missing: "96.4%", quality: 12 },
];

function DatasetSummary() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Profile"
        title="telecom_customers.csv"
        description="Ingested today at 09:41 · 48.2 MB · 21 columns detected · UTF-8, comma delimited."
        actions={
          <Button asChild className="bg-gradient-brand rounded-xl border-0">
            <Link to="/cleaning">Review cleaning plan</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Rows" value="184,220" delta="+12,404 vs last ingest" icon={<Rows3 className="size-4" />} />
        <StatCard label="Columns" value="21" delta="2 newly detected" icon={<Columns3 className="size-4" />} />
        <StatCard
          label="Missing values"
          value="3.1%"
          delta="Concentrated in 3 columns"
          icon={<AlertTriangle className="size-4" />}
        />
        <StatCard label="Duplicate records" value="612" delta="0.3% of dataset" icon={<Copy className="size-4" />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel className="xl:col-span-2" title="Data preview" description="First 7 rows" contentClassName="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {previewColumns.map((c) => (
                    <TableHead key={c} className="font-mono text-xs whitespace-nowrap">
                      {c}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewRows.map((row) => (
                  <TableRow key={row[0]} className="transition-colors hover:bg-accent/40">
                    {row.map((cell, i) => (
                      <TableCell key={i} className="font-mono text-xs whitespace-nowrap">
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Panel>

        <Panel
          title="AI summary"
          description="Generated in 8 seconds"
          actions={<Sparkles className="size-4 text-primary" />}
          contentClassName="space-y-4 text-sm leading-relaxed text-muted-foreground"
        >
          <p>
            This is a customer subscription dataset with a binary churn label at a 26.4% positive rate — imbalanced
            but workable without resampling.
          </p>
          <p>
            <span className="text-foreground">Signal is strong.</span> Contract type, tenure and support-call
            frequency separate churners clearly, so a gradient-boosted tree should reach the low nineties.
          </p>
          <p>
            <span className="text-foreground">Two concerns.</span> <code className="font-mono">internal_notes</code>{" "}
            is 96.4% empty and should be dropped, and <code className="font-mono">contract</code> carries seven
            spellings of three real categories.
          </p>
          <div className="rounded-xl border border-primary/30 bg-primary/8 p-3 text-xs text-foreground">
            Recommended next step: approve the 5-item cleaning plan, then run EDA.
          </div>
        </Panel>
      </div>

      <Panel title="Column profile" description="Type inference and per-column quality score" contentClassName="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Column</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden sm:table-cell">Unique</TableHead>
                <TableHead>Missing</TableHead>
                <TableHead className="w-40">Quality</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {columnProfile.map((c) => (
                <TableRow key={c.name} className="transition-colors hover:bg-accent/40">
                  <TableCell className="font-mono text-xs">{c.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full text-xs">
                      {c.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden font-mono text-xs text-muted-foreground sm:table-cell">
                    {c.unique}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{c.missing}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${c.quality > 80 ? "bg-success" : c.quality > 50 ? "bg-warning" : "bg-destructive"}`}
                          style={{ width: `${c.quality}%` }}
                        />
                      </div>
                      <span className="font-mono text-[0.7rem] text-muted-foreground">{c.quality}</span>
                    </div>
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
