export class MyError extends Error {
  constructor(
    public status: number = 500,
    public message: string,
  ) {
    super(message);
  }

  toResponse() {
    return Response.json(
      {
        api: false,
        error: this.message,
        code: this.status,
      },
      {
        status: this.status,
      },
    );
  }
}
