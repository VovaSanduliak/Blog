import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import AuthProvider from "./context/auth-context";
import AppRouter from "./router/app-router";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";

const App = () => {
  return (
    <MantineProvider defaultColorScheme="light">
      <BrowserRouter>
        <ModalsProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </ModalsProvider>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;
