import { Parent } from "../../../domain/parent/parent";
import { AppDataSourceMock } from "../../__mocks__/appDataSourceMock";
import { DomainMocks } from "../../__mocks__/mocks";
import { ParentEntity } from "../../entities/parent/parent.entity";
import { StudentEntity } from "../../entities/student/student.entity";
import { ParentRepository } from '../parent/parent.repository'; 
import { StudentRepository } from '../student/student.repository';


describe('ParentRepository unit test', () =>{

    let appDataSource;
    let parentModel;
    let parentRepository;
    let studentModel;
    let studentRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        
        parentModel = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentModel, appDataSource);
        studentModel = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentModel, appDataSource);
    });

    afterEach( async () =>{
        await parentModel.query('delete from person cascade');
        await studentModel.query('delete from person cascade');
        appDataSource.destroy();
    })

    it('repository should be instantiate', () => {
        expect(parentRepository).toBeDefined();
    });


    it('should save a parent model to the BD', async () => {
        let parent = DomainMocks.mockParent();
        let model = ParentEntity.toParentModel(parent);
        let wantedId = parent.getId();
        expect(await parentRepository.create(model)).toBe(void 0);

        let result = await parentRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
    });

    it('should delete a parent model to the BD', async () => {
        let parent = DomainMocks.mockParent();
        let model = ParentEntity.toParentModel(parent);
        let wantedId = parent.getId();
        await parentRepository.create(model);

        let result = await parentRepository.find(wantedId);
        expect(result).toBeDefined();

        expect(await parentRepository.delete(wantedId)).toBe(void 0);
    });

    it('should do anything if parent model does not exist', async () => {
        let parent = DomainMocks.mockParent();
        let model = ParentEntity.toParentModel(parent);
        let wantedId = '6a0e9000-c5f9-4dad-bd4a-e4642964c2fb';
        await parentRepository.create(model);
        let result = await parentRepository.find(parent.getId());
        expect(result).toBeDefined();
        expect(await parentRepository.delete(wantedId)).toBe(void 0);
        result = await parentRepository.find(parent.getId());
        expect(result).toBeDefined();

    });

    it('should find a parent model to the BD', async () => {
        let parent = DomainMocks.mockParent();
        let model = ParentEntity.toParentModel(parent);
        let wantedId = parent.getId();
        await parentRepository.create(model);

        let result = await parentRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
    });

    it('should find all parent model to the BD', async () => {
        let parent = new Parent(new Date(), 'maria', [DomainMocks.mockStudent()], '157db802-00d6-4d46-bf43-fc11bce8c54b')
        let model = ParentEntity.toParentModel(parent);
        await parentRepository.create(model);
        let parent2 = new Parent(new Date(), 'lucineia', [DomainMocks.mockStudent()], '890e0ad0-a084-46da-add6-a5e7589fdd19')
        let model2 = ParentEntity.toParentModel(parent2);
        await parentRepository.create(model2);

        let results = await parentRepository.findAll();
        expect(results).toBeDefined();
        expect(results.length).toBe(2);
    });

    it('should update a parent model to the BD', async () => {
        let parent = DomainMocks.mockParent();
        let model = ParentEntity.toParentModel(parent);
        await parentRepository.create(model);

        let result = await parentRepository.find(parent.getId());
        expect(result).toBeDefined();

        model.birthday = new Date();
        model.fullName = 'new name'
        expect(await parentRepository.update(model, parent.getId())).toBe(void 0);
        result = await parentRepository.find(parent.getId());
        expect(result).toBeDefined();
        expect(result.fullName).toEqual('new name');
        expect(result.birthday.getTime()).toBeGreaterThan(parent.getBirthday().getTime());
    });

})