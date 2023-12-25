export class NotFoundError extends Error {}

export class ConflictError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "ConflictError";
  }
}
