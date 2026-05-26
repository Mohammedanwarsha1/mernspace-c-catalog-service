import mongoose from "mongoose";
import { PriceConfiguration, Attribute, Category } from "./category-types";

const priceConfigurationSchema = new mongoose.Schema<PriceConfiguration>({
    priceType: {
        type: String,
        enum: ["base", "aditional"],
        required: true,
    },
    availableOption: {
        type: [String],
        required: true,
    },
});

const attributeSchema = new mongoose.Schema<Attribute>({
    name: {
        type: String,
        required: true,
    },
    widgetType: {
        type: String,
        enum: ["switch", "radio"],
        required: true,
    },
    availableOption: {
        type: [String],
        required: true,
    },
});

const categorySchema = new mongoose.Schema<Category>({
    name: {
        type: String,
        required: true,
    },
    PriceConfiguration: {
        type: Map,
        of: priceConfigurationSchema,
        required: true,
    },
    attribute: {
        type: [attributeSchema],
        required: true,
    },
});

export default mongoose.model("Category", categorySchema);
