import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import CropTable from "./components/table";
import BarChart from "./components/BarChart";
import cropdata from "./Manufac _ India Agro Dataset.json";

interface datas {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number|string;
  "Area Under Cultivation (UOM:Ha(Hectares))": number;
}

export default function App() {
  const data=cropdata as datas[];
  return <MantineProvider theme={theme}>
    <CropTable datas={data}/>
    <BarChart datas={data}/>
  </MantineProvider>;
}
