import { Module } from "@nestjs/common";
import { AppService } from "./AppService";
import { AppController } from "./AppController";

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule{}