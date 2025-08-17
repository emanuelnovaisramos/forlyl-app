import { FaRegFile } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'
import Image from 'next/image'
import { ProgressBar } from '@/components/ui/progressbar'

export const KanbanItemCard = ({ value }: { value: string }) => {
  return (
    <div className="flex flex-col cursor-pointer bg-background rounded-md border border-border-primary p-5 gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="font-semibold text-xs">Gravação Video de Vendas</p>
          <p className="text-xs text-four">Descrição da atividade</p>
        </div>
        <FaRegFile size={16} className="text-four" />
      </div>
      <div className="flex justify-between">
        <div
          className="flex w-max items-center gap-2 py-1 px-2 rounded-md text-white"
          style={{
            backgroundColor: `var(--color-kanban-${value})`,
          }}
        >
          <IoTimeOutline size={18} />
          <p className="text-xs">10 de novembro</p>
        </div>
        <div className="relative h-6 w-6 overflow-hidden rounded-full">
          <Image
            src={'/user-avatar-example.png'}
            alt={'user'}
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>
      <div className="w-full flex items-center gap-3 mt-2">
        <ProgressBar size="h-1" progress={50} />
        <p className="min-w-max text-xs text-four">50 %</p>
      </div>
    </div>
  )
}
