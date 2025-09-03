import { cn } from '@/utils/twMerge'
import * as Progress from '@radix-ui/react-progress'
import React from 'react'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number
  size: string
  containerClassName?: string
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ progress, containerClassName, className, size, ...props }, ref) => {
    return (
      <Progress.Root
        ref={ref}
        className={cn(
          'w-full bg-[#D5D7DA] rounded-full relative overflow-hidden',
          containerClassName,
        )}
        value={progress}
      >
        <Progress.Indicator
          className={cn(
            'bg-today rounded-r-md transition-all',
            className,
            size
          )}
          style={{ transform: `translateX(-${100 - progress}%)` }}
          {...props}
        />
      </Progress.Root>
    )
  },
)

ProgressBar.displayName = 'ProgressBar'

export { ProgressBar }
