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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SixgptUserRepository = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const constants_1 = require("../constants");
const ethers_1 = require("ethers");
let SixgptUserRepository = class SixgptUserRepository {
    constructor(configService) {
        this.configService = configService;
        this.wallet = new ethers_1.ethers.Wallet(this.configService.get('VANA_PRIVATE_KEY'));
        this.jwtToken = null;
    }
    async _getJwtToken(tries = 3) {
        try {
            const resp = await axios_1.default.post(`${constants_1.SIXGPT_API_URL}/auth/get-message`, {
                walletAddress: this.wallet.address,
            });
            const { message, extraData } = resp.data.challenge;
            const signature = await this.wallet.signMessage(message);
            const jwtResponse = await axios_1.default.post(`${constants_1.SIXGPT_API_URL}/auth/submit-signature`, {
                signature,
                extraData,
            });
            const { accessToken } = jwtResponse.data;
            return accessToken;
        }
        catch (error) {
            if ((error.response?.status === 502 || error.response?.status === 504) &&
                tries > 0) {
                return await this._getJwtToken(tries - 1);
            }
            throw error;
        }
    }
    async jwt() {
        if (this.jwtToken === null || this.jwtToken.expiresAt < Date.now()) {
            this.jwtToken = {
                token: await this._getJwtToken(),
                expiresAt: Date.now() + 1000 * 60 * 60 * 24,
            };
        }
        return this.jwtToken.token;
    }
    async _version(tries = 3) {
        try {
            const resp = await axios_1.default.get(`${constants_1.SIXGPT_API_URL}/miner/version`);
            return resp.data.version;
        }
        catch (error) {
            if ((error.response?.status === 502 || error.response?.status === 504) &&
                tries > 0) {
                return await this._version(tries - 1);
            }
            throw error;
        }
    }
    async version() {
        if (this.versionToken === null ||
            this.versionToken.expiresAt < Date.now()) {
            this.versionToken = {
                version: await this._version(),
                expiresAt: Date.now() + 1000 * 60 * 60 * 24,
            };
        }
        return this.versionToken.version;
    }
    async refreshDriveCredentials(tries = 5) {
        const jwtToken = await this.jwt();
        try {
            const resp = await axios_1.default.post(`${constants_1.SIXGPT_API_URL}/drive/refresh-credentials`, {}, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            return resp.data.driveToken;
        }
        catch (err) {
            if (tries === 0) {
                console.log(err.message);
                throw new Error('Failed to refresh drive credentials.');
            }
            if ((err.response?.data?.statusCode === 502 ||
                err.response?.data?.statusCode === 504) &&
                tries > 0) {
                return await this.refreshDriveCredentials(tries - 1);
            }
            else {
                await new Promise((resolve) => setTimeout(resolve, 60000));
                return await this.refreshDriveCredentials(tries - 1);
            }
        }
    }
    async getDriveCredentials(tries = 3) {
        const jwtToken = await this.jwt();
        try {
            const resp = await axios_1.default.get(`${constants_1.SIXGPT_API_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (resp.data.user === null) {
                throw new Error('No user found. Log in at sixgpt.xyz');
            }
            const driveCredentials = resp.data.user.driveCredentials ?? null;
            if (driveCredentials === null) {
                throw new Error('No drive credentials found. Log in at sixgpt.xyz');
            }
            return driveCredentials;
        }
        catch (err) {
            if ((err.response?.status === 502 || err.response?.status === 504) &&
                tries > 0) {
                return await this.getDriveCredentials(tries - 1);
            }
            throw err;
        }
    }
    async submitExamples(examples, tries = 3) {
        const jwtToken = await this.jwt();
        try {
            await axios_1.default.post(`${constants_1.SIXGPT_API_URL}/miner/submit-data`, {
                data: examples,
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
        }
        catch (err) {
            if ((err.response?.status === 502 || err.response?.status === 504) &&
                tries > 0) {
                return await this.submitExamples(examples, tries - 1);
            }
            throw err;
        }
    }
};
exports.SixgptUserRepository = SixgptUserRepository;
exports.SixgptUserRepository = SixgptUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SixgptUserRepository);
//# sourceMappingURL=sixgpt.repository.js.map