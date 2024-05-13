import { Button, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./registration-form.module.css";
import { useDisclosure } from "@mantine/hooks";
import authService from "../../services/auth-service";
import { modals } from "@mantine/modals";

type registrationData = {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegistrationForm: React.FC = () => {
  const [passwordsVisible, { toggle: togglePasswordsVisible }] =
    useDisclosure(false);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
    validateInputOnBlur: true,
  });

  const handleRegister = async (registrationData: registrationData) => {
    const { nickname, email, password } = registrationData;
    await authService.registration(nickname, email, password);

    modals.closeAll();
  };

  return (
    <>
      <Title ta="center" className={classes.title}>
        Registration
      </Title>

      <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
        <TextInput
          type="nickname"
          label="Nickname"
          withAsterisk
          placeholder="Nickname"
          key={form.key("nickname")}
          {...form.getInputProps("nickname")}
          required
        />

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
          visible={passwordsVisible}
          onVisibilityChange={togglePasswordsVisible}
          required
        />

        <PasswordInput
          label="Confirm password"
          withAsterisk
          placeholder="Password"
          mt="md"
          key={form.key("confirmPassword")}
          {...form.getInputProps("confirmPassword")}
          visible={passwordsVisible}
          onVisibilityChange={togglePasswordsVisible}
          required
        />

        <Button type="submit" fullWidth mt="xl">
          Register
        </Button>
      </form>
    </>
  );
};

export default RegistrationForm;
