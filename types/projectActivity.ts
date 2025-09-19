import { User } from "@/contexts/authContext"
import { Task } from "./task"
import { Project } from "./project"

export interface ProjectActivity {
  id: string
  objectType?: 'task' | null
  task?: Task | null
  executor: User
  project: Project
  action?: 'create' | 'update' | null
  createdAt: string
}