import { Knex } from 'knex'

import { UserInterface, UserModel } from '@src/models'
import RepositoryInterface from '@src/repositories/repositories_interface'
import { GoogleUserDataInterface } from '@src/services/google_auth_service'
import { knexClient } from '@src/utils'

interface UsersRepositoryInterface extends RepositoryInterface<UserModel> {
  handleGoogleLogin: (userData: GoogleUserDataInterface) => Promise<UserModel>
}
interface UsersFindByProps {
  id?: number | string
  email?: string
}

class UsersRepositoryImpl implements UsersRepositoryInterface {
  readonly tableName = 'users'
  constructor(private readonly dbClient: Knex) {
    this.dbClient = knexClient
  }

  async handleGoogleLogin(userData: GoogleUserDataInterface): Promise<UserModel> {
    const existingUser = await this.findBy({ email: userData.email })

    if (existingUser) return existingUser

    const newUserProps: UserInterface = {
      email: userData.email,
      avatar: userData.picture,
      name: userData.name,
    }
    return this.create(newUserProps)
  }

  async all(): Promise<UserModel[]> {
    return this.dbClient.select('*').from(this.tableName)
  }

  async create(data: UserInterface): Promise<UserModel> {
    const [newPrompt] = await this.dbClient(this.tableName).insert(data).returning('*')
    return new UserModel(newPrompt)
  }

  async find(id: number | string): Promise<UserModel> {
    const result = await this.dbClient(this.tableName)
      .select('*') // Select all columns
      .where({ id }) // Specify the condition (find the user with the specified ID)
      .first()
    return new UserModel(result as UserInterface)
  }

  async findBy({ id, email }: UsersFindByProps): Promise<UserModel | null> {
    const queryObject: UsersFindByProps = {}
    if (id) queryObject.id = id
    if (email) queryObject.email = email
    const result = await knexClient(this.tableName).select('*').where(queryObject).first()
    return result && new UserModel(result as UserInterface)
  }

  async update(id: number | string, data: UserModel): Promise<UserModel> {
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

const UsersRepository = new UsersRepositoryImpl(knexClient)
export default UsersRepository
