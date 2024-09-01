import { Student } from "src/domain/student/student";
import { DomainMocks } from "../../__mocks__/mocks";
import { StudentModel } from "./student.model"

describe("StudentModel unit test", () =>{

    let student: Student;
    let student1: Student;
    let students: Student[];

    beforeEach(() =>{
        student = DomainMocks.mockStudent();
        student1 = DomainMocks.mockStudent();
        students = [];
        students.push(student)
        students.push(student1)
    })

    it('should instantiate a studentModel', () => {
        let model = StudentModel.toStudentModel(student);
        expect(model.id).toEqual(student.getId())
        expect(model.birthday).toEqual(student.getBirthday())
        expect(model.createdAt).toEqual(student.getCreatedAt())
        expect(model.deletedAt).toEqual(student.getDeletedAt())
        expect(model.enrolled).toEqual(student.getEnrolled())
        expect(model.fullName).toEqual(student.getName())
        expect(model.parents.length).toBe(1)
        expect(model.schoolGroup).toBeDefined()
        expect(model.updatedAt).toEqual(student.getUpdatedAt())
    })

    it('should instantiate an array of sudents model', () =>{
        let models = StudentModel.toStudentsModels(students);
        expect(models).toBeDefined();
        expect(models.length).toBe(2);
        expect(models[0].id).toStrictEqual(student.getId())
        expect(models[1].id).toStrictEqual(student1.getId())
    })

    it('should instantiate an array of sudents model', () =>{
        let student = DomainMocks.mockStudentWithoutParent();
        try {
            let model = StudentModel.toStudentModel(student);
        } catch (error) {
            expect(error.message).toEqual('should inform at least one parent')
        }
    })

})