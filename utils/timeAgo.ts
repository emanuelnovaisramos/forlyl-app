export const timeAgo = (input: Date | string | number): string => {
  const date = input instanceof Date ? input : new Date(input)
  const diffMs = Date.now() - date.getTime()

  const seconds = Math.floor(diffMs / 1000)

  if (seconds < 60) {
    return `${seconds} seg`
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} min`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return hours === 1 ? '1 hora' : `${hours} horas`
  }

  const days = Math.floor(hours / 24)
  if (days < 30) {
    return days === 1 ? '1 dia' : `${days} dias`
  }

  const months = Math.floor(days / 30)
  if (months < 12) {
    return months === 1 ? '1 mês' : `${months} meses`
  }

  const years = Math.floor(days / 365)
  return years === 1 ? '1 ano' : `${years} anos`
}
