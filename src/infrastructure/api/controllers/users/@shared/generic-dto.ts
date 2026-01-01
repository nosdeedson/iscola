import { ApiProperty } from "@nestjs/swagger";
import { AccessType } from "src/domain/user/access.type";

export class GenericDto {
    @ApiProperty({
        description: 'Name of user',
        example: 'John Doe',
    })
    name: string;

    @ApiProperty({
        description: 'Birthdate of user',
        example: '2000-01-01',
    })
    birthDate: string;

    @ApiProperty({
        description: 'Email of user',
        example: 'johndoe@gmail.com',
    })
    email: string;

    @ApiProperty({
        description: 'Password of user',
        example: '123456',
    })
    password: string;

    @ApiProperty({
        description: 'Access type of user',
        example: 'student',
    })
    accessType: AccessType;

    @ApiProperty({
        description: 'Class code user related as parent, student or teacher',
        example: '123456',
    })
    classCode: string;

    @ApiProperty({
        description: 'Nickname of user',
        example: 'johndoe',
    })
    nickname: string;
}