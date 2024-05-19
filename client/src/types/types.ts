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
}

export interface UserProviderProps {
  children: ReactNode;
}
