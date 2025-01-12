import { ApiProperty } from "@nestjs/swagger";
import { RoleAccess } from "./type-access.enum";
import { IsDate, IsEnum, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserDto{

    @ApiProperty({name: 'name', example: 'Edson Jose de Souza', description: 'Fullname'})
    @IsNotEmpty()
    name: string;

    @ApiProperty({name: 'email', example: 'jose@email', description: 'Email of the user'})
    @IsNotEmpty()
    email: string;

    @ApiProperty({name: 'password', example: 'Pknhyu345@$', description: 'a password containning a capital letter, at least a number and at least one special character'})
    @IsNotEmpty()
    password: string;

    @ApiProperty({name: 'nickname', example: 'edson.souza', description: 'a nickname to use in the login'})
    @IsNotEmpty()
    nickname: string;

    @ApiProperty({name: 'birthDay', example: '2025-01-01T12:00:00Z', description: 'Anniversary'})
    @Type(() => Date)
    @IsDate({message: 'birthday must be a valid ISO 8601 date string'})
    birthDay: Date;

    @ApiProperty({name: 'classCode', example: '15448', description: 'the class code related to de user, the admin must pass this code'})
    @IsNotEmpty()
    classCode: string;

    @ApiProperty({enum: RoleAccess,  example: RoleAccess.TEACHER, description: 'The type of the user (student, teacher, parent)'})
    @IsEnum(
        [RoleAccess.PARENT, RoleAccess.STUDENT, RoleAccess.TEACHER], 
        {message: 'The values must be: teacher, student or parent'}
    )
    typeAcces: RoleAccess;
}