"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const AppModule_1 = require("./infrastructure/api/controllers/app/AppModule");
async function bootstrap() {
    const app = await core_1.NestFactory.create(AppModule_1.AppModule);
    await app.listen(3000);
    console.log('listen 3000');
}
bootstrap();
//# sourceMappingURL=main.js.map