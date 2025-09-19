import { Project } from '@/types/project'
import { Dialog, DialogContent } from '../ui/dialog'
import { CreateProjectOnboarding } from './createProjectOnboarding'

export const ModalCreateProject = ({
  open,
  setOpen,
  callBackCreate,
}: {
  open: boolean
  setOpen: (value: boolean) => void
  callBackCreate?: (project: Project) => void
}) => {
  const handleCreate = (project: Project) => {
    setOpen(false)
    if (callBackCreate) {
      callBackCreate(project)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl">
        <CreateProjectOnboarding callBackCreate={handleCreate} />
      </DialogContent>
    </Dialog>
  )
}
