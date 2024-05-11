import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Title,
  Text,
  Group,
  Button,
} from "@mantine/core";
import classes from "./login-form.module.css";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IAuthContext } from "../../context/auth-context";
import { FC } from "react";

type loginData = {
  email: string;
  password: string;
};

interface Props {
  auth: IAuthContext;
}

const LoginForm: FC<Props> = ({ auth }) => {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
    validateInputOnBlur: true,
  });

  const handleSubmit = async (loginData: loginData) => {
    auth.login(loginData);
    modals.closeAll();
  };

  return (
    <>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <form onSubmit={form.onSubmit((loginData) => handleSubmit(loginData))}>
        <TextInput
          type="email"
          label="Email"
          withAsterisk
          placeholder="Email"
          key={form.key("email")}
          {...form.getInputProps("email")}
          required
        />
        <PasswordInput
          label="Password"
          withAsterisk
          placeholder="Password"
          mt="md"
          key={form.key("password")}
          {...form.getInputProps("password")}
          required
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button type="submit" fullWidth mt="xl">
          Sign in
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
