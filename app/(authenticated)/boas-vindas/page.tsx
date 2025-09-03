import { CreateProductOnboarding } from '@/components/product/createProductOnboarding'

export default function WelcomePage() {
  return (
    <div className="flex justify-center items-center min-w-full min-h-screen bg-bg-primary">
      <CreateProductOnboarding isFirst />
    </div>
  )
}
