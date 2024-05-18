import { useState } from "react";
import { useForm } from "react-hook-form";

const useAuth = () => {
  const [formType, setFormType] = useState("signin");
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    trigger,
  } = useForm({});

  const onSubmit = async ({}: { email: string; password: string }) => {
    try {
      await trigger();
      if (Object.keys(errors).length === 0) {
        console.log("Form submitted successfully");
      } else {
        console.log("Form contains errors, please fix them before submitting");
      }
    } catch (error) {
      console.log("onsubmit error", error);
    }
  };
  return {
    setFormType,
    handleSubmit,
    register,
    reset,
    onSubmit,
    formType,
    errors,
  };
};

export default useAuth;
