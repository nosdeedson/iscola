import { Grade } from '../../../domain/enum/grade/grade';
import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { CreateRatingDto } from './create.rating.dto';
import { CreateRatingService } from './create.rating.service';


describe('CreateRatingService unit tests', () => {

    // period of rating must be informed
    it('should throw a systemError if semester is not present', async () => {
        const ratingRepository = MockRepositoriesForUnitTest.mockRepositories();
        const service = new CreateRatingService(ratingRepository);
        const student = DomainMocks.mockStudent();
        let semester;
        const dto = new CreateRatingDto(
            student,
            semester,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        try {
            await service.execute(dto)
        } catch (error) {
            //@ts-ignore
            expect(error.errors).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'period of rating must be informed' }]);
        }
    });


    // student receiving rating must be informed
    it('should throw a systemError if student is not present', async () => {
        const ratingRepository = MockRepositoriesForUnitTest.mockRepositories();
        const service = new CreateRatingService(ratingRepository);
        let student;
        let semester = DomainMocks.mockAcademicSemester();
        const dto = new CreateRatingDto(
            student,
            semester,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        try {
            await service.execute(dto)
        } catch (error) {
            //@ts-ignore
            expect(error.errors).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'student receiving rating must be informed' }]);
        }
    });

    // the listining skill must be informed
    it('should throw a systemError if listining is not graded ', async () => {
        const ratingRepository = MockRepositoriesForUnitTest.mockRepositories();
        const service = new CreateRatingService(ratingRepository);
        let student = DomainMocks.mockStudent();
        let semester = DomainMocks.mockAcademicSemester();
        let listing;
        const dto = new CreateRatingDto(
            student,
            semester,
            listing,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        try {
            await service.execute(dto)
        } catch (error) {
            //@ts-ignore
            expect(error.errors).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'the listining skill must be informed' }]);
        }
    });
    
    // the writing skill must be informed
    it('should throw a systemError if writing is not graded ', async () => {
        const ratingRepository = MockRepositoriesForUnitTest.mockRepositories();
        const service = new CreateRatingService(ratingRepository);
        let student = DomainMocks.mockStudent();
        let semester = DomainMocks.mockAcademicSemester();
        let writing;
        const dto = new CreateRatingDto(
            student,
            semester,
            Grade.BAD,
            writing,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        try {
            await service.execute(dto)
        } catch (error) {
            //@ts-ignore
            expect(error.errors).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'the writing skill must be informed' }]);
        }
    });

    // the reading skill must be informed
    it('should throw a systemError if reading is not graded ', async () => {
        const ratingRepository = MockRepositoriesForUnitTest.mockRepositories();
        const service = new CreateRatingService(ratingRepository);
        let student = DomainMocks.mockStudent();
        let semester = DomainMocks.mockAcademicSemester();
        let reading;
        const dto = new CreateRatingDto(
            student,
            semester,
            Grade.BAD,
            Grade.BAD,
            reading,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        try {
            await service.execute(dto)
        } catch (error) {
            //@ts-ignore
            expect(error.errors).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'the reading skill must be informed' }]);
        }
    });

    // the speaking skill must be informed
    it('should throw a systemError if speaking is not graded ', async () => {
        const ratingRepository = MockRepositoriesForUnitTest.mockRepositories();
        const service = new CreateRatingService(ratingRepository);
        let student = DomainMocks.mockStudent();
        let semester = DomainMocks.mockAcademicSemester();
        let speaking;
        const dto = new CreateRatingDto(
            student,
            semester,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            speaking,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        try {
            await service.execute(dto)
        } catch (error) {
            //@ts-ignore
            expect(error.errors).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'the speaking skill must be informed' }]);
        }
    });
    
    // the grammar skill must be informed
    it('should throw a systemError if grammar is not graded ', async () => {
        const ratingRepository = MockRepositoriesForUnitTest.mockRepositories();
        const service = new CreateRatingService(ratingRepository);
        let student = DomainMocks.mockStudent();
        let semester = DomainMocks.mockAcademicSemester();
        let grammar;
        const dto = new CreateRatingDto(
            student,
            semester,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            grammar,
            Grade.BAD,
            Grade.BAD,
        );
        try {
            await service.execute(dto)
        } catch (error) {
            //@ts-ignore
            expect(error.errors).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'the grammar skill must be informed' }]);
        }
    });
    
    // the homework commitment must be informed
    it('should throw a systemError if homework is not graded ', async () => {
        const ratingRepository = MockRepositoriesForUnitTest.mockRepositories();
        const service = new CreateRatingService(ratingRepository);
        let student = DomainMocks.mockStudent();
        let semester = DomainMocks.mockAcademicSemester();
        let homework;
        const dto = new CreateRatingDto(
            student,
            semester,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            homework,
            Grade.BAD,
        );
        try {
            await service.execute(dto)
        } catch (error) {
            //@ts-ignore
            expect(error.errors).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'the homework commitment must be informed' }]);
        }
    });
    
    // the vocabulary improvment must be informed
    it('should throw a systemError if vocabulary is not graded ', async () => {
        const ratingRepository = MockRepositoriesForUnitTest.mockRepositories();
        const service = new CreateRatingService(ratingRepository);
        let student = DomainMocks.mockStudent();
        let semester = DomainMocks.mockAcademicSemester();
        let vocabulary;
        const dto = new CreateRatingDto(
            student,
            semester,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            vocabulary,
        );
        try {
            await service.execute(dto)
        } catch (error) {
            //@ts-ignore
            expect(error.errors).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{ context: 'rating', message: 'the vocabulary improvment must be informed' }]);
        }
    });

});