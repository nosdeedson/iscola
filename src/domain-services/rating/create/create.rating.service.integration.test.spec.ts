import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { AcademicSemesterEntity } from "../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { RatingEntity } from "../../../infrastructure/entities/rating/rating.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { AcademicSemesterRepository } from "../../../infrastructure/repositories/academic-semester/academic-semester.repository";
import { RatingRepositiry } from "../../../infrastructure/repositories/rating/rating.repository";
import { StudentRepository } from "../../../infrastructure/repositories/student/student.repository";
import { CreateRatingService } from './create.rating.service';
import { CreateRatingDto } from './create.rating.dto';
import { Grade } from "../../../domain/enum/grade/grade";
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";

describe('create rating integration tests', () => {

    let appDataSource;
    let ratingEntity;
    let ratingRepository;

    let studentEntity;
    let studentRepository;

    let semesterEntity;
    let semesterRepository;

    beforeEach(async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        ratingEntity = appDataSource.getRepository(RatingEntity);
        ratingRepository = new RatingRepositiry(ratingEntity, appDataSource);
        studentEntity = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentEntity, appDataSource);
        semesterEntity = appDataSource.getRepository(semesterEntity);
        semesterRepository = new AcademicSemesterRepository(semesterEntity, appDataSource);
    });

    afterEach(async () => {
        await appDataSource.createQueryBuilder().delete().from(RatingEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(StudentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(AcademicSemesterEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(ParentEntity).execute();
        await appDataSource.destroy();
        jest.clearAllMocks();
    })

    it('entities and repositories must be instantiated', async () => {
        expect(ratingEntity).toBeDefined()
        expect(ratingRepository).toBeDefined()
        expect(studentEntity).toBeDefined();
        expect(studentRepository).toBeDefined()
        expect(semesterEntity).toBeDefined();
        expect(semesterRepository).toBeDefined();
    })

    it('should insert a rating on database', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let input = new CreateRatingDto(student, semester, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD);
        const usecase = new CreateRatingService(ratingRepository);
        expect(await usecase.execute(input)).toBe(void 0);
    });

    it('should throw a systemError if semester is null', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let semester;

        let input = new CreateRatingDto(student, semester, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD);
        const usecase = new CreateRatingService(ratingRepository);
        try {
            await usecase.execute(input);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.errors).toMatchObject([{context: 'rating', message: 'period of rating must be informed'}]);
        }
    });

    it('should throw a systemError if student is null', async () => {
        let student;

        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let input = new CreateRatingDto(student, semester, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD);
        const usecase = new CreateRatingService(ratingRepository);
        try {
            await usecase.execute(input);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.errors).toMatchObject([{context: 'rating', message: 'student receiving rating must be informed'}]);
        }
    });

    it('should throw a systemError if listing is null', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let listing;
        let input = new CreateRatingDto(student, semester, listing, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD);
        const usecase = new CreateRatingService(ratingRepository);
        try {
            await usecase.execute(input)
        } catch (error) {
            expect(error.errors).toBeDefined();
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'the listining skill must be informed' }]);
        }
    });

    it('should throw a systemError if writing is null', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let writing;
        let input = new CreateRatingDto(student, semester, Grade.BAD, writing, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD);
        const usecase = new CreateRatingService(ratingRepository);
        try {
            await usecase.execute(input)
        } catch (error) {
            expect(error.errors).toBeDefined();
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'the writing skill must be informed' }]);
        }
    });


    it('should throw a systemError if reading is null', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let reading;
        let input = new CreateRatingDto(student, semester, Grade.BAD, Grade.BAD, reading, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD);
        const usecase = new CreateRatingService(ratingRepository);
        try {
            await usecase.execute(input)
        } catch (error) {
            expect(error.errors).toBeDefined();
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'the reading skill must be informed' }]);
        }
    });

    it('should throw a systemError if speaking is null', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let speaking;
        let input = new CreateRatingDto(student, semester, Grade.BAD, Grade.BAD, Grade.BAD, speaking, Grade.BAD, Grade.BAD, Grade.BAD);
        const usecase = new CreateRatingService(ratingRepository);
        try {
            await usecase.execute(input)
        } catch (error) {
            expect(error.errors).toBeDefined();
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'the speaking skill must be informed' }]);
        }
    });

    it('should throw a systemError if grammar is null', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let grammar;
        let input = new CreateRatingDto(student, semester, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, grammar, Grade.BAD, Grade.BAD);
        const usecase = new CreateRatingService(ratingRepository);
        try {
            await usecase.execute(input)
        } catch (error) {
            expect(error.errors).toBeDefined();
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'the grammar skill must be informed' }]);
        }
    });

    it('should throw a systemError if homework is null', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let homework;
        let input = new CreateRatingDto(student, semester, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, homework, Grade.BAD);
        const usecase = new CreateRatingService(ratingRepository);
        try {
            await usecase.execute(input)
        } catch (error) {
            expect(error.errors).toBeDefined();
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'the homework commitment must be informed' }]);
        }
    });

    it('should throw a systemError if vocabulary is null', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let vocabulary;
        let input = new CreateRatingDto(student, semester, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, vocabulary);
        const usecase = new CreateRatingService(ratingRepository);
        try {
            await usecase.execute(input)
        } catch (error) {
            expect(error.errors).toBeDefined();
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'the vocabulary improvment must be informed' }]);
        }
    });

    

})