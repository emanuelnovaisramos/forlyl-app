import { CreateProjectOnboarding } from "@/components/project/createProjectOnboarding";


export default function WelcomePage() {
  return (
    <div className="flex justify-center items-center min-w-full min-h-screen bg-bg-primary">
      <CreateProjectOnboarding isFirst />
    </div>
  )
}
