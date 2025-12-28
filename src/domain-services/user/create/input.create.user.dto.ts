import { AccessType } from "src/domain/user/access.type";
import { CreateWorkersDto } from "src/infrastructure/api/controllers/users/workers/create-workers-dto/create-workers-dto";

export class InputCreateUserDto{
    
    personId: string;
    email: string;
    password: string;
    nickname:string;
    accesstype: AccessType;

    constructor(dto: CreateWorkersDto, idPerson: string){
        this.personId = idPerson;
        this.email = dto?.email;
        this.password = dto?.password;
        this.nickname = dto?.nickname;
        this.accesstype = dto?.accessType == AccessType.ADMIN ? AccessType.ADMIN : AccessType.TEACHER;
    }
}