export interface PromptInterface {
  id?: number
  name: string
  value: string
  user_id: number
  created_at?: Date
  updated_at?: Date
}

export class PromptModel {
  id?: number
  name: string
  value: string
  user_id: number
  created_at?: Date
  updated_at?: Date

  constructor(props: PromptInterface) {
    this.id = props.id
    this.name = props.name
    this.value = props.value
    this.user_id = props.user_id
    this.created_at = props.created_at
    this.updated_at = props.updated_at
  }
}
