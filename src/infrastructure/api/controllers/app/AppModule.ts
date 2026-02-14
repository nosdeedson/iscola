import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppUseCase } from "../../../../application/usecases/app-usecase/app-usecase";
import { IsStrongPasswordConstraint } from "../../validators/is-strong-password-constraint/is-strong-password-constraint";
import { SchoolgroupModule } from "../schoolgroup/schoolgroup.module";
import { SemesterModule } from "../semester/semester.module";
import { UsersModule } from "../users/users.module";
import { AppController } from "./AppController";

@Global()
@Module({
    imports: [
        UsersModule,
        SchoolgroupModule,
        SemesterModule,
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
            //isGlobal: true
        }),
    ],
    controllers: [AppController],
    providers: [
        AppUseCase,
        IsStrongPasswordConstraint
    ]
})
export class AppModule{}