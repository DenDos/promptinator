import { UserModel } from '@src/models'
import { PromptModel } from '@src/models/prompt.model'
import PolicyInterface from '@src/policies/policy_interface'
import { Constants } from '@src/utils'

class PromptsPolicy implements PolicyInterface<PromptModel> {
  user: UserModel
  record?: PromptModel

  constructor(user: UserModel, record?: PromptModel) {
    this.user = user
    this.record = record
  }

  async create(): Promise<boolean> {
    const promptsCount: number = await this.user.promptsCount()
    return (
      promptsCount <= Constants.FREE_USER_PROMPTS_LIMIT ||
      Boolean(this.user.subscription_active_until && this.user.subscription_active_until.getTime() > Date.now())
    )
  }

  async delete(): Promise<boolean> {
    return this.belongsToUser()
  }

  async show(): Promise<boolean> {
    return this.belongsToUser()
  }

  async update(): Promise<boolean> {
    return this.belongsToUser()
  }

  private belongsToUser(): boolean {
    return Boolean(this.record && this.user.id === this.record.user_id)
  }
}

export default PromptsPolicy
