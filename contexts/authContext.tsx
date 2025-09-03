'use client'
import { useGetUser } from '@/api/user/getUser'
import { LOGIN_ROUTE } from '@/constants/mainRoutes'
import { TOKEN_PATH } from '@/constants/tokens'
import { useToast } from '@/domains/toasterProvider'
import { useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { showToast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const { mutateAsync: getUser } = useGetUser()
  const route = useRouter()

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
    destroyCookie(undefined, TOKEN_PATH, { path: '/' })
    route.push(LOGIN_ROUTE)
  }

  useEffect(() => {
    if (!user) {
      getUser()
        .then(res => {
          setUser(res)
        })
        .catch(() => {
          logout()
          showToast({
            message: 'Sua sessão expirou. Faça login novamente',
            type: 'error',
          })
        })
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
