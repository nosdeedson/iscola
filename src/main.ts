import { NestFactory } from "@nestjs/core";
import { AppModule } from "./infrastructure/api/controllers/app/AppModule";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000)
    console.log('listen 3000')
}

bootstrap()