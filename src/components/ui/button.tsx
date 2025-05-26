
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-lg font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white shadow-lg hover:bg-slate-800 hover:shadow-xl transform hover:scale-105 active:scale-95",
        destructive: "bg-red-500 text-white shadow-lg hover:bg-red-600 hover:shadow-xl transform hover:scale-105 active:scale-95",
        outline: "border-2 border-slate-200 bg-white shadow-md hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg",
        secondary: "bg-orange-500 text-white shadow-lg hover:bg-orange-600 hover:shadow-xl transform hover:scale-105 active:scale-95",
        ghost: "hover:bg-orange-50 hover:text-orange-600 rounded-full",
        link: "text-slate-900 underline-offset-4 hover:underline",
        success: "bg-green-500 text-white shadow-lg hover:bg-green-600 hover:shadow-xl transform hover:scale-105 active:scale-95",
        warning: "bg-amber-500 text-white shadow-lg hover:bg-amber-600 hover:shadow-xl transform hover:scale-105 active:scale-95",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-10 rounded-full px-6 text-base",
        lg: "h-14 rounded-full px-10 text-xl",
        icon: "h-12 w-12",
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
