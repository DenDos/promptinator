export interface PromptInterface {
  id: number | null
  name: string
  value: string
  user_id: string
  created_at: Date | null
  updated_at: Date | null
}

export class PromptModel {
  prompt: PromptInterface

  constructor(prompt: PromptInterface) {
    this.prompt = prompt
  }
}
