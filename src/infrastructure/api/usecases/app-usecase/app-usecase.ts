import { Injectable } from "@nestjs/common";


@Injectable()
export class AppUseCase {

    getHello(): string{
        return 'hello world!! ' + process.env.DATABASE_NAME
    }

}