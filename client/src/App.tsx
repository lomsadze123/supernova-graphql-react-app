import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "./actions/userActions/getUser";
import { useEffect } from "react";

const App = () => {
  const { data } = useQuery(GET_CURRENT_USER); //  loading, error,

  useEffect(() => {
    console.log("currentUser", data);
  }, [data]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
