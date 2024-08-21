import { Parent } from "../../../domain/parent/parent";
import { Student } from "../../../domain/student/student";
import { ParentModel } from "./parent.model";

describe("ParentModel unit tests", () => {

    let student;
    let parent;
    beforeEach(() =>{
        student = new Student(
            new Date,
            'Maria',
            '123',
            []
        )
        let students = [student];
        let birthday = new Date();
        let name = 'edson';
        parent = new Parent(
            birthday,
            name,
            students
        );   
    })

    it('should intantiate a ParentModel', () => {
        let model = ParentModel.toParentModel(parent);
        expect(model).toBeDefined();
        expect(model.birthday).toBe(parent.getBirthday());
        expect(model.createdAt).toBe(parent.getCreatedAt());
        expect(model.deletedAt).toBe(parent.getDeletedAt());
        expect(model.fullName).toBe(parent.getName());
        expect(model.id).toBe(parent.getId());
        expect(model.updatedAt).toBe(parent.getUpdatedAt());
    })

    it('should intantiate a ParentModel', () => {
        let models = ParentModel.toParentsModels([parent]);
        expect(models).toBeDefined();
        expect(models[0].birthday).toBe(parent.getBirthday());
        expect(models[0].createdAt).toBe(parent.getCreatedAt());
        expect(models[0].deletedAt).toBe(parent.getDeletedAt());
        expect(models[0].fullName).toBe(parent.getName());
        expect(models[0].id).toBe(parent.getId());
        expect(models[0].updatedAt).toBe(parent.getUpdatedAt());
    })
})