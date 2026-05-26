export interface PriceConfiguration {
    [key: string]: {
        priceType: "base" | "aditional";
        availableOption: string[];
    };
}

export interface Attribute {
    name: string;
    widgetType: "switch" | "radio";
    defaultValue: string;
    availableOption: string[];
}

export interface Category {
    name: string;
    PriceConfiguration: PriceConfiguration;
    attribute: Attribute[];
}
