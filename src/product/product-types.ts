import mongoose from "mongoose";

export interface ProductAttribute {
    name: string;
    value: unknown;
}

export interface ProductPriceConfiguration {
    priceType: "base" | "aditional"; // keep spellings consistent with schema
    availableOptions: Record<string, number>;
}

export interface Product {
    _id?: mongoose.Types.ObjectId;
    name: string;
    description: string;
    priceConfiguration?: Record<string, ProductPriceConfiguration>;
    attributes: ProductAttribute[];
    tenantId: string;
    categoryId: mongoose.Types.ObjectId | string;
    image: string;
    isPublish?: boolean;
}
export interface Filters {
    tenantId?: string;
    categoryId?: mongoose.Types.ObjectId;
    isPublish?: boolean;
}

export interface PaginateQuery {
    page: number;
    limit: number;
}
