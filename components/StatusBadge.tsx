import type { ProjectStatus } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const statusMap: Record<
  ProjectStatus,
  { label: string; className: string; dot: string }
> = {
  completed: {
    label: "Completed",
    className:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500 dark:bg-emerald-400",
  },
  "in-progress": {
    label: "In progress",
    className: "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500 dark:bg-amber-400",
  },
  research: {
    label: "Research",
    className: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    dot: "bg-sky-500 dark:bg-sky-400",
  },
};

export default function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const item = statusMap[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] backdrop-blur",
        item.className,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", item.dot)} aria-hidden="true" />
      {item.label}
    </span>
  );
}
