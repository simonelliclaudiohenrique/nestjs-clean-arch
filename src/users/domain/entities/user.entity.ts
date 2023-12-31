import { EntityValidationError } from "@/shared/domain/errors/validator-error";
import { UserValidatorFactory } from "../validators/user.validator";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
};

export class UserEntity {
  constructor(public readonly props: UserProps) {
    UserEntity.validate(props);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(value: string) {
    UserEntity.validate({ ...this.props, name: value });
    this.name = value;
  }

  updatePassword(value: string) {
    UserEntity.validate({ ...this.props, password: value });
    this.password = value;
  }

  public get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  public get email(): string {
    return this.props.email;
  }

  public get password(): string {
    return this.props.password;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) throw new EntityValidationError(validator.errors);
  }
}
