import { useState } from "react";
import {
  Avatar,
  Group,
  Menu,
  Text,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconChevronDown,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconLogout,
  IconPlayerPause,
} from "@tabler/icons-react";
import classes from "./user-menu-button.module.css";
import IUser from "../../models/IUser";

const userMock = {
  name: "Jane Spoonfighter",
  email: "janspoon@fighter.dev",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
};

interface Props {
  user: IUser;
  logout: () => void;
}

const UserMenuButton: React.FC<Props> = ({ user, logout }) => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <Menu
      trigger="hover"
      openDelay={100}
      closeDelay={200}
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={
            userMenuOpened
              ? `${classes.user} ${classes.userActive}`
              : `${classes.user}`
          }
        >
          <Group gap={7}>
            <Avatar
              src={userMock.image}
              alt={`${user.nickname} avatar`}
              radius="xl"
              size={40}
            />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.email}
            </Text>
            <IconChevronDown
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconHeart
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.red[6]}
              stroke={1.5}
            />
          }
        >
          Liked posts
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconStar
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.yellow[6]}
              stroke={1.5}
            />
          }
        >
          Saved posts
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessage
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          }
        >
          Your comments
        </Menu.Item>

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          disabled
          leftSection={
            <IconSettings
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Account settings
        </Menu.Item>

        <Menu.Item
          onClick={() => logout()}
          leftSection={
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Logout
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          disabled
          leftSection={
            <IconPlayerPause
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Pause subscription
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenuButton;
