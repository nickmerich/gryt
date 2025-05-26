
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 tracking-wide uppercase letter-spacing-wider",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background border-2 border-foreground hover:bg-foreground/90 hover:border-foreground/90 transform hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-error text-error-foreground border-2 border-error hover:bg-error-hover hover:border-error-hover transform hover:scale-[1.02] active:scale-[0.98]",
        outline: "border-2 border-border bg-background hover:bg-muted hover:text-foreground hover:border-muted-foreground transform hover:scale-[1.01] font-bold",
        secondary: "bg-muted-foreground text-background border-2 border-muted-foreground hover:bg-muted-foreground/90 hover:border-muted-foreground/90 transform hover:scale-[1.02] active:scale-[0.98]",
        ghost: "hover:bg-muted hover:text-foreground font-bold border-2 border-transparent",
        link: "text-foreground underline-offset-4 hover:underline font-bold border-2 border-transparent",
        success: "bg-success text-success-foreground border-2 border-success hover:bg-success-hover hover:border-success-hover transform hover:scale-[1.02] active:scale-[0.98]",
        warning: "bg-warning text-warning-foreground border-2 border-warning hover:bg-warning-hover hover:border-warning-hover transform hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-12 px-6 py-3 rounded-md",
        sm: "h-10 px-4 py-2 text-xs rounded-md",
        lg: "h-14 px-8 py-4 text-base rounded-md",
        icon: "h-12 w-12 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
