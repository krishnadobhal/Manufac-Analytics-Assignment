import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import CropTable from "./components/croptable";
import BarChart from "./components/BarChart";
import cropdata from "./assets/Manufac _ India Agro Dataset.json";
import { datas } from "./types/interface";



/**
 * Root component of the application
 * @returns JSX.Element
 */
export default function App() {
  const data: datas[] = cropdata as datas[];

  return (
    <MantineProvider theme={theme}>
      <div className="app-container">
        <CropTable datas={data} />  {/* This is the table component */}
        <BarChart datas={data} />   {/* This is the bar chart component */}
      </div>
    </MantineProvider>
  );
}
