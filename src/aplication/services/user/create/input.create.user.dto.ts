import { AccessType } from "src/domain/user/access.type";
import { CreateUserDto } from "src/infrastructure/api/controllers/users/dtos/create-user-dto/create-user-dto";

export class InputCreateUserDto{
    
    personId: string;
    email: string;
    password: string;
    nickname:string;
    accesstype: AccessType;

    constructor(dto: CreateUserDto, idPerson: string){
        this.personId = idPerson;
        this.email = dto?.email;
        this.password = dto?.password;
        this.nickname = dto?.nickname;
        this.accesstype = dto?.accessType == AccessType.ADMIN ? AccessType.ADMIN : AccessType.TEACHER;
    }
}