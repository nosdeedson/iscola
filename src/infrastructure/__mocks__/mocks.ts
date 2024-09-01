import { RoleEnum } from "../../domain/worker/roleEnum";
import { Worker } from "../../domain/worker/worker";
import { AcademicSemester } from "../../domain/academc-semester/academic.semester";
import { Class } from "../../domain/class/class";
import { Grade } from "../../domain/enum/grade/grade";
import { Parent } from "../../domain/parent/parent";
import { Rating } from "../../domain/rating/rating";
import { Schedule } from "../../domain/schedule/schedule";
import { Student } from "../../domain/student/student";
import { AccessType } from "../../domain/user/access.type";
import { User } from "../../domain/user/user";


// first August 2024
const aValidBeginnig = new Date(2024, 7, 1, 0, 0, 0);
// 29 November 2024
const aValidEnding = new Date(2024, 10, 29, 0, 0, 0);

const academicSemester = new AcademicSemester(true, aValidBeginnig, aValidEnding);

const times = new Map<string, string>();
times.set('Monday', '08:00');
times.set('Tuesday', '08:00');

const parent = new Parent(new Date(), "jose", [new Student(new Date, 'edson', '123', [])]);
const student = new Student(new Date, 'edson', '123', [parent]);

const studentWithoutParent = new Student(new Date, 'edson', '123', []);
const parentWithoutStudent = new Parent(new Date(), "jose", []);

const schedule = new Schedule(['Monday', 'Tuesday'], times)
const schoolGroup = new Class('1234', 'nameBook', 'a1', schedule);

const rating = new Rating(academicSemester, student, new Date(), Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD,);

const admin = new Worker(new Date(), 'jose', RoleEnum.ADMINISTRATOR);
admin.setClass(schoolGroup);
const teacher = new Worker(new Date(), 'maria', RoleEnum.TEACHER);
teacher.setClass(schoolGroup);

const userAdmin = new User(admin, 'teste@teste', 'edson', '123', AccessType.ADMIN);
const userParent = new User(parent, 'teste@teste', 'edson', '123', AccessType.PARENT);
const userStudent = new User(student, 'teste@teste', 'edson', '123', AccessType.STUDENT);
const userTeacher = new User(teacher, 'teste@teste', 'edson', '123', AccessType.TEACHER);

export class DomainMocks {

    static mockPerson(accessType: AccessType): any{
        if(accessType == AccessType.ADMIN){
            return userAdmin;
        } else if(accessType == AccessType.PARENT){
            return userParent;
        } else if(accessType == AccessType.STUDENT){
            return userStudent;
        }else {
            return userTeacher;
        }
    }

    static mockParent(): Parent{
        parent.setStudents([student])
        return parent;
    }

    static mockParentWithoutStudent(): Parent{
        return parentWithoutStudent;
    }

    static mockStudent(): Student{
        return student;
    }

    static mockStudentWithoutParent(): Student{
        return studentWithoutParent;
    }

    static mockAcademicSemester(): AcademicSemester{
        return academicSemester;
    }

    static mockRating(): Rating{
        return rating;
    }
}