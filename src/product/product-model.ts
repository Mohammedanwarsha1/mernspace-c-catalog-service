import mongoose from "mongoose";

const attributeValueSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
    },
});

const priceConfigurationSchema = new mongoose.Schema({
    priceType: {
        type: String,
        enum: ["base", "aditional"],
    },
    availableOptions: {
        type: Map,
        of: Number,
    },
});

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        image: {
            type: String,
            require: true,
        },
        priceConfiguration: {
            type: Map,
            of: priceConfigurationSchema,
        },
        attributes: [attributeValueSchema],
        tenantId: {
            type: String,
            require: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.Mixed,
            ref: "Category",
        },
        isPublish: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true },
);

export default mongoose.model("Product", productSchema);
