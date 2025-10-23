import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "bg-gray-300/20 border-gray-300 text-text-900 hover:bg-gray-300/10",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        error:
          "bg-error-600/5 border-error-600 text-error-600 hover:bg-error-600/10",
        success:
          "bg-success-500/5 border-success-500 text-success-500 hover:bg-success-500/10",
        warning:
          "bg-warning-500/5 border-warning-500 text-warning-500 hover:bg-warning-500/10",
        warningSecondary:
          "bg-warning-800/5 border-warning-800 text-warning-800 hover:bg-warning-800/10",
        info: "bg-info-500/5 border-info-500 text-info-500 hover:bg-info-500/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
