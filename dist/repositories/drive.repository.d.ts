import { SyntheticData } from '../types';
import { SixgptUserRepository } from './sixgpt.repository';
export type DriveToken = {
    access_token: string;
    refresh_token: string;
    expiry_date: number;
    scope: string;
};
export declare class DriveRepository {
    private readonly sixgptUserRepository;
    private driveCredentials;
    constructor(sixgptUserRepository: SixgptUserRepository);
    private formCredentialsFromToken;
    getActiveAccount(): Promise<DriveToken>;
    convertSyntheticDataToBuffer(data: SyntheticData[]): Promise<Uint8Array>;
    uploadWithRetry(data: Uint8Array): Promise<string>;
    private upload;
}
