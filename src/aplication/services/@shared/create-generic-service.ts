import { PeronRepositoryInterface } from "src/domain/@shared/repository/person.repository.interface";
import { RepositoryInterface } from "src/domain/@shared/repository/repository.interface";

export abstract class CreateGenericService {
    public personRepository: RepositoryInterface<any>;
    public abstract execute(dto: any): Promise<any>;
    constructor(personRepository: PeronRepositoryInterface<any>) {
        this.personRepository = personRepository;
    }
}