import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateAcademicSemesterService } from "src/domain-services/academic-semester/create/create.academic-semester.service";
import { AcademicSemesterEntity } from "src/infrastructure/entities/academic-semester/academic.semester.entity";
import { AcademicSemesterRepository } from "src/infrastructure/repositories/academic-semester/academic-semester.repository";
import { TrataErros } from "src/infrastructure/utils/trata-erros/trata-erros";
import { DataSource } from "typeorm";
import { CreateSemesteDto } from "../../controllers/semester/create-semester-dto";
import { FindAcademicSemesterDto } from "src/domain-services/academic-semester/find/find.academic-semester.dto";
import { FindAcademicSemesterService } from "src/domain-services/academic-semester/find/find.academic-semester.service";
import { FindAllClassService } from "src/domain-services/class/findAll/findAll.class.service";
import { FindAllAcademicSemesterDto } from "src/domain-services/academic-semester/findAll/findAll.academic-semester.dto";
import { FindAllAcademicSemesterService } from "src/domain-services/academic-semester/findAll/findAll.academic-semester.service";
import { DeleteAcademicSemesterService } from "src/domain-services/academic-semester/delete/delete.academic-semester.service";
import { UpdateAcademicSemesterService } from "src/domain-services/academic-semester/update/update.academic-semester.service";
import { UpdateAcademicSemesterDto } from "src/domain-services/academic-semester/update/udpate.academic-semester.dto";

@Injectable()
export class SemesterUsecases {

    entity: any;
    repository: any;

    constructor(
        @Inject('DATA_SOURCE') private dataSource: DataSource,
    ){
        this.entity = this.dataSource.getRepository(AcademicSemesterEntity);
        this.repository = new AcademicSemesterRepository(this.entity, this.dataSource);
     }

    async createSemester(dto: CreateSemesteDto): Promise<void>{
        try {
            let createServive = new CreateAcademicSemesterService(this.repository);
            let input = dto.toInput();
            await createServive.execute(input);
        } catch (error) {
            TrataErros.tratarErrorsBadRequest(error);
        }
    }

    async delete(id: string): Promise<void>{
        let deleteService = new DeleteAcademicSemesterService(this.repository);
        await deleteService.execute(id);
    }

    async find(id: string): Promise<any>{
        try {
            let findService = new FindAcademicSemesterService(this.repository);
            return await findService.execute(id);
        } catch (error) {
            TrataErros.tratarErrorsNotFound(error);
        }
    }

    async findAll(): Promise<FindAllAcademicSemesterDto>{
        let all = new FindAllAcademicSemesterService(this.repository);
        return await all.execute();
    }

    async update(id: string, actual: boolean): Promise<any>{
        let updateService = new UpdateAcademicSemesterService(this.repository);
        let input = new UpdateAcademicSemesterDto(id, actual);
        updateService.execute(input);
    }

}
