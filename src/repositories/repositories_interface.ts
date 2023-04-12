export default interface RepositoryInterface<T> {
  readonly tableName: string

  all(): Promise<T[]>
  find(id: number): Promise<T>
  findBy(data: object): Promise<T>
  create(data: T): Promise<T>
  update(id: number | string, data: T): Promise<T>
  delete(id: number | string): Promise<boolean>
}
