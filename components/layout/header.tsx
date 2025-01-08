import Image from 'next/image'
import { IoMenu } from 'react-icons/io5'

export const Header = ({ onClickMenu }: { onClickMenu: () => void }) => {
  return (
    <header className="w-full items-center gap-10 flex py-5 bg-header">
      <div className="cursor-pointer flex justify-center items-center w-16" onClick={onClickMenu}>
        <IoMenu size={24} />
      </div>
      <Image
        src="/forlyl-logo.png"
        alt="Logo"
        width={100}
        height={30}
        className="object-contain"
      />
    </header>
  )
}
