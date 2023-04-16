import jwt from 'jsonwebtoken'
import * as process from 'process'

export interface UserInterface {
  id?: number
  email: string
  name: string
  avatar: string
  created_at?: Date
  updated_at?: Date
}

export class UserModel implements UserInterface {
  id?: number
  avatar: string
  email: string
  name: string
  created_at?: Date
  updated_at?: Date

  constructor(props: UserInterface) {
    this.avatar = props.avatar
    this.email = props.email
    this.name = props.name
    this.id = props.id
    this.created_at = props.created_at
    this.updated_at = props.updated_at
  }

  jwtToken(): string {
    const payload = { id: this.id }
    return jwt.sign(payload, process.env.JWT_SECRET as string)
  }
}
