"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VanaRepository = exports.NETWORK_CONFIG = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ethers_1 = require("ethers");
const openpgp = require("openpgp");
const constants_1 = require("../constants");
const dataRegistryContract_abi_1 = require("./abis/dataRegistryContract.abi");
const teePool_abi_1 = require("./abis/teePool.abi");
const dlp_abi_1 = require("./abis/dlp.abi");
const eccrypto = require("@toruslabs/eccrypto");
const axios_1 = require("axios");
const crypto = require("crypto");
const cache_manager_1 = require("@nestjs/cache-manager");
const utils_1 = require("../utils");
exports.NETWORK_CONFIG = {
    mainnet: {
        rpcUrl: 'https://rpc.islander.vana.org',
        dlpOwnerAddress: '0x1c6c235c4CD3271c892A34358B21D6526EC515D7',
        dataRegistryAddress: '0x8C8788f98385F6ba1adD4234e551ABba0f82Cb7C',
        teePoolContract: '0xE8EC6BD73b23Ad40E6B9a6f4bD343FAc411bD99A',
        rootNetworkContract: '0xff14346dF2B8Fd0c95BF34f1c92e49417b508AD5',
        dlpAddress: '0x67b2c99Ff9B38e2C3b9D476f003fC13976431979',
        tokenAddress: '0x84F8dC1AdA73298281387e62616470F3dD5Df2F6',
        dlpId: 7,
        chainId: 1480,
    },
    moksha: {
        rpcUrl: 'https://rpc.moksha.vana.org',
        dlpOwnerAddress: '0x1c6c235c4CD3271c892A34358B21D6526EC515D7',
        dataRegistryAddress: '0x8C8788f98385F6ba1adD4234e551ABba0f82Cb7C',
        teePoolContract: '0xE8EC6BD73b23Ad40E6B9a6f4bD343FAc411bD99A',
        rootNetworkContract: '0xff14346dF2B8Fd0c95BF34f1c92e49417b508AD5',
        dlpAddress: '0x67b2c99Ff9B38e2C3b9D476f003fC13976431979',
        tokenAddress: '0x84F8dC1AdA73298281387e62616470F3dD5Df2F6',
        dlpId: 14,
        chainId: 14800,
    },
};
const JOB_STATUS_ARRAY = ['None', 'Submitted', 'Completed', 'Canceled'];
function isRpc502(error) {
    if (error?.info?.responseStatus === '502 Bad Gateway') {
        return true;
    }
    return false;
}
let VanaRepository = class VanaRepository {
    constructor(configService, cacheManager) {
        this.configService = configService;
        this.cacheManager = cacheManager;
        let network = this.configService.get('VANA_NETWORK') ?? 'moksha';
        if (!Object.keys(exports.NETWORK_CONFIG).includes(network)) {
            console.error(`Invalid VANA_NETWORK: ${network}. Using default: moksha`);
            network = 'moksha';
        }
        this.network = exports.NETWORK_CONFIG[network];
        this.wallet = new ethers_1.ethers.Wallet(this.configService.get('VANA_PRIVATE_KEY'), new ethers_1.ethers.JsonRpcProvider(this.network.rpcUrl, this.network.chainId, {
            staticNetwork: true,
        }));
        this.signature = this.wallet.signMessageSync(constants_1.FIXED_MESSAGE_ENCRYPTION_SEED);
        this.dataRegistryContract = new ethers_1.ethers.Contract(this.network.dataRegistryAddress, dataRegistryContract_abi_1.DATA_REGISTRY_ABI, this.wallet);
        this.dlpContract = new ethers_1.ethers.Contract(this.network.dlpAddress, dlp_abi_1.DLP_ABI, this.wallet);
        this.teePoolContract = new ethers_1.ethers.Contract(this.network.teePoolContract, teePool_abi_1.TEE_POOL_ABI, this.wallet);
    }
    async submit(url) {
        const masterKey = await this.getMasterKey();
        const { encryptedKey, fixedIv, fixedEphemeralKey } = await this.encryptWithMasterKey(masterKey);
        const fileId = await this.addFileWithPermissions(url, encryptedKey);
        await this.submitTeeRequest(fileId.toString());
        const fileJobIds = await this.fileJobIds(fileId);
        const latestJobId = fileJobIds[fileJobIds.length - 1];
        console.log(`Latest job ID ${latestJobId} for file ID ${fileId}`);
        const jobDetails = await this.getTeeDetails(latestJobId);
        if (jobDetails.jobStatus !== 'Submitted') {
            console.log('Job status:', jobDetails.jobStatus);
            await this.requestReward(fileId);
            return;
        }
        await this.requestTeeProof(jobDetails.teeUrl, jobDetails.teeAddress, latestJobId, fileId, fixedIv, fixedEphemeralKey);
        await this.requestReward(fileId);
    }
    async addFileWithPermissions(url, encryptedKey, tries = 3) {
        const permissions = [
            {
                account: this.network.dlpAddress,
                key: encryptedKey,
            },
        ];
        try {
            const rawTxnResponse = await this.dataRegistryContract.addFileWithPermissions(url, this.wallet.address, permissions);
            const receipt = await rawTxnResponse.wait();
            console.log(`Add file txn hash: ${receipt.hash}`);
            if (receipt && receipt.logs.length > 0) {
                const eventLog = receipt.logs[0];
                if (eventLog.topics[0] === ethers_1.ethers.id('FileAdded(uint256,address,string)')) {
                    const decodedLog = this.dataRegistryContract.interface.parseLog({
                        topics: eventLog.topics,
                        data: eventLog.data,
                    });
                    if (decodedLog && decodedLog.args) {
                        const uploadedFileId = Number(decodedLog.args[0]);
                        const owner = decodedLog.args[1];
                        console.log('File ID:', uploadedFileId);
                        console.log('Owner:', owner);
                        return uploadedFileId;
                    }
                }
            }
        }
        catch (error) {
            if (isRpc502(error) && tries > 0) {
                await (0, utils_1.sleep)(2000);
                return await this.addFileWithPermissions(url, encryptedKey, tries);
            }
            if (isRpc502(error)) {
                throw new Error('Vana RPC Network is unstable. try again.');
            }
            console.error('Error addFile Vana', error);
            throw new Error(`Error addFile() to Vana. Make sure your wallet is funded with enough $VANA. Your current balance is ${await this.balance()}`);
        }
    }
    async submitTeeRequest(fileId, tries = 3) {
        try {
            const teeFee = await this.teePoolContract.teeFee();
            console.log('Tee fee:', teeFee);
            const tx = await this.teePoolContract.requestContributionProof(fileId, {
                value: teeFee,
            });
            const receipt = await tx.wait();
            console.log(`Tee request txn hash: ${receipt.hash}`);
        }
        catch (error) {
            if (isRpc502(error) && tries > 0) {
                await (0, utils_1.sleep)(2000);
                return await this.submitTeeRequest(fileId, tries);
            }
            if (isRpc502(error)) {
                throw new Error('Vana RPC Network is unstable. try again.');
            }
            const msg = 'Error requesting tee proof';
            console.error(msg, error);
            throw new Error(msg);
        }
    }
    async fileJobIds(fileId, tries = 3) {
        try {
            const jobIds = await this.teePoolContract.fileJobIds(fileId);
            return jobIds.map(Number);
        }
        catch (error) {
            if (isRpc502(error) && tries > 0) {
                await (0, utils_1.sleep)(2000);
                return await this.fileJobIds(fileId, tries);
            }
            if (isRpc502(error)) {
                throw new Error('Vana RPC Network is unstable.');
            }
            console.error('Error fetching file job IDs:', error);
            throw error;
        }
    }
    async getTeeDetails(jobId, tries = 3) {
        try {
            const job = (await this.teePoolContract.jobs(jobId));
            const jobStatus = Number(job.status);
            const teeInfo = await this.teePoolContract.tees(job.teeAddress);
            return {
                teeUrl: teeInfo.url,
                teeAddress: job.teeAddress,
                jobStatus: JOB_STATUS_ARRAY[jobStatus],
            };
        }
        catch (error) {
            if (isRpc502(error) && tries > 0) {
                await (0, utils_1.sleep)(2000);
                return await this.getTeeDetails(jobId, tries);
            }
            if (isRpc502(error)) {
                throw new Error('Vana RPC Network is unstable.');
            }
            console.error('Error fetching job details:', error);
            throw new Error('Error fetching job details');
        }
    }
    async requestTeeProof(teeUrl, teeAddress, latestJobId, uploadedFileId, fixedIv, fixedEphemeralKey, numberTimes = 3) {
        const validatorImage = await this.validatorImage();
        console.log('validatorImage', validatorImage);
        try {
            await this.getLastJobIdProcessed(teeAddress, latestJobId);
            console.log(`REQUESTING TEE PROOF...`);
            console.log('--------------------------------');
            const contributionProofPromise = axios_1.default.post(`${teeUrl}/RunProof`, {
                job_id: latestJobId,
                file_id: uploadedFileId,
                nonce: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
                encryption_key: this.signature,
                proof_url: validatorImage,
                encryption_seed: constants_1.FIXED_MESSAGE_ENCRYPTION_SEED,
                env_vars: {
                    MINER_ADDRESS: this.wallet.address.toLowerCase(),
                    FILE_ID: uploadedFileId.toString(),
                    DLP_ID: Number(this.network.dlpId.toString()),
                },
                secrets: {
                    SIXGPT_API_KEY: constants_1.SIXGPT_API_KEY,
                },
                fixed_iv: fixedIv.toString('hex'),
                fixed_ephemeral_key: fixedEphemeralKey.toString('hex'),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 1000 * 60 * 60 * 2,
            });
            const contributionProofResponse = await contributionProofPromise;
            console.log(contributionProofResponse.data);
        }
        catch (err) {
            console.log(`ERROR---- TEE PROOF`);
            console.log(err);
            console.log(err?.response?.data);
            if (err?.response?.data?.detail?.error?.code === 'INVALID_JOB_STATUS') {
                console.log('Job already succesfully processed');
                return;
            }
            if (numberTimes > 0) {
                console.log(`ERROR REQUESTING TEE PROOF. Sleeping ${constants_1.ERROR_SLEEP_INTERVAL}ms for next attempt...`);
                await new Promise((resolve) => setTimeout(resolve, constants_1.ERROR_SLEEP_INTERVAL));
                console.log(`RETRYING TEE PROOF...`);
                return await this.requestTeeProof(teeUrl, teeAddress, latestJobId, uploadedFileId, fixedIv, fixedEphemeralKey, numberTimes - 1);
            }
            console.log(`ERROR REQUESTING TEE PROOF. Throwing error...`);
            throw new Error('Error requesting tee proof');
        }
    }
    async requestReward(fileId, tries = 3) {
        try {
            const txn = await this.dlpContract.requestReward(fileId, 1);
            await txn.wait();
            console.log('Claim requested successfully');
        }
        catch (err) {
            if (isRpc502(err) && tries > 0) {
                await (0, utils_1.sleep)(2000);
                return await this.requestReward(fileId, tries);
            }
            if (isRpc502(err)) {
                throw new Error('Vana RPC Network is unstable.');
            }
            console.error('Error requesting reward:', err);
        }
    }
    async encryptWithMasterKey(masterKey) {
        const fixed_iv = Buffer.from(crypto.getRandomValues(new Uint8Array(16)));
        const fixed_ephemeral_key = Buffer.from(crypto.getRandomValues(new Uint8Array(32)));
        const cleanMasterKey = masterKey.startsWith('0x')
            ? masterKey.slice(2)
            : masterKey;
        let publicKeyBuffer;
        if (cleanMasterKey.length === 128) {
            publicKeyBuffer = Buffer.from('04' + cleanMasterKey, 'hex');
        }
        else if (cleanMasterKey.length === 130 &&
            cleanMasterKey.startsWith('04')) {
            publicKeyBuffer = Buffer.from(cleanMasterKey, 'hex');
        }
        else {
            throw new Error('Invalid public key format');
        }
        if (publicKeyBuffer.length !== 65 || publicKeyBuffer[0] !== 0x04) {
            throw new Error('Invalid uncompressed public key');
        }
        try {
            const encryptedBuffer = await eccrypto.encrypt(publicKeyBuffer, Buffer.from(this.signature), {
                iv: fixed_iv,
                ephemPrivateKey: fixed_ephemeral_key,
            });
            const encryptedHex = Buffer.concat([
                encryptedBuffer.iv,
                encryptedBuffer.ephemPublicKey,
                encryptedBuffer.ciphertext,
                encryptedBuffer.mac,
            ]).toString('hex');
            return {
                encryptedKey: encryptedHex,
                fixedIv: fixed_iv,
                fixedEphemeralKey: fixed_ephemeral_key,
            };
        }
        catch (error) {
            console.error('Encryption error:', error);
            throw new Error('Failed to encrypt with master key');
        }
    }
    async encryptData(data) {
        const message = await openpgp.createMessage({
            binary: new Uint8Array(data),
        });
        const encrypted = await openpgp.encrypt({
            message,
            passwords: [this.signature],
            format: 'binary',
        });
        const response = new Response(encrypted);
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        return uint8Array;
    }
    async getLastJobIdProcessed(teeAddress, currentJobId) {
        try {
            const latestBlock = (await this.wallet.provider.getBlock('latest'))
                .number;
            const logs = await this.wallet.provider.getLogs({
                address: this.network.teePoolContract,
                topics: [
                    '0x41eb9d6336d189fb4bf444a6b5056628c51aa4405c87f7389a107686e8057263',
                    ethers_1.ethers.zeroPadValue(teeAddress, 32),
                    null,
                    null,
                ],
                toBlock: 'latest',
                fromBlock: latestBlock - 100,
            });
            if (logs.length > 0) {
                const mostRecentLog = logs[logs.length - 1];
                const parsedLog = this.teePoolContract.interface.parseLog(mostRecentLog);
                const latestJobId = parseInt(parsedLog.args[1]);
                const jobQueueLength = Math.max(currentJobId - latestJobId, 0);
                if (jobQueueLength > 0) {
                    console.log(`Job Queue Length: ${jobQueueLength}. Estimated Wait time: ${Math.ceil(jobQueueLength / 30) * 0.75} minutes`);
                }
                else {
                    console.log('Waiting for request to process...');
                }
            }
        }
        catch (err) {
            if (isRpc502(err)) {
                await (0, utils_1.sleep)(2000);
                return await this.getLastJobIdProcessed(teeAddress, currentJobId);
            }
        }
    }
    async balance(tries = 3) {
        try {
            const balance = await this.wallet.provider?.getBalance(this.wallet.address);
            return balance;
        }
        catch (err) {
            if (isRpc502(err) && tries > 0) {
                return await this.balance(tries);
            }
            if (isRpc502(err)) {
                throw new Error('Vana RPC Network is unstable.');
            }
            throw new Error('Error fetching balance');
        }
    }
    async getMasterKey(tries = 3) {
        const masterKeyCached = await this.cacheManager.get('masterKey');
        if (masterKeyCached) {
            return masterKeyCached;
        }
        try {
            const masterKey = await this.dlpContract.publicKey();
            await this.cacheManager.set('masterKey', masterKey, 1000 * 60 * 60);
            return masterKey;
        }
        catch (err) {
            if (isRpc502(err) && tries > 0) {
                return await this.getMasterKey(tries);
            }
            if (isRpc502(err)) {
                throw new Error('Vana RPC Network is unstable.');
            }
            console.error('Error fetching master key:', err);
            throw new Error('Error fetching master key');
        }
    }
    async validatorImage(tries = 3) {
        const proofInstructionCached = await this.cacheManager.get('proofInstruction');
        if (proofInstructionCached) {
            return proofInstructionCached;
        }
        try {
            const proofInstruction = await this.dlpContract.proofInstruction();
            await this.cacheManager.set('proofInstruction', proofInstruction, 1000 * 60 * 60);
            return proofInstruction;
        }
        catch (err) {
            if (isRpc502(err) && tries > 0) {
                return await this.validatorImage(tries - 1);
            }
            if (isRpc502(err)) {
                throw new Error('Vana RPC Network is unstable.');
            }
            console.error('Error fetching proof instruction:', err);
            throw new Error('Error fetching proof instruction');
        }
    }
};
exports.VanaRepository = VanaRepository;
exports.VanaRepository = VanaRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [config_1.ConfigService, Object])
], VanaRepository);
//# sourceMappingURL=vana.repository.js.map