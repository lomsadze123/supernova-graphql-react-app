import { Link } from "react-router-dom";

const ErrorPageMessage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Oops!</h1>
        <p className="text-lg text-gray-800">
          It seems something went wrong. Please try again later.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          This may also occur if the path is incorrect.
        </p>
        <Link to="/home" className="text-blue-600 hover:underline mt-4 block">
          Return to Home Page
        </Link>
      </div>
    </div>
  );
};

export default ErrorPageMessage;
