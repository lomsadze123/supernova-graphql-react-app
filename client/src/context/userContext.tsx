import { createContext, useContext, useEffect, useState } from "react";
import { UserContextTypes, UserProviderProps } from "../types/types";
import {
  GET_CURRENT_USER,
  GLOBAL_SIGNIN_COUNT_QUERY,
  GLOBAL_SIGNIN_COUNT_SUBSCRIPTION,
} from "../actions/getUser";
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

  // Query to fetch current user data
  const {
    data: userData,
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

  // Query to fetch global sign-in count
  const { data: globalData, refetch: refetchGlobal } = useQuery(
    GLOBAL_SIGNIN_COUNT_QUERY
  );
  // Subscription to get updates on global sign-in count
  const { data: subscriptionData } = useSubscription(
    GLOBAL_SIGNIN_COUNT_SUBSCRIPTION
  );

  // Extract global sign-in count from subscription or query data
  const globalSignInCount = subscriptionData
    ? subscriptionData.globalSignInCount
    : globalData?.globalSignInCount;

  useEffect(() => {
    if (globalSignInCount === 5 && location.pathname !== "/") {
      toast("Global sign in count is 5!");
    }
  }, [globalSignInCount, location.pathname]);

  useEffect(() => {
    if (userData && userData.currentUser) {
      setCurrentUser(userData.currentUser);
    }
  }, [userData]);

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
