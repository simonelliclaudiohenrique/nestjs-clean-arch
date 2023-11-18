export abstract class Entity<Props = any> {
  public readonly _id: number;
  public readonly props: Props;

  constructor(props: Props, id?: number) {
    this.props = props;
    this._id = +id || 1;
  }

  get id() {
    return this._id;
  }

  toJSON(): Required<{ id: number } & Props> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: number } & Props>;
  }
}
