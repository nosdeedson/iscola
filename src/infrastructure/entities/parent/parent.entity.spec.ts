import { DomainMocks } from "../../__mocks__/mocks";
import { Parent } from "../../../domain/parent/parent";
import { Student } from "../../../domain/student/student";
import { ParentEntity } from "./parent.entity";

describe("ParentModel unit tests", () => {

    let student;
    let parent;
    beforeEach(() =>{
        student = DomainMocks.mockStudent();
        parent = DomainMocks.mockParent();  
    })

    it('should intantiate a ParentModel', () => {
        let model = ParentEntity.toParentEntity(parent);
        expect(model).toBeDefined();
        expect(model.birthday).toBe(parent.getBirthday());
        expect(model.createdAt).toBe(parent.getCreatedAt());
        expect(model.deletedAt).toBe(parent.getDeletedAt());
        expect(model.fullName).toBe(parent.getName());
        expect(model.id).toBe(parent.getId());
        expect(model.updatedAt).toBe(parent.getUpdatedAt());
    })

    it('should instantiate a ParentModel', () => {
        let models = ParentEntity.toParentsModels([parent]);
        expect(models).toBeDefined();
        expect(models[0].birthday).toBe(parent.getBirthday());
        expect(models[0].createdAt).toBe(parent.getCreatedAt());
        expect(models[0].deletedAt).toBe(parent.getDeletedAt());
        expect(models[0].fullName).toBe(parent.getName());
        expect(models[0].id).toBe(parent.getId());
        expect(models[0].updatedAt).toBe(parent.getUpdatedAt());
    })

    it('should throw an error', () =>{
        let parentWithoutStudent = DomainMocks.mockParentWithoutStudent();
        try {
            let model = ParentEntity.toParentEntity(parentWithoutStudent);
        } catch (error) {
            expect(error.message).toEqual('should inform at least one student')
        }
    })
})