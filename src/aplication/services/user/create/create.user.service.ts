import { User } from "src/domain/user/user";
import { UserRepositoryInterface } from "src/domain/user/user.repository.interface";
import { UserEntity } from "src/infrastructure/entities/user/user.entity";
import { PeronRepositoryInterface } from "../../../../domain/@shared/repository/person.repository.interface";
import { InputCreateUserDto } from "./input.create.user.dto";
import { AccessType } from "src/domain/user/access.type";
import { PersonEntity } from "src/infrastructure/entities/@shared/person.entity";
import { WorkerEntity } from "src/infrastructure/entities/worker/worker.entity";
import { Worker } from "src/domain/worker/worker";
import { Parent } from "src/domain/parent/parent";
import { ParentEntity } from "src/infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "src/infrastructure/entities/student/student.entity";
import { Student } from "src/domain/student/student";
import { TrataErros } from "src/infrastructure/utils/trata-erros/trata-erros";
import { RepositoryInterface } from "src/domain/@shared/repository/repository.interface";

export class CreateUserService {

    private userRepository: UserRepositoryInterface;
    public personRepository: RepositoryInterface<any>;

    constructor(
        userRepository: UserRepositoryInterface,
        personRepository: RepositoryInterface<any>,
    ){
        this.userRepository = userRepository;
        this.personRepository = personRepository
    }

    async execute(dto: InputCreateUserDto) {
        try {
            let personEntity = await this.personRepository.find(dto.personId);
            let person = this.typePerson(dto.accesstype, personEntity);
            let user = new User(person, dto.email, dto.nickname, dto.password, dto.accesstype);
            let entity = UserEntity.toUserEntity(user);
            await this.userRepository.create(entity);
        } catch (error) {
            throw error;
        }
    }

    public typePerson(accessType: AccessType, person: PersonEntity): any {
        if(AccessType.ADMIN == accessType || AccessType.TEACHER == accessType ){
            let workerEntity = person as WorkerEntity;
            return Worker.toDomain(workerEntity, accessType);
        } else if(AccessType.PARENT == accessType){
            let parentEntity = person as ParentEntity;
            return Parent.toDomain(parentEntity);
        } else {
            let entity = person as StudentEntity;
            return Student.toDomain(entity);
        }
    }

    
}
    

    
