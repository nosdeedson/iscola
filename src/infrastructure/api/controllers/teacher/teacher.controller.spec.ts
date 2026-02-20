import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from './teacher.controller';
import { TeacherListClassesUsecase }  from '../../../../application/usecases/teacher-list-classes-usecase/teacher-list-classes-usecase'
import { RepositoryFactoryService} from '../../../factory/repositiry-factory/repository-factory.service'
import { DataBaseConnectionModule } from '../../../data-base-connection/data-base-connection.module';
import { setEnv } from '../../../__mocks__/env.mock';
import { ClassesOfTeacherDto } from '../../../../application/usecases/teacher-list-classes-usecase/classes-of-teacher-dto';
import { mockClassesOfTeacherDto } from '../../../__mocks__/mock-dtos/mock-dtos';

describe('TeacherController', () => {
  let controller: TeacherController;

  beforeEach(async () => {
    setEnv();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        TeacherListClassesUsecase,
        RepositoryFactoryService,
      ],
      imports: [DataBaseConnectionModule]
    }).compile();

    controller = module.get<TeacherController>(TeacherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an empty array', async () => {
    const listOfClasses: ClassesOfTeacherDto[] = [];
    const listClassesOfTeacher = jest.spyOn(TeacherListClassesUsecase.prototype, 'execute')
      .mockReturnValue(Promise.resolve(listOfClasses));

    const teacherId = 'a16703c8-b4d8-402a-90c1-02ce0314c36f';

    const result = await controller.findTeacherClasses(teacherId);
    expect(result).toBeDefined();
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
    expect(listClassesOfTeacher).toHaveBeenCalledTimes(1);
    expect(listClassesOfTeacher).toHaveBeenCalledWith(teacherId);
  });

  it('should find one class', async () => {
    const listOfClasses=  mockClassesOfTeacherDto();
    const listClassesOfTeacher = jest.spyOn(TeacherListClassesUsecase.prototype, 'execute')
      .mockReturnValue(Promise.resolve([listOfClasses]));

    const teacherId = '680e0134-7619-49ac-b0d8-31d0c31558fa';

    const result = await controller.findTeacherClasses(teacherId);
    expect(result).toBeDefined();
    expect(result).toHaveLength(1);
    expect(result[0].students).toHaveLength(2);
    expect(result[0].daysOfClass).toHaveLength(2);
    expect(listClassesOfTeacher).toHaveBeenCalledTimes(1);
    expect(listClassesOfTeacher).toHaveBeenCalledWith(teacherId);
  });
});
