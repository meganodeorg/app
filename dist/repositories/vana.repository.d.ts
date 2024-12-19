import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { Cache } from 'cache-manager';
type NetworkConfig = {
    rpcUrl: string;
    dlpOwnerAddress: string;
    dataRegistryAddress: string;
    teePoolContract: string;
    rootNetworkContract: string;
    dlpAddress: string;
    tokenAddress: string;
    dlpId: number;
    chainId: number;
};
export declare const NETWORK_CONFIG: Record<string, NetworkConfig>;
export declare class VanaRepository {
    private readonly configService;
    private readonly cacheManager;
    wallet: ethers.Wallet;
    private network;
    private signature;
    private dataRegistryContract;
    private dlpContract;
    private teePoolContract;
    constructor(configService: ConfigService, cacheManager: Cache);
    submit(url: string): Promise<void>;
    private addFileWithPermissions;
    submitTeeRequest(fileId: string, tries?: number): any;
    fileJobIds(fileId: number, tries?: number): any;
    getTeeDetails(jobId: number, tries?: number): Promise<{
        teeUrl: string;
        teeAddress: string;
        jobStatus: string;
    }>;
    requestTeeProof(teeUrl: string, teeAddress: string, latestJobId: number, uploadedFileId: number, fixedIv: Buffer, fixedEphemeralKey: Buffer, numberTimes?: number): any;
    requestReward(fileId: number, tries?: number): any;
    encryptWithMasterKey(masterKey: string): Promise<{
        encryptedKey: string;
        fixedIv: Buffer;
        fixedEphemeralKey: Buffer;
    }>;
    encryptData(data: Uint8Array): Promise<Uint8Array>;
    getLastJobIdProcessed(teeAddress: string, currentJobId: number): any;
    balance(tries?: number): any;
    getMasterKey(tries?: number): any;
    private validatorImage;
}
export {};
