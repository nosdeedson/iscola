import { AccessType } from "../../../domain/user/access.type";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { MockCreateUserUsecase } from "../../../infrastructure/__mocks__/createrUserUseCase";
import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { PersonEntity } from "../../../infrastructure/entities/@shared/person.entity";
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { CreateUserUseCase } from '../create/create.user.usecase';
import { InputCreateUserDto } from "./input.create.user.dto";


describe('create user use case unit test', () =>{

    let input: InputCreateUserDto;
    let personEntity: PersonEntity;
    let person;

    beforeEach(async () => {
        input = {
            personId: "1234567890",
            email: 'teste@teste',
            password: '1234',
            nickname: 'teste',
            accesstype: AccessType.TEACHER
        }
        person = DomainMocks.mockWorker(RoleEnum.TEACHER);
        personEntity = WorkerEntity.toWorkerEntity(person);
    })


    it('should create an user', async () =>{
        const createUserUseCase = jest.spyOn(CreateUserUseCase.prototype, 'typePerson')
            .mockImplementationOnce(() => { return person});
        const userRepository = MockRepositoriesForUnitTest.mockRepositories();
        const personRepository = MockRepositoriesForUnitTest.mockRepositories();
        personRepository.find = jest.fn().mockReturnValueOnce(() => personEntity);
        const useCase = new CreateUserUseCase(userRepository, personRepository);
        expect(await useCase.execute(input)).toBe(void 0);
        expect(createUserUseCase).toHaveBeenCalled()
    })
    
})