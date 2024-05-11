import { Button } from "@mantine/core";
import { FC } from "react";
import useAuth from "../../hooks/use-auth";

const ProfilePage: FC = () => {
  const auth = useAuth();
  return <h1>Profile</h1>;
};

export default ProfilePage;
