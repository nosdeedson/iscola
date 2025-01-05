import { Controller, Get } from "@nestjs/common";
import { AppUseCase } from "../../usecases/app-usecase/app-usecase";


@Controller()
export class AppController {

    constructor(private readonly appService: AppUseCase){}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }
}