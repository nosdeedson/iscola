import { FindUserDto } from "src/domain-services/user/find/find.user.dto";
import { AccessType } from "src/domain/user/access.type";
import { RoleEnum } from "src/domain/worker/roleEnum";

export class FindUserOutPutDto {
    id: string;
    email: string;
    name: string;
    nickname: string;
    accessType: AccessType;
    role: RoleEnum;

    constructor(user: FindUserDto, name: string) {
        this.accessType = user.accessType;
        this.email = user.email;
        this.id = user.id;
        this.name = name;
        this.nickname = user.nickname;
        this.role = user.accessType == AccessType.ADMIN ? RoleEnum.ADMINISTRATOR : RoleEnum.TEACHER;
    }
}
