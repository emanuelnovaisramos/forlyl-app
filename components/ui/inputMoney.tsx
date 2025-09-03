import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/formatCurrency'

type InputMoneyProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> & {
  value?: number
  onChange?: (numericValue: number) => void
}

export const InputMoney = ({
  value,
  onChange,
  className,
  ...props
}: InputMoneyProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const numeric = Number(rawValue?.replace(/\D/g, '')) / 100
    onChange?.(numeric)
  }

  return (
    <Input
      type="text"
      inputMode="numeric"
      value={value !== undefined ? formatCurrency(value) : ''}
      onChange={handleChange}
      className={cn('', className)}
      {...props}
    />
  )
}
