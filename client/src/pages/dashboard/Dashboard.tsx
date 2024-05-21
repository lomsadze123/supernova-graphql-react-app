import useUserContext from "../../context/userContext";

const Dashboard = () => {
  const { globalSignInCount, currentUser } = useUserContext();

  return (
    <main className="p-4 mt-10">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Global Sign-In Count: {globalSignInCount}
        </h1>
        <p className="text-lg">
          Your Sign-In Count: {currentUser?.signInCount}
        </p>
      </div>
    </main>
  );
};

export default Dashboard;
