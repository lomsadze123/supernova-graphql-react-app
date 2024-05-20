const AuthErrorMessage = ({ error }: { error: string }) => {
  if (error) {
    return typeof error === "string" ? (
      <p className="text-xs text-red-500">{error} </p>
    ) : null;
  }
  return null;
};

export default AuthErrorMessage;
