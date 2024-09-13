import { AppDataSourceMock } from "../../__mocks__/appDataSourceMock";
import { DomainMocks } from "../../__mocks__/mocks";
import { ClassEntity } from "../../entities/class/class.entity";
import { StudentEntity } from "../../entities/student/student.entity";
import { StudentRepository } from '../../repositories/student/student.repository';
import { ClassRepository } from '../../repositories/class/class.repository';

describe('StudentRepository unit test', () =>{

    let appDataSource;
    let studentModel;
    let studentRepository;
    let schoolGroupModel;
    let schoolGroupRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));

        studentModel = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentModel, appDataSource);
        schoolGroupModel = appDataSource.getRepository(ClassEntity);
        schoolGroupRepository = new ClassRepository(schoolGroupModel, appDataSource);
    });

    afterEach(async () => {
        // await studentModel.query('delete from person cascade');
        // await schoolGroupModel.query('delete from class cascade');
        appDataSource.destroy();
    });

    it('studentRepository should instantiated', () =>{
        expect(studentRepository).toBeDefined();
        expect(schoolGroupRepository).toBeDefined();
    });

    it('should save a student in BD', async () => {
        let student = DomainMocks.mockStudent();
        let model = StudentEntity.toStudentEntity(student);
        let wantedId = student.getId();
        expect(await studentRepository.create(model)).toBe(void 0);
        
        let result = await studentRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
    });

    it('should delete a student in BD', async () => {
        let student = DomainMocks.mockStudent();
        let model = StudentEntity.toStudentEntity(student);
        let wantedId = student.getId();
        expect(await studentRepository.create(model)).toBe(void 0);
        
        let result = await studentRepository.find(wantedId);
        expect(result).toBeDefined();

        expect(await studentRepository.delete(wantedId)).toBe(void 0);
        result = await studentRepository.find(wantedId);

        expect(result).toBeNull();
    });

    it('should find a student in BD', async () => {
        let student = DomainMocks.mockStudent();
        let model = StudentEntity.toStudentEntity(student);
        let wantedId = student.getId();
        expect(await studentRepository.create(model)).toBe(void 0);
        
        let result = await studentRepository.find(wantedId);
        expect(result).toBeDefined();
    });


    it('should update a student in BD', async () => {
        let student = DomainMocks.mockStudent();
        let schoolGroup = DomainMocks.mockSchoolGroup();
        student.setSchoolGroup(schoolGroup);


        let model = StudentEntity.toStudentEntity(student);
        let wantedId = student.getId();
        
        expect(await studentRepository.create(model)).toBe(void 0);
        let result = await studentRepository.find(wantedId);
        expect(result).toBeDefined();

        // expect(await studentRepository.update(model, wantedId));
        // result = await studentRepository.find(wantedId);
        // expect(result).toBeDefined();
        // expect(result.schoolGroup.classCode).toEqual(schoolGroup.getClassCode());
    });

})