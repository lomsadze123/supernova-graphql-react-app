import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const AuthErrorMessage = (
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
) => {
  if (error) {
    return typeof error.message === "string" ? (
      <p className="text-xs text-red-500">{error.message} </p>
    ) : null;
  }
  return null;
};

export default AuthErrorMessage;
