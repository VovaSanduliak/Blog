import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { FC } from "react";
import useAuth from "../hooks/use-auth";

type loginValues = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const auth = useAuth();

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

  const handleSubmit = (values: loginValues) => {
    console.log(values);
    auth.login(values);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            type="email"
            withAsterisk
            label="Email"
            placeholder="your email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          ></TextInput>
          <TextInput
            mt="md"
            type="password"
            withAsterisk
            label="Password"
            placeholder="password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          ></TextInput>
          <Group justify="center" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>

      <Button onClick={open}>Open</Button>
    </>
  );
};

export default LoginForm;
