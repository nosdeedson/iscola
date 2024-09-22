import { AppDataSourceMock } from "../../__mocks__/appDataSourceMock";
import { RatingEntity } from "../../entities/rating/rating.entity";
import { RatingRepositiry } from '../rating/rating.repository';
import { DomainMocks } from '../../__mocks__/mocks';
import { AcademicSemesterEntity } from "../../entities/academic-semester/academic.semester.entity";
import { AcademicSemesterRepository } from '../academic-semester/academic-semester.repository';
import { StudentRepository } from '../student/student.repository';
import { Grade } from "../../../domain/enum/grade/grade";
import { Rating } from "../../../domain/rating/rating";
import { StudentEntity } from "../../entities/student/student.entity";
import { Repository } from "typeorm";

describe('RatingRepository unit tests', () =>{

    let appDataSource;
    let ratintModel;
    let ratingRepository;
    let semesterModel;
    let semesterRepository;
    let studentModel;
    let studentRepository;

    beforeEach(async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        
        ratintModel = appDataSource.getRepository(RatingEntity);
        ratingRepository = new RatingRepositiry(ratintModel, appDataSource);

        semesterModel = appDataSource.getRepository(AcademicSemesterEntity);
        semesterRepository = new AcademicSemesterRepository(semesterModel, appDataSource);

        studentModel = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentModel, appDataSource);
    });

    afterEach( async () =>{
        await ratintModel.query('delete from rating cascade');
        await semesterModel.query('delete from academic_semester cascade');
        await semesterModel.query('delete from person cascade');
        appDataSource.destroy();
    })

    it('ratingRepository should be instantiated', () =>{
        expect(ratingRepository).toBeDefined();
        expect(semesterRepository).toBeDefined();
        expect(studentRepository).toBeDefined();
    });

    it('should save a rating on the BD', async () =>{
        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        await semesterRepository.create(semesterEntity);

        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        await studentRepository.create(studentEntity);

        let rating = new Rating(semester, student, new Date(), Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD,)
        let ratingEntity = RatingEntity.toRatingModel(rating);
        let wantedId = rating.getId();
        expect(await ratingRepository.create(ratingEntity)).toBe(void 0);

        let result = await ratingRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
    });

    it('should delete a rating on the BD', async () =>{
        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        await semesterRepository.create(semesterEntity);

        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        await studentRepository.create(studentEntity);

        let rating = new Rating(semester, student, new Date(), Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD,)
        let ratingEntity = RatingEntity.toRatingModel(rating);
        let wantedId = rating.getId();
        expect(await ratingRepository.create(ratingEntity)).toBe(void 0);
        let result = await ratingRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(await ratingRepository.delete(wantedId)).toBe(void 0);
    }); 
    
    it('should find a rating on the BD', async () =>{
        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        await semesterRepository.create(semesterEntity);

        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        await studentRepository.create(studentEntity);

        let rating = new Rating(semester, student, new Date(), Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD,)
        let ratingEntity = RatingEntity.toRatingModel(rating);
        let wantedId = rating.getId();
        expect(await ratingRepository.create(ratingEntity)).toBe(void 0);
        let result = await ratingRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
        expect(result.writing).toEqual(Grade.BAD)
    }); 

    it('should find all rating on the BD', async () =>{
        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        await semesterRepository.create(semesterEntity);

        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        await studentRepository.create(studentEntity);

        let rating = new Rating(semester, student, new Date(), Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, '1cfb1c26-5e1e-449e-bdbe-1749bc035379')
        let ratingEntity = RatingEntity.toRatingModel(rating);
        expect(await ratingRepository.create(ratingEntity)).toBe(void 0);
        let rating2 = new Rating(semester, student, new Date(), Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, 'd146249c-0341-4c52-bd02-421f104e5c45')
        let ratingEntity2 = RatingEntity.toRatingModel(rating2);
        expect(await ratingRepository.create(ratingEntity2)).toBe(void 0);
        let results = await ratingRepository.findAll();
        expect(results).toBeDefined();
        expect(results.length).toBe(2);
        expect(results[0].id).toEqual(rating.getId());
        expect(results[1].id).toEqual(rating2.getId());
    });

    it('should update a rating on the BD', async () =>{
        let semester = DomainMocks.mockAcademicSemester();
        let semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        await semesterRepository.create(semesterEntity);

        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        await studentRepository.create(studentEntity);

        let rating = new Rating(semester, student, new Date(), Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD, Grade.BAD,)
        let ratingEntity = RatingEntity.toRatingModel(rating);
        let wantedId = rating.getId();
        expect(await ratingRepository.create(ratingEntity)).toBe(void 0);

        let wantedWriting = Grade.GOOD;
        let wantedListing = Grade.GOOD;
        rating.setWriting(wantedWriting);
        rating.setListing(wantedListing);
        expect(await ratingRepository.update(rating, wantedId));

        let result = await ratingRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
        expect(result.writing).toEqual(wantedWriting);
        expect(result.listing).toEqual(wantedListing);
    });

})