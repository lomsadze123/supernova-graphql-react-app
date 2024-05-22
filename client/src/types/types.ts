import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { ReactNode } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface UserContextTypes {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  currentUser: {
    id: string;
    email: string;
    signInCount: number;
    token: string;
  } | null;
  loading: boolean;
  refetchGlobal: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
  globalSignInCount: number;
}

export interface UserProviderProps {
  children: ReactNode;
}

export interface InputFieldTypes {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  error: string;
}
