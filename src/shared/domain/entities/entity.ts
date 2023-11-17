export abstract class Entity<Props = any> {
  public readonly _id: number;
  public readonly props: Props;

  constructor(props: Props, id?: string) {
    this.props = props;
    this._id = +id;
  }

  get id() {
    return this._id;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
