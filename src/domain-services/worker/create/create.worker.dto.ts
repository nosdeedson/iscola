import { AccessType } from "src/domain/user/access.type";
import { RoleEnum } from "../../../domain/worker/roleEnum";

export interface InputCreateWorkerDto {
    name: string;
    birthday: Date;
    role: RoleEnum;
    classCode: string;

    // FOR USER
    email: string;
    nickname: string;
    password: string;
    accesstype: AccessType;

}