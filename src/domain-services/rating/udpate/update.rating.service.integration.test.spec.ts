import { Grade } from "../../../domain/enum/grade/grade";
import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { AcademicSemesterEntity } from "../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { RatingEntity } from "../../../infrastructure/entities/rating/rating.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { AcademicSemesterRepository } from "../../../infrastructure/repositories/academic-semester/academic-semester.repository";
import { RatingRepositiry } from "../../../infrastructure/repositories/rating/rating.repository";
import { StudentRepository } from "../../../infrastructure/repositories/student/student.repository";
import { UpdateRatingDto } from "./udpate.rating.dto";
import { UpdateRatingService } from './update.rating.service';


describe('update rating service integration tests', () => {

    let appDataSource;
    let ratingEntity;
    let ratingRepository: RatingRepositiry;

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
    });

    it('should throw a SystemError if rating not found', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let rating = DomainMocks.mockRating();
        let ratingEntity = RatingEntity.toRatingEntity(rating);
        expect(await ratingRepository.create(ratingEntity)).toBe(void 0);

        let wantedid = 'b4145be7-0fed-4a64-8a45-24bdd594cd20';

        let input = new UpdateRatingDto(wantedid, Grade.GOOD, Grade.GOOD, Grade.GOOD, Grade.GOOD, Grade.GOOD, Grade.GOOD, Grade.GOOD);
        const service = new UpdateRatingService(ratingRepository);
        try {
            await service.execute(input)
        } catch (error) {
            expect(error).toBeDefined()
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'Not found' }]);
        }
    })

    it('should update a rating', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let rating = DomainMocks.mockRating();
        let ratingEntity = RatingEntity.toRatingEntity(rating);
        expect(await ratingRepository.create(ratingEntity)).toBe(void 0);

        let wantedid = rating.getId();

        let input = new UpdateRatingDto(wantedid, Grade.GOOD, Grade.GOOD, Grade.GOOD, Grade.GOOD, Grade.GOOD, Grade.GOOD, Grade.GOOD);
        const service = new UpdateRatingService(ratingRepository);
        expect(await service.execute(input)).toBe(void 0);
        let result = await ratingRepository.find(wantedid);
        expect(result.listing).toBe(input.listing);
        expect(result.writing).toBe(input.writing);
        expect(result.reading).toBe(input.reading);
        expect(result.speaking).toBe(input.speaking);
        expect(result.homework).toBe(input.homework);
        expect(result.grammar).toBe(input.grammar);
        expect(result.vocabulary).toBe(input.vocabulary);
        expect(result.updatedAt.getTime()).toBeGreaterThan(rating.getUpdatedAt().getTime());
    })

})