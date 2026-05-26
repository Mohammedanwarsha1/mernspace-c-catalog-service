import { body } from "express-validator";

export default [
    body("name")
        .exists()
        .withMessage("Category name is required")
        .isString()
        .withMessage("Category name should be a string"),
    body("PriceConfiguration")
        .exists()
        .withMessage("Price configuration is required"),
    body("PriceConfiguration.*.priceType")
        .exists()
        .withMessage("Price type is required")
        .custom((value: "base" | "aditional") => {
            const validKeys = ["base", "aditional"];
            if (!validKeys.includes(value)) {
                throw new Error(
                    `${value} is invalid attribute for priceType feild.Possible values are: [${validKeys.join(",")}]`,
                );
            }
            return true;
        }),
    body("attribute").exists().withMessage("Attribute feild is required"),
];
