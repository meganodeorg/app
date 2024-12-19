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
exports.DriveRepository = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const JSZip = require("jszip");
const stream_1 = require("stream");
const crypto = require("crypto");
const sixgpt_repository_1 = require("./sixgpt.repository");
const APPLICATION_NAME = 'sixgpt';
let DriveRepository = class DriveRepository {
    constructor(sixgptUserRepository) {
        this.sixgptUserRepository = sixgptUserRepository;
    }
    formCredentialsFromToken(resp) {
        const oAuth2Client = new googleapis_1.google.auth.OAuth2();
        oAuth2Client.setCredentials({
            access_token: resp.access_token,
            refresh_token: resp.refresh_token,
            scope: resp.scope,
            token_type: 'Bearer',
            expiry_date: new Date(resp.expiry_date).getTime(),
        });
        return oAuth2Client;
    }
    async getActiveAccount() {
        if ((this.driveCredentials ?? null) === null) {
            this.driveCredentials =
                await this.sixgptUserRepository.getDriveCredentials();
        }
        const expiryDate = new Date(this.driveCredentials.expiry_date);
        const currentDate = new Date();
        if (currentDate >= expiryDate) {
            console.log('refreshing drive credentials');
            this.driveCredentials =
                await this.sixgptUserRepository.refreshDriveCredentials();
        }
        return this.driveCredentials;
    }
    async convertSyntheticDataToBuffer(data) {
        function buildBuffer(examples) {
            const jsonString = JSON.stringify(Array.from(examples));
            return new TextEncoder().encode(jsonString);
        }
        async function buildZipBuffer(buffer) {
            const zip = new JSZip();
            zip.file('examples.data', buffer);
            return await zip.generateAsync({
                type: 'uint8array',
                compression: 'DEFLATE',
                compressionOptions: {
                    level: 6,
                },
            });
        }
        const buffer = buildBuffer(data);
        return await buildZipBuffer(buffer);
    }
    async uploadWithRetry(data) {
        for (let i = 0; i < 3; i++) {
            try {
                return await this.upload(data);
            }
            catch (error) {
                console.error('Error uploading to drive', error);
                const toSleepMinutes = 5 * (i + 1);
                console.log(`Sleeping ${toSleepMinutes} MINS for attempt ${i + 1} to pass google cloud timeout...`);
                console.log('error', await this.getActiveAccount());
                await new Promise((resolve) => setTimeout(resolve, toSleepMinutes * 60 * 1000));
            }
        }
        throw new Error('Failed to upload to drive. Please check drive settings, and re-login to sixgpt.xyz');
    }
    async upload(data) {
        const creds = await this.getActiveAccount();
        const drive = googleapis_1.google.drive({
            version: 'v3',
            auth: this.formCredentialsFromToken(creds),
        });
        const query = `name='${APPLICATION_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
        const results = await drive.files.list({
            q: query,
            spaces: 'drive',
            fields: 'files(id, name)',
        });
        let folderId;
        if (results.data.files && results.data.files.length > 0) {
            folderId = results.data.files[0].id;
        }
        else {
            const folderMetadata = {
                name: APPLICATION_NAME,
                mimeType: 'application/vnd.google-apps.folder',
            };
            const folder = await drive.files.create({ requestBody: folderMetadata });
            folderId = folder.data.id;
        }
        const uuidPath = crypto.randomUUID();
        const fileMetadata = { name: uuidPath, parents: [folderId] };
        const resp = await drive.files.create({
            requestBody: fileMetadata,
            media: {
                mimeType: 'application/zip',
                body: stream_1.Readable.from(Buffer.from(data)),
            },
        });
        const permission = {
            type: 'anyone',
            role: 'reader',
            allowFileDiscovery: false,
        };
        await drive.permissions.create({
            fileId: resp.data.id,
            requestBody: permission,
        });
        const file = await drive.files.get({
            fileId: resp.data.id,
            fields: 'webContentLink',
        });
        return file.data.webContentLink;
    }
};
exports.DriveRepository = DriveRepository;
exports.DriveRepository = DriveRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sixgpt_repository_1.SixgptUserRepository])
], DriveRepository);
//# sourceMappingURL=drive.repository.js.map