import { useState } from "react";
import { useForm } from "react-hook-form";
import authValidation from "../utils/authValidation";
import { useMutation } from "@apollo/client";
import { CREATE_USER, LOGIN_USER } from "../actions/userMutations";
import { useNavigate } from "react-router-dom";
import useUserContext from "../context/userContext";
import { ZodIssue } from "zod";
import { toast } from "react-toastify";
import { FormData } from "../types/types";

const useAuth = () => {
  const { setToken, refetchGlobal } = useUserContext();
  const [formType, setFormType] = useState("signin");
  const { userCredentialsSchema } = authValidation();
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm();
  const [errors, setErrors] = useState<ZodIssue[]>([]);

  // Function to handle completion of mutation (signup or signin)
  const handleMutationCompletion = (data: any) => {
    setToken(data.token);
    localStorage.setItem("token", data.token);
    refetchGlobal();
    navigate("/home");
  };

  // Mutation hook for creating a new user
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser }) => handleMutationCompletion(createUser),
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: ({ loginUser }) => handleMutationCompletion(loginUser),
    onError: (error) => {
      if (error.message === "JsonWebTokenError: jwt expired") {
        localStorage.removeItem("token");
        toast("Your session has expired. Please log in again.");
      } else {
        toast(error.message);
      }
    },
  });

  const handleCreateUser = (data: FormData) => {
    createUser({ variables: { input: data } });
  };

  const handleLoginUser = (data: FormData) => {
    loginUser({ variables: { input: data } });
  };

  const switchFormType = (type: string) => {
    setFormType(type);
    setErrors([]);
    reset();
  };

  const onSubmit = async (data: any) => {
    try {
      const result = userCredentialsSchema.safeParse(data);
      if (result.success) {
        setErrors([]);
        formType === "signin" ? handleLoginUser(data) : handleCreateUser(data);
        reset();
      } else {
        setErrors(result.error.errors);
      }
    } catch (error) {
      console.log("onsubmit error", error);
      toast("An unexpected error occurred. Please try again.");
    }
  };

  return {
    setFormType: switchFormType,
    handleSubmit: handleSubmit(onSubmit),
    register,
    reset,
    formType,
    errors,
  };
};

export default useAuth;
