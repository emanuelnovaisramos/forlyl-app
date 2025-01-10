import Image from 'next/image'
import { ProgressBar } from '../ui/progressbar'
import { FiPlus } from 'react-icons/fi'

interface ProductCardProps {
  imageUrl: string
  title: string
  progress: number
  description: string
  badgeCount: number
}

export const ProductCard = ({
  imageUrl,
  title,
  progress,
  description,
  badgeCount,
}: ProductCardProps) => {
  return (
    <div className="flex w-[250px] bg-white border gap-0 relative overflow-hidden flex-col rounded-md">
      <div className="flex w-full relative">
        <Image
          src={imageUrl}
          width={300}
          height={300}
          alt={title}
          className="w-full h-50 object-cover"
        />
        <div className="absolute text-white m-2 text-center rounded-full bg-four w-6 h-6 left-0">
          {badgeCount}
        </div>
        <div className="p-1 right-0 m-2 absolute rounded-md bg-white bg-opacity-50">
          <FiPlus />
        </div>
      </div>
      <ProgressBar
        containerClassName="rounded-none h-1.5"
        progress={progress}
      />
      <div className="p-4">
        <p className="font-bold">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  )
}
