import { Controller, Get } from "@nestjs/common";
import { AppUseCase } from "../../../../application/usecases/app-usecase/app-usecase";


@Controller()
export class AppController {

    constructor(private readonly appService: AppUseCase){}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }
}