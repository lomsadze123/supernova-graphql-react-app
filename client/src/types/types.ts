import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { ReactNode } from "react";

export interface UserContextTypes {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  currentUser: {
    id: string;
    email: string;
    token: string;
  };
  loading: boolean;
  refetchGlobal: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
  globalData: any;
  subscriptionData: any; // change later
}

export interface UserProviderProps {
  children: ReactNode;
}
