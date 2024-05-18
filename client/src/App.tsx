import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
