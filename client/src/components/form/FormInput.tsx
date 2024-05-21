import { InputFieldTypes } from "../../types/types";
import AuthErrorMessage from "../errors/AuthErrorMessage";

const FormInput = ({
  label,
  type,
  id,
  placeholder,
  register,
  error,
}: InputFieldTypes) => (
  <div>
    <label
      className={`text-xs ${error ? "text-red-500" : "text-gray-900"}`}
      htmlFor={id}
    >
      {label}
    </label>
    <div
      className={`flex items-center gap-3 bg-white border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg p-3 mt-1`}
    >
      <input
        {...register(id)}
        className="w-full outline-none text-gray-800"
        type={type}
        placeholder={placeholder}
        id={id}
      />
    </div>
    <AuthErrorMessage error={error} />
  </div>
);

export default FormInput;
