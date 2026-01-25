import { Injectable } from '@nestjs/common';
import { SystemError } from 'src/aplication/services/@shared/system-error';
import { CreateParentDto } from 'src/aplication/services/parent/create/create.parent.dto';
import { CreateStudentDto } from 'src/aplication/services/student/create/create.student.dto';
import { CreateWorkerDto } from 'src/aplication/services/worker/create/create.worker.dto';
import { AccessType } from 'src/domain/user/access.type';
import { CreateUserDto } from 'src/infrastructure/api/controllers/users/dtos/create-user-dto/create-user-dto';

export type GenericPersonDto = 
 | CreateWorkerDto
 | CreateStudentDto
 | CreateParentDto;

@Injectable()
export class CreatePersonFactoryService {

    public static createDTOPersonFactory(dto: CreateUserDto): any {
        switch (dto.accessType) {
            case AccessType.PARENT:
                return new CreateParentDto(new Date(dto.birthDate), dto.name, dto.students);
            case AccessType.STUDENT:
                return new CreateStudentDto(new Date(dto.birthDate), dto.name, dto.classCode, dto.parents);
            case AccessType.ADMIN:
            case AccessType.TEACHER:
                return new CreateWorkerDto(dto);
            default:
                throw new SystemError([{ context: 'CreatePersonFactoryService', message: 'Invalid access type' }]);
        }
    }
}
