import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-[0.68rem] font-semibold tracking-wide",
  {
    variants: {
      tone: {
        active: "bg-active/10 text-active",
        middle: "bg-middle/12 text-middle",
        passive: "bg-passive/12 text-passive",
        perfect: "bg-perfect/12 text-perfect",
        muted: "bg-bg-subtle text-muted",
      },
    },
    defaultVariants: { tone: "muted" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
