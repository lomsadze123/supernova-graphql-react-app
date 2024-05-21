import { Navigate, Route, Routes } from "react-router-dom";
import useUserContext from "./context/userContext";
import Header from "./components/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, lazy, useEffect } from "react";
import removeExpiredToken from "./utils/tokenExpiration";

const Auth = lazy(() => import("./pages/auth/Auth"));
const Home = lazy(() => import("./pages/home/Home"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const ErrorPage = lazy(() => import("./pages/error/ErrorPage"));

const App = () => {
  const { token } = useUserContext();

  useEffect(() => {
    removeExpiredToken();
  }, [location]);

  return (
    <>
      {token && <Header />}
      <ToastContainer />
      <Suspense
        fallback={
          <h1 className="text-3xl font-bold text-center mt-20">Loading...</h1>
        }
      >
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/home" /> : <Auth />}
          />
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
      </Suspense>
    </>
  );
};

export default App;
