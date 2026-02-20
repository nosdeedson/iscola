import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { FindTeacherClassesService } from 'src/application/services/class/find-teacher-classes/find.teacher-classes';
import { TeacherListClassesUsecase } from 'src/application/usecases/teacher-list-classes-usecase/teacher-list-classes-usecase';

@Controller('teacher')
export class TeacherController {

    constructor(private teacherListClasses: TeacherListClassesUsecase){}

    @ApiOperation({description: "find teacher classes"})
    @Get('idTeacher')
    async findTeacherClasses(@Param("idTeacher") idTeacher: string){
        return this.teacherListClasses.execute(idTeacher);
    }
}
