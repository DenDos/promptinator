import { Knex } from 'knex'

import { Prompt } from '@src/models'
import RepositoryInterface from '@src/repositories/repositories_interface'
import { knexClient } from '@src/utils'

type PromptsInterface = RepositoryInterface<Prompt>
interface PromptsFindByProps {
  id?: number | string
  name?: string
}

class PromptsRepositoryImpl implements PromptsInterface {
  readonly tableName = 'prompts'
  constructor(private readonly dbClient: Knex) {
    this.dbClient = knexClient
  }
  async all(): Promise<Prompt[]> {
    return this.dbClient.select('*').from(this.tableName)
  }

  async create(data: Prompt): Promise<Prompt> {
    const [newPrompt] = await this.dbClient(this.tableName).insert(data).returning('*')
    return newPrompt
  }

  find(id: number | string): Promise<Prompt> {
    return this.dbClient(this.tableName)
      .select('*') // Select all columns
      .where({ id }) // Specify the condition (find the user with the specified ID)
      .first()
  }

  findBy({ id, name }: PromptsFindByProps): Promise<Prompt> {
    const queryObject: PromptsFindByProps = {}
    if (id) queryObject.id = id
    if (name) queryObject.name = name
    return knexClient(this.tableName)
      .select('*') // Select all columns
      .where(queryObject) // Specify the condition (find the user with the specified ID)
      .first()
  }

  async update(id: number | string, data: Prompt): Promise<Prompt> {
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
