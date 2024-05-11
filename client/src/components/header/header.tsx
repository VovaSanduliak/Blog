import { FC } from "react";
import { AppShell, Container, Group, Burger, Button } from "@mantine/core";
import classes from "./header.module.css";
import logo from "../../assets/logo.jpg";
import useAuth from "../../hooks/use-auth";
import UserMenuButton from "../header-menu/user-menu-button";
import LoginForm from "../../forms/login-form/login-form";
import { modals } from "@mantine/modals";

interface Props {
  navbarOpened: boolean;
  toggleNavbar: () => void;
}

const Header: FC<Props> = ({ navbarOpened, toggleNavbar }) => {
  const auth = useAuth();

  const handleClickLogin = () => {
    modals.open({
      children: <LoginForm auth={auth} />,
      centered: true,
    });
  };

  return (
    <AppShell.Header className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Burger
            opened={navbarOpened}
            onClick={toggleNavbar}
            hiddenFrom="sm"
            size="sm"
          />
          <img src={logo} alt="logo" width={20} />

          {auth.user ? (
            <UserMenuButton user={auth.user} logout={auth.logout} />
          ) : (
            <Group justify="center">
              <Button onClick={handleClickLogin} variant="default">
                Log in
              </Button>
            </Group>
          )}
        </Group>
      </Container>
    </AppShell.Header>
  );
};

export default Header;
