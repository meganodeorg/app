import { SummarizationTask } from './tasks/summarization.task';
import { DriveRepository } from './repositories/drive.repository';
import { SixgptUserRepository } from './repositories/sixgpt.repository';
import { VanaRepository } from './repositories/vana.repository';
import { OllamaRepository } from './repositories/ollama.repository';
export declare class AppService {
    private readonly task;
    private readonly driveRepository;
    private readonly sixgptRepository;
    private readonly vanaRepository;
    private readonly ollamaRepository;
    constructor(task: SummarizationTask, driveRepository: DriveRepository, sixgptRepository: SixgptUserRepository, vanaRepository: VanaRepository, ollamaRepository: OllamaRepository);
    run(): Promise<void>;
}
