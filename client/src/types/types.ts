import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { ReactNode } from "react";

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
