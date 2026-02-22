import { ClassRepositoryInterface } from "src/domain/class/class.repository.interface";
import { ClassEntity } from "src/infrastructure/entities/class/class.entity";

export class FindTeacherClassRatingService {

    private classRepository: ClassRepositoryInterface;

    constructor(classRepository: ClassRepositoryInterface) {
        this.classRepository = classRepository;

    }

    async execute(teacherId: string, classId: string): Promise<ClassEntity> {
        try {
            const classEntity = await this.classRepository.findByTeacherIdAndClassId(teacherId, classId);
            return classEntity;
        } catch (error) {
            throw error;
        }
    }
}