import { RoleEnum } from "../../../domain/worker/roleEnum";

export interface InputCreateWorkerDto {
    name: string;
    birthday: Date;
    role: RoleEnum;
}