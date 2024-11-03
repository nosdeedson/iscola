import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { CommentEntity } from "../../../infrastructure/entities/comment/comment.entity";
import { CreateCommentDto } from "./create.comment.dto";
import { CommentRepository } from '../../../infrastructure/repositories/comment/comment.respository';
import { AcademicSemesterEntity } from "../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";
import { RatingEntity } from "../../../infrastructure/entities/rating/rating.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { AcademicSemesterRepository } from "../../../infrastructure/repositories/academic-semester/academic-semester.repository";
import { ParentRepository } from "../../../infrastructure/repositories/parent/parent.repository";
import { RatingRepositiry } from "../../../infrastructure/repositories/rating/rating.repository";
import { StudentRepository } from "../../../infrastructure/repositories/student/student.repository";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { CreateCommentUseCase } from './create.comment.usecase';

describe('create comment usecase integration tests', () =>{

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

    it('should throw a systemError', async () =>{
        const dto = new CreateCommentDto('test a test', '0e2189bd-8f47-4665-90b3-53191b52e606', "55c63535-25f8-471e-8184-d1f1d44a042c");
        const usecase = new CreateCommentUseCase(commentRepository, ratingRepository);

        try {
            await usecase.execute(dto);
        } catch (error) {
            expect(error.errors).toBeDefined();
            expect(error.errors).toMatchObject( [{
                "context": "comment",
                "message": "Rating not found",
              }]);
        }
    })

    it('should save a comment', async () =>{

        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);

        // let parent = student.getParents()[0];
        // let parentEntity = ParentEntity.toParentEntity(parent);

        // //expect(await parentRepository.create(parentEntity)).toBe(void 0);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let rating = DomainMocks.mockRating();
        let ratingEntity = RatingEntity.toRatingEntity(rating);

        expect(await ratingRepository.create(ratingEntity)).toBe(void 0);

        let idPersonHaveDone = student.getId();
        let idRating = rating.getId();

        const dto = new CreateCommentDto('test a test', idPersonHaveDone, idRating);
        const usecase = new CreateCommentUseCase(commentRepository, ratingRepository);
        let results = await commentRepository.findAll();
        expect(results.length).toBe(0);

        expect(await usecase.execute(dto)).toBe(void 0);
        results = await commentRepository.findAll();
        expect(results.length).toBe(1);
        expect(results[0].id).toBeDefined();
        expect(results[0].idPersonHaveDone).toBe(idPersonHaveDone);
        expect(results[0].comment).toBe('test a test');
    })

})