import { ConfigService } from '@nestjs/config';
export type DriveToken = {
    access_token: string;
    refresh_token: string;
    expiry_date: number;
    scope: string;
};
export declare class OllamaRepository {
    private readonly configService;
    private modelName;
    private proxy;
    private ollamaUrl;
    constructor(configService: ConfigService);
    pullModel(): Promise<any>;
    chat(messages: any[]): Promise<any>;
}
