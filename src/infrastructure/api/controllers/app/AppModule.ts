import { Module } from "@nestjs/common";
import { AppService } from "../../services/appservice/AppService";
import { AppController } from "./AppController";

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule{}