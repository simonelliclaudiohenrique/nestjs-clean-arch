import { Entity } from "../entities/entity";
import { NotFoundError } from "../errors/not-found-error";
import { RepositoryInterface } from "./repository-contracts";

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: number): Promise<E> {
    return this.get(id);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    await this.get(entity.id);
    const index = this.items.findIndex((item) => item.id === entity.id);
    this.items[index] = entity;
  }

  async delete(id: number): Promise<void> {
    await this.get(id);
    const index = this.items.findIndex((item) => item.id === id);
    this.items.splice(index, 1);
  }

  protected async get(id: number): Promise<E> {
    const _id = +id;
    const entity = this.items.find((item) => item.id === _id);
    if (!entity) throw new NotFoundError("Entity not found");
    return entity;
  }
}
