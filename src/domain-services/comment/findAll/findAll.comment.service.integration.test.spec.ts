import { Comment } from "../../../domain/comment/comment";
import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { AcademicSemesterEntity } from "../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { CommentEntity } from "../../../infrastructure/entities/comment/comment.entity";
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";
import { RatingEntity } from "../../../infrastructure/entities/rating/rating.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { AcademicSemesterRepository } from "../../../infrastructure/repositories/academic-semester/academic-semester.repository";
import { CommentRepository } from "../../../infrastructure/repositories/comment/comment.respository";
import { ParentRepository } from "../../../infrastructure/repositories/parent/parent.repository";
import { RatingRepositiry } from "../../../infrastructure/repositories/rating/rating.repository";
import { StudentRepository } from "../../../infrastructure/repositories/student/student.repository";
import { FindAllCommentService } from './findAll.comment.service';


describe('FindAllCommentService integration tests', () =>{

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

    it('should return an empty array', async () =>{
        const service = new FindAllCommentService(commentRepository);
        const results = await service.execute();
        expect(results).toBeDefined();
        expect(results.all.length).toBe(0);
    });

    it('should find all comments', async () =>{
        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBe(void 0);

        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);

        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let rating = DomainMocks.mockRating();
        let ratingEntity = RatingEntity.toRatingEntity(rating);

        expect(await ratingRepository.create(ratingEntity)).toBe(void 0);

        const service = new FindAllCommentService(commentRepository);

        let results = await service.execute()
        expect(results.all.length).toBe(0);

        let comment = DomainMocks.mockComment(); 
        let commentEntity = CommentEntity.toCommentEntity(comment, ratingEntity);
        expect(await commentRepository.create(commentEntity)).toBe(void 0);

        let comment1 = new Comment('another comment', comment.getIdPersonHadDone());
        const commentEntity1 = CommentEntity.toCommentEntity(comment1, ratingEntity);
        expect(await commentRepository.create(commentEntity1)).toBe(void 0);
        
        results = await service.execute();

        expect(results).toBeDefined()
        expect(results.all.length).toBe(2);
        expect(results.all[0].idComment).toBe(comment.getId());
        expect(results.all[1].idComment).toBe(comment1.getId());
    })
})