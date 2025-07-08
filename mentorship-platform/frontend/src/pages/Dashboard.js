import { useAuth } from "../auth/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Welcome {user?.role?.toUpperCase()}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;