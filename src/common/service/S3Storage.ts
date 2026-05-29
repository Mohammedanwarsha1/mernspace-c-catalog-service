import {
    DeleteObjectCommand,
    DeleteObjectCommandInput,
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client,
} from "@aws-sdk/client-s3";
import { FileData, FileStorage } from "../types/storage";
import config from "config";

export class S3Strorage implements FileStorage {
    private client: S3Client;
    constructor() {
        this.client = new S3Client({
            region: config.get("s3.region"),
            credentials: {
                accessKeyId: config.get("s3.accessKeyId"),
                secretAccessKey: config.get("s3.secretAccessKey"),
            },
        });
    }
    async upload(data: FileData): Promise<void> {
        const objectParams: PutObjectCommandInput = {
            Bucket: config.get("s3.bucket"),
            Key: data.fileName,
            Body: data.fileData,
        };

        await this.client.send(new PutObjectCommand(objectParams));
    }

    async delete(fileName: string): Promise<void> {
        const objectParams: DeleteObjectCommandInput = {
            Bucket: config.get("s3.bucket"),
            Key: fileName,
        };

        await this.client.send(new DeleteObjectCommand(objectParams));
        return;
    }
    getObjectUri(): string {
        throw new Error("Method not implemented.");
    }
}
