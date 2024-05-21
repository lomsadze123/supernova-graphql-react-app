import { createContext, useContext, useEffect, useState } from "react";
import { UserContextTypes, UserProviderProps } from "../types/types";
import {
  GET_CURRENT_USER,
  GLOBAL_SIGNIN_COUNT_QUERY,
  GLOBAL_SIGNIN_COUNT_SUBSCRIPTION,
} from "../actions/userActions/getUser";
import { useQuery, useSubscription } from "@apollo/client";
import { toast } from "react-toastify";

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
  const [currentUser, setCurrentUser] =
    useState<UserContextTypes["currentUser"]>(null);
  const {
    data,
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

  const { data: globalData, refetch: refetchGlobal } = useQuery(
    GLOBAL_SIGNIN_COUNT_QUERY
  );
  const { data: subscriptionData } = useSubscription(
    GLOBAL_SIGNIN_COUNT_SUBSCRIPTION
  );

  const globalSignInCount = subscriptionData
    ? subscriptionData.globalSignInCount
    : globalData?.globalSignInCount;

  const notify = () => toast("Global sign in count is 5!");

  useEffect(() => {
    if (globalSignInCount === 5 && location.pathname !== "/") {
      notify();
    }
  }, [globalSignInCount, location.pathname]);

  useEffect(() => {
    if (data && data.currentUser) {
      setCurrentUser(data.currentUser);
    }
  }, [data]);

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
    refetchGlobal,
    globalSignInCount,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default useUserContext;
