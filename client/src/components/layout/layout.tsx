import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Navbar from "../navbar/navbar";

const Layout: FC = () => {
  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: "sm",
        collapsed: { mobile: !navbarOpened },
      }}
      padding="md"
    >
      <Header navbarOpened toggleNavbar={toggleNavbar} />
      <Navbar />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer p="md"></AppShell.Footer>
    </AppShell>
  );
};

export default Layout;
