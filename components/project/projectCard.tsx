'use client'

import Image from 'next/image'
import { ProgressBar } from '../ui/progressbar'
import { FiArchive, FiCheck, FiCopy, FiPlus, FiTrash2 } from 'react-icons/fi'
import Link from 'next/link'
import { Project } from '@/types/project'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { useState } from 'react'

export const ProjectCard = ({
  project,
  handleClickDone,
  handleClickDelete,
  handleClickInactive,
  handleClickActivate,
}: {
  project: Project
  handleClickDone: (id: string) => void
  handleClickDelete: (id: string) => void
  handleClickInactive: (id: string) => void
  handleClickActivate: (id: string) => void
}) => {
  const doneTasks = project.tasksDone || 0
  const totalTasks = project.tasksTotal || 0
  const pendingTasks = totalTasks > 0 ? Math.max(totalTasks - doneTasks, 0) : 0
  const progress =
    totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const confirmDelete = () => {
    handleClickDelete(project.id)
    setIsDeleteOpen(false)
  }

  return (
    <div className="flex w-[250px] bg-white gap-0 relative overflow-hidden flex-col rounded-md">
      <div className="flex w-full relative">
        <Link href={`/projetos/${project.id}/painel`}>
          <Image
            src="https://www.moskitcrm.com/hubfs/60_X%20cursos%20de%20vendas%20gratuitos.png"
            width={300}
            height={300}
            alt={project.name}
            className={`w-full h-50 object-cover ${
              project.status === 'done' || project.status === 'inactive'
                ? 'grayscale'
                : ''
            }`}
          />
        </Link>
        <div className="absolute text-white text-sm m-2 text-center flex justify-center items-center rounded-full bg-background-eight w-[22px] h-[22px] left-0">
          {pendingTasks}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="absolute right-0 m-2 rounded-md bg-white/50 p-1 border-none">
            <FiPlus />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="bottom"
            align="end"
            className="z-50 m-0 w-max rounded-md p-0 border-none bg-white"
            onClick={e => e.preventDefault()}
          >
            {project.status !== 'done' && project.status !== 'inactive' && (
              <DropdownMenuItem
                className="flex items-center gap-2 p-2 text-sm"
                onClick={() => handleClickDone(project.id)}
              >
                <FiCheck className="h-5 w-5 text-third" />
                Concluir
              </DropdownMenuItem>
            )}

            {(project.status === 'inactive' || project.status === 'done') && (
              <DropdownMenuItem
                className="flex items-center gap-2 p-2 text-sm"
                onClick={() => handleClickActivate(project.id)}
              >
                <FiArchive className="h-5 w-5 text-third" />
                Ativar
              </DropdownMenuItem>
            )}

            {project.status !== 'done' && project.status !== 'inactive' && (
              <DropdownMenuItem
                className="flex items-center gap-2 p-2 text-sm"
                onClick={() => handleClickInactive(project.id)}
              >
                <FiArchive className="h-5 w-5 text-third" />
                Inativar
              </DropdownMenuItem>
            )}

            <DropdownMenuItem className="flex items-center gap-2 p-2 text-sm">
              <FiCopy className="h-5 w-5 text-third" />
              Duplicar
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2 p-2 text-sm bg-[#FEE4E2] focus:bg-[#FEE4E2] hover:bg-[#FEE4E2]"
              onClick={e => {
                e.preventDefault()
                setIsDeleteOpen(true)
              }}
            >
              <FiTrash2 className="h-5 w-5 text-third" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ProgressBar
        size="h-1"
        containerClassName="rounded-none"
        progress={progress}
      />

      <div className="p-4">
        <p className="font-semibold">{project.name}</p>
        <p className="text-sm text-third">Pagina de compra</p>
      </div>
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Excluir Projeto</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o projeto {project.name}? Esta
              ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="no-style"
              className="w-max"
              onClick={() => setIsDeleteOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              className="w-max"
              onClick={confirmDelete}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
