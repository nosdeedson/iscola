import { DateHelper } from '../../../helpers/date/date.helper';
import { ClassCodeHelper } from '../../../helpers/classCode/class-code.heper';
import { ScheduleDto } from './schedule-dto';
import { CreateClassDto } from './create.class.dto';
import { CreateClassUseCase } from './create.class.usecase'
import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories'

describe('CreateClassUsecas unit test', () => {

    let aValidDate1 = new Date(2024, 7, 9, 17, 5, 0, 0);
    let aValidDate2 = new Date(2024, 7, 8, 17, 5, 0, 0);
    let dayOfWeek1;
    let dayOfWeek2;
    let times = new Map<string, string>();

    let scheduleDto;
    let classDto;

    beforeEach(() => {
        dayOfWeek1 = DateHelper.getDayOfweek(aValidDate1);
        dayOfWeek2 = DateHelper.getDayOfweek(aValidDate2);
        DateHelper.setTime(times, dayOfWeek1, '08:00');
        DateHelper.setTime(times, dayOfWeek2, '08:00');
        scheduleDto = new ScheduleDto([dayOfWeek1, dayOfWeek2], times);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a class', async () => {
        classDto = new CreateClassDto('a1', 'a1class1', scheduleDto);
        const classCodeHelper = jest.spyOn(ClassCodeHelper, 'createClassCode')
            .mockImplementationOnce(() => {
                return '123456';
            })
        const classRepository = MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new CreateClassUseCase(classRepository);
        expect(await usecase.execute(classDto)).toBe(void 0);
        expect(classCodeHelper).toHaveBeenCalledTimes(1);
        expect(classRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw erro namebook required', async () => {
        let nameBook;
        classDto = new CreateClassDto(nameBook, 'a1class1', scheduleDto);
        const classCodeHelper = jest.spyOn(ClassCodeHelper, 'createClassCode')
            .mockImplementationOnce(() => {
                return '123456';
            })
        const classRepository = MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new CreateClassUseCase(classRepository);
        try {
            await usecase.execute(classDto);
        } catch (error) {   
            expect(error.errors).toBeDefined();
            expect(error.errors).toStrictEqual([{context: "class", message: "Name of the book is required"}]);
            expect(classRepository.create).toHaveBeenCalledTimes(0);
        }
    })

    it('should throw erro name of class required', async () => {
        let nameOfClass;
        classDto = new CreateClassDto('a1', nameOfClass, scheduleDto);
        const classCodeHelper = jest.spyOn(ClassCodeHelper, 'createClassCode')
            .mockImplementationOnce(() => {
                return '123456';
            })
        const classRepository = MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new CreateClassUseCase(classRepository);
        try {
            await usecase.execute(classDto);
        } catch (error) {   
            expect(error.errors).toBeDefined();
            expect(error.errors).toStrictEqual([{context: "class", message: "Name of the class is required"}]);
            expect(classRepository.create).toHaveBeenCalledTimes(0);
        }
    })

    it('should throw erro classcode is required', async () => {
        let classCode;
        classDto = new CreateClassDto('a1', 'nameofclass', scheduleDto);
        const classCodeHelper = jest.spyOn(ClassCodeHelper, 'createClassCode')
            .mockImplementationOnce(() => {
                return classCode;
            })
        const classRepository = MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new CreateClassUseCase(classRepository);
        try {
            await usecase.execute(classDto);
        } catch (error) {   
            expect(error.errors).toBeDefined();
            expect(error.errors).toStrictEqual([{context: "class", message: "classcode is required"}]);
            expect(classRepository.create).toHaveBeenCalledTimes(0);
        }

    })

    it('should throw erro schedule is required', async () => {
        let schedule;
        classDto = new CreateClassDto('a1', 'nameofclass', schedule);
        const classCodeHelper = jest.spyOn(ClassCodeHelper, 'createClassCode')
            .mockImplementationOnce(() => {
                return '123456';
            })
        const classRepository = MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new CreateClassUseCase(classRepository);
        try {
            await usecase.execute(classDto);
        } catch (error) {   
            expect(error.errors).toBeDefined();
            expect(error.errors).toStrictEqual([{context: "class", message: "schedule is required"}]);
            expect(classRepository.create).toHaveBeenCalledTimes(0);
        }

    })

})