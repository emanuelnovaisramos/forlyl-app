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
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { FaRegEye } from 'react-icons/fa'
import { FaRegEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import Link from 'next/link'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const formSchema = z.object({
    name: z.string().min(1, { message: 'Nome é obrigatório' }),
    email: z.string().email({message: 'Email inválido'}).min(1, { message: 'Email é obrigatório' }),
    password: z
      .string()
      .min(5, { message: 'A senha deve ter no mínimo 5 caracteres' })
      .max(30, { message: 'A senha deve ter no máximo 30 caracteres' }),
  })

  const defaultValues = {
    name: '',
    email: '',
    password: '',
  }

  const handleSignIn = async (userData: z.infer<typeof formSchema>) => {
    console.log(userData)
  }

  const formSettings = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

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
                Cadastre-se <b>gratuitamente</b> na Forlyl e descubra como
                lançar seus produtos com inteligência e eficiência!
              </p>
              <p>Comece agora!</p>
            </div>
          </div>
          <Form {...formSettings}>
            <form onSubmit={formSettings.handleSubmit(handleSignIn)}>
              <FormField
                control={formSettings.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Seu nome completo" />
                    </FormControl>
                    {formSettings.formState.errors.name && (
                      <p className="text-sm text-red-500">
                        {formSettings.formState.errors.name.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
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
                          placeholder="Insira uma senha"
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
              <div className="flex gap-2 items-start mt-6">
                <Checkbox className="mt-0.5" />
                <p className="leading-5 mr-2">
                  Ao clicar aqui, eu assumo que li e aceito os termos.
                </p>
              </div>
              <Button className="mt-6 font-bold">Criar conta agora</Button>
              <div className="flex gap-1 mt-10 text-center justify-center items-center">
                <p>Já possui conta?</p>
                <Link href="/" className="text-background-secondary opacity-80 underline">
                  Faça Log in
                </Link>
              </div>
            </form>
          </Form>
        </div>
        <div
          className={`w-[450px] bg-cover min-h-full flex gap-1 justify-end text-2xl flex-col px-10 py-16 text-white bg-[url('/signIn-bg.png')]`}
        >
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
