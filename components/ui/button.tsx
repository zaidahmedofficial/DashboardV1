"use client";

import * as React from "react";
import { cva, type VariantProps } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-container",
        secondary:
          "bg-white text-on-surface border border-outline-variant hover:bg-surface-container",
        outline:
          "border border-outline text-on-surface hover:bg-surface-container",
        ghost:
          "text-on-surface-variant hover:text-on-surface hover:bg-surface-container",
        danger:
          "bg-error text-on-error hover:bg-error-container",
      },
      size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={props.type || "button"}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
