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
import { UpdateCommentDto } from './update.comment.dto';
import { UpdateCommentService } from './update.comment.service';


describe('UpdateCommentService integration tests', () =>{
    
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


    it('given the wrong id should throw an SystemError', async () =>{

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
        expect(await commentRepository.create(commentEntity)).toBe(void 0);

        const wrongId = 'df488d38-4890-4e32-a443-ff0ba9ad86eb';
        const currentComment = comment.getComment();
        const dto = new UpdateCommentDto(wrongId, 'changing comment');

        const usecase = new UpdateCommentService(commentRepository);

        try {
            await usecase.execute(dto);
        } catch (error) {
            expect(error.errors).toBeDefined();
            expect(error.errors[0]).toMatchObject([{context: 'comment', message: 'comment not found'}]);
        }
    });

    it('given a valid id should update a comment', async () =>{
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
        expect(await commentRepository.create(commentEntity)).toBe(void 0);
        
        let wantedId = comment.getId();
        let currentComment = comment.getComment();
        let updatedComment = 'changed comment';
        let dto = new UpdateCommentDto(wantedId, updatedComment);
        let result = await commentRepository.find(wantedId);
        expect(result.comment).toBe(currentComment);
        const usecase = new UpdateCommentService(commentRepository);
        
        expect(await usecase.execute(dto)).toBe(void 0);
        result = await commentRepository.find(wantedId);
        expect(result.comment).toBe(updatedComment);
        expect(result.id).toBe(wantedId);
    })

})