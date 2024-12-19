import { ConfigService } from '@nestjs/config';
import { SyntheticData } from '../types';
import { DriveToken } from './drive.repository';
export declare class SixgptUserRepository {
    private readonly configService;
    private wallet;
    private jwtToken;
    private versionToken;
    constructor(configService: ConfigService);
    private _getJwtToken;
    jwt(): Promise<string>;
    private _version;
    version(): Promise<string>;
    refreshDriveCredentials(tries?: number): Promise<DriveToken>;
    getDriveCredentials(tries?: number): Promise<DriveToken>;
    submitExamples(examples: SyntheticData[], tries?: number): any;
}
