import { Comment } from "../../../domain/comment/comment";
import { Parent } from "../../../domain/parent/parent";
import { Student } from "../../../domain/student/student";
import { AppDataSourceMock } from "../../__mocks__/appDataSourceMock";
import { DomainMocks } from "../../__mocks__/mocks";
import { AcademicSemesterEntity } from "../../entities/academic-semester/academic.semester.entity";
import { CommentEntity } from "../../entities/comment/comment.entity";
import { ParentEntity } from "../../entities/parent/parent.entity";
import { RatingEntity } from "../../entities/rating/rating.entity";
import { StudentEntity } from "../../entities/student/student.entity";
import { ParentRepository } from '../../repositories/parent/parent.repository';
import { AcademicSemesterRepository } from '../academic-semester/academic-semester.repository';
import { CommentRepository } from '../comment/comment.respository';
import { RatingRepositiry } from '../rating/rating.repository';
import { StudentRepository } from '../student/student.repository';


describe('CommentRepository unit test', () => {

    let appDataSource;
    let commentModel;
    let repository;
    let ratingModel;
    let ratingRepository;
    let ratingEntity;
    let semesterModel;
    let semesterRepository;
    let studentModel;
    let studentRepository;
    let parentModel;
    let parentRepository;

    beforeEach(async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch((error) => console.log(error));

        commentModel = appDataSource.getRepository(CommentEntity);
        repository = new CommentRepository(commentModel, appDataSource);

        semesterModel = appDataSource.getRepository(AcademicSemesterEntity);
        semesterRepository = new AcademicSemesterRepository(semesterModel, appDataSource);

        ratingModel = appDataSource.getRepository(RatingEntity);
        ratingRepository = new RatingRepositiry(ratingModel, appDataSource);

        studentModel = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentModel, appDataSource);

        parentModel = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentModel, appDataSource)
        
    });

    afterEach(async () => {
        await commentModel.query(`delete from comment cascade`);
        await ratingModel.query(`delete from rating cascade`);
        await parentModel.query(`delete from person cascade`);
        await studentModel.query(`delete from person cascade`);
        // await appDataSource.createQueryBuilder().delete().from(CommentEntity).execute();
        // await appDataSource.createQueryBuilder().delete().from(RatingEntity).execute();
        // await appDataSource.createQueryBuilder().delete().from(Person).execute();
        await appDataSource.destroy();
    });

    it('commentRepository must be instantiated', async () => {
        expect(repository).toBeDefined();
        expect(ratingRepository).toBeDefined();
        expect(semesterRepository).toBeDefined();
        expect(studentRepository).toBeDefined();
        expect(parentRepository).toBeDefined();
    })

    it('should save a commnet on BD', async () => {

        let semester = DomainMocks.mockAcademicSemester();
        let academicSemester = AcademicSemesterEntity.toAcademicSemester(semester);
        await semesterRepository.create(academicSemester);

        // parent needed
        let student = new Student(new Date, 'edson', '123', [], 'f07d183f-eb37-417e-8a58-ad9ed4b3910f');
        const parent = new Parent(new Date(), "jose", [student], '0d0c4248-695c-43a5-963e-bc5729abead6');
        student.setParents(parent);
        
        let studentModel = StudentEntity.toStudentEntity(student);
        await studentRepository.create(studentModel);
        
        parent.setStudents([student])

        let rating = DomainMocks.mockRatingWithStudent(student);
        ratingEntity = RatingEntity.toRatingEntity(rating);
        await ratingRepository.create(ratingEntity);

        //let entityBD = await ratingRepository.find(ratingEntity.id);

        let comment = DomainMocks.mockComment();
        let model = CommentEntity.toCommentEntity(comment, ratingEntity);
        let wantedId = comment.getId();
        await repository.create(model);

        let result = await repository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toBe(wantedId);
        expect(result.rating).toBeUndefined();
    });

    it('should delete a comment', async () =>{
        let semester = DomainMocks.mockAcademicSemester();
        let academicSemester = AcademicSemesterEntity.toAcademicSemester(semester);
        await semesterRepository.create(academicSemester);

        // parent needed
        let student = new Student(new Date, 'edson', '123', [], 'f07d183f-eb37-417e-8a58-ad9ed4b3910f');
        const parent = new Parent(new Date(), "jose", [student], '0d0c4248-695c-43a5-963e-bc5729abead6');
        student.setParents(parent);
        
        let studentModel = StudentEntity.toStudentEntity(student);
        await studentRepository.create(studentModel);
        
        parent.setStudents([student])

        let rating = DomainMocks.mockRatingWithStudent(student);
        ratingEntity = RatingEntity.toRatingEntity(rating);
        await ratingRepository.create(ratingEntity);

        //let entityBD = await ratingRepository.find(ratingEntity.id);
        let wantedId = '489f0126-e7ca-44d6-8b11-13b61adc35d6';
        let wantedComment = 'just a test';
        let comment = new Comment(wantedComment, 'f07d183f-eb37-417e-8a58-ad9ed4b3910f', wantedId );
        let model = CommentEntity.toCommentEntity(comment, ratingEntity);
        await repository.create(model);

        expect( await repository.delete(wantedId)).toBe(void 0)
    })


    it('should not throw error when deleting a comment if a wrong id', async () =>{
        let semester = DomainMocks.mockAcademicSemester();
        let academicSemester = AcademicSemesterEntity.toAcademicSemester(semester);
        await semesterRepository.create(academicSemester);

        // parent needed
        let student = new Student(new Date, 'edson', '123', [], 'f07d183f-eb37-417e-8a58-ad9ed4b3910f');
        const parent = new Parent(new Date(), "jose", [student], '0d0c4248-695c-43a5-963e-bc5729abead6');
        student.setParents(parent);
        
        let studentModel = StudentEntity.toStudentEntity(student);
        await studentRepository.create(studentModel);
        
        parent.setStudents([student])

        let rating = DomainMocks.mockRatingWithStudent(student);
        ratingEntity = RatingEntity.toRatingEntity(rating);
        await ratingRepository.create(ratingEntity);

        //let entityBD = await ratingRepository.find(ratingEntity.id);
        let wantedId = 'd70bc62e-a53d-4cef-8366-de63099ebf4d';
        let wantedComment = 'just a test';
        let comment = new Comment(wantedComment, 'f07d183f-eb37-417e-8a58-ad9ed4b3910f', '489f0126-e7ca-44d6-8b11-13b61adc35d6' );
        let model = CommentEntity.toCommentEntity(comment, ratingEntity);
        await repository.create(model);

        expect( await repository.delete(wantedId)).toBe(void 0)
    })

    it('should find a comment', async () =>{
        let semester = DomainMocks.mockAcademicSemester();
        let academicSemester = AcademicSemesterEntity.toAcademicSemester(semester);
        await semesterRepository.create(academicSemester);

        // parent needed
        let student = new Student(new Date, 'edson', '123', [], 'f07d183f-eb37-417e-8a58-ad9ed4b3910f');
        const parent = new Parent(new Date(), "jose", [student], '0d0c4248-695c-43a5-963e-bc5729abead6');
        student.setParents(parent);
        
        let studentModel = StudentEntity.toStudentEntity(student);
        await studentRepository.create(studentModel);
        
        parent.setStudents([student])

        let rating = DomainMocks.mockRatingWithStudent(student);
        ratingEntity = RatingEntity.toRatingEntity(rating);
        await ratingRepository.create(ratingEntity);

        //let entityBD = await ratingRepository.find(ratingEntity.id);
        let wantedId = '489f0126-e7ca-44d6-8b11-13b61adc35d6';
        let wantedComment = 'just a test';
        let comment = new Comment(wantedComment, 'f07d183f-eb37-417e-8a58-ad9ed4b3910f', wantedId );
        let model = CommentEntity.toCommentEntity(comment, ratingEntity);
        await repository.create(model);

        let result = await repository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId)
        expect(result.comment).toEqual(wantedComment)
    })

    it('should find all comments', async () =>{
        let semester = DomainMocks.mockAcademicSemester();
        let academicSemester = AcademicSemesterEntity.toAcademicSemester(semester);
        await semesterRepository.create(academicSemester);

        // parent needed
        let student = new Student(new Date, 'edson', '123', [], 'f07d183f-eb37-417e-8a58-ad9ed4b3910f');
        const parent = new Parent(new Date(), "jose", [student], '0d0c4248-695c-43a5-963e-bc5729abead6');
        student.setParents(parent);
        
        let studentModel = StudentEntity.toStudentEntity(student);
        await studentRepository.create(studentModel);
        
        parent.setStudents([student])

        let rating = DomainMocks.mockRatingWithStudent(student);
        ratingEntity = RatingEntity.toRatingEntity(rating);
        await ratingRepository.create(ratingEntity);

        let comment = new Comment('just a comment', 'f07d183f-eb37-417e-8a58-ad9ed4b3910f' );
        let model = CommentEntity.toCommentEntity(comment, ratingEntity);
        await repository.create(model);

        let comment2 = new Comment('just another comment', 'f07d183f-eb37-417e-8a58-ad9ed4b3910f' );
        let model2 = CommentEntity.toCommentEntity(comment2, ratingEntity);
        await repository.create(model2);

        let results = await repository.findAll();
        expect(results).toBeDefined();
        expect(results.length).toBe(2);
        expect(results[0].id).toEqual(comment.getId())
        expect(results[0].comment).toEqual(comment.getComment())
        expect(results[1].id).toEqual(comment2.getId())
        expect(results[1].comment).toEqual(comment2.getComment())
    })

    it('should update a comment', async () =>{
        let semester = DomainMocks.mockAcademicSemester();
        let academicSemester = AcademicSemesterEntity.toAcademicSemester(semester);
        await semesterRepository.create(academicSemester);

        // parent needed
        let student = new Student(new Date, 'edson', '123', [], 'f07d183f-eb37-417e-8a58-ad9ed4b3910f');
        const parent = new Parent(new Date(), "jose", [student], '0d0c4248-695c-43a5-963e-bc5729abead6');
        student.setParents(parent);
        
        let studentModel = StudentEntity.toStudentEntity(student);
        await studentRepository.create(studentModel);
        
        parent.setStudents([student])

        let rating = DomainMocks.mockRatingWithStudent(student);
        ratingEntity = RatingEntity.toRatingEntity(rating);
        await ratingRepository.create(ratingEntity);

        let wantedId = '489f0126-e7ca-44d6-8b11-13b61adc35d6';
        let wantedComment = 'just a test';
        let comment = new Comment(wantedComment, 'f07d183f-eb37-417e-8a58-ad9ed4b3910f', wantedId );
        let model = CommentEntity.toCommentEntity(comment, ratingEntity);
        await repository.create(model);

        let change = 'changed the comment';
        model.comment = change;

        expect(await repository.update(model, wantedId)).toBe(void 0);

        let result = await repository.find(wantedId);

        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId)
        expect(result.comment).toEqual(change)
    })

})