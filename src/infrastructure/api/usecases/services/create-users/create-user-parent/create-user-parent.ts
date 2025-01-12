import { ParentReporitoryInterface } from "src/domain/parent/parent.repository.interface";
import { CreateUsersService } from "../create-users.service";
import { ParentRepository } from "src/infrastructure/repositories/parent/parent.repository";
import { CreateUserDto } from "src/infrastructure/api/controllers/user/create-user-dto";
import { DataSource } from "typeorm";
import { CreateParentDto } from "src/domain-services/parent/create/create.parent.dto";
import { CreateParentService } from "src/domain-services/parent/create/create.parent.service";

export class CreateUserParent extends CreateUsersService {

    private parentRepository: ParentReporitoryInterface;

    constructor(parentRepository: ParentRepository) {
        super();
        this.parentRepository = parentRepository;
    }

    async createActor(dto: CreateUserDto): Promise<void> {
        // TODO
        console.log('creating a parent');
        let inputParent = new CreateParentDto(dto.birthDay, dto.name);
        let createParent = new CreateParentService(this.parentRepository);
        try {
            await createParent.execute(inputParent, []);
        } catch (error) {
            throw error
        }
    }
}
