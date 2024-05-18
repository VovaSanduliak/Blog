import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import AuthProvider from "./context/auth-context";
import "@mantine/core/styles.css";
import AppRouter from "./router/app-router";

const App = () => {
  return (
    <BrowserRouter>
      <MantineProvider defaultColorScheme="light">
        <ModalsProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  );
};

export default App;
