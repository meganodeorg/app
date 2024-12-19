"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const app_service_1 = require("./app.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const appService = app.get(app_service_1.AppService);
    try {
        await appService.run();
    }
    catch (err) {
        console.error(err.message);
        throw err;
    }
}
bootstrap();
//# sourceMappingURL=main.js.map