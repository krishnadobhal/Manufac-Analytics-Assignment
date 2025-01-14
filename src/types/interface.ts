export interface datas {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": number;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
    "Area Under Cultivation (UOM:Ha(Hectares))": number;
}

export interface CropData {
    datas: {
        Country: string;
        Year: string;
        "Crop Name": string;
        "Crop Production (UOM:t(Tonnes))": number;
        "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
        "Area Under Cultivation (UOM:Ha(Hectares))": number;
    }[];
}