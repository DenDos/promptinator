import { UserModel } from '@src/models'

export default interface PolicyInterface<T> {
  user: UserModel
  record?: T
  create(): Promise<boolean>
  show(): Promise<boolean>
  update(): Promise<boolean>
  delete(): Promise<boolean>
}
