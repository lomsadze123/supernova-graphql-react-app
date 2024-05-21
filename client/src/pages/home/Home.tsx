import useUserContext from "../../context/userContext";

const Home = () => {
  const { currentUser, loading } = useUserContext();
  const email = loading ? "loading..." : currentUser?.email;

  return (
    <main className="flex flex-col items-center justify-center mt-48">
      <div className="text-center">
        <h1 className="text-2xl md:text-5xl font-bold text-gray-800">
          Welcome {email} !
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mt-6">
          You can check sign-in count quantity in the dashboard
        </p>
      </div>
    </main>
  );
};

export default Home;
