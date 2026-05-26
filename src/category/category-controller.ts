import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { CategoryService } from "./category-service";
import { Logger } from "winston";
import { Category } from "./category-types";

export class CategoryController {
    constructor(
        private categoryService: CategoryService,
        private logger: Logger,
    ) {
        this.create = this.create.bind(this);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0]?.msg as string));
        }
        const { name, PriceConfiguration, attribute } = req.body as Category;
        const category = await this.categoryService.create({
            name,
            PriceConfiguration,
            attribute,
        });
        this.logger.info(`Created category`, { id: category._id });
        res.json({ id: category._id });
    }
}
