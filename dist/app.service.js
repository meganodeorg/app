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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const summarization_task_1 = require("./tasks/summarization.task");
const drive_repository_1 = require("./repositories/drive.repository");
const sixgpt_repository_1 = require("./repositories/sixgpt.repository");
const vana_repository_1 = require("./repositories/vana.repository");
const ollama_repository_1 = require("./repositories/ollama.repository");
const ethers_1 = require("ethers");
let AppService = class AppService {
    constructor(task, driveRepository, sixgptRepository, vanaRepository, ollamaRepository) {
        this.task = task;
        this.driveRepository = driveRepository;
        this.sixgptRepository = sixgptRepository;
        this.vanaRepository = vanaRepository;
        this.ollamaRepository = ollamaRepository;
    }
    async run() {
        console.log(`Running miner for ${this.vanaRepository.wallet.address} on version ${constants_1.MINER_VERSION}`);
        const balance = await this.vanaRepository.balance();
        if (balance < ethers_1.ethers.parseEther('0.1')) {
            throw new Error(`VANA BALANCE must exceed 0.1 to start running miner. Add $VANA to ${this.vanaRepository.wallet.address}`);
        }
        await this.sixgptRepository.getDriveCredentials();
        await this.ollamaRepository.pullModel();
        while (true) {
            const examples = [];
            while (examples.length < constants_1.TARGET_EXAMPLE_COUNT) {
                try {
                    const example = await this.task.run();
                    examples.push(example);
                    console.log(`Pulled ${example.context.title}... total buffer: ${examples.length}`);
                    if (examples.length >= constants_1.TARGET_EXAMPLE_COUNT) {
                        break;
                    }
                    await new Promise((resolve) => setTimeout(resolve, constants_1.TIMELINE_SLEEP_INTERVAL));
                }
                catch (error) {
                    console.error('Error generating dataset', error);
                    console.log(`Sleeping ${constants_1.ERROR_SLEEP_INTERVAL}ms for next attempt...`);
                    await new Promise((resolve) => setTimeout(resolve, constants_1.ERROR_SLEEP_INTERVAL));
                    continue;
                }
            }
            const zippedData = await this.driveRepository.convertSyntheticDataToBuffer(examples);
            const encryptedData = await this.vanaRepository.encryptData(zippedData);
            const fileUrl = await this.driveRepository.uploadWithRetry(encryptedData);
            console.log(`Uploaded ${fileUrl} to drive`);
            await this.vanaRepository.submit(fileUrl);
            try {
                await this.sixgptRepository.submitExamples(examples);
            }
            catch (err) {
                console.error('Error submitting examples to sixgpt', err?.status);
            }
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [summarization_task_1.SummarizationTask,
        drive_repository_1.DriveRepository,
        sixgpt_repository_1.SixgptUserRepository,
        vana_repository_1.VanaRepository,
        ollama_repository_1.OllamaRepository])
], AppService);
//# sourceMappingURL=app.service.js.map