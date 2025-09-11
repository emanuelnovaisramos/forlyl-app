export const formatDateHideCurrentYear = (date?: Date | string) => {
  if (!date) return ''

  let d: Date
  if (typeof date === 'string') {
    const [year, month, day] = date.split('-').map(Number)
    d = new Date(year, month - 1, day)
  } else {
    d = date
  }

  const currentYear = new Date().getFullYear()
  const isCurrentYear = d.getFullYear() === currentYear

  return d.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: isCurrentYear ? undefined : 'numeric', // 👈 só mostra se não for o ano atual
  })
}