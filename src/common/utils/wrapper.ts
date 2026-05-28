import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";

const isS3AccessDeniedError = (error: Error) => {
    return (
        error.name === "AccessDenied" ||
        error.name === "Forbidden" ||
        /not authorized to perform:\s*s3:putobject/i.test(error.message)
    );
};

export const asyncWrapper = (requestHandler: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            if (err instanceof Error) {
                if (isS3AccessDeniedError(err)) {
                    return next(
                        createHttpError(
                            403,
                            "S3 upload is not allowed for the configured IAM user",
                        ),
                    );
                }
                return next(createHttpError(500, err.message));
            }
            return next(createHttpError(500, "internal server error"));
        });
    };
};
