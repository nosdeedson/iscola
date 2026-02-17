import { DomainMocks } from "../../__mocks__/mocks";
import { ParentEntity } from "../parent/parent.entity";
import { StudentEntity } from "../student/student.entity";
import { ParentStudentEntity } from "../parent-student/parent.student.entity";

describe('ParentStudentEntity', () => {
  it('should be defined', () => {
    const student = DomainMocks.mockStudentWithoutParent();
    const parent = DomainMocks.mockParentWithoutStudent(); 
    const studentEntity = StudentEntity.toStudentEntity(student);
    const parentEntity = ParentEntity.toParentEntity(parent);
    const parentStudentEntity = ParentStudentEntity.toParentStudentEntity(parentEntity, studentEntity);
    expect(parentStudentEntity).toBeDefined();
    expect(parentStudentEntity.parent).toBe(parentEntity);
    expect(parentStudentEntity.student).toBe(studentEntity);
  });
} )