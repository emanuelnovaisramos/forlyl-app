import { Button } from '../ui/button'

interface StepCreateProductWelcomeProps {
  onNext: () => void
}

export const StepCreateProductWelcome = ({
  onNext,
}: StepCreateProductWelcomeProps) => {
  return (
    <>
      <h1 className="text-2xl">Bem-vindo à Forlyl!</h1>
      <p className="max-w-[568px]">
        Vamos criar juntos o lançamento ideal para o seu negócio. Responda
        algumas perguntas para personalizarmos sua experiência.
      </p>
      <Button className="w-max px-7.5 font-bold" onClick={onNext}>
        Crie seu primeiro produto
      </Button>
    </>
  )
}
