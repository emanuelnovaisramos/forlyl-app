import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '../../utils/twMerge'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-bg-secondary text-sm w-full text-white p-4 rounded-md shadow',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

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
