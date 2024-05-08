import { Button } from "@mantine/core";
import useAuth from "../hooks/use-auth";

const Dashboard = () => {
  const auth = useAuth();

  return (
    <div>
      <h1>Welcome! {auth.user?.email}</h1>
      <Button onClick={() => auth.logout()}>Logout</Button>
    </div>
  );
};

export default Dashboard;
