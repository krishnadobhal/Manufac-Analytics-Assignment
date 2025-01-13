import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import CropTable from "./components/table";

export default function App() {
  return <MantineProvider theme={theme}>
    <CropTable/>
  </MantineProvider>;
}
