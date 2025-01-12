import { ApiProperty } from "@nestjs/swagger";

export enum RoleAccess{
    
    TEACHER = 'teacher',
    STUDENT = 'student',
    PARENT = 'parent',
}