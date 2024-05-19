import { useState } from "react";
import { useForm } from "react-hook-form";
import authValidation from "../utils/authValidation";
import { useMutation } from "@apollo/client";
import { CREATE_USER, LOGIN_USER } from "../actions/userActions/userMutations";
import { useNavigate } from "react-router-dom";
import useUserContext from "../context/userContext";

const useAuth = () => {
  const { setToken, refetchGlobal } = useUserContext();
  const [formType, setFormType] = useState("signin");
  const { userCredentialsSchema } = authValidation();
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      setToken(createUser.token);
      localStorage.setItem("token", createUser.token);
      refetchGlobal();
    },
  }); // , { loading, error }
  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: ({ loginUser }) => {
      setToken(loginUser.token);
      localStorage.setItem("token", loginUser.token);
      refetchGlobal();
    },
  });
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const handleCreateUser = (data: any) => {
    createUser({ variables: { input: data } });
  };

  const handleLoginUser = (data: any) => {
    loginUser({ variables: { input: data } });
  };

  const onSubmit = async (data: any) => {
    try {
      await trigger();
      const result = userCredentialsSchema.safeParse(data);
      if (result.success) {
        if (formType === "signin") {
          handleLoginUser(data);
          reset();
        } else {
          handleCreateUser(data);
          reset();
        }
        navigate("/home");
      } else {
        console.log("Form contains errors, please fix them before submitting");
        console.log(result.error.errors);
      }
    } catch (error) {
      console.log("onsubmit error", error);
    }
  };

  return {
    setFormType,
    handleSubmit: handleSubmit(onSubmit),
    register,
    reset,
    formType,
    errors,
  };
};

export default useAuth;
