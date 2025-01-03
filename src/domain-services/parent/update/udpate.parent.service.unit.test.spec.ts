import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { UpdateParentService } from './update.parent.service';
import { StudentEntity } from '../../../infrastructure/entities/student/student.entity';
import { ParentEntity } from '../../../infrastructure/entities/parent/parent.entity';

describe('UpdateParentService unit test', () =>{

    it('given wrong id should throw an systemError', async () =>{
        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
        parentRepository.find = jest.fn().mockImplementationOnce(() => null);
        const service = new UpdateParentService(parentRepository);
        const student = DomainMocks.mockStudent();
        const studentEntity = StudentEntity.toStudentEntity(student);
        const noExistentParentId = 'ce8750b9-6396-4d87-86f1-caa3316ff177'
        try {
            await service.execute(studentEntity, noExistentParentId);
        } catch (error) {
            expect(error.errors).toBeDefined();
            expect(error.errors).toMatchObject([{context: 'parent', message: 'Parent not found'}]);
        }
    });

    it('given wrong id should throw an systemError', async () =>{
        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
        const parent = DomainMocks.mockParent();
        const parentEntity = ParentEntity.toParentEntity(parent);
        parentRepository.find = jest.fn().mockImplementationOnce(() => parentEntity);
        
        const service = new UpdateParentService(parentRepository);
        const student = DomainMocks.mockStudent();
        const studentEntity = StudentEntity.toStudentEntity(student);
        parentRepository.update = jest.fn().mockImplementationOnce(() => parentEntity.students.push(studentEntity))
        const parentId = parent.getId()
        expect(await service.execute(studentEntity, parentId)).toBe(void 0);
    });

})