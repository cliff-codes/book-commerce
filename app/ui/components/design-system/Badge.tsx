'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary-100 text-primary-800 hover:bg-primary-200",
        secondary: "bg-secondary-100 text-secondary-800 hover:bg-secondary-200",
        destructive: "bg-accent-error text-white hover:bg-red-600",
        outline: "text-primary-600 border border-primary-200",
        success: "bg-accent-success text-white hover:bg-green-600",
        warning: "bg-accent-warning text-white hover:bg-yellow-600",
        info: "bg-accent-info text-white hover:bg-blue-600",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </div>
  )
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
