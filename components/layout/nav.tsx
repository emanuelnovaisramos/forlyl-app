'use client'
import { navItens } from '@/constants/nav-itens'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Header } from './header'
import { MdLogout } from 'react-icons/md'
import Link from 'next/link'

export const Nav = ({ children }: { children: React.ReactNode }) => {
  const [isExpand, setIsExpand] = useState(false)
  const pathName = usePathname()
  return (
    <div className="flex h-screen flex-col">
      <Header onClickMenu={() => setIsExpand(prev => !prev)} />
      <div className="relative flex flex-1 max-h-screen overflow-y-hidden">
        <nav
          className={twMerge(
            'flex w-max justify-between flex-col bg-third min-h-full transition duration-300 ease-in-out',
            isExpand ? 'w-64' : 'w-16',
          )}
        >
          <ul className="flex pl-3 gap-3 py-7 flex-col transition duration-300 ease-in-out">
            {navItens.map((item, index) => (
              <Link href={item.href} key={index}>
                <li
                  className={twMerge(
                    'flex w-full justify-between cursor-pointer rounded-l-md text-icon-primary hover:text-white',
                    pathName === item.href ? 'text-white bg-four' : '',
                  )}
                >
                  <div className="flex gap-4 h-11 items-center p-3">
                    <item.icon size={20} className="" />
                    {isExpand && (
                      <p
                        className={twMerge(
                          'font-normal',
                          pathName === item.href && 'font-semibold',
                        )}
                      >
                        {item.name}
                      </p>
                    )}
                  </div>
                  {pathName === item.href ? (
                    <div className="bg-icon-border rounded-l-md w-1 min-h-full"></div>
                  ) : (
                    <></>
                  )}
                </li>
              </Link>
            ))}
          </ul>
          <div className="flex cursor-pointer border-opacity-50 border-[var(--bg-four)] items-center py-4 border-t-[0.5px] pl-5 text-icon-primary hover:text-white">
            <MdLogout size={20} className="mr-4" />
            {isExpand && <p>Sair</p>}
          </div>
        </nav>
        <div className="flex-1 w-full bg-background overflow-y-auto max-h-screen p-7">
          {children}
        </div>
      </div>
    </div>
  )
}