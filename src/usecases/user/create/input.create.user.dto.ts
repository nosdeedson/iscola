import { AccessType } from "src/domain/user/access.type";

export class InputCreateUserDto{
    
    personId: string;
    email: string;
    password: string;
    nickname:string;
    accesstype: AccessType;
}