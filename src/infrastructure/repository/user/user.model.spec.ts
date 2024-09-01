import { AccessType } from "../../../domain/user/access.type";
import { User } from "../../../domain/user/user";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { UserModel } from "./user.model";

describe('UserModel Unit tests', () =>{

    let user: User;

    it('should instantiate an user with access type equal to admin', () => {
        user = DomainMocks.mockPerson(AccessType.ADMIN);
        let userModel = UserModel.toUserModel(user);
        expect(userModel).toBeDefined();
        expect(userModel.id).toEqual(user.getId());
        expect(userModel.accesType).toEqual(user.getAccessType());
        expect(userModel.createdAt).toEqual(user.getCreatedAt());
        expect(userModel.deletedAt).toEqual(user.getDeletedAt());
        expect(userModel.email).toEqual(user.getEmail());
        expect(userModel.password).toEqual(user.getPassword());
        expect(userModel.person.id).toEqual(user.getPerson().getId());
        expect(userModel.updatedAt).toEqual(user.getUpdatedAt());
    })

    it('should instantiate an user with access type equal to parent', () => {
        user = DomainMocks.mockPerson(AccessType.PARENT);
        let userModel = UserModel.toUserModel(user);
        expect(userModel).toBeDefined();
        expect(userModel.id).toEqual(user.getId());
        expect(userModel.accesType).toEqual(user.getAccessType());
        expect(userModel.createdAt).toEqual(user.getCreatedAt());
        expect(userModel.deletedAt).toEqual(user.getDeletedAt());
        expect(userModel.email).toEqual(user.getEmail());
        expect(userModel.password).toEqual(user.getPassword());
        expect(userModel.person.id).toEqual(user.getPerson().getId());
        expect(userModel.updatedAt).toEqual(user.getUpdatedAt());
    })

    it('should instantiate an user with access type equal to student', () => {
        user = DomainMocks.mockPerson(AccessType.STUDENT);
        let userModel = UserModel.toUserModel(user);
        expect(userModel).toBeDefined();
        expect(userModel.id).toEqual(user.getId());
        expect(userModel.accesType).toEqual(user.getAccessType());
        expect(userModel.createdAt).toEqual(user.getCreatedAt());
        expect(userModel.deletedAt).toEqual(user.getDeletedAt());
        expect(userModel.email).toEqual(user.getEmail());
        expect(userModel.password).toEqual(user.getPassword());
        expect(userModel.person.id).toEqual(user.getPerson().getId());
        expect(userModel.updatedAt).toEqual(user.getUpdatedAt());
    })

    it('should instantiate an user with access type equal to teacher', () => {
        user = DomainMocks.mockPerson(AccessType.TEACHER);
        let userModel = UserModel.toUserModel(user);
        expect(userModel).toBeDefined();
        expect(userModel.id).toEqual(user.getId());
        expect(userModel.accesType).toEqual(user.getAccessType());
        expect(userModel.createdAt).toEqual(user.getCreatedAt());
        expect(userModel.deletedAt).toEqual(user.getDeletedAt());
        expect(userModel.email).toEqual(user.getEmail());
        expect(userModel.password).toEqual(user.getPassword());
        expect(userModel.person.id).toEqual(user.getPerson().getId());
        expect(userModel.updatedAt).toEqual(user.getUpdatedAt());
    })
})