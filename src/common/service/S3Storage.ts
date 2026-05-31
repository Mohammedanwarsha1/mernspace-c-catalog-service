import {
    DeleteObjectCommand,
    DeleteObjectCommandInput,
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client,
} from "@aws-sdk/client-s3";
import { FileData, FileStorage } from "../types/storage";
import config from "config";
import createHttpError from "http-errors";

export class S3Strorage implements FileStorage {
    private client: S3Client;
    private readonly bucket: string;
    private readonly region: string;
    constructor() {
        this.bucket = config.get("s3.bucket") as string;
        this.region = config.get("s3.region") as string;

        this.client = new S3Client({
            region: this.region,
            // Path-style requests hit the regional endpoint directly and avoid
            // per-bucket DNS resolution issues in unstable local DNS setups.
            forcePathStyle: true,
            credentials: {
                accessKeyId: config.get("s3.accessKeyId"),
                secretAccessKey: config.get("s3.secretAccessKey"),
            },
        });
    }
    async upload(data: FileData): Promise<void> {
        const objectParams: PutObjectCommandInput = {
            Bucket: this.bucket,
            Key: data.fileName,
            Body: data.fileData,
        };

        try {
            await this.client.send(new PutObjectCommand(objectParams));
        } catch (error: unknown) {
            if (
                typeof error === "object" &&
                error !== null &&
                "message" in error &&
                typeof (error as { message: string }).message === "string" &&
                (error as { message: string }).message.includes("ENOTFOUND")
            ) {
                throw createHttpError(
                    503,
                    "S3 endpoint DNS lookup failed. Check internet/VPN/DNS and try again.",
                );
            }
            throw error;
        }
    }

    async delete(fileName: string): Promise<void> {
        const objectParams: DeleteObjectCommandInput = {
            Bucket: this.bucket,
            Key: fileName,
        };

        await this.client.send(new DeleteObjectCommand(objectParams));
        return;
    }
    getObjectUri(filename: string): string {
        // https://mernspace-project.s3.ap-south-1.amazonaws.com/5962624d-1b9e-4c96-b1d6-395ca9ef4933
        if (
            typeof this.bucket === "string" &&
            typeof this.region === "string"
        ) {
            return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${filename}`;
        }
        const error = createHttpError(500, "Invalid S3 configuration");
        throw error;
    }
}
