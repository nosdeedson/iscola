import { CreateStudentDto } from "./create.student.dto";
import { CreateStudentService } from '../create/create.student.service';
import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories';
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { ParentEntity } from '../../../infrastructure/entities/parent/parent.entity';
import { ClassEntity } from "../../../infrastructure/entities/class/class.entity";
import { Parent } from "../../../domain/parent/parent";


describe('CreateStudentService', () =>{

    it('should throw a SystemError if schoolgroup not found', async () =>{
        const dto = new CreateStudentDto(new Date(), 'edson', '123', ['123', '1234', ]);
        
        const parent = DomainMocks.mockParent();
        const parentEntities = ParentEntity.toParentEntity(parent)
        
        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
        parentRepository.findByIds = jest.fn().mockImplementationOnce(() => { return [parentEntities]});
        
        const schoolgroupRepository = MockRepositoriesForUnitTest.mockRepositories();
        schoolgroupRepository.findByClassCode = jest.fn().mockImplementationOnce(() => {return null})
        
        const studentRepository = MockRepositoriesForUnitTest.mockRepositories();
        
        const service = new CreateStudentService(studentRepository, schoolgroupRepository, parentRepository);

        try {
            await service.execute(dto);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.errors).toMatchObject([{context: 'student', message: 'Schoolgroup not found'}]);
            expect(schoolgroupRepository.findByClassCode).toHaveBeenCalledTimes(1);
            expect(parentRepository.findByIds).toHaveBeenCalledTimes(1);
            expect(schoolgroupRepository.findByClassCode).toHaveBeenCalledWith(dto.enrolled);
            expect(parentRepository.findByIds).toHaveBeenCalledWith(dto.parentsId);
        }
    });

    it('should throw a SystemError if parents not found', async () =>{
        const dto = new CreateStudentDto(new Date(), 'edson', '123', ['123', '1234', ]);
        const schoolGroup = DomainMocks.mockSchoolGroup();
        const schoolGroupEntity = ClassEntity.toClassEntity(schoolGroup);

        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
        parentRepository.findByIds = jest.fn().mockImplementationOnce(() => {return []});

        const studentRepository = MockRepositoriesForUnitTest.mockRepositories();
        const schoolgroupRepository = MockRepositoriesForUnitTest.mockRepositories();

        schoolgroupRepository.findByClassCode = jest.fn().mockImplementationOnce(() => {return schoolGroupEntity});

        const service = new CreateStudentService(studentRepository, schoolgroupRepository, parentRepository);

        try {
            await service.execute(dto);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.errors).toMatchObject([{context: 'student', message: 'At least one parent must be informed'}]);
            expect(schoolgroupRepository.findByClassCode).toHaveBeenCalledTimes(1);
            expect(parentRepository.findByIds).toHaveBeenCalledTimes(1);
            expect(schoolgroupRepository.findByClassCode).toHaveBeenCalledWith(dto.enrolled);
            expect(parentRepository.findByIds).toHaveBeenCalledWith(dto.parentsId);
        }
    })

    it('should throw a SystemError if parents and Schoolgroup not found', async () =>{
        const dto = new CreateStudentDto(new Date(), 'edson', '123', ['123', '1234', ]);

        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
        parentRepository.findByIds = jest.fn().mockImplementationOnce(() => {return []});

        const schoolgroupRepository = MockRepositoriesForUnitTest.mockRepositories();
        
        const studentRepository = MockRepositoriesForUnitTest.mockRepositories();
        schoolgroupRepository.findByClassCode = jest.fn().mockImplementationOnce(() => {return null});

        const service = new CreateStudentService(studentRepository, schoolgroupRepository, parentRepository);

        try {
            await service.execute(dto);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.errors).toMatchObject([{context: 'student', message: 'Schoolgroup not found'}, {context: 'student', message: 'At least one parent must be informed'}]);
            expect(schoolgroupRepository.findByClassCode).toHaveBeenCalledTimes(1);
            expect(parentRepository.findByIds).toHaveBeenCalledTimes(1);
            expect(schoolgroupRepository.findByClassCode).toHaveBeenCalledWith(dto.enrolled);
            expect(parentRepository.findByIds).toHaveBeenCalledWith(dto.parentsId);
        }
    })

       // TODO THE REST OF TESTS
    it('should return a list of parent domain while converting from parent entities', async () =>{
        const dto = new CreateStudentDto(new Date(), 'edson', '123', ['123', '1234', ]);

        const parent = DomainMocks.mockParent();
        const parentEntities = ParentEntity.toParentEntity(parent);

        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
        parentRepository.findByIds = jest.fn().mockImplementationOnce(() => { return [parentEntities]});
        
        const schoolGroup = DomainMocks.mockSchoolGroup();
        const schoolGroupEntity = ClassEntity.toClassEntity(schoolGroup);

        const schoolgroupRepository = MockRepositoriesForUnitTest.mockRepositories();

        schoolgroupRepository.findByClassCode = jest.fn().mockImplementationOnce(() => {return schoolGroupEntity});

        const studentRepository = MockRepositoriesForUnitTest.mockRepositories();
        studentRepository.create = jest.fn().mockImplementationOnce(() => {return void 0})

        const service = new CreateStudentService(studentRepository, schoolgroupRepository, parentRepository);

        await service.execute(dto);

        const parentToDomain = jest.spyOn(Parent, 'toDomain')
            .mockReturnValue( parent);

        expect(studentRepository.create).toHaveBeenCalledTimes(1);        
        expect(schoolgroupRepository.findByClassCode).toHaveBeenCalledTimes(1);
        expect(parentRepository.findByIds).toHaveBeenCalledTimes(1);
        expect(schoolgroupRepository.findByClassCode).toHaveBeenCalledWith(dto.enrolled);
        expect(parentRepository.findByIds).toHaveBeenCalledWith(dto.parentsId);
    });

    it('should convert dto to student', async () =>{
        expect(true).toBe(true);
    })
    it('should convert dto to student entity', async () =>{
        expect(true).toBe(true);
    })
    it('should save student', async () =>{
        expect(true).toBe(true);
    })
})