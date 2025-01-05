import { Inject, Injectable } from '@nestjs/common';
import { CreateClassService } from 'src/domain-services/class/create/create.class.service';
import { DeleteClassService } from 'src/domain-services/class/delete/delete.class.service';
import { FindClassService } from 'src/domain-services/class/find/find.class.service';
import { FindAllClassService } from 'src/domain-services/class/findAll/findAll.class.service';
import { UpdateClassService } from 'src/domain-services/class/update/update.class.service';
import { ClassEntity } from 'src/infrastructure/entities/class/class.entity';
import { ClassRepository } from 'src/infrastructure/repositories/class/class.repository';
import { TrataErros } from 'src/infrastructure/utils/trata-erros/trata-erros';
import { DataSource } from 'typeorm';
import { SchoolgroupDto } from '../../controllers/schoolgroup/create-schoolgroup-dto';
import { UpdateSchoolgroupDto } from '../../controllers/schoolgroup/update-schoolgroup-dto';

@Injectable()
export class SchoolgroupUsecases {

    private entity: any;
    private repository: any;

    constructor(
        @Inject('DATA_SOURCE') private dataSource: DataSource
    ) {
        this.entity = this.dataSource.getRepository(ClassEntity);
        this.repository = new ClassRepository(this.entity, dataSource);
    }

    async create(dto: SchoolgroupDto): Promise<void> {
        try {
            let createService = new CreateClassService(this.repository);
            let input = dto.toInput();
            await createService.execute(input);
        } catch (error) {
            TrataErros.tratarErrorsBadRequest(error);
        }
    }

    async delete(id: string): Promise<void>{
        let deleteService = new DeleteClassService(this.repository);
        deleteService.execute(id);
    }

    async find(id: string): Promise<any> {
        let findService = new FindClassService(this.repository);
        return await findService.execute(id);
    }

    async findAll(): Promise<any>{
        let allService = new FindAllClassService(this.repository);
        let result =  await allService.execute();
        return result;
    }

    async update(dto: UpdateSchoolgroupDto): Promise<void>{
        let input = dto.toInput();
        let updateService = new UpdateClassService(this.repository);
        try {
            await updateService.execute(input);
        } catch (error) {
            TrataErros.tratarErrorsNotFound(error);
        }
    }

}
