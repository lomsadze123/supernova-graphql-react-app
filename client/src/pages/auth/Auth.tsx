import useAuth from "../../hooks/useAuth";
import AuthErrorMessage from "../../components/errors/AuthErrorMessage";

const Auth = () => {
  const { setFormType, handleSubmit, register, formType, errors } = useAuth();

  const getErrorMessage = (field: string) => {
    const error = errors.find((err) => err.path[0] === field);
    return error ? error.message : "";
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="p-8 max-w-md mx-auto" onSubmit={handleSubmit} noValidate>
        <div className="mt-10 md:mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 md:text-3xl">
            {formType === "signin" ? "Login" : "Create account"}
          </h2>
          <p className="text-gray-700 text-xl">
            {formType === "signin"
              ? "Welcome back! Please log in to continue"
              : "Let's get you started sharing your links!"}
          </p>
          <div className="flex flex-col gap-5 mt-6">
            <div>
              <label
                className={`text-xs ${
                  getErrorMessage("email") ? "text-red-500" : "text-gray-900"
                }`}
                htmlFor="email"
              >
                Email address
              </label>
              <div
                className={`flex items-center gap-3 bg-white border ${
                  getErrorMessage("email")
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg p-3 mt-1`}
              >
                <input
                  {...register("email")}
                  className="w-full outline-none text-gray-800"
                  type="email"
                  placeholder="e.g. beka@gmail.com"
                  id="email"
                />
              </div>
              <AuthErrorMessage error={getErrorMessage("email")} />
            </div>
            <div>
              <label
                className={`text-xs ${
                  getErrorMessage("password") ? "text-red-500" : "text-gray-900"
                }`}
                htmlFor="password"
              >
                {formType === "signin" ? "Password" : "Create password"}
              </label>
              <div
                className={`flex items-center gap-3 bg-white border ${
                  getErrorMessage("password")
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg p-3 mt-1`}
              >
                <input
                  {...register("password")}
                  className="w-full outline-none text-gray-800"
                  type="password"
                  placeholder={
                    formType === "signin"
                      ? "Enter your password"
                      : "At least 6 characters"
                  }
                  id="password"
                />
              </div>
              <AuthErrorMessage error={getErrorMessage("password")} />
            </div>
            <button
              className="bg-blue-500 text-white p-3 font-semibold rounded-lg mt-4"
              // type="submit"
            >
              {formType === "signin" ? "Login" : "Create new account"}
            </button>
          </div>
          <div className="text-center mt-4 flex flex-col gap-1 md:flex-row md:justify-center">
            <p className="text-gray-700">
              {formType === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <button
              type="button"
              onClick={() => {
                setFormType(formType === "signin" ? "signup" : "signin");
              }}
              className="text-blue-500"
            >
              {formType === "signin" ? "Create account" : "Login"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Auth;
