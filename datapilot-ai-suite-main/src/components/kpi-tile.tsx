import type { ReactNode } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

import { cn } from "@/lib/utils";

export function KpiTile({
  label,
  value,
  delta,
  icon,
  spark,
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: ReactNode;
  spark?: number[];
  className?: string;
}) {
  const id = `spark-${label.replace(/\W+/g, "-").toLowerCase()}`;
  const data = (spark ?? []).map((v, i) => ({ i, v }));

  return (
    <div
      className={cn(
        "group surface-panel relative overflow-hidden px-4 py-3.5 transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span className="flex size-6 items-center justify-center rounded-md bg-primary/12 text-primary transition-colors group-hover:bg-primary/20">
            {icon}
          </span>
        )}
        <p className="text-[0.68rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
          {label}
        </p>
      </div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <p className="font-display text-2xl leading-none font-semibold tracking-tight">{value}</p>
          {delta && <p className="mt-1.5 text-[0.7rem] text-success">{delta}</p>}
        </div>
        {data.length > 1 && (
          <div className="h-9 w-20 opacity-80 transition-opacity group-hover:opacity-100">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 2, bottom: 0, left: 0, right: 0 }}>
                <defs>
                  <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="var(--chart-1)"
                  strokeWidth={1.8}
                  fill={`url(#${id})`}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
