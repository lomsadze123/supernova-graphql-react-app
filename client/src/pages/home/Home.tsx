import useUserContext from "../../context/userContext";

const Home = () => {
  const { currentUser, loading } = useUserContext();
  !loading && console.log("currentUser", currentUser);
  const id = loading ? "loading..." : currentUser?.email;

  return (
    <main className="flex flex-col items-center justify-center mt-48">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Hello {id}</h1>
        <p className="text-lg text-gray-600">
          You can check sign-in count quantity in the dashboard
        </p>
      </div>
    </main>
  );
};

export default Home;
