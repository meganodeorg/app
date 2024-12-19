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
exports.SummarizationTask = void 0;
const common_1 = require("@nestjs/common");
const wikipedia_repository_1 = require("../repositories/wikipedia.repository");
const ollama_repository_1 = require("../repositories/ollama.repository");
let SummarizationTask = class SummarizationTask {
    constructor(wikipediaRepository, ollamaRepository) {
        this.wikipediaRepository = wikipediaRepository;
        this.ollamaRepository = ollamaRepository;
    }
    getTask() {
        return 'wikipedia_summarization';
    }
    async askOllama(messages) {
        const response = await this.ollamaRepository.chat(messages);
        return response;
    }
    async run() {
        const title = await this.wikipediaRepository.getRandomWikipediaArticle();
        console.log(`Generating wikipedia summarization task for ${title}...`);
        const content = await this.wikipediaRepository.getWikipediaArticleContent(title);
        const question = await this.askOllama([
            {
                role: 'system',
                content: 'Your responsibility is to generate a question that could be answered by the content asked by the user. Only include the question itself in your response.',
            },
            { role: 'user', content: content },
        ]);
        const answer = await this.askOllama([
            {
                role: 'system',
                content: 'Your responsibility is to answer the following question based on the content provided.',
            },
            {
                role: 'user',
                content: `
                Question: ${question}
                Context: ${content}
                `,
            },
        ]);
        console.log(`Title: ${title}\nQuestion: ${question}\nAnswer: ${answer}`);
        return {
            input: question,
            output: answer,
            context: { content, title: title },
            task: this.getTask(),
        };
    }
};
exports.SummarizationTask = SummarizationTask;
exports.SummarizationTask = SummarizationTask = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [wikipedia_repository_1.WikipediaRepository,
        ollama_repository_1.OllamaRepository])
], SummarizationTask);
//# sourceMappingURL=summarization.task.js.map