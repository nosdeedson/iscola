import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { ClassEntity } from "../../../infrastructure/entities/class/class.entity";
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { StudentRepository } from "../../../infrastructure/repositories/student/student.repository";
import { UpdateStudentDto } from '../update/udpate.student.dto';
import { UpdateStudentService } from '../update/udpate.student.service';

describe('UpdateStudentService integration tests', () =>{
    let appDataSource;
        let studentEntity;
        let studentRepository;
    
        beforeEach(async () => {
            appDataSource = AppDataSourceMock.mockAppDataSource();
            await appDataSource.initialize()
                .catch(error => console.log(error));
    
            studentEntity = appDataSource.getRepository(StudentEntity);
            studentRepository = new StudentRepository(studentEntity, appDataSource);
        });
    
        afterEach(async () => {
            await appDataSource.createQueryBuilder().delete().from(ParentEntity).execute();
            await appDataSource.createQueryBuilder().delete().from(StudentEntity).execute();
            await appDataSource.createQueryBuilder().delete().from(ClassEntity).execute();
            await appDataSource.destroy();
        });
    
        it('repositories must be instantiated', () => {
            expect(studentRepository).toBeDefined();
            expect(studentEntity).toBeDefined();
        });

        it('should throw a SystemError if student not found', async () =>{
            const wantedId = 'fe62e23d-1685-4e68-b9f9-480f46772e01';
            const dto = new UpdateStudentDto(wantedId, '1234');
            const service = new UpdateStudentService(studentRepository);

            try {
                await service.execute(dto);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.errors).toMatchObject([{context: 'student', message: 'student not found'}]);
            }

        })
})