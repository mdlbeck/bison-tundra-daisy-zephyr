import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 min-h-11 px-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-fg hover:bg-primary-hover",
        secondary: "bg-bg-subtle text-fg hover:bg-border",
        outline: "border border-border-strong bg-bg-elevated text-fg hover:bg-bg-subtle",
        ghost: "text-fg hover:bg-bg-subtle",
        danger: "bg-danger text-primary-fg hover:opacity-90",
      },
      size: {
        default: "h-11",
        sm: "h-9 min-h-9 px-3 text-sm",
        lg: "h-12 px-5",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
