import { NavLink, useNavigate } from "react-router-dom";
import useUserContext from "../../context/userContext";

const Header = () => {
  const { setToken } = useUserContext();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex items-center justify-between">
        <div>
          <NavLink
            to="/home"
            className="text-white font-bold text-lg hover:text-gray-400"
          >
            Home
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/dashboard"
            className="text-white font-semibold hover:text-gray-400 mr-4"
          >
            Dashboard
          </NavLink>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
