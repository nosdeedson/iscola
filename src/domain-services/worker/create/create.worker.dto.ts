import { AccessType } from "src/domain/user/access.type";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { CreateUserDto } from "src/infrastructure/api/controllers/users/dtos/create-user-dto/create-user-dto";

export class CreateWorkerDto {
    name: string;
    birthday: Date;
    role: RoleEnum;
    classCode: string;

    // FOR USER
    // email: string;
    // nickname: string;
    // password: string;
    // accesstype: AccessType;


    constructor(dto: CreateUserDto){
        this.name = dto.name;
        this.birthday = new Date(dto.birthDate);
        this.role = dto.accessType == AccessType.ADMIN ? RoleEnum.ADMINISTRATOR : RoleEnum.TEACHER;
        this.classCode = dto.classCode;
        // this.email = dto.email;
        // this.nickname = dto.nickname;
        // this.password = dto.password;
        // this.accesstype = dto.accesstype;
    }

}