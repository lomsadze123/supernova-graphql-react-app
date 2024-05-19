import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import ErrorPage from "./pages/error/ErrorPage";
import WebSocketComponent from "./components/WebSocketComponent/WebSocketComponent";
import useUserContext from "./context/userContext";
import Header from "./components/header/Header";

const App = () => {
  const { currentUser, token } = useUserContext();
  console.log(currentUser);

  return (
    <>
      <WebSocketComponent />
      {token && <Header />}
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
