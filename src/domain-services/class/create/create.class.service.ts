import { Class } from "src/domain/class/class";
import { ClassRepositoryInterface } from "src/domain/class/class.repository.interface";
import { Schedule } from "src/domain/schedule/schedule";
import { ClassCodeHelper } from "src/helpers/classCode/class-code.heper";
import { ClassEntity } from "src/infrastructure/entities/class/class.entity";
import { CreateClassDto } from "./create.class.dto";
import { SystemError } from "src/domain-services/@shared/system-error";

export class CreateClassService {
    private classRepository: ClassRepositoryInterface;

    constructor(classRepository: ClassRepositoryInterface){
        this.classRepository = classRepository;
    }

    async execute(dto: CreateClassDto) {
        try{
            dto.classCode = ClassCodeHelper.createClassCode();
            if(!dto?.scheduleDto){
                throw new SystemError([{context: 'class', message: 'schedule is required'}])
            }
            let schedule = new Schedule(dto.scheduleDto.dayOfWeeks, dto.scheduleDto.times);
            let schoolGroup = new Class(dto.classCode, dto.nameBook, dto.name, schedule);
            if( schoolGroup.getNotification().hasError()){
                throw new SystemError(schoolGroup.getNotification()?.getErrors());
            }    
            let entity = ClassEntity.toClassEntity(schoolGroup);
            await this.classRepository.create(entity);
        } catch(error){
            throw error;
        }
    }

}