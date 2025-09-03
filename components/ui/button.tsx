import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '../../utils/twMerge'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
  'transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90',
  {
    variants: {
      variant: {
        default:
          'bg-background-secondary text-sm w-full text-white px-4 py-[13px] rounded-md shadow hover:opacity-90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
