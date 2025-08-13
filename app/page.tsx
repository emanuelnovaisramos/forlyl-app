"use client"
import { Button } from '../components/ui/button'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const route = useRouter()
  return (
    <div>
      <h2>Aqui vai o login quando tiver</h2>
      <Button onClick={() => route.push('/registro')}>Cadastro</Button>
    </div>
  )
}
