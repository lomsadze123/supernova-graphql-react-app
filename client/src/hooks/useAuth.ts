import { useState } from "react";
import { useForm } from "react-hook-form";
import authValidation from "../utils/authValidation";
import { useMutation } from "@apollo/client";
import { CREATE_USER, LOGIN_USER } from "../actions/userActions/userMutations";
import { useNavigate } from "react-router-dom";
import useUserContext from "../context/userContext";
import { ZodIssue } from "zod";
import { toast } from "react-toastify";

const useAuth = () => {
  const { setToken, refetchGlobal } = useUserContext();
  const [formType, setFormType] = useState("signin");
  const { userCredentialsSchema } = authValidation();
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm();
  const [errors, setErrors] = useState<ZodIssue[]>([]);

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      setToken(createUser.token);
      localStorage.setItem("token", createUser.token);
      refetchGlobal();
      navigate("/home");
    },
  }); // , { loading, error }
  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: ({ loginUser }) => {
      setToken(loginUser.token);
      localStorage.setItem("token", loginUser.token);
      refetchGlobal();
      navigate("/home");
    },
    onError: (error) => {
      if (error.message === "JsonWebTokenError: jwt expired") {
        // Token expired, remove it from localStorage
        localStorage.removeItem("token");
        toast("Your session has expired. Please log in again.");
      } else {
        toast(error.message);
      }
    },
  });

  const handleCreateUser = (data: any) => {
    createUser({ variables: { input: data } });
  };

  const handleLoginUser = (data: any) => {
    loginUser({ variables: { input: data } });
  };

  const onSubmit = async (data: any) => {
    try {
      const result = userCredentialsSchema.safeParse(data);
      if (result.success) {
        setErrors([]);
        if (formType === "signin") {
          handleLoginUser(data);
        } else {
          handleCreateUser(data);
        }
        reset();
      } else {
        setErrors(result.error.errors);
      }
    } catch (error) {
      console.log("onsubmit error", error);
    }
  };

  const switchFormType = (type: string) => {
    setFormType(type);
    setErrors([]);
    reset();
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
