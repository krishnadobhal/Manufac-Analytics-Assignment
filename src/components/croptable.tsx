import { Table, Pagination } from "@mantine/core";
import React, { useState } from "react";

const extractYear = (input: string): string => {
  const match = input.match(/(\d{4})$/); // Match the last 4 digits
  return match ? match[1] : ""; 
};

/**
 * Processes crop data to summarize the maximum and minimum crop production for each year.
 *
 * @param cropdata[] - Array of crop data objects containing crop names and yield information
 * @returns {Array<{}>} An array of objects summarizing the maximum and minimum crop production for each year.
 *
 */
const processCropData = (cropdata:datas[]) => {
  const yearSummary: Record<
    string,
    {
      maxProduction: { crop: string; production?: number };
      minProduction: { crop: string; production?: number };
    }
  > = {};

  // Processes crop data to find max and min production for each year and returns a summary array 
  cropdata.forEach((crop) => {
    const year = extractYear(crop.Year);
    const production = crop["Crop Production (UOM:t(Tonnes))"];
    const cropName = crop["Crop Name"];

    if (!yearSummary[year]) {
      yearSummary[year] = {
        maxProduction: { crop: cropName, production },
        minProduction: { crop: cropName, production },
      };
    } else {
      if (yearSummary[year].maxProduction.production && production && production > yearSummary[year].maxProduction.production) {
        yearSummary[year].maxProduction = { crop: cropName, production };
      }
      if (yearSummary[year].minProduction.production && production && production < yearSummary[year].minProduction.production) {
        yearSummary[year].minProduction = { crop: cropName, production };
      }
    }
  });

  return Object.entries(yearSummary).map(([year, summary]) => ({
    year,
    maxCrop: summary.maxProduction.crop,
    minCrop: summary.minProduction.crop,
  }));
};

interface datas {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number|string;
  "Area Under Cultivation (UOM:Ha(Hectares))": number;
}

interface CropData {
  datas: {
      Country: string;
      Year: string;
      "Crop Name": string;
      "Crop Production (UOM:t(Tonnes))": number;
      "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number|string;
      "Area Under Cultivation (UOM:Ha(Hectares))": number;
  }[];
}

/**
 * CropTable component to display the maximum and minimum crop production for each year.
 * 
 * @param cropdata - Array of crop data objects containing crop names and yield information
 * @returns JSX.Element- A Table representing the maximum and minimum crop production for each year
 */

const CropTable:React.FC<CropData>= ({datas}) => {
  const data = datas;
  const tableData = processCropData(data);
  const [activePage, setPage] = useState(1);
  const rowsPerPage = 9;

  const rows = tableData
    .slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage)
    .map((row) => (
      <Table.Tr key={row.year}>
        <Table.Td >{row.year}</Table.Td>
        <Table.Td >{row.maxCrop}</Table.Td>
        <Table.Td >{row.minCrop}</Table.Td>
      </Table.Tr>
    ));

  return (
    <div>
      <Table withColumnBorders withRowBorders withTableBorder striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Year</Table.Th>
            <Table.Th>Crop with Maximum Production in that Year</Table.Th>
            <Table.Th>Crop with Minimum Production in that Year</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          value={activePage}
          onChange={setPage}
          total={Math.ceil(tableData.length / rowsPerPage)}
          mt="md"
        />
      </div>
    </div>
  );
};

export default CropTable;