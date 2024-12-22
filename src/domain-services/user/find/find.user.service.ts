import { UserRepositoryInterface } from "src/domain/user/user.repository.interface";
import { SystemError } from "src/domain-services/@shared/system-error";
import { FindUserDto } from "./find.user.dto";

export class FindUserService{

    private userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface){
        this.userRepository = userRepository;
    }

    async execute(userId: string){
        try{

            let user = await this.userRepository.find(userId);
            if(!user){
                throw new SystemError([{context: 'user', message: 'user not found'}]);
            }
            let dto = new FindUserDto(user.id, user.person.id, user.email, user.nickname, user.accesType);
            return dto;
        } catch(error){
            throw error;
        }
    }

}