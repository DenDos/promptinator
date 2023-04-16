import { Knex } from 'knex'

import { PromptInterface } from '@src/models'
import RepositoryInterface from '@src/repositories/repositories_interface'
import { knexClient } from '@src/utils'

interface PromptsInterface extends RepositoryInterface<PromptInterface> {
  all: (props: { user_id: number }) => Promise<PromptInterface[]>
}
interface PromptsFindByProps {
  id?: number | string
  name?: string
  user_id: number
}

class PromptsRepositoryImpl implements PromptsInterface {
  readonly tableName = 'prompts'
  constructor(private readonly dbClient: Knex) {
    this.dbClient = knexClient
  }

  async all({ user_id }: { user_id: number }): Promise<PromptInterface[]> {
    return this.dbClient.select('*').where({ user_id }).from(this.tableName)
  }

  async create(data: PromptInterface): Promise<PromptInterface> {
    const [newPrompt] = await this.dbClient(this.tableName).insert(data).returning('*')
    return newPrompt
  }

  find(id: number | string): Promise<PromptInterface> {
    return this.dbClient(this.tableName)
      .select('*') // Select all columns
      .where({ id }) // Specify the condition (find the user with the specified ID)
      .first()
  }

  findBy({ id, name, user_id }: PromptsFindByProps): Promise<PromptInterface> {
    const queryObject: PromptsFindByProps = { user_id }
    if (id) queryObject.id = id
    if (name) queryObject.name = name
    return knexClient(this.tableName)
      .select('*') // Select all columns
      .where(queryObject) // Specify the condition (find the user with the specified ID)
      .first()
  }

  async update(id: number | string, data: PromptInterface): Promise<PromptInterface> {
    return this.dbClient(this.tableName)
      .update(data)
      .where({ id })
      .then(() => {
        return this.find(id)
      })
  }

  delete(id: number | string): Promise<boolean> {
    return this.dbClient(this.tableName)
      .delete()
      .where({ id })
      .then(() => {
        return true
      })
  }
}

const PromptsRepository = new PromptsRepositoryImpl(knexClient)
export default PromptsRepository
