import { UserEntity } from "@/users/domain/entities/user.entity";

export interface RepositoryInterface<E extends UserEntity> {
  insert(entity: E): Promise<void>;
  findById(id: number): Promise<number>;
  update(entity: E): Promise<void>;
  delete(id: number): Promise<void>;
}
