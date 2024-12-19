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
exports.OllamaRepository = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const constants_1 = require("../constants");
const config_1 = require("@nestjs/config");
let OllamaRepository = class OllamaRepository {
    constructor(configService) {
        this.configService = configService;
        this.modelName = 'llama3.2';
        this.proxy = this.configService.get('PROXY') === 'true';
        this.ollamaUrl =
            this.configService.get('OLLAMA_API_URL') ?? constants_1.OLLAMA_API_URL;
    }
    async pullModel() {
        if (this.proxy) {
            return;
        }
        const response = await axios_1.default.post(`${this.ollamaUrl}/pull`, {
            model: this.modelName,
            stream: false,
        });
        return response.data;
    }
    async chat(messages) {
        if (this.proxy) {
            return 'hello';
        }
        const response = await axios_1.default.post(`${this.ollamaUrl}/chat`, {
            messages,
            model: this.modelName,
            stream: false,
        });
        return response.data.message.content;
    }
};
exports.OllamaRepository = OllamaRepository;
exports.OllamaRepository = OllamaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OllamaRepository);
//# sourceMappingURL=ollama.repository.js.map