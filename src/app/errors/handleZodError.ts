import { ZodError, ZodIssue } from 'zod';

const handleZodError = (err: ZodError) => {
  const errors = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  // prettify the error stack
  const stack = `Error: Something Went wrong\n at ${err.stack}`;

  return {
    name: err?.name,
    message: 'Validation failed',
    errors,
    stack,
  };
};

export default handleZodError;
