import { Parent } from "src/domain/parent/parent";
import { Student } from "src/domain/student/student";

export class CreateParentDto{
    birthday: Date;
    name: string;
    students: CreateParentStudentDto[] = [];

    constructor(
        birthday: Date,
        name: string,
        students: CreateParentStudentDto[]
    ) {
        this.birthday = birthday;
        this.name = name;
        this.students = students;
    }

    static toParent(dto: CreateParentDto): Parent{
        let students : Student[] = [];
        for(let i = 0; i < dto.students.length; i++){
            let studentsDto = dto.students
            let student = CreateParentStudentDto.toStudent(studentsDto[i]);
            students.push(student);
        }
        let parent = new Parent(dto.birthday, dto.name, students);
        return parent;
    }
}

export class CreateParentStudentDto{
    birthday: Date;
    name: string;
    enrolled: string;

    constructor(
        birthday: Date,
        name: string,
        enrolled: string,
    ){
        this.birthday = birthday;
        this.name = name;
        this.enrolled = enrolled;
    }

    static toStudent(dto: CreateParentStudentDto): Student{
        let student = new Student(dto.birthday, dto.name, dto.enrolled);
        return student;
    }
}