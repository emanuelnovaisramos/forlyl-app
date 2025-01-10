import { cn } from '@/utils/twMerge'
import * as Progress from '@radix-ui/react-progress'
import React from 'react'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number
  containerClassName?: string
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ progress, containerClassName , className, ...props }, ref) => {
    return (
      <Progress.Root ref={ref} className={cn('w-full border h-3 bg-gray-200 rounded-full relative overflow-hidden', containerClassName)} value={progress}>
        <Progress.Indicator
          className={cn("bg-today w-full h-full rounded-r-md", className)}
          style={{ transform: `translateX(-${100 - progress}%)` }}
          {...props}
        />
      </Progress.Root>
    )
  },
)

export { ProgressBar }
