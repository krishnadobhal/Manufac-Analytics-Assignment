import React,{ useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { CropData, datas } from '../types/interface';


/**
 * Aggregates crop data to calculate average yield per crop.
 * 
 * @param cropdata[] - Array of crop data objects containing crop names and yield information
 * @returns Array of objects containing crop names and their average yields
 */
const aggregateCropData = (cropdata:datas[]) => {
    const cropSummary: Record<string, { totalYield: number; count: number }> = {};

    cropdata.forEach((crop) => {
        // Extract the crop name and production yield from the current crop object
        const cropName = crop["Crop Name"];
        const production = crop["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"];

        if (!cropSummary[cropName]) {
            cropSummary[cropName] = { totalYield: 0, count: 0 };
        }

        if (production && production !== "") {
            cropSummary[cropName].totalYield += parseFloat(production.toString());
        }
        cropSummary[cropName].count += 1;
    });

    return Object.entries(cropSummary).map(([crop, { totalYield, count }]) => ({
        crop,
        averageYield: totalYield / count,
    }));
};
// Truncates a crop name to a specified maximum length.
const truncateCropName = (name: string, maxLength: number) => {
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
};

/**
 * BarChart component to display average crop yield in a bar chart.
 * 
 * @param cropdata - Array of crop data objects containing crop names and yield information
 * @returns JSX.Element- A bar chart representing the average yield per crop
 */
const BarChart: React.FC<CropData> = ({ datas }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartData, setChartData] = useState<{ crop: string; averageYield: number }[]>([]);

    useEffect(() => {
        const aggregatedData = aggregateCropData(datas);
        setChartData(aggregatedData);
    }, [datas]);

    useEffect(() => {
        if (chartRef.current && chartData.length > 0) {
            const chartInstance = echarts.init(chartRef.current);

            const option = {
                title: {
                    text: 'Average Crop Yield',
                },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: chartData.map((item) => truncateCropName(item.crop, 8)),
                },
                yAxis: {
                    type: 'value',
                    name: 'Average Yield (Kg/Ha)',
                    max:6000,
                },
                series: [
                    {
                        name: 'Average Yield',
                        type: 'bar',
                        data: chartData.map((item) => parseFloat(item.averageYield.toFixed(2))),
                    },
                ],
            };

            chartInstance.setOption(option);

            return () => {
                chartInstance.dispose();
            };
        }
    }, [chartData]);

    return <div ref={chartRef} style={{ marginLeft:"10px",width: '90%', height: '42vh' }} />;
};

export default BarChart;