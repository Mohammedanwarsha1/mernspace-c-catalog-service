import request from "supertest";

// use require to avoid TS module error if utils.ts doesn't use ES module exports
const { calculateDiscount } = require("./src/utils");
import app from "./src/app";

describe("App", () => {
    it("should calculate the discount", () => {
        const result = calculateDiscount(100, 10);
        expect(result).toBe(10);
    });

    it("should return 200 status", async () => {
        const response = await request(app).get("/").send();
        expect(response.statusCode).toBe(200);
    });
});
