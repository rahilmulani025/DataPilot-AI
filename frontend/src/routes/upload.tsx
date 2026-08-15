import { useCallback, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  FileJson,
  FileSpreadsheet,
  FileText,
  Lock,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel, EmptyState } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  datasetPreviewStats,
  previewColumns,
  previewRows,
  uploads,
} from "@/lib/sample-data";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Dataset — DataPilot AI" },
      {
        name: "description",
        content:
          "Drop a CSV, Parquet, JSON or Excel file and watch the copilot profile the schema, preview rows and draft a cleaning plan.",
      },
      { property: "og:title", content: "Upload Dataset — DataPilot AI" },
      { property: "og:description", content: "Onboard a dataset and let the copilot profile it instantly." },
    ],
  }),
  component: UploadPage,
});

const formats = [
  { icon: FileSpreadsheet, name: "CSV / TSV", detail: "Up to 5 GB, delimiter auto-detected" },
  { icon: FileText, name: "Excel", detail: ".xlsx and .xls, multi-sheet aware" },
  { icon: FileJson, name: "JSON / NDJSON", detail: "Nested objects flattened automatically" },
  { icon: FileSpreadsheet, name: "Parquet", detail: "Columnar, schema preserved" },
];

function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startUpload = useCallback((name: string) => {
    if (timer.current) clearInterval(timer.current);
    setFileName(name);
    setProgress(0);
    timer.current = setInterval(() => {
      setProgress((p) => {
        const next = (p ?? 0) + Math.random() * 14 + 4;
        if (next >= 100) {
          if (timer.current) clearInterval(timer.current);
          toast.success("Upload complete", { description: `${name} is ready for profiling.` });
          return 100;
        }
        return next;
      });
    }, 320);
  }, []);

  const done = progress !== null && progress >= 100;

  return (
  <div className="space-y-5">

    <input
      ref={fileInputRef}
      type="file"
      className="hidden"
      accept=".csv,.xlsx,.xls,.json,.parquet"
      onChange={(e) => {
        const file = e.target.files?.[0];

        if (file) {
          
          setSelectedFile(file);
          startUpload(file.name);
        }
      }}
    />

    <PageHeader
        eyebrow="Ingest"
        title="Bring in a dataset"
        description="Drop a file and the copilot profiles the schema, flags quality issues and drafts a cleaning plan before you touch a line of code."
        actions={
          <Badge variant="outline" className="rounded-full border-border/60 bg-surface-2/50 text-muted-foreground">
            <ShieldCheck className="size-3.5 text-success" /> Encrypted at rest
          </Badge>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-5">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const f = e.dataTransfer.files?.[0];

              if (f) {
                  setSelectedFile(f);
                  startUpload(f.name);
                  }
            }}
            className={`glass-panel bg-aurora animate-rise relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-all duration-300 ${
              dragging ? "border-primary bg-primary/5 glow-ring scale-[1.005]" : "border-border/70"
            }`}
          >
            <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-[0.16]" />
            <span
              className={`bg-gradient-brand relative flex size-16 items-center justify-center rounded-2xl text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 ${
                dragging ? "scale-110" : ""
              }`}
            >
              <UploadCloud className="size-7" />
            </span>
            <h2 className="font-display relative mt-6 text-xl font-semibold tracking-tight">
              Drop your dataset here
            </h2>
            <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              CSV, Excel, JSON or Parquet up to 5 GB. Files are encrypted at rest and never used for
              training.
            </p>
            <div className="relative mt-6 flex flex-wrap justify-center gap-2">
              <Button
                className="bg-gradient-brand rounded-xl border-0"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse files
              </Button>
              <Button
                variant="outline"
                className="rounded-xl bg-surface/40"
                onClick={() => startUpload("sample_churn.csv")}
              >
                <Zap className="size-4" /> Use sample dataset
              </Button>
            </div>
            <p className="relative mt-5 inline-flex items-center gap-1.5 text-[0.7rem] text-muted-foreground">
              <Lock className="size-3" /> SOC 2 Type II · data never leaves your region
            </p>
          </div>

          {progress !== null && (
            <Panel title={done ? "Profiling dataset" : "Upload in progress"} contentClassName="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-mono text-sm">{fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {done ? "Inferring column types and quality metrics…" : "Uploading to secure storage"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{Math.min(100, Math.round(progress))}%</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 rounded-lg"
                    aria-label="Cancel upload"
                    onClick={() => {
                      if (timer.current) clearInterval(timer.current);
                      setProgress(null);
                    }}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </div>
              <Progress value={Math.min(100, progress)} className="h-1.5" />
              {done && (
                <div className="space-y-2 pt-1">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              )}
            </Panel>
          )}

          <Panel
            title="Dataset preview"
            description="First rows of telecom_customers.csv with inferred types"
            contentClassName="p-0"
            actions={<Sparkles className="size-4 text-primary" />}
          >
            <div className="grid grid-cols-2 gap-px border-b border-border/60 bg-border/40 sm:grid-cols-4">
              {datasetPreviewStats.map((s) => (
                <div key={s.label} className="bg-surface/70 px-5 py-3">
                  <p className="text-[0.62rem] tracking-[0.12em] text-muted-foreground uppercase">
                    {s.label}
                  </p>
                  <p className="mt-1 font-mono text-sm">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-2/50">
                  <tr>
                    {previewColumns.map((c) => (
                      <th key={c} className="px-4 py-2.5 font-mono font-medium text-muted-foreground">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {previewRows.map((r) => (
                    <tr key={r[0]} className="transition-colors hover:bg-accent/30">
                      {r.map((cell, i) => (
                        <td key={i} className="px-4 py-2.5 font-mono">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Upload history" contentClassName="p-0">
            {uploads.length === 0 ? (
              <div className="p-5">
                <EmptyState
                  icon={<UploadCloud className="size-6" />}
                  title="No uploads yet"
                  description="Your ingested datasets will appear here with row counts, size and processing status."
                />
              </div>
            ) : (
              <ul className="divide-y divide-border/60">
                {uploads.map((u) => (
                  <li
                    key={u.name}
                    className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-accent/30"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface-2/70 text-primary transition-colors group-hover:bg-primary/15">
                      <FileSpreadsheet className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-mono text-sm">{u.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {u.size} · {u.rows} rows · {u.when}
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
            )}
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel title="Supported formats" contentClassName="space-y-2.5">
            {formats.map((f) => (
              <div
                key={f.name}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface-2/30 p-3 transition-colors hover:border-primary/40"
              >
                <f.icon className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.detail}</p>
                </div>
              </div>
            ))}
          </Panel>

          <Panel title="What happens next" contentClassName="space-y-3.5">
            {[
              "Schema and type inference across every column",
              "Quality scan for nulls, duplicates and outliers",
              "Cleaning plan drafted for your approval",
              "EDA and baseline models queued automatically",
            ].map((step) => (
              <div key={step} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
              </div>
            ))}
          </Panel>
        </div>
      </div>
    </div>
  );
}
