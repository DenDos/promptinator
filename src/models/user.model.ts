import jwt from 'jsonwebtoken'
import * as process from 'process'

import PromptsRepository from '../repositories/prompts.repository'

export interface UserInterface {
  id?: number
  email: string
  name: string
  avatar: string
  created_at?: Date
  updated_at?: Date
  subscription_active_until?: Date
  subscription_status?: string
}

export class UserModel implements UserInterface {
  id?: number
  avatar: string
  email: string
  name: string
  subscription_status?: string
  subscription_active_until?: Date
  created_at?: Date
  updated_at?: Date

  constructor(props: UserInterface) {
    this.avatar = props.avatar
    this.email = props.email
    this.name = props.name
    this.id = props.id
    this.subscription_status = props.subscription_status
    this.subscription_active_until = props.subscription_active_until
    this.created_at = props.created_at
    this.updated_at = props.updated_at
  }

  promptsCount(): Promise<number> {
    return PromptsRepository.userPromptsCount({ user_id: this.id as number })
  }

  jwtToken(): string {
    const payload = { id: this.id }
    return jwt.sign(payload, process.env.JWT_SECRET as string)
  }
}
