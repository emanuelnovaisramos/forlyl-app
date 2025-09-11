'use client'

import { createContext, useContext } from 'react'
import { Project } from '@/types/project'

type ProjectContextType = {
  project: Project | undefined
  isLoading: boolean
  error: unknown
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const ProjectProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: ProjectContextType
}) => {
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  )
}

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}
