'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import Image from 'next/image'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { useAuth } from '@/contexts/authContext'
import { useToast } from '@/domains/toasterProvider'
import { TOKEN_PATH, TOKENS_VALID_DAYS } from '@/constants/tokens'
import { setCookie } from 'nookies'
import { useRouter } from 'next/navigation'
import { HOME_ROUTE } from '@/constants/mainRoutes'
import { useLoginUser } from '@/api/user/login'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { mutateAsync: loginUserMutate, isPending: isPendingLogin } =
    useLoginUser()
  const { showToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)

  const formSchema = z.object({
    email: z
      .string()
      .email({ message: 'Email inválido' })
      .min(1, { message: 'Email é obrigatório' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
      .max(30, { message: 'A senha deve ter no máximo 30 caracteres' }),
  })

  const formSettings = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLogin = async (data: z.infer<typeof formSchema>) => {
    await loginUserMutate({
      email: data.email,
      password: data.password,
    })
      .then(res => {
        login(res.user)
        setCookie(undefined, TOKEN_PATH, res.token, {
          maxAge: TOKENS_VALID_DAYS * 24 * 60 * 60,
          path: '/',
        })
        router.push(HOME_ROUTE)
        showToast({ message: 'Login realizado com sucesso!', type: 'success' })
      })
      .catch(error => {
        showToast({
          message: error?.message || 'Ocorreu um erro ao realizar o login',
          type: 'error',
        })
      })
  }

  return (
    <div className="flex justify-center bg-background px-4 items-center min-h-screen">
      <div className="flex bg-white relative overflow-hidden rounded-md w-max">
        <div className="flex p-10 w-[525px] flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Image
              src="/forlyl-logo.png"
              alt="Logo"
              width={140}
              height={60}
              className="object-contain"
            />
            <div className="flex flex-col gap-0">
              <p className="leading-5 font-normal">
                Faça login na <b>Forlyl</b> para acessar seu espaço de trabalho!
              </p>
              <p>Bem-vindo de volta!</p>
            </div>
          </div>
          <Form {...formSettings}>
            <form onSubmit={formSettings.handleSubmit(handleLogin)}>
              <FormField
                control={formSettings.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Seu email principal" />
                    </FormControl>
                    {formSettings.formState.errors.email && (
                      <p className="text-sm text-red-500">
                        {formSettings.formState.errors.email.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={formSettings.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="flex relative items-center">
                        <Input
                          {...field}
                          placeholder="Insira sua senha"
                          type={showPassword ? 'text' : 'password'}
                        />
                        <div
                          className="absolute right-0 mr-4 cursor-pointer"
                          onClick={() => setShowPassword(prev => !prev)}
                        >
                          {showPassword ? (
                            <FaRegEye className="h-5 w-5 text-gray-500" />
                          ) : (
                            <FaRegEyeSlash className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    {formSettings.formState.errors.password && (
                      <p className="text-sm text-red-500">
                        {formSettings.formState.errors.password.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <Button disabled={isPendingLogin} className="mt-6 font-bold">
                Entrar
              </Button>
            </form>
          </Form>
        </div>
        <div className="w-[450px] bg-cover min-h-full flex gap-1 justify-end text-2xl flex-col px-10 py-16 text-white bg-[url('/signIn-bg.png')]">
          <p className="font-bold">For</p>
          <p>
            <b>L</b>everaging <b>Y</b>our <b>L</b>auches
          </p>
          <p>
            <b>L</b>eaving <b>Y</b>our <b>L</b>egacy
          </p>
        </div>
      </div>
    </div>
  )
}
