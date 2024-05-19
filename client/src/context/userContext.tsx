import { createContext, useContext, useEffect, useState } from "react";
import { UserContextTypes, UserProviderProps } from "../types/types";
import { GET_CURRENT_USER } from "../actions/userActions/getUser";
import { useQuery } from "@apollo/client";

const UserContext = createContext<UserContextTypes | undefined>(undefined);

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useLinkContext must be used within a LinkProvider");
  }
  return context;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const {
    data: currentUser,
    refetch: refetchCurrentUser,
    loading,
  } = useQuery(GET_CURRENT_USER, {
    skip: !token,
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  useEffect(() => {
    if (token) {
      refetchCurrentUser();
    }
  }, [token, refetchCurrentUser]);

  const contextValue: UserContextTypes = {
    token,
    setToken,
    currentUser,
    loading,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default useUserContext;
