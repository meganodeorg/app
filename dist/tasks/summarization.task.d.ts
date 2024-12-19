import { WikipediaRepository } from '../repositories/wikipedia.repository';
import { SyntheticData } from '../types';
import { OllamaRepository } from 'src/repositories/ollama.repository';
export declare class SummarizationTask {
    private readonly wikipediaRepository;
    private readonly ollamaRepository;
    constructor(wikipediaRepository: WikipediaRepository, ollamaRepository: OllamaRepository);
    getTask(): string;
    askOllama(messages: any[]): Promise<any>;
    run(): Promise<SyntheticData>;
}
