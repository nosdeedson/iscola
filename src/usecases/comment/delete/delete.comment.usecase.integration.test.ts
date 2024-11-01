import { AppDataSourceMock } from "src/infrastructure/__mocks__/appDataSourceMock";
import { AcademicSemesterEntity } from "src/infrastructure/entities/academic-semester/academic.semester.entity";
import { CommentEntity } from "src/infrastructure/entities/comment/comment.entity";
import { ParentEntity } from "src/infrastructure/entities/parent/parent.entity";
import { RatingEntity } from "src/infrastructure/entities/rating/rating.entity";
import { StudentEntity } from "src/infrastructure/entities/student/student.entity";
import { AcademicSemesterRepository } from "src/infrastructure/repositories/academic-semester/academic-semester.repository";
import { CommentRepository } from "src/infrastructure/repositories/comment/comment.respository";
import { ParentRepository } from "src/infrastructure/repositories/parent/parent.repository";
import { RatingRepositiry } from "src/infrastructure/repositories/rating/rating.repository";
import { StudentRepository } from "src/infrastructure/repositories/student/student.repository";
import { DeleteCommentUseCase } from './delete.comment.usecase';
import { DomainMocks } from "src/infrastructure/__mocks__/mocks";

describe('deleteCommentUsecase integration test', () =>{

    let appDataSource;
    let commentEntity;
    let commentRepository;

    let ratingEntity;
    let ratingRepository;
    
    let semesterEntity;
    let semesterRepository;

    let studentEntity;
    let studentRepository;

    let parentEntity;
    let parentRepository;

    beforeEach(async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch((error) => console.log(error));

        commentEntity = appDataSource.getRepository(CommentEntity);
        commentRepository = new CommentRepository(commentEntity, appDataSource);

        semesterEntity = appDataSource.getRepository(AcademicSemesterEntity);
        semesterRepository = new AcademicSemesterRepository(semesterEntity, appDataSource);

        ratingEntity = appDataSource.getRepository(RatingEntity);
        ratingRepository = new RatingRepositiry(ratingEntity, appDataSource);

        studentEntity = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentEntity, appDataSource);

        parentEntity = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentEntity, appDataSource)
        
    });

    afterEach(async () => {
        await appDataSource.createQueryBuilder().delete().from(CommentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(RatingEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(StudentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(ParentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(AcademicSemesterEntity).execute();
        await appDataSource.destroy();
        jest.clearAllMocks();
    });

    it('repositories and entities must be instantiated', () =>{
        expect(parentEntity).toBeDefined();
        expect(studentEntity).toBeDefined();
        expect(semesterEntity).toBeDefined();
        expect(ratingEntity).toBeDefined();
        expect(commentEntity).toBeDefined();
        expect(parentRepository).toBeDefined();
        expect(studentRepository).toBeDefined();
        expect(semesterRepository).toBeDefined();
        expect(ratingRepository).toBeDefined();
        expect(commentRepository).toBeDefined();
    });

    it('given an id that does not exist should not trhow error', async () =>{
        let wantedId = '2c1d88fb-462e-4e8b-bcb1-27119dac4317';
        const usecase = new DeleteCommentUseCase(commentRepository);
        expect(await usecase.execute(wantedId)).toBe(void 0);
    })

    it('given a valid comment should save it on BD', async () =>{
        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);

        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let rating = DomainMocks.mockRating();
        let ratingEntity = RatingEntity.toRatingEntity(rating);

        expect(await ratingRepository.create(ratingEntity)).toBe(void 0);

        let comment = DomainMocks.mockComment(); 
        let commentEntity = CommentEntity.toCommentEntity(comment, ratingEntity);
        let wantedId = comment.getId();
        expect(await commentRepository.create(commentEntity)).toBe(void 0);
        let result = await commentRepository.find(wantedId);
        expect(result).toBeDefined();
        const usecase = new DeleteCommentUseCase(commentRepository);
        expect(await usecase.execute(wantedId)).toBe(void 0);
        result = await commentRepository.find(wantedId);
        expect(result).toBeNull();
    });


})