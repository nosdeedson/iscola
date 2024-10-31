import { AcademicSemester } from "../../../domain/academc-semester/academic.semester";
import { RatingEntity } from "../rating/rating.entity";
import { AcademicSemesterEntity } from "./academic.semester.entity";

describe("AcademicSemester unit test", () => {


    it('should instantiate an AcademicSemesterModel from AcademicSemester', () => {
        const ratingFile = jest.spyOn(RatingEntity, 'toRatingsEntity')
        // first August 2024
        const aValidBeginnig = new Date(2024, 7, 1, 0, 0, 0);
        // 29 November 2024
        const aValidEnding = new Date(2024, 10, 29, 0, 0, 0) 
        const academicSemester = new AcademicSemester(true, aValidBeginnig, aValidEnding);
        const model = AcademicSemesterEntity.toAcademicSemester(academicSemester);
        expect(model).toBeDefined();
        expect(model.actual).toEqual(academicSemester.getActual());
        expect(model.beginningDate).toEqual(academicSemester.getBeginningDate());
        expect(model.createdAt).toEqual(academicSemester.getCreatedAt());
        expect(model.deletedAt).toEqual(academicSemester.getDeletedAt());
        expect(model.updatedAt).toEqual(academicSemester.getUpdatedAt());
        expect(model.endingDate).toEqual(academicSemester.getEndingDate());
        expect(model.id).toEqual(academicSemester.getId());
        expect(model.ratings).toEqual(academicSemester.getRating());
        expect(ratingFile).toHaveBeenCalled();
        expect(ratingFile).toHaveBeenCalledTimes(1);
    })
})