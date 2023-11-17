import { EntityValidationError } from "@/shared/domain/errors/validator-error";
import { UserEntity, UserProps } from "../../user.entity";
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder";

describe("UserEntity intefgration tests", () => {
  describe("Contructor method", () => {
    it("should throw an error when creating a user with invalid name", () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null,
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        name: "",
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        name: "a".repeat(256),
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });
  });
});
