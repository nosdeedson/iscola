import { InputCreateUserDto } from "./input.create.user.dto";
import { PeronRepositoryInterface } from "../../../domain/@shared/repository/person.repository.interface";
import { PersonEntity } from "src/infrastructure/entities/@shared/person.entity";

export class CreateUserUseCase {

    private personRepository: PeronRepositoryInterface<PersonEntity>;

    constructor(personRespository: PeronRepositoryInterface<PersonEntity>){
        this.personRepository = personRespository;
    }

    async execute(dto: InputCreateUserDto) {
        // TODO CREATE THE CODE TO SAVE USER
        let person = await this.personRepository.find(dto.personId);
        // let user = 
    }
}