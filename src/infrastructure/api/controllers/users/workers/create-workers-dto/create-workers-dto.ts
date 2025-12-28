import { AccessType } from "src/domain/user/access.type";

export class CreateWorkersDto {

    name: string;
    birthDate: string;
    email: string;
    password: string;
    accessType: AccessType;
    classCode: string;
    nickname: string;
}
