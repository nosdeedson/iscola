import { Injectable } from "@nestjs/common";


@Injectable()
export class AppService {

    getHello(): string{
        return 'hello world!!' + process.env.DATABASE_NAME
    }

}