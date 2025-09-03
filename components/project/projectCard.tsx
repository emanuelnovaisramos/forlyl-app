import Image from 'next/image'
import { ProgressBar } from '../ui/progressbar'
import { FiPlus } from 'react-icons/fi'
import Link from 'next/link'
import { Project } from '@/types/project'

export const ProjectCard = ({ project }: {project: Project}) => {
  return (
    <Link
      href={`/projetos/${project.id}/painel`}
      className="flex w-[250px] bg-white gap-0 relative overflow-hidden flex-col rounded-md"
    >
      <div className="flex w-full relative">
        <Image
          src="https://www.moskitcrm.com/hubfs/60_X%20cursos%20de%20vendas%20gratuitos.png"
          width={300}
          height={300}
          alt={project.name}
          className="w-full h-50 object-cover"
        />
        <div className="absolute text-white text-sm m-2 text-center flex justify-center items-center rounded-full bg-background-eight w-[22px] h-[22px] left-0">
          {0}
        </div>
        <div className="p-1 right-0 m-2 absolute rounded-md bg-white bg-opacity-50">
          <FiPlus />
        </div>
      </div>
      <ProgressBar
        size="h-1"
        containerClassName="rounded-none"
        progress={50}
      />
      <div className="p-4">
        <p className="font-semibold">{project.name}</p>
        <p className="text-sm text-third">Pagina de compra</p>
      </div>
    </Link>
  )
}
