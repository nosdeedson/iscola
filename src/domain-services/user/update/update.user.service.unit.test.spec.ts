import { daysToWeeks } from "date-fns";
import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { UserEntity } from "../../../infrastructure/entities/user/user.entity";
import { UpdateUserDto } from './update.user.dto';
import { UpdateUserService } from './update.user.service';

describe('UpdateUserService unit tests', () => {

    let user;
    let userEntity;
    let updateUserDto: UpdateUserDto;
    let userRepository;

    beforeEach(() => {
        user = DomainMocks.mockUserTeacher();
        userEntity = UserEntity.toUserEntity(user);
        updateUserDto = { id: userEntity.id, email: 'test@test', nickname: 'test', password: '4321'};
        userRepository = MockRepositoriesForUnitTest.mockRepositories();
    });

    it('should throw an error because id is not present ', async () =>{
        let input = {  email: 'test@test', nickname: 'test', password: '4321'};
        
        try {
            const usecase = new UpdateUserService(userRepository);
            await usecase.execute(input as UpdateUserDto)
        } catch (error) {
            expect(error).toEqual({errors :[{context: 'user', message: 'id must be informed'}]});
            expect(error.errors[0].message).toBe('id must be informed');
        }
    });

    it('should throw an error because dto has just the id ', async () =>{
        let input = {  id: '4321'};
        
        try {
            const usecase = new UpdateUserService(userRepository);
            await usecase.execute(input as UpdateUserDto)
        } catch (error) {
            expect(error).toEqual({errors: [{context: 'user', message: 'at least one atribute must be passed to update an user'}]});
            expect(error.errors[0].message).toBe('at least one atribute must be passed to update an user');
        }
    });

    it('should update an user', async () =>{
        userRepository.find = jest.fn().mockImplementationOnce(() => {return userEntity});
        userRepository.update = jest.fn().mockImplementationOnce(() => {void 0})
        const usecase = new UpdateUserService(userRepository);
        expect(await usecase.execute(updateUserDto)).toBe(void 0);
        expect(userRepository.update).toHaveBeenCalledTimes(1);
        expect(userRepository.find).toHaveBeenCalledTimes(1);
        expect(userRepository.find).toHaveBeenCalledWith(updateUserDto.id);
        expect(userRepository.update).toHaveBeenCalled( );
    })


})