import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

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
        description: {
            type: String,
            required: true,
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
            type: mongoose.Schema.Types.ObjectId,
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

productSchema.plugin(aggregatePaginate);
export default mongoose.model("Product", productSchema);
