import { Entity } from "@/shared/domain/entities/entity";
import { InMemoryRepository } from "../../in-memory.repository";
import { NotFoundError } from "@/shared/domain/errors/not-found-error";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository unit tests", () => {
  let sut: StubInMemoryRepository;

  beforeEach(() => {
    sut = new StubInMemoryRepository();
  });

  it("shold inserts a new entity", async () => {
    const entity = new StubEntity({ name: "test name", price: 50 });
    await sut.insert(entity);

    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  it("shold throw error when entity not found", async () => {
    await expect(sut.findById(99999)).rejects.toThrow(
      new NotFoundError("Entity not found"),
    );
  });

  it("shold find a entity by id", async () => {
    const entity = new StubEntity({ name: "test name", price: 50 });
    await sut.insert(entity);

    const result = await sut.findById(entity._id);

    expect(entity.toJSON()).toStrictEqual(result.toJSON());
  });

  it("shold returns all entities", async () => {
    const entity = new StubEntity({ name: "test name", price: 50 });
    await sut.insert(entity);

    const result = await sut.findAll();

    expect([entity]).toStrictEqual(result);
  });

  it("shold throw error on update entity not found", async () => {
    const entity = new StubEntity({ name: "test name", price: 50 });
    await expect(sut.update(entity)).rejects.toThrow(
      new NotFoundError("Entity not found"),
    );
  });

  it("shold find a entity by id", async () => {
    const entity = new StubEntity({ name: "test name", price: 50 });
    await sut.insert(entity);

    const entityUpdate = new StubEntity(
      {
        name: "test name updated",
        price: 10,
      },
      entity._id,
    );

    await sut.update(entityUpdate);

    expect(entityUpdate.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  it("shold throw error on delete entity not found", async () => {
    await expect(sut.delete(99999)).rejects.toThrow(
      new NotFoundError("Entity not found"),
    );
  });

  it("shold find a entity by id", async () => {
    const entity = new StubEntity({ name: "test name", price: 50 });
    await sut.insert(entity);

    const result = await sut.findById(entity._id);

    expect(entity.toJSON()).toStrictEqual(result.toJSON());
  });

  it("shold delete an entity", async () => {
    const entity = new StubEntity({ name: "test name", price: 50 });
    await sut.insert(entity);

    await sut.delete(entity._id);

    expect(sut.items).toHaveLength(0);
  });
});
