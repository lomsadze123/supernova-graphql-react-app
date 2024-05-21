import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import ErrorPage from "./pages/error/ErrorPage";
import useUserContext from "./context/userContext";
import Header from "./components/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import removeExpiredToken from "./utils/tokenExpiration";

const App = () => {
  const { currentUser, token } = useUserContext();
  console.log("currentUser", currentUser);

  useEffect(() => {
    removeExpiredToken();
  }, [location]);

  return (
    <>
      {token && <Header />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Auth />} />
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/" replace />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
