import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "./actions/userActions/getUser";
import { useEffect } from "react";
import ErrorPage from "./pages/error/ErrorPage";
import WebSocketComponent from "./components/WebSocketComponent/WebSocketComponent";

const App = () => {
  const { data } = useQuery(GET_CURRENT_USER); //  loading, error,

  useEffect(() => {
    console.log("currentUser", data);
  }, [data]);

  return (
    <>
      <WebSocketComponent />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
