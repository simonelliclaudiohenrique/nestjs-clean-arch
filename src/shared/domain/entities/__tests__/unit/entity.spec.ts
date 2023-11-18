import { Entity } from "../../entity";

type StubProps = {
  prop1: string;
  prop2: number;
};

class StubEntity extends Entity<StubProps> {}

describe("Entity unit tests", () => {
  it("Should set props and id", () => {
    const props = { prop1: "value1", prop2: 15 };
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity._id).not.toBeNull();
    expect(entity._id).not.toBeNaN();
  });

  it("Should accept a valid number", () => {
    const props = { prop1: "value1", prop2: 15 };
    const id = 1;
    const entity = new StubEntity(props, id);

    expect(entity._id).not.toBeNaN();
    expect(entity._id).toBe(id);
  });

  it("Should convert a entity to a Javascript Object", () => {
    const props = { prop1: "value1", prop2: 15 };
    const id = 1;
    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    });
  });
});
