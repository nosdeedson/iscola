import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { RatingEntity } from "../../../infrastructure/entities/rating/rating.entity";
import { DeleteRatingService } from "./delete.rating.service";
import { RatingRepositiry } from '../../../infrastructure/repositories/rating/rating.repository';
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { StudentRepository } from "../../../infrastructure/repositories/student/student.repository";
import { AcademicSemesterEntity } from "../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { AcademicSemesterRepository } from "../../../infrastructure/repositories/academic-semester/academic-semester.repository";

describe('Delete rating domain service integration tests', () => {

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

    it('should not throw an error while trying to deleting a rating', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let rating = DomainMocks.mockRating();
        let ratingEntity = RatingEntity.toRatingEntity(rating);
        expect(await ratingRepository.create(ratingEntity)).toBe(void 0);

        const usecase = new DeleteRatingService(ratingRepository);

        let wantedid = 'ecf7719b-4b88-4682-94d9-458321a07459';

        expect(await usecase.execute(wantedid)).toBe(void 0);

    }, 5000);

    it('should delete a rating', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let rating = DomainMocks.mockRating();
        let ratingEntity = RatingEntity.toRatingEntity(rating);
        expect(await ratingRepository.create(ratingEntity)).toBe(void 0);

        const usecase = new DeleteRatingService(ratingRepository);

        let wantedid = rating.getId();

        expect(await usecase.execute(wantedid)).toBe(void 0);

    });

})