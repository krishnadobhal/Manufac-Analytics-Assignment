import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import CropTable from "./components/croptable";
import BarChart from "./components/BarChart";
import cropdata from "./assets/Manufac _ India Agro Dataset.json";


interface CropData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
  "Area Under Cultivation (UOM:Ha(Hectares))": number;
}

/**
 * Root component of the application
 * @returns JSX.Element
 */
export default function App() {
  const data: CropData[] = cropdata as CropData[];

  return (
    <MantineProvider theme={theme}>
      <div className="app-container">
        <CropTable datas={data} />  {/* This is the table component */}
        <BarChart datas={data} />   {/* This is the bar chart component */}
      </div>
    </MantineProvider>
  );
}
