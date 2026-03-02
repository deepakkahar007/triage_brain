export class MyError extends Error {
  constructor(
    public status: number = 500,
    message: string,
  ) {
    super(message);
    this.name = "MyError";
  }

  toResponse() {
    return Response.json(
      {
        status: false,
        message: this.message,
        data: null,
        error: {
          code: this.status,
          name: this.name,
        },
      },
      { status: this.status },
    );
  }
}

type ErrorHandlerType = { code: number; error: Error };

export const errorHandler = ({ code, error }: ErrorHandlerType) => {
  if (error instanceof MyError) {
    return error.toResponse();
  }

  return Response.json(
    {
      status: false,
      error: error,
    },
    { status: code ? code : 500 },
  );
};
