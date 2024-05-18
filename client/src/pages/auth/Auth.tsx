import useAuth from "../../hooks/useAuth";

const Auth = () => {
  const {
    setFormType,
    handleSubmit,
    register,
    reset,
    onSubmit,
    formType,
    errors,
  } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="p-8 max-w-md mx-auto"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="mt-10 md:mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 md:text-3xl">
            {formType === "signin" ? "Login" : "Create account"}
          </h2>
          <p className="text-gray-700">
            {formType === "signin"
              ? "Add your details below to get back into the app"
              : "Let's get you started sharing your links!"}
          </p>
          <div className="flex flex-col gap-5 mt-6">
            <div>
              <label
                className={`text-xs ${
                  errors.email ? "text-red-500" : "text-gray-900"
                }`}
                htmlFor="email"
              >
                Email address
              </label>
              <div
                className={`flex items-center gap-3 bg-white border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg p-3 mt-1`}
              >
                <input
                  {...register("email")}
                  className="w-full outline-none text-gray-800"
                  type="email"
                  placeholder="e.g. alex@email.com"
                  id="email"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                className={`text-xs ${
                  errors.password ? "text-red-500" : "text-gray-900"
                }`}
                htmlFor="password"
              >
                {formType === "signin" ? "Password" : "Create password"}
              </label>
              <div
                className={`flex items-center gap-3 bg-white border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg p-3 mt-1`}
              >
                <input
                  {...register("password")}
                  className="w-full outline-none text-gray-800"
                  type="password"
                  placeholder={
                    formType === "signin"
                      ? "Enter your password"
                      : "At least 8 characters"
                  }
                  id="password"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {formType === "signup" && (
              <div>
                <label
                  className={`text-xs ${
                    errors.confirm ? "text-red-500" : "text-gray-900"
                  }`}
                  htmlFor="confirm"
                >
                  Confirm password
                </label>
                <div
                  className={`flex items-center gap-3 bg-white border ${
                    errors.confirm ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 mt-1`}
                >
                  <input
                    {...register("confirm")}
                    className="w-full outline-none text-gray-800"
                    type="password"
                    placeholder="At least 8 characters"
                    id="confirm"
                  />
                </div>
                {errors.confirm && (
                  <p className="text-xs text-red-500">
                    {errors.confirm.message}
                  </p>
                )}
                <p className="text-xs text-gray-700 mt-2">
                  Password must contain at least 8 characters
                </p>
              </div>
            )}
            <button
              className="bg-blue-500 text-white p-3 font-semibold rounded-lg mt-4"
              type="submit"
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
              onClick={() => {
                setFormType(formType === "signin" ? "signup" : "signin");
                reset();
              }}
              className="text-blue-500"
            >
              {formType === "signin" ? "Create account" : "Login"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Auth;
